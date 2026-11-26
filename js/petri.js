// Conformance scene: a Coloured Petri Net mission model, choreographed.
// Tokens flow through the lawful route; every third cycle a deviation
// fires, flashes, and drops a sealed event chip into the feed.
import { animate, createTimeline, stagger } from 'animejs';

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initPetri(canvas, feedEl) {
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, DPR = Math.min(devicePixelRatio, 2);

  function place() {
    const r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  place();
  new ResizeObserver(place).observe(canvas);

  const LINE = '#2A2A2F';
  const DIM = '#6E6D68';
  const TEXT = '#A6A49E';
  const ACC = '#FF6369';
  const ACC_D = '#8E2E32';

  // ---- model layout (fractions of canvas) ----
  const P = {
    idle: { x: 0.14, y: 0.50, label: 'idle' },
    drive: { x: 0.34, y: 0.50, label: 'driving' },
    human: { x: 0.52, y: 0.26, label: 'human detected' },
    zone: { x: 0.70, y: 0.26, label: 'slow zone' },
    exit: { x: 0.70, y: 0.74, label: 'zone exit' },
  };
  const T = {
    start: { x: 0.24, y: 0.50, label: 'start' },
    detect: { x: 0.43, y: 0.40, label: 'detect human' },
    clear: { x: 0.61, y: 0.26, label: 'zone clearance' },
    resume: { x: 0.61, y: 0.62, label: 'resume speed' },
    complete: { x: 0.86, y: 0.62, label: 'mission complete' },
    dev: { x: 0.52, y: 0.74, label: 'clearance skipped', dev: true },
  };

  function pt(n) { return { x: n.x * W, y: n.y * H }; }

  // ---- route script: [from node, to node, ctrl point or null, dur] ----
  const ROUTE = [
    ['idle', 'T:start', null, 700],
    ['T:start', 'drive', null, 700],
    ['drive', 'T:detect', { cy: -0.10 }, 650],
    ['T:detect', 'human', null, 650],
    ['human', 'T:clear', null, 550],
    ['T:clear', 'zone', null, 550],
    ['zone', 'T:resume', { cx: 0.79 }, 650],
    ['T:resume', 'exit', null, 650],
    ['exit', 'T:complete', { cy: 0.82 }, 800],
    ['T:complete', 'idle', { cy: 1.02 }, 900],
  ];
  const DEV_ROUTE = [
    ['drive', 'T:dev', { cy: 0.68 }, 600],
    ['T:dev', 'exit', null, 600],
  ];

  const flash = {}; // node id -> 0..1 flash intensity

  function drawBase() {
    ctx.clearRect(0, 0, W, H);

    // faint dot grid
    ctx.fillStyle = '#141416';
    for (let x = 24; x < W; x += 44) {
      for (let y = 24; y < H; y += 44) {
        ctx.fillRect(x, y, 1.4, 1.4);
      }
    }

    // arcs
    const arcs = [
      ['idle', 'T:start', null, LINE], ['T:start', 'drive', null, LINE],
      ['drive', 'T:detect', { cy: -0.10 }, LINE], ['T:detect', 'human', null, LINE],
      ['human', 'T:clear', null, LINE], ['T:clear', 'zone', null, LINE],
      ['zone', 'T:resume', { cx: 0.79 }, LINE], ['T:resume', 'exit', null, LINE],
      ['exit', 'T:complete', { cy: 0.82 }, LINE], ['T:complete', 'idle', { cy: 1.02 }, LINE],
      ['drive', 'T:dev', { cy: 0.68 }, ACC_D], ['T:dev', 'exit', null, ACC_D],
    ];
    for (const [a, b, c, col] of arcs) {
      const pa = pt(nodeById(a)), pb = pt(nodeById(b));
      let cx, cy;
      if (c && c.cy != null) { cx = (pa.x + pb.x) / 2; cy = c.cy * H; }
      else if (c && c.cx != null) { cx = c.cx * W; cy = (pa.y + pb.y) / 2; }
      else { cx = (pa.x + pb.x) / 2; cy = (pa.y + pb.y) / 2; }
      ctx.strokeStyle = col;
      ctx.lineWidth = 1;
      ctx.setLineDash(col === ACC_D ? [4, 5] : []);
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.quadraticCurveTo(cx, cy, pb.x, pb.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // transitions (bars) + places (circles) + labels
    ctx.font = '10px "IBM Plex Mono", monospace';
    for (const [id, t] of Object.entries(T)) {
      const p = pt(t);
      const f = flash[id] || 0;
      const col = t.dev ? ACC_D : LINE;
      ctx.fillStyle = f > 0 ? `rgba(255,99,105,${0.25 + f * 0.7})` : '#17171A';
      ctx.strokeStyle = t.dev ? ACC_D : '#3A3A40';
      roundBar(p.x, p.y, 5, 16);
      ctx.fillStyle = '#17171A';
      if (f > 0) {
        ctx.save();
        ctx.shadowColor = ACC; ctx.shadowBlur = 14 * f;
        roundBar(p.x, p.y, 5, 16);
        ctx.restore();
      }
      ctx.fillStyle = t.dev ? '#7a4a4c' : DIM;
      ctx.textAlign = 'center';
      ctx.fillText(t.label.toUpperCase(), p.x, p.y + 30);
    }
    for (const [id, pl] of Object.entries(P)) {
      const p = pt(pl);
      const f = flash[id] || 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 17, 0, Math.PI * 2);
      ctx.fillStyle = '#0E0E10';
      ctx.fill();
      ctx.strokeStyle = f > 0 ? `rgba(255,99,105,${0.5 + f * 0.5})` : '#3A3A40';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      if (f > 0) {
        ctx.save();
        ctx.strokeStyle = `rgba(255,99,105,${0.35 * f})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 17 + 8 * (1 - f), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      ctx.fillStyle = DIM;
      ctx.textAlign = 'center';
      ctx.fillText(pl.label.toUpperCase(), p.x, p.y + 34);
    }
  }

  function roundBar(x, y, w, h) {
    ctx.beginPath();
    ctx.roundRect(x - w, y - h, w * 2, h * 2, 2);
    ctx.fill();
    ctx.stroke();
  }

  const nodeById = (id) => id.startsWith('T:') ? T[id.slice(2)] : P[id.slice(0)];

  // ---- token engine ----
  const token = { x: 0, y: 0, dev: false, visible: false };

  function along(a, b, c, t) {
    const pa = pt(a), pb = pt(b);
    let cx, cy;
    if (c && c.cy != null) { cx = (pa.x + pb.x) / 2; cy = c.cy * H; }
    else if (c && c.cx != null) { cx = c.cx * W; cy = (pa.y + pb.y) / 2; }
    else { cx = (pa.x + pb.x) / 2; cy = (pa.y + pb.y) / 2; }
    const u = 1 - t;
    return {
      x: u * u * pa.x + 2 * u * t * cx + t * t * pb.x,
      y: u * u * pa.y + 2 * u * t * cy + t * t * pb.y,
    };
  }

  function pulse(id) {
    flash[id] = 1;
    animate(flash, { [id]: 0 }, { duration: 700, ease: 'outQuad' });
  }

  // ---- sealed event feed ----
  let evCounter = 412;
  const feedTimes = ['14:02:11', '14:02:47', '14:03:29'];
  function dropDeviationChip() {
    const chip = document.createElement('div');
    chip.className = 'deviation-chip';
    const n = evCounter++;
    const time = feedTimes[n % feedTimes.length];
    chip.innerHTML = `<span class="dot"></span>sealed event #${n}: zone clearance skipped · ${time}`;
    feedEl.appendChild(chip);
    animate(chip, { opacity: [0, 1], translateY: [-8, 0], duration: 420, ease: 'outQuad' });
    while (feedEl.children.length > 3) feedEl.firstChild.remove();
  }

  // ---- choreography ----
  let cycle = 0;
  let cancelled = false;

  function runSegment(route, done) {
    let i = 0;
    function next() {
      if (cancelled) return;
      if (i >= route.length) { done(); return; }
      const [a, b, c, dur] = route[i];
      pulse(a.startsWith('T:') ? a : a); // flash origin
      if (a.startsWith('T:')) pulse(a);
      const start = performance.now();
      token.visible = true;
      token.dev = b === 'exit' && a === 'T:dev';
      token.dev = route === DEV_ROUTE;
      function step(now) {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / dur);
        const e = 1 - Math.pow(1 - t, 2.2);
        const p = along(nodeById(a), nodeById(b), c, e);
        token.x = p.x; token.y = p.y;
        if (t < 1) requestAnimationFrame(step);
        else {
          pulse(b);
          i++;
          if (token.dev && b === 'exit') dropDeviationChip();
          setTimeout(next, 260);
        }
      }
      requestAnimationFrame(step);
    }
    next();
  }

  function drawToken() {
    if (!token.visible) return;
    ctx.beginPath();
    ctx.arc(token.x, token.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = token.dev ? ACC : '#EDECE8';
    ctx.shadowColor = token.dev ? ACC : 'rgba(240,240,235,0.8)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function loop() {
    cycle++;
    const dev = cycle % 3 === 0;
    const script = dev ? DEV_ROUTE : ROUTE;
    // lawful run first half, deviation injects mid-route
    if (dev) {
      // run to 'drive', then deviate, then resume from 'exit'
      const pre = ROUTE.slice(0, 2);
      const post = ROUTE.slice(7);
      runSegment(pre, () => {
        runSegment(DEV_ROUTE, () => {
          runSegment(post, () => setTimeout(loop, 900));
        });
      });
    } else {
      runSegment(ROUTE, () => setTimeout(loop, 900));
    }
  }

  let running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.05 })
    .observe(canvas);

  function frame() {
    drawBase();
    drawToken();
    requestAnimationFrame(frame);
  }

  if (REDUCED) {
    drawBase();
    return;
  }
  requestAnimationFrame(frame);
  (function startWhenVisible() {
    if (running && !document.hidden) loop();
    else setTimeout(startWhenVisible, 300);
  })();
}
