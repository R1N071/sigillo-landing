// 2D fallback for the hero: the evidence river.
// A directed stream of motes flows from the bottom-right corner through the
// stations in order - ingest grate, hash-chain blocks, TPM signing chip - and
// pours into the seal. The whole swarm periodically converges into the sigil,
// holds as a stamped seal, then bursts back into the river and the drift.
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

  // ---------- the pipeline path (screen space, relative to the seal centre) ----------
  // segment points in units of R around (sx, sy)
  const PATH = [
    [2.35, 1.55],
    [1.62, 1.05],   // ingest grate
    [1.28, 0.78],   // chain cube 1
    [1.13, 0.60],   // chain cube 2
    [0.98, 0.42],   // chain cube 3
    [0.72, 0.16],   // TPM sign
    [0.30, -0.06],  // pour point inside the seal
  ];
  const SEG = PATH.length - 1;
  function pathPoint(u, out) {
    const su = Math.min(0.999, Math.max(0, u)) * SEG;
    const k = Math.min(SEG - 1, Math.floor(su));
    const f = su - k;
    const a = PATH[k], b = PATH[k + 1];
    out[0] = sx + (a[0] + (b[0] - a[0]) * f) * R;
    out[1] = sy + (a[1] + (b[1] - a[1]) * f) * R;
    return out;
  }
  // station u values
  const uIngest = 1 / SEG;
  const uChain = [2 / SEG, 3 / SEG, 4 / SEG];
  const uSign = 5 / SEG;

  // ---------- the swarm ----------
  const N = 2400;
  const NR = Math.floor(N * 0.52);
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
      river: i < NR ? 1 : 0,
      up: Math.random(),
      lane: Math.random() * Math.PI * 2,
      rspd: 0.055 + Math.random() * 0.06,
      ret: 1,
      x: Math.cos(a) * rr, y: Math.sin(a) * rr * 0.8,
      sx0: 0, sy0: 0, tx, ty,
      bvx: 0, bvy: 0,
      heat: 0,
      seed: Math.random() * 100,
      delay: Math.random() * 0.55,
      white: cu > 0.94,
      bright: cu > 0.8 && cu <= 0.94,
      sz: 2.1 + Math.random() * 1.4,
    });
  }

  // station activity
  const chipState = { act: 0, hits: 0, kickT: 0, kickAge: 9 };
  const cubeAct = [0, 0, 0];
  let heartAct = 0;
  const tmp = [0, 0];

  // ---------- schematic labels ----------
  const labelHost = document.createElement('div');
  labelHost.className = 'station-tags';
  host.appendChild(labelHost);
  const tagDefs = [
    { txt: 'INGEST', ox: 1.62, oy: 1.34 },
    { txt: 'HASH CHAIN', ox: 1.13, oy: 0.92 },
    { txt: 'TPM 2.0 SIGN', ox: 0.72, oy: 0.44 },
    { txt: 'SEALED EVIDENCE', ox: 0, oy: 1.55 },
  ];
  const tags = tagDefs.map((d) => {
    const el = document.createElement('div');
    el.className = 'station-tag';
    el.textContent = d.txt;
    labelHost.appendChild(el);
    return { el, ...d };
  });

  let lastPhase = -1;
  const easeOut = (x) => 1 - Math.pow(1 - x, 3);
  const smoothstep = (x) => x * x * (3 - 2 * x);

  function riverXY(p, out) {
    pathPoint(p.up, out);
    let width = 0.30 * (1 - p.up * 0.45);
    if (Math.abs(p.up - uIngest) < 0.14) width *= 0.45;
    if (p.up > uChain[0] - 0.07 && p.up < uChain[2] + 0.07) width *= 0.38;
    if (Math.abs(p.up - uSign) < 0.08) width *= 0.5;
    const wob = Math.sin(p.up * 26 + p.lane * 5) * 0.6 + Math.sin(p.seed + p.up * 9) * 0.4;
    out[0] += Math.cos(p.lane) * wob * width * R;
    out[1] += Math.sin(p.lane) * wob * width * R * 0.6;
    return out;
  }

  function drawStations(cx, cy, cert) {
    // ingest grate
    const ix = cx + PATH[1][0] * R, iy = cy + PATH[1][1] * R;
    ctx.save();
    ctx.translate(ix, iy);
    ctx.rotate(-0.55);
    ctx.strokeStyle = 'rgba(255,110,116,0.95)';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(255,99,105,0.7)';
    ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.ellipse(0, 0, R * 0.14, R * 0.1, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.lineWidth = 1.4;
    for (let b = -1; b <= 1; b++) {
      ctx.beginPath();
      ctx.moveTo(-R * 0.11, b * R * 0.05);
      ctx.lineTo(R * 0.11, b * R * 0.05);
      ctx.stroke();
    }
    ctx.restore();

    // hash chain blocks strung on the river
    for (let c = 0; c < 3; c++) {
      const bx = cx + PATH[2 + c][0] * R, by = cy + PATH[2 + c][1] * R;
      const s = 1 + cubeAct[c] * 0.18;
      const half = R * 0.055 * s;
      ctx.save();
      ctx.translate(bx, by);
      ctx.fillStyle = '#1b1b21';
      ctx.strokeStyle = `rgba(255,110,116,${0.85 + cubeAct[c] * 0.15})`;
      ctx.lineWidth = 1.6;
      if (cubeAct[c] > 0.1) {
        ctx.shadowColor = 'rgba(255,99,105,0.9)';
        ctx.shadowBlur = 12 * cubeAct[c];
      }
      ctx.beginPath();
      ctx.rect(-half, -half, half * 2, half * 2);
      ctx.fill(); ctx.stroke();
      ctx.restore();
    }

    // TPM chip
    const chx = cx + PATH[5][0] * R, chy = cy + PATH[5][1] * R;
    chipState.kickT *= Math.exp(-dt * 3.2);
    chipState.kickAge += dt;
    chipState.act += (chipState.hits * 30 - chipState.act) * Math.min(1, dt * 4);
    chipState.hits = 0;
    const chs = (1 + chipState.kickT * 0.26 + chipState.act * 0.05) * (R / 220);
    ctx.save();
    ctx.translate(chx, chy);
    ctx.scale(chs, chs);
    if (chipState.kickAge < 0.45) {
      const ka = chipState.kickAge / 0.45;
      ctx.strokeStyle = `rgba(255,99,105,${(1 - ka) * 0.7})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(0, 0, 12 + ka * 40, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.fillStyle = '#1b1b21';
    ctx.strokeStyle = 'rgba(255,110,116,1)';
    ctx.lineWidth = 1.6;
    if (chipState.act > 0.15) { ctx.shadowColor = 'rgba(255,99,105,0.8)'; ctx.shadowBlur = 14 * Math.min(1, chipState.act); }
    ctx.beginPath();
    ctx.roundRect(-22, -9, 44, 18, 2);
    ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#b08d4a';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(-18 + i * 11, -7, 6, 4.5);
      ctx.fillRect(-18 + i * 11, 2.5, 6, 4.5);
    }
    // live signing dot
    const sg = ctx.createRadialGradient(0, 0, 0, 0, 0, 10);
    sg.addColorStop(0, `rgba(255,214,216,${Math.min(1, 0.5 + chipState.act + chipState.kickT * 0.5)})`);
    sg.addColorStop(1, 'rgba(255,99,105,0)');
    ctx.fillStyle = sg;
    ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    cubeAct[0] *= Math.exp(-dt * 2.2);
    cubeAct[1] *= Math.exp(-dt * 2.2);
    cubeAct[2] *= Math.exp(-dt * 2.2);

    // the seal heart, fed by the river
    heartAct *= Math.exp(-dt * 1.6);
    const hr = R * (0.16 + heartAct * 0.14 + cert * 0.1);
    const hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, hr);
    hg.addColorStop(0, `rgba(255,140,145,${Math.min(1, 0.2 + heartAct * 0.55 + cert * 0.5)})`);
    hg.addColorStop(1, 'rgba(255,99,105,0)');
    ctx.fillStyle = hg;
    ctx.beginPath(); ctx.arc(cx, cy, hr, 0, Math.PI * 2); ctx.fill();
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
    if (ph.id === 0 && lastPhase === 3) for (const p of parts) if (p.river) p.ret = 0;
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
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    // the pipeline guide wire the river runs along
    ctx.strokeStyle = 'rgba(229,72,77,0.10)';
    ctx.lineWidth = Math.max(6, R * 0.09);
    ctx.lineCap = 'round';
    ctx.beginPath();
    pathPoint(0, tmp);
    ctx.moveTo(tmp[0], tmp[1]);
    for (let u = 0.05; u <= 1.001; u += 0.05) {
      pathPoint(Math.min(1, u), tmp);
      ctx.lineTo(tmp[0], tmp[1]);
    }
    ctx.stroke();
    ctx.lineCap = 'butt';
    for (const p of parts) {
      if (!REDUCED) {
        if (ph.id === 0 && p.river && p.ret < 1) {
          p.ret = Math.min(1, p.ret + dt / 1.4);
          riverXY(p, tmp);
          const e = smoothstep(p.ret);
          p.x += ((tmp[0] - cx) - p.x) * e;
          p.y += ((tmp[1] - cy) - p.y) * e;
        } else if (ph.id === 0 && p.river) {
          const prevU = p.up;
          p.up = Math.min(1, prevU + p.rspd * dt);
          if (prevU < uSign && p.up >= uSign) {
            p.heat = 1;
            chipState.hits++;
            chipState.kickT = 1;
            chipState.kickAge = 0;
          }
          for (let c = 0; c < 3; c++) {
            if (prevU < uChain[c] && p.up >= uChain[c]) cubeAct[c] = 1;
          }
          if (p.up >= 0.995) {
            p.up = Math.random() * 0.05;
            heartAct = Math.min(1.6, heartAct + 0.05);
          }
          riverXY(p, tmp);
          p.x = tmp[0] - cx;
          p.y = tmp[1] - cy;
        } else if (ph.id === 0) {
          let vx = Math.sin(p.y * 0.02 + t * 0.5 + p.seed) * 26 + Math.sin(p.seed + t * 0.23) * 12;
          let vy = Math.sin(p.x * 0.016 + t * 0.4 + p.seed * 1.7) * 22 - 2;
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
        if (p.river) { p.up = 0.15 + (p.seed / 100) * 0.8; riverXY(p, tmp); p.x = tmp[0] - cx; p.y = tmp[1] - cy; }
        else { p.x = p.tx; p.y = p.ty; }
      }

      const px = cx + p.x, py = cy + p.y;
      if (px < -20 || px > W + 20 || py < -20 || py > H + 20) continue;
      const riv = p.river && ph.id === 0 ? 1.45 : 1;
      const boost = (ph.id === 2 ? 1.5 : 1) * (1 + p.heat * 2.4);
      ctx.fillStyle = p.heat > 0.25 ? 'rgba(255,170,173,0.2)' : (p.river && ph.id === 0 ? 'rgba(229,72,77,0.16)' : 'rgba(229,72,77,0.09)');
      ctx.beginPath();
      ctx.arc(px, py, p.sz * 2.8 * riv, 0, Math.PI * 2);
      ctx.fill();
      let col;
      if (p.heat > 0.35) col = `rgba(255,${Math.round(190 + 60 * p.heat)},${Math.round(192 + 60 * p.heat)},${Math.min(1, boost)})`;
      else if (p.white) col = `rgba(255,235,235,${Math.min(1, boost)})`;
      else if (p.bright) col = `rgba(255,158,162,${Math.min(1, boost)})`;
      else col = `rgba(235,84,90,${Math.min(1, 0.92 * boost)})`;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(px, py, p.sz * (ph.id === 2 ? 1.15 : 1) * riv * (1 + p.heat * 0.7), 0, Math.PI * 2);
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
      // the timestamp ring
      ctx.lineWidth = 1.8;
      ctx.setLineDash([R * 0.16, R * 0.1]);
      ctx.lineDashOffset = -t * R * 0.3;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.37, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,99,105,${0.35 + a * 0.55})`;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;
    } else {
      // timestamp ring stays faintly present outside the hold
      ctx.strokeStyle = 'rgba(255,99,105,0.28)';
      ctx.lineWidth = 1.4;
      ctx.setLineDash([R * 0.16, R * 0.1]);
      ctx.lineDashOffset = -t * R * 0.3;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.37, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.restore();

    // ---------- the stations: solid artifacts over the swarm ----------
    drawStations(cx, cy, cert);

    // schematic labels
    for (const { el, ox, oy } of tags) {
      el.style.transform = `translate(${(cx + ox * R).toFixed(1)}px, ${(cy + oy * R).toFixed(1)}px) translate(-50%, 4px)`;
    }
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
