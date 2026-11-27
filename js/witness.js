// The witness: an industrial arm works a pick-and-place loop on the engraved
// seal. Every grip, move and place is captured into a glass evidence crystal
// holding a frozen snapshot of that exact pose; the crystals chain into a
// helix rising around the machine. Periodically one crystal is edited - its
// snapshot changes, it cracks red, the chain below it breaks - until the
// sealed copy descends and restores it.
// A small software 3D renderer on Canvas2D (perspective, flat lighting,
// painter's sort), so it renders identically without WebGL.
export function initWitness(canvas) {
  const ctx = canvas.getContext('2d');
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DPR = Math.min(devicePixelRatio || 1, 2);
  const { sin, cos, atan2, hypot, acos, min, max, PI, random } = Math;
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const ease = (x) => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };
  const lerp = (a, b, k) => a + (b - a) * k;
  const BG = [10, 10, 11];
  const ACC = [229, 72, 77];
  const RED = [255, 46, 52];
  const MONO = (px) => `${px}px "IBM Plex Mono", ui-monospace, monospace`;
  const rgba = (c, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${clamp(a, 0, 1).toFixed(3)})`;
  const mixc = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
  const hex = (n) => { let s = ''; for (let i = 0; i < n; i++) s += '0123456789abcdef'[(random() * 16) | 0]; return s; };

  // ---------- viewport ----------
  let W = 0, H = 0, wide = true, F = 800, CX = 0, CY = 0;
  let ready = false;
  function place() {
    const r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    wide = W / H > 1.05;
    if (wide) { F = min(H * 0.98, W * 0.7); CX = W * 0.71; CY = H * 0.5; }
    else { F = min(W * 0.95, H * 0.46); CX = W * 0.5; CY = H * 0.8; }
    if (ready) draw();
  }
  place();
  new ResizeObserver(place).observe(canvas);

  let px = 0, py = 0, tpx = 0, tpy = 0;
  if (!REDUCED) {
    addEventListener('pointermove', (e) => {
      tpx = (e.clientX / innerWidth - 0.5) * 2;
      tpy = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  // ---------- camera ----------
  const cam = { ex: 0, ey: 0, ez: 0, fx: 0, fy: 0, fz: 0, rx: 0, rz: 0, ux: 0, uy: 0, uz: 0 };
  function setCamera(yaw, lift) {
    const D = 9.5, ty = 2.5;
    cam.ex = sin(yaw) * D; cam.ez = cos(yaw) * D; cam.ey = 3.6 + lift;
    let fx = -cam.ex, fy = ty - cam.ey, fz = -cam.ez;
    const fl = hypot(fx, fy, fz); fx /= fl; fy /= fl; fz /= fl;
    let rx = -fz, rz = fx;
    const rl = hypot(rx, rz); rx /= rl; rz /= rl;
    Object.assign(cam, { fx, fy, fz, rx, rz, ux: -rz * fy, uy: rz * fx - rx * fz, uz: rx * fy });
  }
  const P = [0, 0, 0];
  function proj(x, y, z, out = P) {
    const dx = x - cam.ex, dy = y - cam.ey, dz = z - cam.ez;
    const cz = dx * cam.fx + dy * cam.fy + dz * cam.fz;
    const k = F / max(cz, 0.05);
    out[0] = CX + (dx * cam.rx + dz * cam.rz) * k;
    out[1] = CY - (dx * cam.ux + dy * cam.uy + dz * cam.uz) * k;
    out[2] = cz;
    return out;
  }

  // ---------- affine transforms (3x3 row-major + translation) ----------
  const mk = (m, t) => ({ m, t });
  const tr = (x, y, z) => mk([1, 0, 0, 0, 1, 0, 0, 0, 1], [x, y, z]);
  const scl = (k) => mk([k, 0, 0, 0, k, 0, 0, 0, k], [0, 0, 0]);
  const rotY = (a) => { const c = cos(a), s = sin(a); return mk([c, 0, s, 0, 1, 0, -s, 0, c], [0, 0, 0]); };
  const rotZ = (a) => { const c = cos(a), s = sin(a); return mk([c, -s, 0, s, c, 0, 0, 0, 1], [0, 0, 0]); };
  const rotX = (a) => { const c = cos(a), s = sin(a); return mk([1, 0, 0, 0, c, -s, 0, s, c], [0, 0, 0]); };
  function mul2(A, B) {
    const a = A.m, b = B.m, m = new Array(9), t = B.t;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) m[r * 3 + c] = a[r * 3] * b[c] + a[r * 3 + 1] * b[3 + c] + a[r * 3 + 2] * b[6 + c];
    return mk(m, [
      a[0] * t[0] + a[1] * t[1] + a[2] * t[2] + A.t[0],
      a[3] * t[0] + a[4] * t[1] + a[5] * t[2] + A.t[1],
      a[6] * t[0] + a[7] * t[1] + a[8] * t[2] + A.t[2],
    ]);
  }
  const mul = (...Ts) => Ts.reduce(mul2);
  const ap = (T, x, y, z) => [
    T.m[0] * x + T.m[1] * y + T.m[2] * z + T.t[0],
    T.m[3] * x + T.m[4] * y + T.m[5] * z + T.t[1],
    T.m[6] * x + T.m[7] * y + T.m[8] * z + T.t[2],
  ];
  function apN(T, x, y, z) {
    const n = [T.m[0] * x + T.m[1] * y + T.m[2] * z, T.m[3] * x + T.m[4] * y + T.m[5] * z, T.m[6] * x + T.m[7] * y + T.m[8] * z];
    const l = hypot(n[0], n[1], n[2]);
    return [n[0] / l, n[1] / l, n[2] / l];
  }

  // ---------- shading ----------
  const nrm = (x, y, z) => { const l = hypot(x, y, z); return [x / l, y / l, z / l]; };
  const LK = nrm(-0.5, 0.85, 0.6);   // cool key, top-left-front
  const LR = nrm(0.8, 0.2, -0.55);   // crimson rim from back-right
  const MAT = {
    metal: { c: [182, 188, 202], amb: 0.36, dif: 0.8, rim: 0.75 },
    dark: { c: [72, 76, 88], amb: 0.5, dif: 0.6, rim: 0.65 },
    accent: { c: [236, 72, 78], amb: 0.62, dif: 0.48, rim: 0.2 },
    crate: { c: [216, 212, 202], amb: 0.4, dif: 0.66, rim: 0.45 },
    dais: { c: [30, 31, 36], amb: 0.85, dif: 0.45, rim: 1.0 },
  };
  function shade(mat, n, z, glow) {
    const d = max(0, n[0] * LK[0] + n[1] * LK[1] + n[2] * LK[2]);
    const r = max(0, n[0] * LR[0] + n[1] * LR[1] + n[2] * LR[2]);
    const k = mat.amb + mat.dif * d;
    const rim = r * mat.rim * 0.6;
    let R = mat.c[0] * k + 229 * rim + glow * 255;
    let G = mat.c[1] * k + 60 * rim + glow * 110;
    let B = mat.c[2] * k + 66 * rim + glow * 115;
    const f = clamp((z - 8.5) / 10, 0, 0.6);
    R = min(255, lerp(R, BG[0], f)); G = min(255, lerp(G, BG[1], f)); B = min(255, lerp(B, BG[2], f));
    return `rgb(${R | 0},${G | 0},${B | 0})`;
  }

  // ---------- geometry -> draw items ----------
  let items = [];
  let ground = [];
  const BOXF = [
    [[1, 3, 7, 5], [1, 0, 0]], [[0, 4, 6, 2], [-1, 0, 0]],
    [[2, 6, 7, 3], [0, 1, 0]], [[0, 1, 5, 4], [0, -1, 0]],
    [[4, 5, 7, 6], [0, 0, 1]], [[0, 2, 3, 1], [0, 0, -1]],
  ];
  function face(pts, n, mat, glow = 0, layer = items) {
    let cx = 0, cy = 0, cz = 0;
    for (const p of pts) { cx += p[0]; cy += p[1]; cz += p[2]; }
    const L = pts.length; cx /= L; cy /= L; cz /= L;
    if (n[0] * (cx - cam.ex) + n[1] * (cy - cam.ey) + n[2] * (cz - cam.ez) >= 0) return;
    const s = new Array(L * 2);
    let zs = 0;
    for (let i = 0; i < L; i++) {
      proj(pts[i][0], pts[i][1], pts[i][2]);
      if (P[2] < 0.3) return;
      s[i * 2] = P[0]; s[i * 2 + 1] = P[1]; zs += P[2];
    }
    const z = zs / L;
    layer.push({ k: 0, z, s, fill: shade(mat, n, z, glow) });
  }
  function box(T, w, h, d, mat, glow = 0, layer) {
    const c = [];
    for (let i = 0; i < 8; i++) c.push(ap(T, (i & 1 ? 0.5 : -0.5) * w, (i & 2 ? 0.5 : -0.5) * h, (i & 4 ? 0.5 : -0.5) * d));
    for (const [idx, n] of BOXF) face(idx.map((i) => c[i]), apN(T, n[0], n[1], n[2]), mat, glow, layer);
  }
  function cyl(T, r, h, n, mat, glow = 0, layer) {
    const top = [], bot = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * PI * 2;
      top.push(ap(T, cos(a) * r, h / 2, sin(a) * r));
      bot.push(ap(T, cos(a) * r, -h / 2, sin(a) * r));
    }
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n, a = ((i + 0.5) / n) * PI * 2;
      face([bot[i], bot[j], top[j], top[i]], apN(T, cos(a), 0, sin(a)), mat, glow, layer);
    }
    face(top, apN(T, 0, 1, 0), mat, glow, layer);
    face(bot, apN(T, 0, -1, 0), mat, glow, layer);
  }

  // ---------- the arm: geometry + inverse kinematics ----------
  const SY = 0.95, L1 = 1.55, L2 = 1.35, LG = 0.49;
  function solve(tip) {
    const th = atan2(-tip[2], tip[0]);
    const wx = hypot(tip[0], tip[2]), wy = tip[1] + LG;
    const dy = wy - SY;
    const D = clamp(hypot(wx, dy), 0.4, L1 + L2 - 0.001);
    const a1 = atan2(dy, wx) + acos(clamp((L1 * L1 + D * D - L2 * L2) / (2 * L1 * D), -1, 1));
    const E = [L1 * cos(a1), SY + L1 * sin(a1)];
    const a2 = atan2(wy - E[1], wx - E[0]);
    return { th, a1, a2, E, Wr: [wx, wy] };
  }
  const plane = (th, u, y) => [u * cos(th), y, -u * sin(th)];

  function buildArm(ps, g, glow) {
    const Y = rotY(ps.th);
    const { a1, a2, E, Wr } = ps;
    cyl(tr(0, 0.31, 0), 0.64, 0.26, 22, MAT.dark);
    cyl(mul(Y, tr(0, 0.6, 0)), 0.47, 0.32, 22, MAT.metal);
    cyl(mul(Y, tr(0, 0.465, 0)), 0.5, 0.05, 22, MAT.accent, glow * 0.5);
    box(mul(Y, tr(0, 0.94, 0)), 0.56, 0.46, 0.48, MAT.metal);
    cyl(mul(Y, tr(0, SY, 0), rotX(PI / 2)), 0.21, 0.74, 16, MAT.accent, glow * 0.6);
    box(mul(Y, tr((L1 / 2) * cos(a1), SY + (L1 / 2) * sin(a1), 0), rotZ(a1)), L1 + 0.08, 0.3, 0.36, MAT.metal);
    cyl(mul(Y, tr(E[0], E[1], 0), rotX(PI / 2)), 0.18, 0.52, 16, MAT.accent, glow * 0.6);
    box(mul(Y, tr((E[0] + Wr[0]) / 2, (E[1] + Wr[1]) / 2, 0), rotZ(a2)), L2, 0.24, 0.28, MAT.metal);
    cyl(mul(Y, tr(Wr[0], Wr[1], 0), rotX(PI / 2)), 0.13, 0.38, 14, MAT.dark);
    box(mul(Y, tr(Wr[0], Wr[1] - 0.17, 0)), 0.6, 0.12, 0.24, MAT.metal);
    for (const s of [-1, 1]) box(mul(Y, tr(Wr[0] + (s * g) / 2, Wr[1] - 0.36, 0)), 0.05, 0.26, 0.18, MAT.dark, glow * 0.25);
  }

  // ---------- the task: pick and place between two pads ----------
  const PADS = [{ th: -0.5, r: 1.62 }, { th: -2.4, r: 1.5 }];
  const C = 4.4, HOV = 1.3, LOW = 0.24, GO = 0.52, GC = 0.35;
  const EVENTS = [[1.0, 'GRIP'], [2.4, 'MOVE'], [3.75, 'PLACE']];
  function task(time) {
    const k = Math.floor(time / C), u = time - k * C;
    const Pp = PADS[k % 2], Q = PADS[(k + 1) % 2];
    let th = Pp.th, r = Pp.r, y = HOV, g = GO, carry = false, at = k % 2;
    if (u < 0.8) y = lerp(HOV, LOW, ease(u / 0.8));
    else if (u < 1.1) { y = LOW; g = lerp(GO, GC, ease((u - 0.8) / 0.25)); carry = u > 1.0; }
    else if (u < 1.8) { y = lerp(LOW, HOV, ease((u - 1.1) / 0.7)); g = GC; carry = true; }
    else if (u < 3.0) {
      const s = ease((u - 1.8) / 1.2);
      th = lerp(Pp.th, Q.th, s); r = lerp(Pp.r, Q.r, s); y = HOV + 0.45 * sin(PI * s); g = GC; carry = true;
    } else if (u < 3.6) { th = Q.th; r = Q.r; y = lerp(HOV, LOW, ease((u - 3.0) / 0.6)); g = GC; carry = true; }
    else if (u < 3.9) {
      th = Q.th; r = Q.r; y = LOW; g = lerp(GC, GO, ease((u - 3.65) / 0.25));
      carry = u < 3.7; if (!carry) at = (k + 1) % 2;
    } else { th = Q.th; r = Q.r; y = lerp(LOW, HOV, ease((u - 3.9) / 0.5)); at = (k + 1) % 2; }
    return { th, tip: [r * cos(th), y, -r * sin(th)], g, carry, at };
  }

  // ---------- evidence crystals on the helix ----------
  const HR = 2.3, HY0 = 1.05, HV = 0.2, HW = 0.42, PHI0 = -0.35, LIFE = 22, FLY = 1.1, CS = 0.5, GS = 0.12;
  const helix = (age) => { const a = PHI0 + age * HW; return [HR * cos(a), HY0 + age * HV, -HR * sin(a)]; };
  const crystals = [];
  let seq = 4096, sealed = 4096;
  const rings = [], flashes = [], motes = [], dust = [];

  function crystalPos(c) {
    const age = tau - c.born;
    if (age >= FLY) return helix(age);
    const k = ease(age / FLY), e = helix(FLY);
    const m = [(c.start[0] + e[0]) / 2, max(c.start[1], e[1]) + 0.9, (c.start[2] + e[2]) / 2];
    const a = (1 - k) * (1 - k), b = 2 * (1 - k) * k, d = k * k;
    return [a * c.start[0] + b * m[0] + d * e[0], a * c.start[1] + b * m[1] + d * e[1], a * c.start[2] + b * m[2] + d * e[2]];
  }

  function joints(ps, tip) {
    return [[0, 0.18, 0], [0, 0.76, 0], plane(ps.th, 0, SY), plane(ps.th, ps.E[0], ps.E[1]), plane(ps.th, ps.Wr[0], ps.Wr[1]), tip.slice()];
  }

  function capture(kind) {
    const rel = (p) => [p[0], p[1] - 1.35, p[2]];
    const c = {
      id: ++seq, born: tau, kind, hash: `${hex(4)}…${hex(4)}`,
      snap: joints(pose, cur.tip).map(rel), crate: rel(crate.pos),
      start: [cur.tip[0], cur.tip[1] + 0.35, cur.tip[2]], spin: random() * PI * 2,
      state: null, wp: null,
    };
    crystals.push(c);
    sealed++;
    rings.push({ t: 0 });
    flashes.push({ t: 0, p: cur.tip.slice() });
    for (let i = 0; i < 56; i++) spawnMote({}, true, c);
  }

  // telemetry motes: spark off the arm's joints and get pulled into the newest crystal
  function spawnMote(m, burst, target) {
    const js = joints(pose, cur.tip);
    const src = burst ? cur.tip : js[2 + ((random() * 4) | 0)];
    const a = random() * PI * 2, v = burst ? 1.4 + random() * 1.8 : 0.2 + random() * 0.5;
    Object.assign(m, {
      x: src[0], y: src[1], z: src[2],
      vx: cos(a) * v, vy: (burst ? random() * 1.6 : 0.3 + random() * 0.6), vz: sin(a) * v,
      t: 0, life: burst ? 1.4 + random() * 0.8 : 1.1 + random() * 1.6,
      tgt: target || crystals[crystals.length - 1] || null, burst, heat: burst ? 1 : 0.35,
    });
    if (burst) motes.push(m);
    return m;
  }
  for (let i = 0; i < 160; i++) {
    dust.push({ x: (random() - 0.5) * 13, y: random() * 6.5, z: (random() - 0.5) * 10, ph: random() * 6.28, s: 0.4 + random() * 0.8 });
  }

  // ---------- tamper story ----------
  const tam = { phase: 'idle', t: 0, next: 17.5, victim: null };
  function editSnap(s) {
    const e = s.map((p) => p.slice());
    e[3][1] += 0.55; e[3][0] += 0.35;
    e[4][1] += 0.8; e[4][2] += 0.45;
    e[5][1] += 0.9; e[5][2] += 0.6;
    return e;
  }
  function stepTamper(dt) {
    if (tam.phase === 'idle') {
      if (tau < tam.next) return;
      let best = null, bz = Infinity;
      for (const c of crystals) {
        const age = tau - c.born;
        if (age < 5 || age > 13) continue;
        const p = helix(age);
        const z = proj(p[0], p[1], p[2])[2];
        if (z < bz) { bz = z; best = c; }
      }
      if (!best) { tam.next = tau + 1; return; }
      tam.victim = best; best.state = 'edited'; best.edited = editSnap(best.snap);
      tam.phase = 'glitch'; tam.t = 0;
      return;
    }
    tam.t += dt;
    if (!crystals.includes(tam.victim)) { tam.phase = 'idle'; tam.victim = null; tam.next = tau + 6; return; }
    if (tam.phase === 'glitch' && tam.t > 0.7) { tam.phase = 'broken'; tam.t = 0; }
    else if (tam.phase === 'broken' && tam.t > 2.8) { tam.phase = 'restore'; tam.t = 0; }
    else if (tam.phase === 'restore') {
      if (tam.t > 0.8 && tam.victim.state === 'edited') { tam.victim.state = 'restored'; flashes.push({ t: 0, p: tam.victim.wp, white: true }); }
      if (tam.t > 2.0) { tam.victim.state = null; tam.victim = null; tam.phase = 'idle'; tam.next = tau + 10.5; }
    }
  }
  // link between crystal ids a<b: 0 = intact, 1 = broken (red), 2 = just healed (white)
  function linkState(b) {
    const v = tam.victim;
    if (!v || b.id <= v.id) return 0;
    const newest = crystals[crystals.length - 1].id;
    if (tam.phase === 'glitch') return 0;
    if (tam.phase === 'broken') return b.id <= v.id + (newest - v.id + 1) * ease(tam.t / 1.0) ? 1 : 0;
    if (tam.phase === 'restore') {
      const heal = v.id + (newest - v.id + 1) * ease((tam.t - 0.8) / 0.8);
      return b.id <= heal ? 2 : 1;
    }
    return 0;
  }

  // ---------- simulation ----------
  let tau = 0;
  let cur = task(0), pose = solve(cur.tip);
  const crate = { pos: [0, 0, 0], yaw: 0 };
  let nextEv = 0;
  const evTime = (n) => Math.floor(n / 3) * C + EVENTS[n % 3][0];
  const telemetry = [];
  for (let i = 0; i < 300; i++) telemetry.push(spawnMote({}, false));

  function updateCrate() {
    if (cur.carry) { crate.pos = [cur.tip[0], cur.tip[1] + 0.09, cur.tip[2]]; crate.yaw = cur.th; }
    else { const pd = PADS[cur.at]; crate.pos = [pd.r * cos(pd.th), 0.33, -pd.r * sin(pd.th)]; crate.yaw = pd.th; }
  }

  function moteStep(m, dt) {
    m.t += dt;
    const tg = m.tgt && m.tgt.wp;
    if (tg) {
      const k = (m.burst ? 2.2 : 0.9) + m.t * 3.2;
      const dx = tg[0] - m.x, dy = tg[1] - m.y, dz = tg[2] - m.z;
      m.vx += (dx * k - dz * 0.9) * dt; m.vy += dy * k * dt; m.vz += (dz * k + dx * 0.9) * dt;
      if (dx * dx + dy * dy + dz * dz < 0.03) m.t = m.life;
    } else m.vy += 0.4 * dt;
    const damp = Math.exp(-2.4 * dt);
    m.vx *= damp; m.vy *= damp; m.vz *= damp;
    m.x += m.vx * dt; m.y += m.vy * dt; m.z += m.vz * dt;
  }

  function step(dt) {
    tau += dt;
    cur = task(tau);
    pose = solve(cur.tip);
    updateCrate();
    while (tau >= evTime(nextEv)) { capture(EVENTS[nextEv % 3][1]); nextEv++; }
    for (let i = crystals.length - 1; i >= 0; i--) if (tau - crystals[i].born > LIFE) crystals.splice(i, 1);
    for (const c of crystals) c.wp = crystalPos(c);
    stepTamper(dt);
    for (const m of telemetry) { moteStep(m, dt); if (m.t >= m.life) spawnMote(m, false); }
    for (let i = motes.length - 1; i >= 0; i--) { moteStep(motes[i], dt); if (motes[i].t >= motes[i].life) motes.splice(i, 1); }
    for (let i = rings.length - 1; i >= 0; i--) if ((rings[i].t += dt) > 0.8) rings.splice(i, 1);
    for (let i = flashes.length - 1; i >= 0; i--) if ((flashes[i].t += dt) > 0.6) flashes.splice(i, 1);
  }

  // ---------- drawing helpers ----------
  function polyPath(s) {
    ctx.beginPath();
    ctx.moveTo(s[0], s[1]);
    for (let i = 2; i < s.length; i += 2) ctx.lineTo(s[i], s[i + 1]);
    ctx.closePath();
  }
  function drawFaces(list) {
    list.sort((a, b) => b.z - a.z);
    ctx.lineWidth = 0.8;
    ctx.lineJoin = 'round';
    for (const it of list) drawItem(it);
  }
  function drawItem(it) {
    if (it.k === 0) {
      polyPath(it.s);
      ctx.lineWidth = 0.8;
      ctx.fillStyle = it.fill; ctx.strokeStyle = it.fill;
      ctx.fill(); ctx.stroke();
    } else if (it.k === 1) drawCrystal(it.c);
    else if (it.k === 2) drawLink(it);
    else if (it.k === 3) drawTether(it);
    else if (it.k === 4) {
      const fog = 1 - clamp((it.z - 8.5) / 8, 0, 0.7);
      ctx.strokeStyle = rgba(ACC, 0.38 * it.a * fog);
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(it.s[0], it.s[1]); ctx.lineTo(it.s[2], it.s[3]); ctx.stroke();
    }
  }
  function circle3D(cx, cy, cz, r, n, rot = 0) {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const a = rot + (i / n) * PI * 2;
      proj(cx + cos(a) * r, cy, cz + sin(a) * r);
      pts.push(P[0], P[1]);
    }
    return pts;
  }
  function strokePts(pts, close) {
    ctx.beginPath();
    ctx.moveTo(pts[0], pts[1]);
    for (let i = 2; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i + 1]);
    if (close) ctx.closePath();
    ctx.stroke();
  }

  // floor: perspective grid fading out from the dais + crimson pool of light
  function drawFloor() {
    const o = proj(0, 0, 0, [0, 0, 0]);
    const ex = proj(3.2, 0, 0, [0, 0, 0]), ef = proj(0, 0, 3.2, [0, 0, 0]), eb = proj(0, 0, -3.2, [0, 0, 0]);
    const rx = max(20, hypot(ex[0] - o[0], ex[1] - o[1]));
    const ry = max(8, Math.abs(ef[1] - eb[1]) / 2);
    ctx.save();
    ctx.translate(o[0], o[1]);
    ctx.scale(1, ry / rx);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * 1.6);
    g.addColorStop(0, 'rgba(229,72,77,0.22)');
    g.addColorStop(0.45, 'rgba(229,72,77,0.07)');
    g.addColorStop(1, 'rgba(229,72,77,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(0, 0, rx * 1.6, 0, PI * 2); ctx.fill();
    ctx.restore();

    const buckets = [[], [], [], [], []];
    const N = 10, A = [0, 0, 0], B = [0, 0, 0];
    const seg = (x0, z0, x1, z1) => {
      const d = hypot((x0 + x1) / 2, (z0 + z1) / 2);
      const b = Math.floor((1 - d / 10) * 5);
      if (b < 0) return;
      proj(x0, 0, z0, A); proj(x1, 0, z1, B);
      if (A[2] < 0.4 || B[2] < 0.4) return;
      buckets[min(4, b)].push(A[0], A[1], B[0], B[1]);
    };
    for (let i = -N; i <= N; i++) {
      for (let j = -N; j < N; j++) { seg(i, j, i, j + 1); seg(j, i, j + 1, i); }
    }
    ctx.lineWidth = 1;
    for (let b = 0; b < 5; b++) {
      const s = buckets[b];
      if (!s.length) continue;
      ctx.strokeStyle = `rgba(150,152,168,${(0.03 + b * 0.045).toFixed(3)})`;
      ctx.beginPath();
      for (let i = 0; i < s.length; i += 4) { ctx.moveTo(s[i], s[i + 1]); ctx.lineTo(s[i + 2], s[i + 3]); }
      ctx.stroke();
    }
  }

  // the dais is the seal: concentric sigil rings, a rotating timestamp ring, two pads
  function drawDais() {
    ground = [];
    cyl(tr(0, 0.09, 0), 1.95, 0.18, 48, MAT.dais, 0, ground);
    drawFaces(ground);
    const y = 0.181;
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = 'rgba(255,99,105,0.75)';
    strokePts(circle3D(0, y, 0, 1.93, 64), true);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(229,72,77,0.45)';
    strokePts(circle3D(0, y, 0, 1.78, 64), true);
    ctx.strokeStyle = 'rgba(229,72,77,0.28)';
    strokePts(circle3D(0, y, 0, 1.05, 48), true);
    // timestamp ticks
    ctx.strokeStyle = 'rgba(255,120,125,0.55)';
    ctx.beginPath();
    const A = [0, 0, 0], B = [0, 0, 0];
    for (let i = 0; i < 72; i++) {
      const a = tau * 0.12 + (i / 72) * PI * 2, long = i % 6 === 0;
      proj(cos(a) * 1.3, y, sin(a) * 1.3, A);
      proj(cos(a) * (long ? 1.55 : 1.42), y, sin(a) * (long ? 1.55 : 1.42), B);
      ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]);
    }
    ctx.stroke();
    // pads
    for (const pd of PADS) {
      const T = mul(tr(pd.r * cos(pd.th), y, -pd.r * sin(pd.th)), rotY(pd.th));
      const pts = [];
      for (const [u, w] of [[-0.24, -0.24], [0.24, -0.24], [0.24, 0.24], [-0.24, 0.24]]) {
        const q = ap(T, u, 0, w); proj(q[0], q[1], q[2]); pts.push(P[0], P[1]);
      }
      ctx.fillStyle = 'rgba(229,72,77,0.08)';
      ctx.strokeStyle = 'rgba(255,99,105,0.6)';
      polyPath(pts); ctx.fill(); ctx.stroke();
    }
  }

  function crystalColor(c, age) {
    if (c.state === 'edited') return tam.phase === 'glitch' && random() < 0.5 ? [255, 255, 255] : RED;
    if (c.state === 'restored') return mixc([255, 255, 255], ACC, ease((tam.t - 0.8) / 1.2));
    return mixc([255, 240, 240], ACC, ease(age / 1.6));
  }

  function drawCrystal(c) {
    const age = tau - c.born;
    const fade = min(1, (LIFE - age) / 4) * min(1, age / 0.25);
    if (fade <= 0) return;
    const s = ease(age / 0.5);
    let p = c.wp;
    if (c.state === 'edited' && (tam.phase === 'glitch' || tam.t < 0.4)) {
      p = [p[0] + (random() - 0.5) * 0.12, p[1] + (random() - 0.5) * 0.06, p[2] + (random() - 0.5) * 0.12];
    }
    const R = mul(rotY(c.spin + age * 0.5), rotX(0.32));
    const T = mul(tr(p[0], p[1], p[2]), R, scl(CS * s));
    const col = crystalColor(c, age);
    const fog = 1 - clamp((c.z - 8.5) / 10, 0, 0.55);
    const al = fade * fog;

    const ctr = proj(p[0], p[1], p[2], [0, 0, 0]);
    const rad = (CS * s * F) / ctr[2];
    // halo
    ctx.globalCompositeOperation = 'lighter';
    const hg = ctx.createRadialGradient(ctr[0], ctr[1], 0, ctr[0], ctr[1], rad * 1.5);
    hg.addColorStop(0, rgba(col, 0.26 * al));
    hg.addColorStop(1, rgba(col, 0));
    ctx.fillStyle = hg;
    ctx.beginPath(); ctx.arc(ctr[0], ctr[1], rad * 1.5, 0, PI * 2); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    const cs = [];
    for (let i = 0; i < 8; i++) {
      const q = ap(T, i & 1 ? 0.5 : -0.5, i & 2 ? 0.5 : -0.5, i & 4 ? 0.5 : -0.5);
      proj(q[0], q[1], q[2]); cs.push([P[0], P[1]]);
    }
    const faces = BOXF.map(([idx, n]) => {
      const nn = apN(R, n[0], n[1], n[2]);
      const fc = ap(T, n[0] * 0.5, n[1] * 0.5, n[2] * 0.5);
      const front = nn[0] * (fc[0] - cam.ex) + nn[1] * (fc[1] - cam.ey) + nn[2] * (fc[2] - cam.ez) < 0;
      return { pts: idx.flatMap((i) => cs[i]), front, up: nn[1] };
    });
    ctx.lineWidth = 1;
    for (const f of faces) if (!f.front) {
      polyPath(f.pts);
      ctx.fillStyle = rgba(col, 0.05 * al); ctx.fill();
      ctx.strokeStyle = rgba(col, 0.32 * al); ctx.stroke();
    }

    // the frozen pose inside
    const snap = c.state === 'edited' ? c.edited : c.snap;
    const G = mul(tr(p[0], p[1], p[2]), R, scl(GS * s));
    const gp = snap.map((q) => { const w = ap(G, q[0], q[1], q[2]); proj(w[0], w[1], w[2]); return [P[0], P[1]]; });
    const ghost = c.state === 'edited' ? [255, 90, 90] : [255, 226, 226];
    ctx.strokeStyle = rgba(ghost, 0.92 * al);
    ctx.lineWidth = max(1, rad * 0.09);
    ctx.beginPath();
    ctx.moveTo(gp[0][0], gp[0][1]);
    for (let i = 1; i < gp.length; i++) ctx.lineTo(gp[i][0], gp[i][1]);
    ctx.stroke();
    ctx.fillStyle = rgba(ghost, al);
    const jr = max(1, rad * 0.07);
    for (let i = 2; i < gp.length; i++) { ctx.beginPath(); ctx.arc(gp[i][0], gp[i][1], jr, 0, PI * 2); ctx.fill(); }
    if (c.state !== 'edited') {
      const w = ap(G, c.crate[0], c.crate[1], c.crate[2]);
      proj(w[0], w[1], w[2]);
      const cr = max(1.5, rad * 0.14);
      ctx.fillStyle = rgba([235, 230, 220], 0.8 * al);
      ctx.fillRect(P[0] - cr / 2, P[1] - cr / 2, cr, cr);
    }

    for (const f of faces) if (f.front) {
      polyPath(f.pts);
      ctx.fillStyle = rgba(col, (f.up > 0.3 ? 0.16 : 0.08) * al); ctx.fill();
      ctx.strokeStyle = rgba(col, 0.95 * al); ctx.lineWidth = 1.3; ctx.stroke();
    }
    // crack across the edited record
    if (c.state === 'edited' && tam.phase !== 'glitch') {
      const f = faces.find((q) => q.front) || faces[0];
      const a = f.pts;
      ctx.strokeStyle = rgba([255, 200, 200], al);
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      const steps = 6;
      for (let i = 0; i <= steps; i++) {
        const k = i / steps;
        const x = lerp(lerp(a[0], a[2], 0.15), lerp(a[4], a[6], 0.85), k) + (i % 2 ? 1 : -1) * rad * 0.12;
        const y = lerp(lerp(a[1], a[3], 0.15), lerp(a[5], a[7], 0.85), k);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    c.sx = ctr[0]; c.sy = ctr[1]; c.rad = rad; c.al = al;
  }

  function drawLink(it) {
    const { a, b } = it;
    const st = linkState(b);
    const al = min(a.al ?? 1, b.al ?? 1);
    const A = proj(a.wp[0], a.wp[1], a.wp[2], [0, 0, 0]);
    const B = proj(b.wp[0], b.wp[1], b.wp[2], [0, 0, 0]);
    let col = ACC, la = 0.5;
    if (st === 1) { col = RED; la = 0.55 + 0.45 * (random() < 0.3 ? 0 : 1); }
    if (st === 2) { col = [255, 235, 235]; la = 0.9; }
    ctx.strokeStyle = rgba(col, la * al);
    ctx.lineWidth = st === 1 ? 1.6 : 1.2;
    if (st === 1) ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke();
    ctx.setLineDash([]);
    if (st !== 1) {
      const k = (tau * 0.9 + b.id * 0.37) % 1;
      const x = lerp(B[0], A[0], k), y = lerp(B[1], A[1], k);
      ctx.fillStyle = rgba([255, 210, 210], 0.9 * al);
      ctx.beginPath(); ctx.arc(x, y, 1.8, 0, PI * 2); ctx.fill();
    }
  }

  function drawTether(it) {
    const { c } = it;
    const k = (tau - c.born) / FLY;
    const A = proj(cur.tip[0], cur.tip[1], cur.tip[2], [0, 0, 0]);
    const B = proj(c.wp[0], c.wp[1], c.wp[2], [0, 0, 0]);
    const g = ctx.createLinearGradient(A[0], A[1], B[0], B[1]);
    g.addColorStop(0, rgba([255, 120, 125], 0.7 * (1 - k)));
    g.addColorStop(1, rgba([255, 230, 230], 0.9 * (1 - k)));
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke();
  }

  function drawMotes(list, base) {
    ctx.globalCompositeOperation = 'lighter';
    const Q = [0, 0, 0];
    for (const m of list) {
      proj(m.x, m.y, m.z, Q);
      if (Q[2] < 0.5) continue;
      const lifeA = min(1, m.t / 0.2) * min(1, (m.life - m.t) / 0.4);
      const sz = clamp((0.05 * F) / Q[2], 0.8, 3.4);
      ctx.globalAlpha = clamp(lifeA * base, 0, 1);
      ctx.fillStyle = m.burst ? '#fff1f1' : m.heat > 0.6 ? '#ffb3b6' : '#ff5a60';
      ctx.fillRect(Q[0] - sz / 2, Q[1] - sz / 2, sz, sz);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  function drawDust() {
    ctx.globalCompositeOperation = 'lighter';
    const Q = [0, 0, 0];
    for (const d of dust) {
      const y = (d.y + tau * 0.06 * d.s) % 6.5;
      proj(d.x + sin(tau * 0.2 + d.ph) * 0.3, y, d.z, Q);
      if (Q[2] < 0.5) continue;
      const tw = 0.35 + 0.65 * Math.abs(sin(tau * 0.8 + d.ph));
      const sz = clamp((0.035 * F) / Q[2], 0.6, 2.4);
      ctx.fillStyle = `rgba(255,120,125,${(0.4 * tw).toFixed(3)})`;
      ctx.fillRect(Q[0], Q[1], sz, sz);
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  function drawFx() {
    // scan ring sweeping up the arm at each capture
    for (const r of rings) {
      const k = r.t / 0.8;
      ctx.strokeStyle = rgba([255, 99, 105], 0.85 * (1 - k));
      ctx.lineWidth = 1.6;
      strokePts(circle3D(0, lerp(0.25, 2.9, ease(k)), 0, 1.0 + k * 0.5, 48), true);
    }
    ctx.globalCompositeOperation = 'lighter';
    for (const f of flashes) {
      if (!f.p) continue;
      const k = f.t / 0.6;
      const Q = proj(f.p[0], f.p[1], f.p[2], [0, 0, 0]);
      const rr = ((f.white ? 1.4 : 0.8) * F) / Q[2] * (0.4 + k);
      const g = ctx.createRadialGradient(Q[0], Q[1], 0, Q[0], Q[1], rr);
      g.addColorStop(0, f.white ? rgba([255, 255, 255], 0.8 * (1 - k)) : rgba([255, 200, 200], 0.7 * (1 - k)));
      g.addColorStop(1, 'rgba(255,99,105,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(Q[0], Q[1], rr, 0, PI * 2); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    // the sealed copy descends onto the edited record
    if (tam.phase === 'restore' && tam.victim && tam.t < 1.0) {
      const v = tam.victim, k = ease(tam.t / 0.8);
      const p = [v.wp[0], v.wp[1] + (1 - k) * 2.2, v.wp[2]];
      const T = mul(tr(p[0], p[1], p[2]), rotY(v.spin + (tau - v.born) * 0.5), rotX(0.32), scl(CS * 1.08));
      const cs = [];
      for (let i = 0; i < 8; i++) {
        const q = ap(T, i & 1 ? 0.5 : -0.5, i & 2 ? 0.5 : -0.5, i & 4 ? 0.5 : -0.5);
        proj(q[0], q[1], q[2]); cs.push([P[0], P[1]]);
      }
      ctx.strokeStyle = rgba([255, 255, 255], 0.95 * (1 - max(0, tam.t - 0.8) / 0.2));
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (const [i, j] of [[0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], [7, 6], [6, 4], [0, 4], [1, 5], [2, 6], [3, 7]]) {
        ctx.moveTo(cs[i][0], cs[i][1]); ctx.lineTo(cs[j][0], cs[j][1]);
      }
      ctx.stroke();
      const top = proj(p[0], p[1] + 2.4, p[2], [0, 0, 0]);
      const g = ctx.createLinearGradient(top[0], top[1], cs[0][0], cs[0][1]);
      g.addColorStop(0, 'rgba(255,255,255,0)');
      g.addColorStop(1, 'rgba(255,255,255,0.35)');
      ctx.strokeStyle = g;
      ctx.beginPath(); ctx.moveTo(top[0], top[1]); ctx.lineTo(cs[2][0], cs[2][1]); ctx.stroke();
    }
  }

  function setSpacing(v) { if ('letterSpacing' in ctx) ctx.letterSpacing = v; }
  function tag(c, l1, l2, col, a) {
    if (!wide || !c.sx || a <= 0) return;
    const fs = wide ? 11 : 10;
    ctx.font = MONO(fs);
    setSpacing('0.08em');
    const tw = max(ctx.measureText(l1).width, l2 ? ctx.measureText(l2).width : 0);
    const right = c.sx + c.rad + 52 + tw < W - 12;
    const dx = right ? 1 : -1;
    const x0 = c.sx + dx * c.rad * 0.8, y0 = c.sy - c.rad * 0.5;
    const x1 = x0 + dx * 26, y1 = y0 - 22;
    ctx.globalAlpha = a;
    ctx.strokeStyle = rgba(col, 0.8);
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.lineTo(x1 + dx * 10, y1); ctx.stroke();
    ctx.textAlign = right ? 'left' : 'right';
    ctx.textBaseline = 'middle';
    const bx = right ? x1 + dx * 8 : x1 + dx * 8 - tw - 12;
    ctx.fillStyle = 'rgba(10,10,11,0.78)';
    ctx.fillRect(bx, y1 - fs * 0.9, tw + 12, (l2 ? fs * 2 + 4 : fs) + fs * 0.8);
    ctx.fillStyle = rgba(col, 1);
    ctx.fillText(l1, x1 + dx * 14, y1);
    if (l2) { ctx.fillStyle = 'rgba(166,164,158,0.9)'; ctx.fillText(l2, x1 + dx * 14, y1 + fs + 4); }
    setSpacing('0px');
    ctx.globalAlpha = 1;
  }

  function drawHud() {
    const newest = crystals[crystals.length - 1];
    if (newest && !(tam.victim === newest)) {
      const age = tau - newest.born;
      const a = clamp((age - FLY + 0.1) / 0.25, 0, 1) * clamp((FLY + 1.5 - age) / 0.3, 0, 1);
      tag(newest, `#0${newest.id}  ${newest.kind}  SEALED`, wide ? `sha256 ${newest.hash}` : null, [255, 140, 144], a);
    }
    const v = tam.victim;
    if (v) {
      if (tam.phase !== 'restore') tag(v, `#0${v.id}  RECORD EDITED`, 'hash mismatch: chain broken', RED, tam.phase === 'glitch' ? (random() < 0.5 ? 1 : 0.3) : 1);
      else tag(v, `#0${v.id}  RESTORED`, 'from the sealed copy', [255, 255, 255], clamp((tam.t - 0.7) / 0.2, 0, 1));
    }
    // status line under the dais
    const Q = proj(0, 0, 2.3, [0, 0, 0]);
    const y = min(Q[1] + 30, H - (wide ? 120 : 40));
    let msg = `CHAIN INTACT  ·  ${sealed.toLocaleString('en-US')} EVENTS SEALED`, col = [255, 140, 144];
    if (v && tam.phase === 'broken') { msg = `CHAIN BROKEN AT #0${v.id}`; col = RED; }
    if (v && tam.phase === 'restore') { msg = 'VERIFIED AGAINST THE SEALED COPY'; col = [255, 255, 255]; }
    ctx.font = MONO(wide ? 11 : 10);
    setSpacing('0.14em');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const tw = ctx.measureText(msg).width;
    const pulse = 0.55 + 0.45 * sin(tau * 4);
    ctx.fillStyle = rgba(col, pulse);
    ctx.beginPath(); ctx.arc(Q[0] - tw / 2 - 12, y, 3, 0, PI * 2); ctx.fill();
    ctx.fillStyle = rgba(col, 0.95);
    ctx.fillText(msg, Q[0], y);
    setSpacing('0px');
  }

  // ---------- frame ----------
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const yaw = 0.12 + sin(tau * 0.06) * 0.22 + px * 0.2;
    setCamera(yaw, -py * 0.7);
    ctx.globalAlpha = 1;

    drawFloor();
    drawDust();
    drawDais();

    items = [];
    const glow = rings.length ? 1 - rings[rings.length - 1].t / 0.8 : 0;
    buildArm(pose, cur.g, glow);
    box(mul(tr(crate.pos[0], crate.pos[1], crate.pos[2]), rotY(crate.yaw)), 0.3, 0.3, 0.3, MAT.crate);
    const RA = [0, 0, 0], RB = [0, 0, 0];
    for (let i = 0; i < 90; i++) {
      const a0 = (i / 90) * LIFE, a1 = ((i + 1) / 90) * LIFE;
      const p0 = helix(a0), p1 = helix(a1);
      proj(p0[0], p0[1], p0[2], RA); proj(p1[0], p1[1], p1[2], RB);
      items.push({ k: 4, z: (RA[2] + RB[2]) / 2 + 0.3, s: [RA[0], RA[1], RB[0], RB[1]], a: min(1, a0 / 2, (LIFE - a1) / 4) });
    }
    for (let i = 0; i < crystals.length; i++) {
      const c = crystals[i];
      c.z = proj(c.wp[0], c.wp[1], c.wp[2])[2];
      items.push({ k: 1, z: c.z, c });
      if (i > 0) {
        const a = crystals[i - 1];
        if (tau - c.born >= FLY * 0.8) items.push({ k: 2, z: (a.z + c.z) / 2 + 0.01, a, b: c });
      }
      if (tau - c.born < FLY) items.push({ k: 3, z: c.z - 0.01, c });
    }
    drawFaces(items);
    drawFx();
    drawMotes(telemetry, 0.75);
    drawMotes(motes, 1);
    drawHud();
  }

  // pre-warm so the helix is already populated on first paint
  const pin = parseFloat(new URLSearchParams(location.search).get('witness_t'));
  const warm = 24 + (pin > 0 ? pin : 0);
  tam.next = 28;
  for (let i = 0; i < warm * 30; i++) { if (i % 6 === 0) setCamera(0.12, 0); step(1 / 30); }
  ready = true;

  let running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.02 }).observe(canvas);

  if (REDUCED) {
    draw();
    return;
  }
  let last = performance.now();
  const loop = (now) => {
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;
    if (running && !document.hidden) {
      px += (tpx - px) * 0.05;
      py += (tpy - py) * 0.05;
      step(dt);
      draw();
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
