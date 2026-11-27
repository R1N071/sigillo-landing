// 2D fallback for the hero: the seal formed from evidence, worked by the tech.
// A swarm of glowing motes drifts in a flow field. Four stations - hash chain,
// TPM chip, WORM vault, timestamp ring - sweep through it, harvesting motes on
// spiral paths; each capture kicks the station and fires a certified white-hot
// mote toward the seal. Periodically the whole swarm converges into the sigil,
// holds as a stamped seal, then bursts apart.
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
  function lockA2(ph) {
    return ph.id === 2 ? Math.min(1, ph.t * 2.4) : ph.id === 3 ? Math.max(0, 1 - ph.t * 4) : 0;
  }

  let W = 0, H = 0;
  const DPR = Math.min(devicePixelRatio || 1, 2);
  let sx = 0, sy = 0, R = 220;
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  let t = 0, dt = 0.016;

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
      evx: 0, evy: 0, eject: 0, heat: 0,
      seed: Math.random() * 100,
      delay: Math.random() * 0.55,
      white: cu > 0.94,
      bright: cu > 0.8 && cu <= 0.94,
      sz: 2.1 + Math.random() * 1.4,
    });
  }

  // ---------- the four stations ----------
  const defs = [
    { kind: 'chain', a0: 0.3, dy: -0.35, ph: 1.1 },
    { kind: 'chip', a0: Math.PI * 0.55, dy: 0.25, ph: 2.6 },
    { kind: 'vault', a0: Math.PI + 0.2, dy: -0.1, ph: 4.0 },
    { kind: 'clock', a0: -Math.PI * 0.45, dy: 0.45, ph: 5.3 },
  ];
  for (const d of defs) d.state = { act: 0, hits: 0, kickT: 0, kickAge: 9 };
  const artPos = defs.map(() => ({ x: 0, y: 0, depth: 0, sc: 1 }));

  let lastPhase = -1;
  const easeOut = (x) => 1 - Math.pow(1 - x, 3);

  function updateArtifacts(cx, cy) {
    for (let k = 0; k < defs.length; k++) {
      const d = defs[k], st = d.state, ap = artPos[k];
      const a = d.a0 + t * 0.09;
      ap.depth = (Math.sin(a) + 1) / 2;
      ap.sc = 0.72 + ap.depth * 0.42;
      ap.x = cx + Math.cos(a) * R * (W / H > 1.05 ? 1.85 : 1.5);
      ap.y = cy + d.dy * R * 0.7 + Math.sin(a) * R * 0.42 + Math.sin(t * 1.2 + d.ph) * 5;
      st.kickT *= Math.exp(-dt * 3.2);
      st.kickAge += dt;
      st.act += (st.hits * 14 - st.act) * Math.min(1, dt * 4);
      st.hits = 0;
    }
  }

  function drawArtifacts(cx, cy, cert) {
    for (let k = 0; k < defs.length; k++) {
      const d = defs[k], st = d.state, ap = artPos[k];
      const depth = ap.depth, sc = ap.sc * (1 + st.kickT * 0.3);
      const al = 0.45 + depth * 0.55;

      // tether to the seal
      ctx.strokeStyle = `rgba(255,99,105,${Math.min(1, (0.1 + st.act * 0.55 + cert * 0.5) * (0.35 + depth * 0.65))})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ap.x, ap.y);
      ctx.lineTo(cx, cy);
      ctx.stroke();

      // capture shock ring after each hit
      if (st.kickAge < 0.5) {
        const ka = st.kickAge / 0.5;
        ctx.strokeStyle = `rgba(255,99,105,${(1 - ka) * 0.8})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(ap.x, ap.y, 8 + ka * 34, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(ap.x, ap.y);
      ctx.scale(sc, sc);
      ctx.globalAlpha = Math.min(1, al + st.kickT * 0.4);
      const glowA = 0.55 + st.act * 0.5 + st.kickT * 0.5 + cert * 0.45;

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
          const ta = (i / 8) * Math.PI * 2 + t * (0.4 + st.act * 2);
          ctx.beginPath();
          ctx.moveTo(Math.cos(ta) * 13, Math.sin(ta) * 13);
          ctx.lineTo(Math.cos(ta) * 17, Math.sin(ta) * 17);
          ctx.strokeStyle = 'rgba(255,110,116,0.8)';
          ctx.stroke();
        }
      }
      // working glow
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 14);
      g.addColorStop(0, `rgba(255,99,105,${Math.min(1, 0.22 + st.act * 0.6 + cert * 0.5)})`);
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
    updateArtifacts(cx, cy);

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
    const cert = lockA2(ph);

    // backdrop glow
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
    const mpx = mx * W * 0.5, mpy = my * H * 0.5;
    const ATTR = R * 0.55;
    const CAP = R * 0.085;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const p of parts) {
      if (!REDUCED) {
        if (ph.id === 0 && p.eject) {
          // certified mote flying from a station toward the seal
          p.x += p.evx * dt;
          p.y += p.evy * dt;
          const damp = Math.exp(-dt * 1.15);
          p.evx *= damp; p.evy *= damp;
          if (p.evx * p.evx + p.evy * p.evy < 60) p.eject = 0;
        } else if (ph.id === 0) {
          let vx = Math.sin(p.y * 0.02 + t * 0.5 + p.seed) * 26 + Math.sin(p.seed + t * 0.23) * 12;
          let vy = Math.sin(p.x * 0.016 + t * 0.4 + p.seed * 1.7) * 22 - 2;
          // nearest station
          let ak = -1, ad2 = 1e18, adx = 0, ady = 0;
          for (let k = 0; k < artPos.length; k++) {
            const dx = p.x + cx - artPos[k].x, dy = p.y + cy - artPos[k].y;
            const d2 = dx * dx + dy * dy;
            if (d2 < ad2) { ad2 = d2; ak = k; adx = dx; ady = dy; }
          }
          if (ad2 < ATTR * ATTR) {
            const ad = Math.sqrt(ad2);
            if (ad < CAP) {
              // arrival: certified and fired at the seal
              p.heat = 1;
              p.eject = 1;
              const dxs = cx - artPos[ak].x, dys = cy - artPos[ak].y;
              const l = Math.max(20, Math.hypot(dxs, dys));
              const sp = R * (1.3 + Math.random() * 0.9);
              p.evx = dxs / l * sp + (p.x + cx - artPos[ak].x) * 0.5;
              p.evy = dys / l * sp;
              p.x = artPos[ak].x - cx; p.y = artPos[ak].y - cy;
              defs[ak].state.hits++;
              defs[ak].state.kickT = 1;
              defs[ak].state.kickAge = 0;
            } else {
              // spiral capture
              const ux = adx / ad, uy = ady / ad;
              const pull = (ATTR - ad) * 90 * dt;
              vx -= ux * pull * 5;
              vy -= uy * pull * 5;
              vx += -uy * pull * 3;
              vy += ux * pull * 3;
            }
          }
          p.x += vx * dt;
          p.y += vy * dt;
          const dd = Math.hypot(p.x, p.y);
          if (dd > R * 2.3) { p.x *= 0.995; p.y *= 0.995; }
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
        if (p.heat > 0.02) p.heat *= Math.exp(-dt * 0.32);
      } else {
        p.x = p.tx; p.y = p.ty;
      }

      const px = cx + p.x, py = cy + p.y;
      if (px < -20 || px > W + 20 || py < -20 || py > H + 20) continue;
      const boost = (ph.id === 2 ? 1.5 : 1) * (1 + p.heat * 2.4);
      // soft halo pass then core
      ctx.fillStyle = p.heat > 0.25 ? 'rgba(255,170,173,0.2)' : 'rgba(229,72,77,0.09)';
      ctx.beginPath();
      ctx.arc(px, py, p.sz * 2.8, 0, Math.PI * 2);
      ctx.fill();
      let col;
      if (p.heat > 0.35) col = `rgba(255,${Math.round(190 + 60 * p.heat)},${Math.round(192 + 60 * p.heat)},${Math.min(1, boost)})`;
      else if (p.white) col = `rgba(255,235,235,${Math.min(1, boost)})`;
      else if (p.bright) col = `rgba(255,158,162,${Math.min(1, boost)})`;
      else col = `rgba(235,84,90,${Math.min(1, 0.92 * boost)})`;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(px, py, p.sz * (ph.id === 2 ? 1.15 : 1) * (1 + p.heat * 0.7), 0, Math.PI * 2);
      ctx.fill();
    }

    // during the hold, the clean sigil lines etch themselves in
    if (ph.id === 2) {
      const a = Math.min(1, ph.t * 2.4);
      const hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.9);
      hg.addColorStop(0, 'rgba(255,99,105,0.22)');
      hg.addColorStop(1, 'rgba(255,99,105,0)');
      ctx.fillStyle = hg;
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.9, 0, Math.PI * 2); ctx.fill();
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

    // ---------- the stations: solid artifacts over the swarm ----------
    drawArtifacts(cx, cy, cert);
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
