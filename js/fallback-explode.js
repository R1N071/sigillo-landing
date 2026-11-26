// 2D canvas isometric fallback for the pipeline: the recorder takes itself
// apart as you scroll. No WebGL required. Mirrors the five-layer stack.
export function initFallbackExplode(section, oldCanvas, chipsEl) {
  const canvas = document.createElement('canvas');
  canvas.id = 'explode-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  if (oldCanvas && oldCanvas.parentNode) oldCanvas.replaceWith(canvas);
  else section.querySelector('.pipeline-sticky').prepend(canvas);

  const ctx = canvas.getContext('2d');
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ACC = '229,72,77';

  let W = 0, H = 0;
  const DPR = Math.min(devicePixelRatio || 1, 2);
  let scale = 100, offX = 0, offY = 0;

  function place() {
    const r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    scale = Math.min(W * 0.185, H * 0.115, 148);
    offX = W * 0.5;
    offY = H * 0.70;
  }
  place();
  new ResizeObserver(place).observe(canvas);

  let t = 0, prog = 0, progTarget = 0;

  function P(x, y, z) {
    return [
      (x - z) * 0.866 * scale + offX,
      ((x + z) * 0.5 - y) * scale + offY,
    ];
  }

  function poly(pts, fill, stroke, glow, alpha) {
    if (alpha !== undefined) ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) {
      ctx.save();
      if (glow) { ctx.shadowColor = `rgba(${ACC},0.9)`; ctx.shadowBlur = glow; }
      ctx.strokeStyle = stroke; ctx.lineWidth = 1.4; ctx.stroke();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  function box(x, y, z, w, h, d, tone, alpha) {
    const x1 = x - w / 2, x2 = x + w / 2, z1 = z - d / 2, z2 = z + d / 2;
    const y1 = y, y2 = y + h;
    poly([P(x1, y2, z1), P(x2, y2, z1), P(x2, y2, z2), P(x1, y2, z2)], tone.top, tone.stroke, tone.glow, alpha);
    poly([P(x2, y1, z1), P(x2, y1, z2), P(x2, y2, z2), P(x2, y2, z1)], tone.right, tone.stroke, 0, alpha);
    poly([P(x1, y1, z2), P(x2, y1, z2), P(x2, y2, z2), P(x1, y2, z2)], tone.front, tone.stroke, 0, alpha);
  }

  function ellipse(x, y, z, r, fill, stroke, glow, alpha) {
    if (alpha !== undefined) ctx.globalAlpha = alpha;
    const [sx, sy] = P(x, y, z);
    ctx.beginPath();
    ctx.ellipse(sx, sy, r * 1.2247 * scale, r * 0.7071 * scale, 0, 0, Math.PI * 2);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) {
      ctx.save();
      if (glow) { ctx.shadowColor = `rgba(${ACC},0.9)`; ctx.shadowBlur = glow; }
      ctx.strokeStyle = stroke; ctx.lineWidth = 1.4; ctx.stroke();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  // layer order matches the WebGL scene: 0 seal(top), 1 ingest, 2 hash, 3 tpm, 4 worm(bottom)
  const SPREAD = [3.1, 1.9, 1.05, 0.45, 0];
  function layerY(i, base, p) {
    return base + SPREAD[i] * p;
  }

  const chips = [...chipsEl.querySelectorAll('.chip')];
  const steps = [...section.querySelectorAll('.step')];
  let active = -1;

  function setActive(i) {
    if (i === active || i < 0) return;
    active = i;
    steps.forEach((s) => s.classList.toggle('active', +s.dataset.layer === i));
    chips.forEach((c) => c.classList.toggle('active', +c.dataset.layer === i));
  }

  if (REDUCED) setActive(1);
  else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(+e.target.dataset.layer);
    }, { rootMargin: '-42% 0px -42% 0px' });
    steps.forEach((s) => io.observe(s));
  }

  function drawLayer(i, base, p) {
    const dim = active < 0 || active === i ? 1 : 0.2;
    const x = (i % 2 === 0 ? -1 : 1) * p * 0.3;
    const y = layerY(i, base, p);
    const stroke = `rgba(${ACC},${0.9 * dim})`;
    const A = dim;

    if (i === 4) { // WORM vault
      box(x, y, 0, 2.5, 0.55, 1.9, {
        top: '#2c2f37', right: '#1a1c22', front: '#14161b', stroke, glow: 6,
      }, A);
      ellipse(x - 0.6, y + 0.56, 0, 0.55, `rgba(120,124,138,${0.55 * dim})`, `rgba(255,255,255,${0.12 * dim})`, 0, A);
      ellipse(x + 0.6, y + 0.56, 0, 0.55, null, `rgba(${ACC},${0.6 * dim})`, 10, A);
    } else if (i === 3) { // TPM chip
      box(x, y, 0, 1.5, 0.26, 1.1, {
        top: '#23262d', right: '#171920', front: '#121419', stroke, glow: 5,
      }, A);
      box(x, y + 0.26, 0, 0.4, 0.09, 0.4, {
        top: `rgba(20,22,27,${dim})`, right: '#0e1013', front: '#0a0c0f', stroke: `rgba(160,130,70,${0.5 * dim})`,
      }, A);
    } else if (i === 2) { // hash chain core
      box(x, y, 0, 2.0, 0.34, 1.3, {
        top: '#2a2c34', right: '#191b21', front: '#121419', stroke, glow: 6,
      }, A);
      for (let k = 0; k < 5; k++) {
        const cx = x - 0.68 + k * 0.34;
        box(cx, y + 0.34, 0, 0.24, 0.24, 0.24, {
          top: `rgba(30,33,40,${dim})`, right: '#14161b', front: '#0f1115',
          stroke: `rgba(255,99,105,${0.85 * dim})`, glow: 8,
        }, A);
      }
    } else if (i === 1) { // ingest plate
      box(x, y, 0, 2.25, 0.18, 1.65, {
        top: '#30333b', right: '#1d1f25', front: '#16181d', stroke, glow: 5,
      }, A);
      for (let k = 0; k < 6; k++) {
        ellipse(x - 0.85 + k * 0.34, y + 0.2, 0.4, 0.05, `rgba(140,144,158,${0.6 * dim})`, null, 0, A);
      }
    } else { // seal cap
      box(x, y, 0, 1.15, 0.34, 1.15, {
        top: '#262932', right: '#171920', front: '#121419', stroke, glow: 6,
      }, A);
      ellipse(x, y + 0.35, 0, 0.17, `rgba(229,72,77,${0.95 * dim})`, `rgba(255,170,173,${0.9 * dim})`, 18 * dim, A);
      const [hx, hy] = P(x, y + 0.35, 0);
      const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, scale * 0.7);
      halo.addColorStop(0, `rgba(255,99,105,${0.4 * dim})`);
      halo.addColorStop(1, 'rgba(255,99,105,0)');
      ctx.fillStyle = halo;
      ctx.fillRect(hx - scale, hy - scale, scale * 2, scale * 2);
    }
  }

  function drawFloor() {
    // floor hint
    ctx.save();
    ctx.strokeStyle = 'rgba(150,152,166,0.1)';
    ctx.lineWidth = 1;
    for (let i = -5; i <= 5; i++) {
      const a = P(i, -0.6, -5), b = P(i, -0.6, 5);
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      const c = P(-5, -0.6, i), d = P(5, -0.6, i);
      ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.stroke();
    }
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawFloor();
    const bases = [1.62, 1.32, 0.98, 0.62, 0];
    for (const i of [4, 3, 2, 1, 0]) drawLayer(i, bases[i], REDUCED ? 0.3 : prog);
  }

  let running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.02 }).observe(canvas);

  function frame() {
    t += 0.016;
    const rect = section.getBoundingClientRect();
    const total = rect.height - innerHeight;
    progTarget = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    prog += (progTarget - prog) * 0.1;
    const p = REDUCED ? 0.3 : prog * prog * (3 - 2 * prog);
    ctx.clearRect(0, 0, W, H);
    drawFloor();
    const bases = [1.62, 1.32, 0.98, 0.62, 0];
    for (const i of [4, 3, 2, 1, 0]) drawLayer(i, bases[i], p);
  }

  if (REDUCED) {
    draw();
  } else {
    const loop = () => {
      if (running && !document.hidden) frame();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
