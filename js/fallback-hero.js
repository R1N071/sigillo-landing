// 2D fallback for the hero: the Wax Seal, drawn with canvas 2D.
// A giant tilted disc of crimson wax, sigil embossed at its heart,
// ember breathing inside, evidence motes streaming in, drips below,
// and a stamp pulse that prints a glowing imprint on the floor.
export function initFallbackHero(host, oldCanvas) {
  const canvas = document.createElement('canvas');
  canvas.id = 'hero-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  if (oldCanvas && oldCanvas.parentNode) oldCanvas.replaceWith(canvas);
  else host.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0, H = 0;
  const DPR = Math.min(devicePixelRatio || 1, 2);
  let cx = 0, cy = 0, R = 200;          // seal disc
  let offX = 0, offY = 0, scale = 90;    // iso floor
  let px = 0, py = 0, tpx = 0, tpy = 0;
  let t = 0, ringT = 0;

  if (!REDUCED) {
    addEventListener('pointermove', (e) => {
      tpx = (e.clientX / innerWidth - 0.5) * 2;
      tpy = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  function place() {
    const r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const wide = W / H > 1.05;
    R = wide ? Math.min(W * 0.24, H * 0.27) : Math.min(W * 0.36, H * 0.17);
    cx = wide ? W * 0.61 : W * 0.5;
    cy = wide ? H * 0.36 : H * 0.52;
    scale = wide ? Math.min(W * 0.10, H * 0.15) : Math.min(W * 0.12, H * 0.085);
    offX = cx;
    offY = wide ? H * 0.72 : H * 0.80;
  }
  place();
  new ResizeObserver(place).observe(canvas);

  const TILT = 0.86; // disc ellipse squash

  function P(x, y, z) {
    return [
      (x - z) * 0.866 * scale + offX + px * 26,
      ((x + z) * 0.5 - y) * scale + offY + py * 14,
    ];
  }

  function ellipseAt(x, y, rx, ry, rot) {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rot || 0, 0, Math.PI * 2);
  }

  function ellipseFloor(x, y, z, r, stroke, alpha) {
    const [sx, sy] = P(x, y, z);
    ellipseAt(sx, sy, r * 1.2247 * scale, r * 0.7071 * scale, 0);
    ctx.strokeStyle = stroke;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // wax blobs around the rim (irregular edge)
  const rimBlobs = [];
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2 + 0.35;
    rimBlobs.push({
      a,
      r: 0.97 + ((i * 37) % 10) / 90,
      s: 0.05 + ((i * 53) % 10) / 55,
    });
  }

  // drips below
  const drips = [
    { a: 1.25, len: 0.34, w: 0.055 },
    { a: 2.35, len: 0.46, w: 0.045 },
    { a: 4.05, len: 0.28, w: 0.06 },
  ];

  // particles: stream into the seal + rim orbit
  const flow = [];
  for (let i = 0; i < 90; i++) flow.push({ t: Math.random(), sp: 0.04 + Math.random() * 0.05 });
  const orbit = [];
  for (let i = 0; i < 22; i++) orbit.push({ ph: (i / 22) * Math.PI * 2, sink: Math.random() });

  const dust = [];
  for (let i = 0; i < 26; i++) dust.push({ x: Math.random(), y: Math.random(), sp: 0.02 + Math.random() * 0.05 });

  function stampFlare() {
    const st = REDUCED ? 0.5 : (t * 0.14) % 1;
    return st < 0.14 ? 1 - st / 0.14 : 0;
  }

  function drawDisc(fx, fy, alpha, flip) {
    ctx.save();
    if (flip) {
      const [, fy0] = P(0, 0, 0);
      ctx.translate(0, 2 * fy0);
      ctx.scale(1, -1);
      ctx.globalAlpha = 0.15;
    } else if (alpha < 1) {
      ctx.globalAlpha = alpha;
    }
    const bob = Math.sin(t * 0.8) * R * 0.02;
    const dx = fx, dy = fy + bob;

    // halo behind the wax
    const halo = ctx.createRadialGradient(dx, dy, R * 0.2, dx, dy, R * 1.55);
    const breathe = 0.5 + Math.sin(t * 1.6) * 0.15;
    halo.addColorStop(0, `rgba(255,99,105,${(0.5 * breathe + flareCache * 0.35) * (flip ? 0.4 : 1)})`);
    halo.addColorStop(1, 'rgba(255,99,105,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(dx - R * 1.6, dy - R * 1.6, R * 3.2, R * 3.2);

    // rim blobs (wax edge irregularity)
    for (const b of rimBlobs) {
      const bx = dx + Math.cos(b.a) * R * b.r;
      const by = dy + Math.sin(b.a) * R * b.r * TILT;
      ellipseAt(bx, by, R * b.s, R * b.s * TILT, 0);
      ctx.fillStyle = '#5a151a';
      ctx.fill();
    }

    // wax body
    const body = ctx.createRadialGradient(dx - R * 0.25, dy - R * 0.3, R * 0.1, dx, dy, R * 1.05);
    body.addColorStop(0, `rgba(198,66,72,1)`);
    body.addColorStop(0.55, `rgba(134,34,40,1)`);
    body.addColorStop(1, `rgba(70,17,21,1)`);
    ellipseAt(dx, dy, R, R * TILT, 0);
    ctx.fillStyle = body;
    ctx.fill();

    // ember breathing from within
    const ember = ctx.createRadialGradient(dx, dy, 0, dx, dy, R * 0.9);
    const e = breathe * 0.42 + flareCache * 0.4;
    ember.addColorStop(0, `rgba(255,110,116,${e})`);
    ember.addColorStop(0.6, `rgba(200,50,57,${e * 0.55})`);
    ember.addColorStop(1, 'rgba(190,45,52,0)');
    ellipseAt(dx, dy, R * 0.98, R * TILT * 0.98, 0);
    ctx.fillStyle = ember;
    ctx.fill();

    // gloss crescent
    ctx.save();
    ellipseAt(dx, dy, R, R * TILT, 0);
    ctx.clip();
    const gloss = ctx.createLinearGradient(dx - R, dy - R * TILT, dx + R * 0.2, dy + R * 0.2);
    gloss.addColorStop(0, 'rgba(255,240,238,0.2)');
    gloss.addColorStop(0.4, 'rgba(255,240,238,0.03)');
    gloss.addColorStop(1, 'rgba(0,0,0,0.12)');
    ctx.fillStyle = gloss;
    ctx.fillRect(dx - R, dy - R, R * 2, R * 2);
    ctx.restore();

    // raised rim
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    ellipseAt(dx, dy, R * 0.87, R * 0.87 * TILT, 0);
    ctx.strokeStyle = `rgba(140,33,38,0.9)`;
    ctx.lineWidth = R * 0.045;
    ctx.stroke();
    ctx.restore();

    // ---------- sigil emboss ----------
    const sig = (rr, lw) => {
      // dark relief offset then bright stroke
      ellipseAt(dx + lw * 0.5, dy + lw * 0.9, rr, rr * TILT, 0);
      ctx.strokeStyle = 'rgba(26,7,9,0.85)';
      ctx.lineWidth = lw * 1.6;
      ctx.stroke();
      ellipseAt(dx, dy, rr, rr * TILT, 0);
      ctx.strokeStyle = `rgba(255,110,116,${0.75 + flareCache * 0.25})`;
      ctx.lineWidth = lw;
      ctx.stroke();
    };
    ctx.save();
    ctx.shadowColor = 'rgba(255,99,105,0.9)';
    ctx.shadowBlur = 16 + flareCache * 30;
    sig(R * 0.62, R * 0.03);
    sig(R * 0.40, R * 0.02);
    // heart of the sigil
    ellipseAt(dx + 1, dy + 2, R * 0.09, R * 0.09 * TILT, 0);
    ctx.fillStyle = 'rgba(26,7,9,0.85)';
    ctx.fill();
    ellipseAt(dx, dy, R * 0.085, R * 0.085 * TILT, 0);
    const dot = ctx.createRadialGradient(dx, dy, 0, dx, dy, R * 0.1);
    dot.addColorStop(0, `rgba(255,214,216,${0.95 + flareCache * 0.05})`);
    dot.addColorStop(1, 'rgba(255,99,105,0.9)');
    ctx.fillStyle = dot;
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  let flareCache = 0;

  function draw() {
    flareCache = stampFlare();
    ctx.clearRect(0, 0, W, H);
    const bob = Math.sin(t * 0.8) * R * 0.02;
    const sx = cx + px * 24 + Math.sin(t * 0.3) * 4;
    const sy = cy + bob + py * 12;

    // backdrop glow
    const bg = ctx.createRadialGradient(sx, sy, 0, sx, sy, R * 2.6);
    bg.addColorStop(0, 'rgba(229,72,77,0.14)');
    bg.addColorStop(1, 'rgba(229,72,77,0)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // floor pool + grid
    const pool = ctx.createRadialGradient(offX, offY, 0, offX, offY, scale * 4.8);
    pool.addColorStop(0, 'rgba(190,196,214,0.13)');
    pool.addColorStop(1, 'rgba(190,196,214,0)');
    ctx.save();
    ctx.translate(offX, offY);
    ctx.scale(1, 0.5);
    ctx.fillStyle = pool;
    ctx.beginPath();
    ctx.arc(0, 0, scale * 4.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = 'rgba(165,170,186,0.22)';
    ctx.lineWidth = 1;
    for (let i = -8; i <= 8; i++) {
      const a = P(i, 0, -8), b = P(i, 0, 8);
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      const c = P(-8, 0, i), d = P(8, 0, i);
      ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.stroke();
    }

    // stamp imprint on the floor
    if (flareCache > 0.02) {
      ellipseFloor(0, 0.01, 0, 0.9, `rgba(255,99,105,${flareCache * 0.9})`, 1);
      ellipseFloor(0, 0.01, 0, 0.55, `rgba(255,99,105,${flareCache * 0.6})`, 1);
      const [ix, iy] = P(0, 0.01, 0);
      ctx.beginPath();
      ctx.ellipse(ix, iy, scale * 0.16, scale * 0.11, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,130,135,${flareCache * 0.9})`;
      ctx.fill();
    }

    // ring pulse
    ringT = (ringT + 0.0065) % 1;
    const rr = 0.7 + ringT * 4.8;
    ellipseFloor(0, 0.01, 0, rr, 'rgba(229,72,77,0.9)', 0.55 * (1 - ringT) + flareCache * 0.35);

    // reflection under the floor line
    drawDisc(sx, sy, 1, true);

    // dust
    for (const d of dust) {
      if (!REDUCED) d.y = (d.y + d.sp * 0.016) % 1;
      ctx.beginPath();
      ctx.arc(d.x * W, d.y * H * 0.7 + 40, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(180,186,200,0.3)';
      ctx.fill();
    }

    // drips
    for (let i = 0; i < drips.length; i++) {
      const dp = drips[i];
      const bx = sx + Math.cos(dp.a) * R * 0.82;
      const by = sy + Math.sin(dp.a) * R * 0.82 * TILT + R * 0.1;
      const len = dp.len * R * (1 + Math.sin(t * 1.1 + i * 2) * 0.06);
      ctx.beginPath();
      ctx.moveTo(bx - dp.w * R, by);
      ctx.quadraticCurveTo(bx - dp.w * R * 0.6, by + len * 0.6, bx, by + len);
      ctx.quadraticCurveTo(bx + dp.w * R * 0.6, by + len * 0.6, bx + dp.w * R, by);
      ctx.closePath();
      ctx.fillStyle = '#471014';
      ctx.fill();
    }

    // ---------- the seal ----------
    drawDisc(sx, sy, 1, false);

    // ---------- orbit motes ----------
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const o of orbit) {
      if (!REDUCED) o.sink = (o.sink + 0.0021) % 1;
      const a = t * 0.55 + o.ph;
      const rF = (1.22 - o.sink * 0.75);
      const mx = sx + Math.cos(a) * R * rF;
      const my = sy + Math.sin(a) * R * rF * TILT - o.sink * R * 0.25;
      ctx.fillStyle = `rgba(255,170,173,${0.75 * (1 - o.sink * 0.6)})`;
      ctx.beginPath();
      ctx.arc(mx, my, 1.7, 0, Math.PI * 2);
      ctx.fill();
    }

    // ---------- evidence stream ----------
    const f0 = [sx + R * 1.55, sy + R * 0.9];
    const f1 = [sx + R * 0.9, sy + R * 0.15];
    const f2 = [sx + R * 0.3, sy - R * 0.05];
    const f3 = [sx, sy];
    for (const p of flow) {
      if (!REDUCED) p.t = (p.t + p.sp * 0.016) % 1;
      const u = p.t, v = 1 - u;
      const mx = v * v * v * f0[0] + 3 * v * v * u * f1[0] + 3 * v * u * u * f2[0] + u * u * u * f3[0];
      const my = v * v * v * f0[1] + 3 * v * v * u * f1[1] + 3 * v * u * u * f2[1] + u * u * u * f3[1];
      ctx.fillStyle = u > 0.72 ? 'rgba(255,130,135,0.95)' : 'rgba(255,205,205,0.7)';
      ctx.beginPath();
      ctx.arc(mx, my, 1.9, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  let running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.02 }).observe(canvas);

  function frame() {
    t += 0.016;
    px += (tpx - px) * 0.06;
    py += (tpy - py) * 0.06;
    draw();
  }

  if (REDUCED) {
    t = 1.2;
    draw();
  } else {
    const loop = () => {
      if (running && !document.hidden) frame();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
