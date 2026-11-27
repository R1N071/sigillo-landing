// Hero scene: the seal formed from evidence. Thousands of glowing motes
// drift in a living flow field; periodically they converge into the sigil
// itself, hold as a sealed stamp with a shockwave, then burst apart again.
import * as THREE from 'three';

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const DEBUG = new URLSearchParams(location.search).has('debug');
const ACCENT = 0xe5484d;

const PH = { FLOW: 6.5, FORM: 2.8, HOLD: 3.4, BURST: 1.3 };
const TOTAL = PH.FLOW + PH.FORM + PH.HOLD + PH.BURST;

function phaseOf(tt) {
  const m = tt % TOTAL;
  if (m < PH.FLOW) return { id: 0, t: m / PH.FLOW };
  if (m < PH.FLOW + PH.FORM) return { id: 1, t: (m - PH.FLOW) / PH.FORM };
  if (m < PH.FLOW + PH.FORM + PH.HOLD) return { id: 2, t: (m - PH.FLOW - PH.FORM) / PH.HOLD };
  return { id: 3, t: (m - PH.FLOW - PH.FORM - PH.HOLD) / PH.BURST };
}

function makeGlowTexture(rgb = '255,99,105,') {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, `rgba(${rgb}1)`);
  grad.addColorStop(0.3, `rgba(${rgb}0.5)`);
  grad.addColorStop(1, `rgba(${rgb}0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

// sample the sigil: two rings, a heart disc, an outer wax rim and a scatter
function sigilTargets(n) {
  const pts = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = Math.random();
    let x, y;
    if (u < 0.36) { // ring A
      const a = Math.random() * Math.PI * 2;
      const r = 1.32 + (Math.random() - 0.5) * 0.09;
      x = Math.cos(a) * r; y = Math.sin(a) * r;
    } else if (u < 0.58) { // ring B
      const a = Math.random() * Math.PI * 2;
      const r = 0.80 + (Math.random() - 0.5) * 0.08;
      x = Math.cos(a) * r; y = Math.sin(a) * r;
    } else if (u < 0.74) { // heart disc
      const a = Math.random() * Math.PI * 2;
      const r = 0.26 * Math.sqrt(Math.random());
      x = Math.cos(a) * r; y = Math.sin(a) * r;
    } else if (u < 0.85) { // wax rim halo
      const a = Math.random() * Math.PI * 2;
      const r = 1.62 + (Math.random() - 0.5) * 0.18;
      x = Math.cos(a) * r; y = Math.sin(a) * r;
    } else { // sparse scatter inside
      const a = Math.random() * Math.PI * 2;
      const r = 1.5 * Math.sqrt(Math.random());
      x = Math.cos(a) * r; y = Math.sin(a) * r;
    }
    pts[i * 3] = x;
    pts[i * 3 + 1] = y;
    pts[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
  }
  return pts;
}

export function initHeroScene(canvas, opts = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    renderer.setAnimationLoop(null);
    if (opts.onFatal) opts.onFatal();
  });

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0a0b, 13, 46);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  const rig = new THREE.Group();
  camera.position.set(0, 2.0, 7.2);
  rig.add(camera);
  scene.add(rig);

  scene.add(new THREE.AmbientLight(0x3c3c44, 1.2));
  const key = new THREE.DirectionalLight(0xfff2e6, 1.6);
  key.position.set(5, 8, 5);
  scene.add(key);

  // ---------- the swarm ----------
  const stage = new THREE.Group();
  stage.position.y = 1.95;
  scene.add(stage);

  const N = 6500;
  const pos = new Float32Array(N * 3);
  const targets = sigilTargets(N);
  const startPos = new Float32Array(N * 3);
  const burstVel = new Float32Array(N * 3);
  const seeds = new Float32Array(N);
  const delays = new Float32Array(N);
  const colors = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    seeds[i] = Math.random() * 100;
    delays[i] = Math.random() * 0.55;
    // birth: scattered in the flow ellipsoid
    const a = Math.random() * Math.PI * 2;
    const r = 1.4 + Math.random() * 1.5;
    pos[i * 3] = Math.cos(a) * r * 1.35;
    pos[i * 3 + 1] = Math.sin(a) * r * 0.95;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 2.2;
    // color: crimson swarm, some bright sparks, few white-hot
    const u = Math.random();
    if (u < 0.8) { colors[i * 3] = 0.92; colors[i * 3 + 1] = 0.30; colors[i * 3 + 2] = 0.32; }
    else if (u < 0.95) { colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.62; colors[i * 3 + 2] = 0.64; }
    else { colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.93; colors[i * 3 + 2] = 0.93; }
  }
  // engagement state: ejecta velocity, certified heat, hot flags, base colors
  const vel = new Float32Array(N * 3);
  const heat = new Float32Array(N);
  const hotFlag = new Uint8Array(N);
  const ejecta = new Uint8Array(N);
  const baseColors = new Float32Array(colors);
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const pMat = new THREE.PointsMaterial({
    size: 0.085, vertexColors: true, transparent: true, opacity: 1.0,
    blending: THREE.AdditiveBlending, depthWrite: false,
    map: makeGlowTexture(), sizeAttenuation: true,
  });
  const swarm = new THREE.Points(pGeo, pMat);
  stage.add(swarm);

  // ---------- the tech constellation: four artifacts orbiting the seal ----------
  const constellation = new THREE.Group();
  stage.add(constellation);

  const artDark = new THREE.MeshStandardMaterial({ color: 0x1b1b21, metalness: 0.55, roughness: 0.4 });
  const artEdge = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.95 });
  const brass = new THREE.MeshStandardMaterial({ color: 0x9a7b3f, metalness: 0.9, roughness: 0.3 });
  const glowDotMat = () => new THREE.MeshBasicMaterial({ color: 0xff6369, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false });

  const certDots = [];
  const tethers = [];
  const artifacts = [];
  const artState = [];

  function tether(from) {
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([from.clone(), new THREE.Vector3(0, 0, 0)]),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.18 })
    );
    constellation.add(line);
    tethers.push(line.material);
    return line;
  }

  // 1) the hash chain: three linked blocks
  {
    const g = new THREE.Group();
    const bGeo = new THREE.BoxGeometry(0.22, 0.22, 0.22);
    const pts = [[-0.2, -0.12, 0], [0, 0.06, 0.1], [0.2, 0.24, 0.02]];
    for (let i = 0; i < 3; i++) {
      const b = new THREE.Mesh(bGeo, artDark);
      b.position.set(...pts[i]);
      b.add(new THREE.LineSegments(new THREE.EdgesGeometry(bGeo), artEdge));
      g.add(b);
      if (i > 0) {
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...pts[i - 1]), new THREE.Vector3(...pts[i])]),
          new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.6 })
        );
        g.add(line);
      }
    }
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), glowDotMat());
    dot.position.set(0.2, 0.24, 0.02);
    g.add(dot);
    certDots.push(dot.material);
    g.position.set(2.35, 0.55, 0);
    g.userData.spin = { x: 0.3, y: 0.5, z: 0.1 };
    constellation.add(g);
    tether(g.position);
    artifacts.push(g);
  }

  // 2) the TPM signing chip
  {
    const g = new THREE.Group();
    const slab = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, 0.36), artDark);
    g.add(slab);
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(slab.geometry), artEdge));
    for (let i = 0; i < 4; i++) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.05, 0.08), brass);
      pad.position.set(-0.19 + i * 0.13, 0.09, 0.13);
      g.add(pad);
      const pad2 = pad.clone();
      pad2.position.z = -0.13;
      g.add(pad2);
    }
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10), glowDotMat());
    dot.position.y = 0.1;
    g.add(dot);
    certDots.push(dot.material);
    g.position.set(0, -0.35, 2.45);
    g.userData.spin = { x: 0.15, y: 0.6, z: 0 };
    constellation.add(g);
    tether(g.position);
    artifacts.push(g);
  }

  // 3) the WORM vault
  {
    const g = new THREE.Group();
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.2, 24), artDark);
    g.add(drum);
    const ringTop = new THREE.Mesh(
      new THREE.TorusGeometry(0.27, 0.012, 8, 40),
      new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.8 })
    );
    ringTop.rotation.x = Math.PI / 2;
    ringTop.position.y = 0.11;
    g.add(ringTop);
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), glowDotMat());
    dot.position.y = 0.16;
    g.add(dot);
    certDots.push(dot.material);
    g.position.set(-2.4, 0.25, 0.4);
    g.userData.spin = { x: 0.1, y: 0.7, z: 0.2 };
    constellation.add(g);
    tether(g.position);
    artifacts.push(g);
  }

  // 4) the timestamp ring
  {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.24, 0.014, 10, 48),
      new THREE.MeshStandardMaterial({ color: 0x2a2c33, metalness: 0.7, roughness: 0.3, emissive: ACCENT, emissiveIntensity: 0.4 })
    );
    g.add(ring);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const tick = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.07, 0.016), new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.9 }));
      tick.position.set(Math.cos(a) * 0.31, Math.sin(a) * 0.31, 0);
      tick.rotation.z = a + Math.PI / 2;
      g.add(tick);
    }
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10), glowDotMat());
    g.add(dot);
    certDots.push(dot.material);
    g.position.set(-0.3, -0.6, -2.3);
    g.userData.spin = { x: 0.5, y: 0.3, z: 0.4 };
    constellation.add(g);
    tether(g.position);
    artifacts.push(g);
  }

  for (const g of artifacts) artState.push({ act: 0, hits: 0, kickT: 0, baseY: g.position.y });
  const tmpV = new THREE.Vector3();
  const artLocal = artifacts.map(() => new THREE.Vector3());

  // ---------- the stamp flare meshes ----------
  const shock = new THREE.Mesh(
    new THREE.RingGeometry(1.62, 1.72, 72),
    new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })
  );
  stage.add(shock);
  const flash = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture('255,170,173,'), transparent: true, opacity: 0,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  flash.scale.set(5.2, 5.2, 1);
  stage.add(flash);
  // the rim that locks around the formed seal
  const lockRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.85, 0.012, 8, 96),
    new THREE.MeshBasicMaterial({ color: 0xff6369, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  stage.add(lockRing);

  // ambient dust far behind
  const dustN = 40;
  const dustPos = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 12;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 7 + 2;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0x8a8f9c, size: 0.028, transparent: true, opacity: 0.3, depthWrite: false,
  })));

  // backdrop glow
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(), transparent: true, opacity: 0.3,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  glow.scale.set(9, 6.5, 1);
  glow.position.set(0, 2.0, -6);
  scene.add(glow);

  // ---------- pointer ----------
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  if (!REDUCED) {
    addEventListener('pointermove', (e) => {
      tmx = (e.clientX / innerWidth - 0.5) * 2;
      tmy = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  // ---------- layout ----------
  function place() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const wide = w / h > 1.05;
    stage.position.set(wide ? 1.15 : 0, wide ? 1.95 : 1.45, 0);
    stage.scale.setScalar(wide ? 1.0 : 0.88);
    constellation.scale.setScalar(wide ? 1 : 0.52);
    camera.updateProjectionMatrix();
  }
  place();
  new ResizeObserver(place).observe(canvas);

  // ---------- run ----------
  let running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.02 })
    .observe(canvas);
  const clock = new THREE.Clock();
  let lastPhase = -1;

  const easeOut = (x) => 1 - Math.pow(1 - x, 3);

  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const ph = REDUCED ? { id: 2, t: 0.5 } : phaseOf(t);

    if (ph.id === 1 && lastPhase !== 1) {
      // snapshot for the convergence
      startPos.set(pos);
    }
    if (ph.id === 3 && lastPhase !== 3) {
      // blast outward from the seal centre
      for (let i = 0; i < N; i++) {
        const tx = targets[i * 3], ty = targets[i * 3 + 1];
        const l = Math.max(0.001, Math.hypot(tx, ty));
        burstVel[i * 3] = (tx / l) * (1.4 + Math.random() * 1.6);
        burstVel[i * 3 + 1] = (ty / l) * (1.4 + Math.random() * 1.6);
        burstVel[i * 3 + 2] = (Math.random() - 0.5) * 1.4;
      }
    }
    lastPhase = ph.id;

    mx += (tmx - mx) * Math.min(dt * 4, 1);
    my += (tmy - my) * Math.min(dt * 4, 1);
    rig.rotation.y = mx * 0.07;
    rig.rotation.x = my * 0.028;
    camera.position.x = mx * 0.36;
    camera.lookAt(stage.position.x * 0.5, stage.position.y, 0);

    const mpx = stage.position.x + mx * 2.6;
    const mpy = stage.position.y - my * 1.5;

    // stamp flare envelope
    const flare = ph.id === 2 ? Math.max(0, 1 - ph.t * 3.2) : 0;
    const holdGlow = ph.id === 2 ? 0.55 + Math.sin(t * 3) * 0.1 : 0;
    if (flare > 0.01) {
      const s = 0.6 + flare * 5.5;
      shock.scale.setScalar(s);
      shock.material.opacity = 0.75 * flare;
      shock.quaternion.copy(camera.quaternion);
      flash.material.opacity = 0.85 * flare;
      pMat.size = 0.085 + flare * 0.075;
    } else {
      shock.material.opacity = 0;
      flash.material.opacity = 0;
      pMat.size = ph.id === 2 ? 0.105 : 0.085;
    }
    // lock ring: draws itself in during the hold
    const lockA = ph.id === 2 ? Math.min(1, ph.t * 2.4) : ph.id === 3 ? Math.max(0, 1 - ph.t * 4) : 0;

    // the tech constellation: stations sweep the field, harvest, and kick
    constellation.rotation.y = t * 0.09;
    for (let k = 0; k < artifacts.length; k++) {
      const g = artifacts[k];
      const st = artState[k];
      st.kickT *= Math.exp(-dt * 3.2);
      st.act += (st.hits * 14 - st.act) * Math.min(1, dt * 4);
      st.hits = 0;
      const bump = 1 + st.kickT * 0.32;
      g.scale.setScalar(bump);
      g.position.y = st.baseY + Math.sin(t * 1.1 + k * 2.1) * 0.08;
      const spinBoost = 0.35 * (1 + st.act * 3 + st.kickT * 2);
      g.rotation.x += g.userData.spin.x * dt * spinBoost;
      g.rotation.y += g.userData.spin.y * dt * spinBoost;
      g.rotation.z += g.userData.spin.z * dt * spinBoost;
      certDots[k].opacity = Math.min(1, 0.35 + st.act * 0.7 + st.kickT * 0.5 + lockA * 0.45);
      tethers[k].opacity = Math.min(1, 0.1 + st.act * 0.5 + lockA * 0.5);
    }
    lockRing.material.opacity = lockA;
    lockRing.rotation.z += dt * 0.15;
    pMat.opacity = ph.id === 2 ? 1.0 : 0.92;

    if (!REDUCED) {
      for (let i = 0; i < N; i++) {
        const i3 = i * 3;
        const sd = seeds[i];
        if (ph.id === 0 && ejecta[i]) {
          // certified mote flying from a station toward the seal
          pos[i3] += vel[i3] * dt;
          pos[i3 + 1] += vel[i3 + 1] * dt;
          pos[i3 + 2] += vel[i3 + 2] * dt;
          const damp = Math.exp(-dt * 1.15);
          vel[i3] *= damp; vel[i3 + 1] *= damp; vel[i3 + 2] *= damp;
          if (vel[i3] * vel[i3] + vel[i3 + 1] * vel[i3 + 1] + vel[i3 + 2] * vel[i3 + 2] < 0.09) {
            ejecta[i] = 0;
          }
        } else if (ph.id === 0) {
          // living flow field, harvested by the passing stations
          const x = pos[i3], y = pos[i3 + 1], z = pos[i3 + 2];
          let vx = Math.sin(y * 1.35 + t * 0.45 + sd) * 0.34 + Math.sin(z * 0.8 + t * 0.2) * 0.12;
          let vy = Math.sin(z * 1.1 + t * 0.35 + sd * 1.7) * 0.3 - 0.03;
          let vz = Math.sin(x * 0.9 + t * 0.3 + sd * 0.6) * 0.16;
          // nearest station
          let ak = -1, ad2 = 1e9, adx = 0, ady = 0, adz = 0;
          for (let k = 0; k < artLocal.length; k++) {
            const dx = x - artLocal[k].x, dy = y - artLocal[k].y, dz = z - artLocal[k].z;
            const d2 = dx * dx + dy * dy + dz * dz;
            if (d2 < ad2) { ad2 = d2; ak = k; adx = dx; ady = dy; adz = dz; }
          }
          const ATTRACT = 1.05;
          if (ad2 < ATTRACT * ATTRACT) {
            const ad = Math.sqrt(ad2);
            const ux = adx / ad, uy = ady / ad, uz = adz / ad;
            if (ad < 0.18) {
              // arrival: the station certifies the mote and fires it at the seal
              heat[i] = 1;
              hotFlag[i] = 1;
              ejecta[i] = 1;
              const sp = 1.9 + Math.random() * 1.4;
              const al = Math.max(0.3, Math.hypot(artLocal[ak].x, artLocal[ak].y, artLocal[ak].z));
              vel[i3] = -artLocal[ak].x / al * sp;
              vel[i3 + 1] = -artLocal[ak].y / al * sp;
              vel[i3 + 2] = -artLocal[ak].z / al * sp;
              artState[ak].hits++;
              artState[ak].kickT = 1;
            } else {
              // spiral capture: pull inward plus a tangential swirl
              const pull = (ATTRACT - ad) * 1.9 * dt;
              const tx = uy, ty = -uz * 0.4 - ux * 0.2, tz = uy * 0.4 - uy * 0;
              vx -= ux * pull * 5;
              vy -= uy * pull * 5;
              vz -= uz * pull * 5;
              vx += tx * pull * 3;
              vy += ty * pull * 3;
              vz += (ux * 0.5) * pull * 3;
            }
          }
          pos[i3] += vx * dt;
          pos[i3 + 1] += vy * dt;
          pos[i3 + 2] += vz * dt;
          // soft containment
          const dcx = pos[i3] * 0.42, dcy = pos[i3 + 1] * 0.55;
          const d = dcx * dcx + dcy * dcy;
          if (d > 1) {
            pos[i3] -= dcx * 0.02 * dt * 60 * 0.016;
            pos[i3 + 1] -= dcy * 0.02 * dt * 60 * 0.016;
          }
          // the swarm flees the pointer
          const rdx = pos[i3] - mpx + stage.position.x, rdy = pos[i3 + 1] - mpy;
          const rd2 = rdx * rdx + rdy * rdy;
          if (rd2 < 1.2) {
            const f = (1.2 - rd2) * 0.9 * dt;
            const rl = Math.max(0.05, Math.sqrt(rd2));
            pos[i3] += (rdx / rl) * f;
            pos[i3 + 1] += (rdy / rl) * f;
          }
        } else if (ph.id === 1) {
          // convergence: each mote dives to its sigil slot
          const tp = Math.min(1, Math.max(0, (ph.t - delays[i] * 0.5) / 0.5));
          const e = easeOut(tp);
          pos[i3] = startPos[i3] + (targets[i3] - startPos[i3]) * e;
          pos[i3 + 1] = startPos[i3 + 1] + (targets[i3 + 1] - startPos[i3 + 1]) * e;
          pos[i3 + 2] = startPos[i3 + 2] + (targets[i3 + 2] - startPos[i3 + 2]) * e;
        } else if (ph.id === 2) {
          // sealed: breathing lock with a whisper of life
          const j = 0.012;
          pos[i3] = targets[i3] + Math.sin(t * 2.6 + sd) * j;
          pos[i3 + 1] = targets[i3 + 1] + Math.cos(t * 2.2 + sd * 1.3) * j;
          pos[i3 + 2] = targets[i3 + 2] + Math.sin(t * 1.8 + sd) * j * 1.5;
        } else {
          // burst
          pos[i3] += burstVel[i3] * dt * 2.1;
          pos[i3 + 1] += burstVel[i3 + 1] * dt * 2.1;
          pos[i3 + 2] += burstVel[i3 + 2] * dt * 2.1;
        }
      }
      // stations in stage-local space for the capture math
      for (let k = 0; k < artifacts.length; k++) {
        artifacts[k].getWorldPosition(tmpV);
        stage.worldToLocal(tmpV);
        artLocal[k].copy(tmpV);
      }
      // certified heat: white-hot fade back to crimson
      const cAttr = pGeo.attributes.color;
      for (let i = 0; i < N; i++) {
        if (!hotFlag[i]) continue;
        heat[i] *= Math.exp(-dt * 0.32);
        const h = heat[i];
        const i3 = i * 3;
        if (h < 0.02) {
          hotFlag[i] = 0;
          cAttr.array[i3] = baseColors[i3];
          cAttr.array[i3 + 1] = baseColors[i3 + 1];
          cAttr.array[i3 + 2] = baseColors[i3 + 2];
        } else {
          const b = 1 + h * 2.2;
          cAttr.array[i3] = Math.min(1, baseColors[i3] * b + h * 0.5);
          cAttr.array[i3 + 1] = Math.min(1, baseColors[i3 + 1] * b + h * 0.45);
          cAttr.array[i3 + 2] = Math.min(1, baseColors[i3 + 2] * b + h * 0.45);
        }
      }
      cAttr.needsUpdate = true;
      pGeo.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  let frames = 0;
  if (DEBUG) window.__heroDebug = {
    scene, camera, renderer,
    get running() { return running; },
    get frames() { return frames; },
  };
  if (REDUCED) {
    // render the formed sigil, static
    pos.set(targets);
    pGeo.attributes.position.needsUpdate = true;
    lockRing.material.opacity = 0.8;
    frame();
  } else {
    renderer.setAnimationLoop(() => {
      if (running && !document.hidden) { frames++; frame(); }
    });
  }
  return {
    getFrames: () => frames,
    dispose() { renderer.setAnimationLoop(null); },
  };
}
