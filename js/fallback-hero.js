// 2D isometric fallback for the hero: the sealed monolith.
// Floating obsidian cube with a pulsing wax seal, hash spine feeding it,
// particle stream, scan sweep and floor reflection. No WebGL required.
export function initFallbackHero(host, oldCanvas) {
  const canvas = document.createElement('canvas');
  canvas.id = 'hero-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  if (oldCanvas && oldCanvas.parentNode) oldCanvas.replaceWith(canvas);
  else host.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ACC = '229,72,77';

  let W = 0, H = 0;
  const DPR = Math.min(devicePixelRatio || 1, 2);
  let scale = 140, offX = 0, offY = 0;
  let px = 0, py = 0, tpx = 0, tpy = 0;
  let t = 0, ringT = 0, sweepT = 0;

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
    scale = wide ? Math.min(W * 0.10, H * 0.16) : Math.min(W * 0.19, H * 0.09, 78);
    offX = wide ? W * 0.60 : W * 0.55;
    offY = wide ? H * 0.70 : H * 0.82;
  }
  place();
  new ResizeObserver(place).observe(canvas);

  const CX = 0;        // monolith centre x (world)
  const CY = 2.45;     // monolith centre y (world)
  const CE = 0.85;     // half edge

  function P(x, y, z) {
    return [
      (x - z) * 0.866 * scale + offX + px * 26 + Math.sin(t * 0.3) * 5,
      ((x + z) * 0.5 - y) * scale + offY + py * 14,
    ];
  }

  function poly(pts, fill, stroke, glow, lw) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) {
      ctx.save();
      if (glow) { ctx.shadowColor = `rgba(${ACC},0.95)`; ctx.shadowBlur = glow; }
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lw || 1.6;
      ctx.stroke();
      ctx.restore();
    }
  }

  function cubeFaces(cx, cy, cz, half, tone) {
    const x1 = cx - half, x2 = cx + half, z1 = cz - half, z2 = cz + half;
    const y1 = cy - half, y2 = cy + half;
    const top = [P(x1, y2, z1), P(x2, y2, z1), P(x2, y2, z2), P(x1, y2, z2)];
    poly(top, tone.top, tone.stroke, tone.glow, tone.lw);
    if (tone.sheen) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(top[0][0], top[0][1]);
      for (let i = 1; i < 4; i++) ctx.lineTo(top[i][0], top[i][1]);
      ctx.closePath();
      ctx.clip();
      const gr = ctx.createLinearGradient(top[0][0], top[0][1], top[2][0], top[2][1]);
      gr.addColorStop(0, 'rgba(255,255,255,0.16)');
      gr.addColorStop(0.55, 'rgba(255,255,255,0.01)');
      gr.addColorStop(1, 'rgba(0,0,0,0.18)');
      ctx.fillStyle = gr;
      ctx.fillRect(Math.min(top[0][0], top[2][0]) - 600, Math.min(top[0][1], top[2][1]) - 600, 1300, 1300);
      ctx.restore();
    }
    poly([P(x2, y1, z1), P(x2, y1, z2), P(x2, y2, z2), P(x2, y2, z1)], tone.right, tone.stroke, 0);
    poly([P(x1, y1, z2), P(x2, y1, z2), P(x2, y2, z2), P(x1, y2, z2)], tone.front, tone.stroke, 0);
    return { top, right: [P(x2, y1, z1), P(x2, y1, z2), P(x2, y2, z2), P(x2, y2, z1)], front: [P(x1, y1, z2), P(x2, y1, z2), P(x2, y2, z2), P(x1, y2, z2)] };
  }

  // circle lying on the front face (constant z), correctly foreshortened
  function faceDisc(x, y, z, r, fill, stroke, glow, lw) {
    const [sx, sy] = P(x, y, z);
    ctx.beginPath();
    ctx.ellipse(sx, sy, r * scale * 1.22, r * scale * 0.71, Math.PI / 6, 0, Math.PI * 2);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) {
      ctx.save();
      if (glow) { ctx.shadowColor = `rgba(${ACC},0.95)`; ctx.shadowBlur = glow; }
      ctx.strokeStyle = stroke; ctx.lineWidth = lw || 2; ctx.stroke();
      ctx.restore();
    }
  }

  function ellipseFloor(x, y, z, r, stroke, alpha) {
    const [sx, sy] = P(x, y, z);
    ctx.beginPath();
    ctx.ellipse(sx, sy, r * 1.2247 * scale, r * 0.7071 * scale, 0, 0, Math.PI * 2);
    ctx.strokeStyle = stroke;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // ---------- spine ----------
  const spinePts = [];
  for (let i = 0; i < 8; i++) {
    const u = i / 7;
    // quadratic bezier: P0(1.35,-0.15,0.75) P1(1.05,1.15,0.95) P2(-0.62,1.52,0.55)
    const p0x = 1.38, p0y = 0.16, p0z = 0.72;
    const p1x = 1.18, p1y = 1.2, p1z = 0.92;
    const p2x = -0.62, p2y = 1.52, p2z = 0.55;
    const v = 1 - u;
    spinePts.push({
      x: v * v * p0x + 2 * v * u * p1x + u * u * p2x,
      y: v * v * p0y + 2 * v * u * p1y + u * u * p2y,
      z: v * v * p0z + 2 * v * u * p1z + u * u * p2z,
      phase: i * 0.9,
    });
  }

  // ---------- particles ----------
  const flow = [
    spinePts[0], spinePts[3], spinePts[7],
    { x: -0.5, y: CY - 0.35, z: 1.6 },
    { x: 0, y: CY + 0.12, z: 1.6 },
    { x: 0, y: CY + 0.12, z: 0.95 },
  ];
  const particles = [];
  for (let i = 0; i < 90; i++) particles.push({ t: Math.random(), sp: 0.045 + Math.random() * 0.05 });

  // simple multi-segment path sampler in screen space
  function sampleFlow(u) {
    const seg = Math.min(flow.length - 2, Math.floor(u * (flow.length - 1)));
    const su = (u * (flow.length - 1)) - seg;
    const a = P(flow[seg].x, flow[seg].y, flow[seg].z);
    const b = P(flow[seg + 1].x, flow[seg + 1].y, flow[seg + 1].z);
    return [a[0] + (b[0] - a[0]) * su, a[1] + (b[1] - a[1]) * su];
  }

  // dust
  const dust = [];
  for (let i = 0; i < 26; i++) dust.push({ x: Math.random(), y: Math.random(), sp: 0.02 + Math.random() * 0.05 });

  function drawMonolith(alpha, mirrorFlip) {
    const bob = Math.sin(t * 0.9) * 0.07;
    const cy = CY + bob;
    const tone = {
      top: '#7d8494', right: '#3a3f4a', front: '#262b33',
      stroke: `rgba(255,99,105,${alpha})`, glow: 16, lw: 2.2, sheen: true,
    };
    ctx.save();
    if (mirrorFlip) {
      const [fx, fy] = P(0, 0, 0);
      ctx.translate(0, 2 * fy);
      ctx.scale(1, -1);
      ctx.globalAlpha = 0.16;
    }
    if (alpha < 1) ctx.globalAlpha = alpha;

    const faces = cubeFaces(CX, cy, 0, CE, tone);

    // inner frame etch
    const half = CE * 0.83;
    const x1 = -half, x2 = half, z1 = -half, z2 = half, y1 = cy - half, y2 = cy + half;
    poly([P(x1, y2, z1), P(x2, y2, z1), P(x2, y2, z2), P(x1, y2, z2)], null, `rgba(${ACC},0.35)`, 0, 1.2);
    poly([P(x1, y1, z2), P(x2, y1, z2), P(x2, y2, z2), P(x1, y2, z2)], null, `rgba(${ACC},0.35)`, 0, 1.2);

    // corner studs
    for (const sx of [-CE, CE]) for (const sy of [cy - CE, cy + CE]) for (const sz of [-CE, CE]) {
      const [stx, sty] = P(sx, sy, sz);
      ctx.beginPath();
      ctx.arc(stx, sty, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#3c414d';
      ctx.fill();
    }

    // wax seal on the front face
    const [gcx, gcy] = P(0, cy + 0.12, CE + 0.02);
    if (!mirrorFlip) {
      const halo = ctx.createRadialGradient(gcx, gcy, 0, gcx, gcy, scale * 1.0);
      halo.addColorStop(0, `rgba(255,99,105,${0.7 * alpha})`);
      halo.addColorStop(1, 'rgba(255,99,105,0)');
      ctx.fillStyle = halo;
      ctx.fillRect(gcx - scale, gcy - scale, scale * 2, scale * 2);
    }
    faceDisc(0, cy + 0.12, CE + 0.02, 0.34, `rgba(229,72,77,${0.96 * alpha})`, `rgba(255,180,182,${0.9 * alpha})`, 26 * alpha, 3);
    faceDisc(0, cy + 0.12, CE + 0.06, 0.13, `rgba(255,214,216,${0.95 * alpha})`, null, 14, 0);
    faceDisc(0, cy + 0.12, CE + 0.05, 0.42, null, `rgba(${ACC},${0.6 * alpha})`, 10, 1.4);

    ctx.restore();

    // scan sweep across the faces
    if (!mirrorFlip && !REDUCED) {
      const sy = cy + (-CE - 0.08) + sweepT * (2 * CE + 0.16);
      const bandY = P(0, sy, 0)[1];
      const fade = sweepT < 0.08 ? sweepT / 0.08 : sweepT > 0.9 ? (1 - sweepT) / 0.1 : 1;
      ctx.save();
      ctx.beginPath();
      const f = faces;
      ctx.moveTo(f.front[0][0], f.front[0][1]);
      f.front.slice(1).forEach((p) => ctx.lineTo(p[0], p[1]));
      ctx.moveTo(f.right[0][0], f.right[0][1]);
      f.right.slice(1).forEach((p) => ctx.lineTo(p[0], p[1]));
      ctx.closePath();
      ctx.clip();
      const g = ctx.createLinearGradient(0, bandY - 8, 0, bandY + 8);
      g.addColorStop(0, 'rgba(255,99,105,0)');
      g.addColorStop(0.5, `rgba(255,99,105,${0.45 * fade})`);
      g.addColorStop(1, 'rgba(255,99,105,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, bandY - 8, W, 16);
      ctx.restore();
    }
    return faces;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // backdrop glow
    const bg = ctx.createRadialGradient(offX, offY - scale * 2.4, 0, offX, offY - scale * 2.4, scale * 5.2);
    bg.addColorStop(0, `rgba(${ACC},0.16)`);
    bg.addColorStop(1, `rgba(${ACC},0)`);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // floor pool + grid
    const pool = ctx.createRadialGradient(offX, offY, 0, offX, offY, scale * 4.6);
    pool.addColorStop(0, 'rgba(190,196,214,0.13)');
    pool.addColorStop(1, 'rgba(190,196,214,0)');
    ctx.save();
    ctx.translate(offX, offY);
    ctx.scale(1, 0.5);
    ctx.fillStyle = pool;
    ctx.beginPath();
    ctx.arc(0, 0, scale * 4.6, 0, Math.PI * 2);
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

    // floor ring pulse
    const rr = 0.7 + ringT * 4.6;
    ellipseFloor(0, 0.01, 0, rr, `rgba(${ACC},0.9)`, 0.6 * (1 - ringT));

    // reflection first (under everything above the floor)
    drawMonolith(1, true);

    // dust
    for (const d of dust) {
      if (!REDUCED) d.y = (d.y + d.sp * 0.016) % 1;
      ctx.beginPath();
      ctx.arc(d.x * W, d.y * H * 0.7 + 40, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(180,186,200,0.3)';
      ctx.fill();
    }

    // ---------- spine ----------
    const bobBlock = (p) => p.y + Math.sin(t * 1.5 + p.phase) * 0.05;
    for (let i = 0; i < spinePts.length; i++) {
      const p = spinePts[i];
      if (i > 0) {
        const q = spinePts[i - 1];
        const a = P(p.x, bobBlock(p), p.z), b = P(q.x, bobBlock(q), q.z);
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]);
        ctx.strokeStyle = 'rgba(255,99,105,0.65)';
        ctx.lineWidth = 1.6;
        ctx.shadowColor = 'rgba(255,99,105,0.6)';
        ctx.shadowBlur = 7;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }
    const sorted = [...spinePts].sort((a, b) => (a.x + a.z) - (b.x + b.z));
    for (const p of sorted) {
      cubeFaces(p.x, bobBlock(p), p.z, 0.15, {
        top: '#5e6570', right: '#282d35', front: '#1c2027',
        stroke: 'rgba(255,110,116,1)', glow: 15, lw: 1.8, sheen: false,
      });
    }

    // ---------- monolith ----------
    drawMonolith(1, false);

    // ---------- particles ----------
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const p of particles) {
      if (!REDUCED) p.t = (p.t + p.sp * 0.016) % 1;
      const [sx, sy] = sampleFlow(p.t);
      ctx.fillStyle = p.t > 0.72 ? 'rgba(255,130,135,0.95)' : 'rgba(255,205,205,0.7)';
      ctx.beginPath();
      ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  let running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.02 }).observe(canvas);

  function frame() {
    t += 0.016;
    ringT = (ringT + 0.0065) % 1;
    sweepT = (sweepT + 0.0023) % 1;
    px += (tpx - px) * 0.06;
    py += (tpy - py) * 0.06;
    draw();
  }

  if (REDUCED) {
    t = 1.2; ringT = 0.3; sweepT = 0.5;
    draw();
  } else {
    const loop = () => {
      if (running && !document.hidden) frame();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
