// 2D canvas isometric fallback for the hero: no WebGL required.
// Robot + sealed recorder + rising hash chain + particle stream + floor pulse.
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
  let scale = 120, offX = 0, offY = 0;
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
    scale = wide ? Math.min(W * 0.125, H * 0.20, 190) : Math.min(W * 0.38, H * 0.185, 165);
    offX = wide ? W * 0.65 : W * 0.56;
    offY = wide ? H * 0.74 : H * 0.78;
  }
  place();
  new ResizeObserver(place).observe(canvas);

  function P(x, y, z) {
    return [
      (x - z) * 0.866 * scale + offX + px * 26 + Math.sin(t * 0.35) * 5,
      ((x + z) * 0.5 - y) * scale + offY + py * 14,
    ];
  }

  // chain uses a vertically compressed projection so the full chain fits
  const CHAIN_SQUASH = 0.56;
  function PC(x, y, z) {
    return [
      (x - z) * 0.866 * scale + offX + px * 26 + Math.sin(t * 0.35) * 5,
      ((x + z) * 0.5 - y * CHAIN_SQUASH) * scale + offY + py * 14,
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

  function box(x, y, z, w, h, d, tone, proj) {
    proj = proj || P;
    const x1 = x - w / 2, x2 = x + w / 2, z1 = z - d / 2, z2 = z + d / 2;
    const y1 = y, y2 = y + h;
    const top = [proj(x1, y2, z1), proj(x2, y2, z1), proj(x2, y2, z2), proj(x1, y2, z2)];
    poly(top, tone.top, tone.stroke, tone.glow, tone.lw);
    // metallic sheen on the top face
    if (tone.sheen) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(top[0][0], top[0][1]);
      for (let i = 1; i < 4; i++) ctx.lineTo(top[i][0], top[i][1]);
      ctx.closePath();
      ctx.clip();
      const [c0x, c0y] = top[0];
      const [c2x, c2y] = top[2];
      const gr = ctx.createLinearGradient(c0x, c0y, c2x, c2y);
      gr.addColorStop(0, 'rgba(255,255,255,0.24)');
      gr.addColorStop(0.5, 'rgba(255,255,255,0.02)');
      gr.addColorStop(1, 'rgba(0,0,0,0.15)');
      ctx.fillStyle = gr;
      ctx.fillRect(Math.min(c0x, c2x) - 400, Math.min(c0y, c2y) - 400, 900, 900);
      ctx.restore();
    }
    poly([proj(x2, y1, z1), proj(x2, y1, z2), proj(x2, y2, z2), proj(x2, y2, z1)], tone.right, tone.stroke, 0);
    poly([proj(x1, y1, z2), proj(x2, y1, z2), proj(x2, y2, z2), proj(x1, y2, z2)], tone.front, tone.stroke, 0);
  }

  function ellipse(x, y, z, r, fill, stroke, glow, proj) {
    proj = proj || P;
    const [sx, sy] = proj(x, y, z);
    ctx.beginPath();
    ctx.ellipse(sx, sy, r * 1.2247 * scale, r * 0.7071 * scale, 0, 0, Math.PI * 2);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) {
      ctx.save();
      if (glow) { ctx.shadowColor = `rgba(${ACC},0.95)`; ctx.shadowBlur = glow; }
      ctx.strokeStyle = stroke; ctx.lineWidth = 1.8; ctx.stroke();
      ctx.restore();
    }
  }

  const chain = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 1.5 - 0.4;
    chain.push({ x: Math.cos(a) * 0.62, z: Math.sin(a) * 0.62, y: 1.95 + i * 0.72, phase: i * 1.1 });
  }
  const particles = [];
  for (let i = 0; i < 90; i++) particles.push({ t: Math.random(), sp: 0.05 + Math.random() * 0.06 });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // backdrop glow
    const bg = ctx.createRadialGradient(offX, offY - scale * 2, 0, offX, offY - scale * 2, scale * 5);
    bg.addColorStop(0, `rgba(${ACC},0.15)`);
    bg.addColorStop(1, `rgba(${ACC},0)`);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // floor light pool
    const pool = ctx.createRadialGradient(offX, offY, 0, offX, offY, scale * 4.6);
    pool.addColorStop(0, 'rgba(190,196,214,0.14)');
    pool.addColorStop(1, 'rgba(190,196,214,0)');
    ctx.save();
    ctx.translate(offX, offY);
    ctx.scale(1, 0.5);
    ctx.fillStyle = pool;
    ctx.beginPath();
    ctx.arc(0, 0, scale * 4.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // floor grid
    ctx.save();
    ctx.strokeStyle = 'rgba(165,170,186,0.24)';
    ctx.lineWidth = 1;
    for (let i = -8; i <= 8; i++) {
      const a = P(i, 0, -8), b = P(i, 0, 8);
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      const c = P(-8, 0, i), d = P(8, 0, i);
      ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.stroke();
    }
    ctx.restore();

    // scan ring pulse
    const rr = 0.7 + ringT * 4.6;
    ellipse(0, 0.01, 0, rr, null, `rgba(${ACC},${0.6 * (1 - ringT)})`, 16);

    // ---------- robot ----------
    const bob = Math.sin(t * 1.8) * 0.012;
    for (const [wx, wz] of [[-0.82, 0.56], [0.82, 0.56], [-0.82, -0.56], [0.82, -0.56]]) {
      box(wx, bob, wz, 0.5, 0.3, 0.2, {
        top: '#2a2d35', right: '#191c22', front: '#13161a', stroke: 'rgba(255,255,255,0.12)',
      });
    }
    // chassis: metallic top with sheen
    box(0, 0.16 + bob, 0, 2.3, 0.66, 1.4, {
      top: '#9aa2b3', right: '#484d58', front: '#333844',
      stroke: `rgba(${ACC},0.95)`, glow: 14, lw: 2, sheen: true,
    });
    // top crimson rails
    ctx.save();
    ctx.shadowColor = `rgba(${ACC},1)`;
    ctx.shadowBlur = 16;
    ctx.strokeStyle = 'rgba(255,110,116,1)';
    ctx.lineWidth = 2.8;
    for (const zz of [-0.7, 0.7]) {
      const a = P(-1.15, 0.84 + bob, zz), b = P(1.15, 0.84 + bob, zz);
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    }
    ctx.restore();

    // front light strip
    ctx.save();
    ctx.shadowColor = 'rgba(255,99,105,1)';
    ctx.shadowBlur = 20;
    ctx.strokeStyle = '#ff6b70';
    ctx.lineWidth = 4;
    const s1 = P(1.16, 0.34 + bob, -0.48), s2 = P(1.16, 0.34 + bob, 0.48);
    ctx.beginPath(); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(s2[0], s2[1]); ctx.stroke();
    ctx.restore();

    // lidar
    const lidarY = 0.82 + bob;
    ellipse(0.78, lidarY, 0, 0.17, '#20232a', 'rgba(255,255,255,0.16)');
    ellipse(0.78, lidarY + 0.14, 0, 0.21, '#2b2f38', `rgba(${ACC},0.8)`, 10);
    const [lx, ly] = P(0.78, lidarY + 0.16, 0);
    const ang = t * 2.2;
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.lineTo(lx + Math.cos(ang) * 0.21 * 1.2247 * scale, ly + Math.sin(ang) * 0.21 * 0.7071 * scale);
    ctx.strokeStyle = 'rgba(255,110,116,0.95)';
    ctx.shadowColor = 'rgba(255,99,105,0.9)';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // recorder + seal
    box(-0.62, 0.82 + bob, 0, 0.74, 0.54, 0.64, {
      top: '#4a505b', right: '#252a32', front: '#1b1f26',
      stroke: 'rgba(255,99,105,1)', glow: 12, lw: 1.8,
    });
    const [hx, hy] = P(-0.62, 1.38 + bob, 0);
    const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, scale * 0.62);
    halo.addColorStop(0, 'rgba(255,99,105,0.55)');
    halo.addColorStop(1, 'rgba(255,99,105,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(hx - scale, hy - scale, scale * 2, scale * 2);
    ellipse(-0.62, 1.38 + bob, 0, 0.18, 'rgba(255,84,90,1)', 'rgba(255,190,192,0.95)', 20);

    // ---------- chain (compressed) ----------
    const sorted = chain
      .map((c, i) => ({ ...c, i, yy: c.y + Math.sin(t * 1.4 + c.phase) * 0.09 }))
      .sort((a, b) => (a.x + a.z) - (b.x + b.z));
    for (const c of sorted) {
      const prev = chain[c.i - 1];
      if (prev) {
        const a = PC(c.x, c.yy, c.z), b = PC(prev.x, prev.y, prev.z);
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]);
        ctx.strokeStyle = 'rgba(255,99,105,0.7)';
        ctx.lineWidth = 1.8;
        ctx.shadowColor = 'rgba(255,99,105,0.7)';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      box(c.x, c.yy, c.z, 0.52, 0.52, 0.52, {
        top: '#5e6570', right: '#282d35', front: '#1c2027',
        stroke: 'rgba(255,99,105,1)', glow: 16, lw: 1.8, sheen: true,
      }, PC);
    }

    // ---------- particle stream ----------
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const a0 = P(-0.35, 1.0, 0), a1 = P(-1.0, 2.2, 0.5), a2 = P(-0.1, 3.6, -0.45);
    const a3 = PC(chain[5].x, chain[5].y + 0.4, chain[5].z);
    for (const p of particles) {
      if (!REDUCED) p.t = (p.t + p.sp * 0.016) % 1;
      const u = p.t, v = 1 - u;
      const sx = v * v * v * a0[0] + 3 * v * v * u * a1[0] + 3 * v * u * u * a2[0] + u * u * u * a3[0];
      const sy = v * v * v * a0[1] + 3 * v * v * u * a1[1] + 3 * v * u * u * a2[1] + u * u * u * a3[1];
      ctx.fillStyle = p.t > 0.7 ? 'rgba(255,130,135,0.95)' : 'rgba(255,205,205,0.7)';
      ctx.beginPath();
      ctx.arc(sx, sy, 1.9, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  let running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.02 }).observe(canvas);

  function frame() {
    t += 0.016;
    ringT = (ringT + 0.0065) % 1;
    px += (tpx - px) * 0.06;
    py += (tpy - py) * 0.06;
    draw();
  }

  if (REDUCED) {
    t = 1.2; ringT = 0.3;
    draw();
  } else {
    const loop = () => {
      if (running && !document.hidden) frame();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
