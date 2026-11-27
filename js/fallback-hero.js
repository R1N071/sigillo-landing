// 2D fallback for the hero: the seal formed from evidence.
// A swarm of glowing motes drifts in a flow field, converges into the
// sigil, holds as a stamped seal with a shockwave, then bursts apart.
export function initFallbackHero(host, oldCanvas) {
  const canvas = document.createElement('canvas');
  canvas.id = 'hero-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  if (oldCanvas && oldCanvas.parentNode) oldCanvas.replaceWith(canvas);
  else host.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const PH = { FLOW: 6.5, FORM: 2.8, HOLD: 3.4, BURST: 1.3 };
  const TOTAL = PH.FLOW + PH.FORM + PH.HOLD + PH.BURST;
  function phaseOf(tt) {
    const m = tt % TOTAL;
    if (m < PH.FLOW) return { id: 0, t: m / PH.FLOW };
    if (m < PH.FLOW + PH.FORM) return { id: 1, t: (m - PH.FLOW) / PH.FORM };
    if (m < PH.FLOW + PH.FORM + PH.HOLD) return { id: 2, t: (m - PH.FLOW - PH.FORM) / PH.HOLD };
    return { id: 3, t: (m - PH.FLOW - PH.FORM - PH.HOLD) / PH.BURST };
  }

  let W = 0, H = 0;
  const DPR = Math.min(devicePixelRatio || 1, 2);
  let sx = 0, sy = 0, R = 220;
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  let t = 0;
  let dt = 0.016;

  if (!REDUCED) {
    addEventListener('pointermove', (e) => {
      tmx = (e.clientX / innerWidth - 0.5) * 2;
      tmy = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  function place() {
    const r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const wide = W / H > 1.05;
    R = wide ? Math.min(W * 0.155, H * 0.23) : Math.min(W * 0.34, H * 0.15);
    sx = wide ? W * 0.63 : W * 0.5;
    sy = wide ? H * 0.38 : H * 0.56;
  }
  place();
  new ResizeObserver(place).observe(canvas);

  // ---------- the swarm ----------
  const N = 2400;
  const parts = [];
  for (let i = 0; i < N; i++) {
    const u = Math.random();
    let tx, ty;
    if (u < 0.36) { const a = Math.random() * Math.PI * 2; const rr = R * 0.98 + (Math.random() - 0.5) * R * 0.07; tx = Math.cos(a) * rr; ty = Math.sin(a) * rr; }
    else if (u < 0.58) { const a = Math.random() * Math.PI * 2; const rr = R * 0.59 + (Math.random() - 0.5) * R * 0.06; tx = Math.cos(a) * rr; ty = Math.sin(a) * rr; }
    else if (u < 0.74) { const a = Math.random() * Math.PI * 2; const rr = R * 0.19 * Math.sqrt(Math.random()); tx = Math.cos(a) * rr; ty = Math.sin(a) * rr; }
    else if (u < 0.85) { const a = Math.random() * Math.PI * 2; const rr = R * 1.2 + (Math.random() - 0.5) * R * 0.13; tx = Math.cos(a) * rr; ty = Math.sin(a) * rr; }
    else { const a = Math.random() * Math.PI * 2; const rr = R * 1.1 * Math.sqrt(Math.random()); tx = Math.cos(a) * rr; ty = Math.sin(a) * rr; }

    const a = Math.random() * Math.PI * 2;
    const rr = R * (1.0 + Math.random() * 1.1);
    const cu = Math.random();
    parts.push({
      x: Math.cos(a) * rr, y: Math.sin(a) * rr * 0.8,
      sx0: 0, sy0: 0, tx, ty,
      bvx: 0, bvy: 0,
      seed: Math.random() * 100,
      delay: Math.random() * 0.55,
      white: cu > 0.94,
      bright: cu > 0.8 && cu <= 0.94,
      sz: 2.1 + Math.random() * 1.4,
    });
  }

  let lastPhase = -1;
  const easeOut = (x) => 1 - Math.pow(1 - x, 3);

  // certification factor: 1 while the seal is stamped, fading in/out
  function lockA2(ph) {
    return ph.id === 2 ? Math.min(1, ph.t * 2.4) : ph.id === 3 ? Math.max(0, 1 - ph.t * 4) : 0;
  }

  // four tech artifacts orbiting the seal: hash chain, TPM chip, WORM vault, timestamp ring
  function drawArtifacts(cx, cy, cert) {
    const defs = [
      { kind: 'chain', a0: 0.3, dy: -0.35, ph: 1.1 },
      { kind: 'chip', a0: Math.PI * 0.55, dy: 0.25, ph: 2.6 },
      { kind: 'vault', a0: Math.PI + 0.2, dy: -0.1, ph: 4.0 },
      { kind: 'clock', a0: -Math.PI * 0.45, dy: 0.45, ph: 5.3 },
    ];
    for (const d of defs) {
      const a = d.a0 + t * 0.09;
      const depth = (Math.sin(a) + 1) / 2;
      const sc = 0.72 + depth * 0.42;
      const al = 0.45 + depth * 0.55;
      const ox = cx + Math.cos(a) * R * (W / H > 1.05 ? 1.85 : 1.5);
      const oy = cy + d.dy * R * 0.7 + Math.sin(a) * R * 0.42 + Math.sin(t * 1.2 + d.ph) * 5;

      ctx.strokeStyle = `rgba(255,99,105,${(0.1 + cert * 0.55) * (0.35 + depth * 0.65)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(cx, cy);
      ctx.stroke();

      ctx.save();
      ctx.translate(ox, oy);
      ctx.scale(sc, sc);
      ctx.globalAlpha = al;
      const glowA = 0.55 + cert * 0.45;

      if (d.kind === 'chain') {
        const pts = [[-16, 8], [0, -6], [16, -20]];
        ctx.strokeStyle = 'rgba(255,99,105,0.7)';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        ctx.lineTo(pts[1][0], pts[1][1]);
        ctx.lineTo(pts[2][0], pts[2][1]);
        ctx.stroke();
        for (const [bx, by] of pts) {
          ctx.fillStyle = '#1b1b21';
          ctx.strokeStyle = 'rgba(255,110,116,1)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.rect(bx - 6, by - 6, 12, 12);
          ctx.fill(); ctx.stroke();
        }
      } else if (d.kind === 'chip') {
        ctx.fillStyle = '#1b1b21';
        ctx.strokeStyle = 'rgba(255,110,116,1)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(-19, -8, 38, 16, 2);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#b08d4a';
        for (let i = 0; i < 4; i++) {
          ctx.fillRect(-15 + i * 9, -6, 5, 4);
          ctx.fillRect(-15 + i * 9, 2, 5, 4);
        }
      } else if (d.kind === 'vault') {
        ctx.fillStyle = '#1b1b21';
        ctx.strokeStyle = 'rgba(255,110,116,1)';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.ellipse(0, 2, 15, 8, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(0, -5, 12, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = `rgba(255,99,105,${glowA})`;
        ctx.beginPath(); ctx.ellipse(0, -10, 9, 4, 0, 0, Math.PI * 2); ctx.stroke();
      } else {
        ctx.strokeStyle = 'rgba(255,110,116,1)';
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(0, 0, 13, 0, Math.PI * 2); ctx.stroke();
        for (let i = 0; i < 8; i++) {
          const ta = (i / 8) * Math.PI * 2 + t * 0.4;
          ctx.beginPath();
          ctx.moveTo(Math.cos(ta) * 13, Math.sin(ta) * 13);
          ctx.lineTo(Math.cos(ta) * 17, Math.sin(ta) * 17);
          ctx.strokeStyle = 'rgba(255,110,116,0.8)';
          ctx.stroke();
        }
      }
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 14);
      g.addColorStop(0, `rgba(255,99,105,${0.22 + cert * 0.5})`);
      g.addColorStop(1, 'rgba(255,99,105,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
  }

  function draw() {
    const ph = REDUCED ? { id: 2, t: 0.5 } : phaseOf(t);
    ctx.clearRect(0, 0, W, H);
    const cx = sx + mx * 22 + Math.sin(t * 0.3) * 4;
    const cy = sy + my * 12;

    if (ph.id === 1 && lastPhase !== 1) for (const p of parts) { p.sx0 = p.x; p.sy0 = p.y; }
    if (ph.id === 3 && lastPhase !== 3) {
      for (const p of parts) {
        const l = Math.max(1, Math.hypot(p.tx, p.ty));
        p.bvx = (p.tx / l) * (R * (0.9 + Math.random() * 1.1));
        p.bvy = (p.ty / l) * (R * (0.9 + Math.random() * 1.1));
      }
    }
    lastPhase = ph.id;

    const flare = ph.id === 2 ? Math.max(0, 1 - ph.t * 3.2) : 0;

    // backdrop glow, breathing harder during the stamp
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 2.8);
    bg.addColorStop(0, `rgba(229,72,77,${0.2 + flare * 0.32 + (ph.id === 2 ? 0.13 : 0)})`);
    bg.addColorStop(1, 'rgba(229,72,77,0)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // stamp flash + shock ring
    if (flare > 0.01) {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.6);
      g.addColorStop(0, `rgba(255,190,192,${0.55 * flare})`);
      g.addColorStop(1, 'rgba(255,99,105,0)');
      ctx.fillStyle = g;
      ctx.fillRect(cx - R * 1.7, cy - R * 1.7, R * 3.4, R * 3.4);
      ctx.beginPath();
      ctx.arc(cx, cy, R * (0.7 + flare * 2.6), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,99,105,${0.8 * flare})`;
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // ---------- swarm ----------
    const mpx = mx * W * 0.5 + 0, mpy = my * H * 0.5;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const p of parts) {
      if (!REDUCED) {
        if (ph.id === 0) {
          const vx = Math.sin(p.y * 0.02 + t * 0.5 + p.seed) * 26 + Math.sin(p.seed + t * 0.23) * 12;
          const vy = Math.sin(p.x * 0.016 + t * 0.4 + p.seed * 1.7) * 22 - 2;
          p.x += vx * dt;
          p.y += vy * dt;
          const d = Math.hypot(p.x, p.y);
          if (d > R * 2.3) { p.x *= 0.995; p.y *= 0.995; }
          const rdx = p.x + cx - (mpx + W * 0.5), rdy = p.y + cy - (mpy + H * 0.5);
          const rd2 = rdx * rdx + rdy * rdy;
          if (rd2 < (R * 0.9) ** 2) {
            const f = (1 - Math.sqrt(rd2) / (R * 0.9)) * 3.2;
            const rl = Math.max(6, Math.sqrt(rd2));
            p.x += (rdx / rl) * f;
            p.y += (rdy / rl) * f;
          }
        } else if (ph.id === 1) {
          const tp = Math.min(1, Math.max(0, (ph.t - p.delay * 0.5) / 0.5));
          const e = easeOut(tp);
          p.x = p.sx0 + (p.tx - p.sx0) * e;
          p.y = p.sy0 + (p.ty - p.sy0) * e;
        } else if (ph.id === 2) {
          p.x = p.tx + Math.sin(t * 2.6 + p.seed) * 1.6;
          p.y = p.ty + Math.cos(t * 2.2 + p.seed * 1.3) * 1.6;
        } else {
          p.x += p.bvx * dt;
          p.y += p.bvy * dt;
        }
      } else {
        p.x = p.tx; p.y = p.ty;
      }

      const px = cx + p.x, py = cy + p.y;
      if (px < -20 || px > W + 20 || py < -20 || py > H + 20) continue;
      const boost = ph.id === 2 ? 1.5 : 1;
      let col;
      // soft halo pass then core
      ctx.fillStyle = ph.id === 2 ? 'rgba(229,72,77,0.14)' : 'rgba(229,72,77,0.09)';
      ctx.beginPath();
      ctx.arc(px, py, p.sz * 2.8, 0, Math.PI * 2);
      ctx.fill();
      if (p.white) col = `rgba(255,235,235,${Math.min(1, 1 * boost)})`;
      else if (p.bright) col = `rgba(255,158,162,${Math.min(1, 1 * boost)})`;
      else col = `rgba(235,84,90,${Math.min(1, 0.92 * boost)})`;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(px, py, p.sz * (ph.id === 2 ? 1.15 : 1), 0, Math.PI * 2);
      ctx.fill();
    }

    // during the hold, the clean sigil lines etch themselves in
    if (ph.id === 2) {
      const hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.9);
      hg.addColorStop(0, 'rgba(255,99,105,0.22)');
      hg.addColorStop(1, 'rgba(255,99,105,0)');
      ctx.fillStyle = hg;
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.9, 0, Math.PI * 2); ctx.fill();
      const a = Math.min(1, ph.t * 2.4);
      ctx.strokeStyle = `rgba(255,120,126,${a})`;
      ctx.shadowColor = 'rgba(255,99,105,1)';
      ctx.shadowBlur = 18;
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.98, 0, Math.PI * 2); ctx.stroke();
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.59, 0, Math.PI * 2); ctx.stroke();
      const dg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.2);
      dg.addColorStop(0, `rgba(255,220,222,${a})`);
      dg.addColorStop(1, 'rgba(255,99,105,0)');
      ctx.fillStyle = dg;
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.2, 0, Math.PI * 2); ctx.fill();
      // the lock rim
      ctx.lineWidth = 1.8;
      ctx.setLineDash([R * 0.16, R * 0.1]);
      ctx.lineDashOffset = -t * R * 0.3;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.37, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,99,105,${a * 0.9})`;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // ---------- the tech constellation: solid artifacts over the swarm ----------
    drawArtifacts(cx, cy, lockA2(ph));
  }

  let running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.02 }).observe(canvas);

  let last = performance.now();
  function frame(now) {
    dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;
    t += dt;
    mx += (tmx - mx) * 0.06;
    my += (tmy - my) * 0.06;
    draw();
  }

  if (REDUCED) {
    t = 1.0;
    draw();
  } else {
    const loop = (now) => {
      if (running && !document.hidden) frame(now);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
