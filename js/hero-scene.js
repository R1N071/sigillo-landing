// Hero scene: the evidence river. A directed stream of motes flows from the
// bottom-right corner through the pipeline stations in order - ingest grate,
// hash-chain blocks, TPM signing chip - and pours into the seal, which
// periodically stamps the whole swarm into the sigil. A live schematic.
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

function sigilTargets(n) {
  const pts = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = Math.random();
    let x, y;
    if (u < 0.36) { const a = Math.random() * Math.PI * 2; const r = 1.32 + (Math.random() - 0.5) * 0.09; x = Math.cos(a) * r; y = Math.sin(a) * r; }
    else if (u < 0.58) { const a = Math.random() * Math.PI * 2; const r = 0.80 + (Math.random() - 0.5) * 0.08; x = Math.cos(a) * r; y = Math.sin(a) * r; }
    else if (u < 0.74) { const a = Math.random() * Math.PI * 2; const r = 0.26 * Math.sqrt(Math.random()); x = Math.cos(a) * r; y = Math.sin(a) * r; }
    else if (u < 0.85) { const a = Math.random() * Math.PI * 2; const r = 1.62 + (Math.random() - 0.5) * 0.18; x = Math.cos(a) * r; y = Math.sin(a) * r; }
    else { const a = Math.random() * Math.PI * 2; const r = 1.5 * Math.sqrt(Math.random()); x = Math.cos(a) * r; y = Math.sin(a) * r; }
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

  const stage = new THREE.Group();
  stage.position.y = 1.95;
  scene.add(stage);

  // ---------- the pipeline path (stage-local) ----------
  const STATIONS = {
    ingest: new THREE.Vector3(1.9, -1.18, 0.36),
    chain: [
      new THREE.Vector3(1.42, -0.76, 0.28),
      new THREE.Vector3(1.26, -0.5, 0.22),
      new THREE.Vector3(1.1, -0.24, 0.16),
    ],
    sign: new THREE.Vector3(1.0, 0.12, 0.1),
  };
  const pathCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(2.75, -2.05, 0.5),
    STATIONS.ingest,
    STATIONS.chain[0],
    STATIONS.chain[1],
    STATIONS.chain[2],
    STATIONS.sign,
    new THREE.Vector3(0.6, 0.42, 0.05),
    new THREE.Vector3(0.28, 0.28, 0.0),
  ]);

  function closestU(target) {
    let best = 0, bd = 1e9;
    for (let i = 0; i <= 220; i++) {
      const u = i / 220;
      const d = pathCurve.getPointAt(u).distanceToSquared(target);
      if (d < bd) { bd = d; best = u; }
    }
    return best;
  }
  const uIngest = closestU(STATIONS.ingest);
  const uChain = STATIONS.chain.map(closestU);
  const uSign = closestU(STATIONS.sign);

  // ---------- the swarm ----------
  const N = 6500;
  const NR = Math.floor(N * 0.52); // the river share
  const pos = new Float32Array(N * 3);
  const targets = sigilTargets(N);
  const startPos = new Float32Array(N * 3);
  const burstVel = new Float32Array(N * 3);
  const seeds = new Float32Array(N);
  const delays = new Float32Array(N);
  const colors = new Float32Array(N * 3);
  const baseColors = new Float32Array(N * 3);
  const isRiver = new Uint8Array(N);
  const uParam = new Float32Array(N);
  const laneSeed = new Float32Array(N);
  const riverSpeed = new Float32Array(N);
  const returning = new Float32Array(N);
  const heat = new Float32Array(N);
  const hotFlag = new Uint8Array(N);

  const tmpV = new THREE.Vector3();
  for (let i = 0; i < N; i++) {
    seeds[i] = Math.random() * 100;
    delays[i] = Math.random() * 0.55;
    const u = Math.random();
    if (u < 0.8) { colors[i * 3] = 0.92; colors[i * 3 + 1] = 0.30; colors[i * 3 + 2] = 0.32; }
    else if (u < 0.95) { colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.62; colors[i * 3 + 2] = 0.64; }
    else { colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.93; colors[i * 3 + 2] = 0.93; }
    if (i < NR) {
      // river motes run brighter than the ambient drift
      colors[i * 3] = Math.min(1, colors[i * 3] * 1.25 + 0.08);
      colors[i * 3 + 1] = Math.min(1, colors[i * 3 + 1] * 1.25 + 0.02);
      colors[i * 3 + 2] = Math.min(1, colors[i * 3 + 2] * 1.25 + 0.02);
      isRiver[i] = 1;
      uParam[i] = Math.random();
      laneSeed[i] = Math.random() * Math.PI * 2;
      riverSpeed[i] = 0.05 + Math.random() * 0.055;
      pathCurve.getPointAt(uParam[i], tmpV);
      pos[i * 3] = tmpV.x;
      pos[i * 3 + 1] = tmpV.y;
      pos[i * 3 + 2] = tmpV.z;
    } else {
      const a = Math.random() * Math.PI * 2;
      const r = 1.4 + Math.random() * 1.5;
      pos[i * 3] = Math.cos(a) * r * 1.35;
      pos[i * 3 + 1] = Math.sin(a) * r * 0.95;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2.2;
    }
  }
  baseColors.set(colors);

  // the pipeline guide wire the river runs along
  {
    const wirePts = pathCurve.getPoints(60);
    const wire = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(wirePts),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.14 })
    );
    stage.add(wire);
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const pMat = new THREE.PointsMaterial({
    size: 0.085, vertexColors: true, transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false,
    map: makeGlowTexture(), sizeAttenuation: true,
  });
  stage.add(new THREE.Points(pGeo, pMat));

  // ---------- station meshes ----------
  const artDark = new THREE.MeshStandardMaterial({ color: 0x1b1b21, metalness: 0.55, roughness: 0.4 });
  const artEdge = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.95 });
  const brass = new THREE.MeshStandardMaterial({ color: 0x9a7b3f, metalness: 0.9, roughness: 0.3 });

  // ingest: a grate portal the river threads through
  const ingestGroup = new THREE.Group();
  {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.34, 0.022, 10, 48),
      new THREE.MeshStandardMaterial({ color: 0x2a2c33, metalness: 0.7, roughness: 0.3, emissive: ACCENT, emissiveIntensity: 0.35 })
    );
    ingestGroup.add(ring);
    for (let i = 0; i < 3; i++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.014, 0.014), artEdge);
      bar.rotation.z = -0.62 + i * 0.62;
      ingestGroup.add(bar);
    }
    ingestGroup.position.copy(STATIONS.ingest);
    ingestGroup.rotation.z = 0.62;
    stage.add(ingestGroup);
  }

  // the hash chain: three blocks strung on the river
  const chainGroups = [];
  {
    const bGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    for (const cp of STATIONS.chain) {
      const g = new THREE.Group();
      const b = new THREE.Mesh(bGeo, artDark);
      g.add(b);
      g.add(new THREE.LineSegments(new THREE.EdgesGeometry(bGeo), artEdge));
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xff6369, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      g.add(dot);
      g.position.copy(cp);
      g.userData.dot = dot.material;
      stage.add(g);
      chainGroups.push(g);
    }
  }

  // the TPM signing chip
  const chipGroup = new THREE.Group();
  const chipDotMat = new THREE.MeshBasicMaterial({ color: 0xff6369, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
  {
    const slab = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.15, 0.34), artDark);
    chipGroup.add(slab);
    chipGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(slab.geometry), artEdge));
    for (let i = 0; i < 4; i++) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.05, 0.08), brass);
      pad.position.set(-0.17 + i * 0.115, 0.095, 0.12);
      chipGroup.add(pad);
      const pad2 = pad.clone();
      pad2.position.z = -0.12;
      chipGroup.add(pad2);
    }
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10), chipDotMat);
    dot.position.y = 0.11;
    chipGroup.add(dot);
    chipGroup.position.copy(STATIONS.sign);
    stage.add(chipGroup);
  }

  // the timestamp ring around the seal, always faintly present
  const lockRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.85, 0.012, 8, 96),
    new THREE.MeshBasicMaterial({ color: 0xff6369, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  stage.add(lockRing);

  // stamp meshes
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
  // the seal heart: fed by every absorbed mote
  const heart = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture('255,99,105,'), transparent: true, opacity: 0.15,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  heart.scale.set(1.6, 1.6, 1);
  stage.add(heart);

  // ambient dust
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

  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(), transparent: true, opacity: 0.3,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  glow.scale.set(9, 6.5, 1);
  glow.position.set(0, 2.0, -6);
  scene.add(glow);

  // ---------- schematic labels ----------
  const host = canvas.parentElement || document.body;
  const labelHost = document.createElement('div');
  labelHost.className = 'station-tags';
  host.appendChild(labelHost);
  const tagDefs = [
    { txt: 'INGEST', at: () => STATIONS.ingest.clone().add(new THREE.Vector3(0.0, -0.5, 0)) },
    { txt: 'HASH CHAIN', at: () => STATIONS.chain[1].clone().add(new THREE.Vector3(0.0, -0.42, 0)) },
    { txt: 'TPM 2.0 SIGN', at: () => STATIONS.sign.clone().add(new THREE.Vector3(0.0, -0.42, 0)) },
    { txt: 'SEALED EVIDENCE', at: () => new THREE.Vector3(0, -1.62, 0) },
  ];
  const tags = tagDefs.map((d) => {
    const el = document.createElement('div');
    el.className = 'station-tag';
    el.textContent = d.txt;
    labelHost.appendChild(el);
    return { el, at: d.at };
  });
  const projV = new THREE.Vector3();

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
    stage.position.set(wide ? 1.05 : 0, wide ? 1.95 : 1.42, 0);
    stage.scale.setScalar(wide ? 1.0 : 0.86);
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
  const smoothstep = (x) => x * x * (3 - 2 * x);

  // station activity
  const chipState = { act: 0, hits: 0, kickT: 0 };
  const cubeAct = [0, 0, 0];
  let heartAct = 0;

  function riverPos(i, out) {
    const uu = uParam[i];
    pathCurve.getPointAt(uu, out);
    let width = 0.36 * (1 - uu * 0.5);
    if (Math.abs(uu - uIngest) < 0.09) width *= 0.42;
    if (uu > uChain[0] - 0.05 && uu < uChain[2] + 0.05) width *= 0.34;
    if (Math.abs(uu - uSign) < 0.05) width *= 0.5;
    const k = laneSeed[i];
    const wob = Math.sin(uu * 26 + k * 5) * 0.6 + Math.sin(seeds[i] + uu * 9) * 0.4;
    out.x += Math.cos(k) * wob * width;
    out.y += Math.sin(k) * wob * width * 0.55;
    out.z += Math.sin(k * 1.7) * wob * width * 0.8;
    return out;
  }

  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const ph = REDUCED ? { id: 2, t: 0.5 } : phaseOf(t);

    if (ph.id === 1 && lastPhase !== 1) startPos.set(pos);
    if (ph.id === 3 && lastPhase !== 3) {
      for (let i = 0; i < N; i++) {
        const tx = targets[i * 3], ty = targets[i * 3 + 1];
        const l = Math.max(0.001, Math.hypot(tx, ty));
        burstVel[i * 3] = (tx / l) * (1.4 + Math.random() * 1.6);
        burstVel[i * 3 + 1] = (ty / l) * (1.4 + Math.random() * 1.6);
        burstVel[i * 3 + 2] = (Math.random() - 0.5) * 1.4;
      }
    }
    if (ph.id === 0 && lastPhase === 3) {
      for (let i = 0; i < NR; i++) returning[i] = 0;
    }
    lastPhase = ph.id;

    mx += (tmx - mx) * Math.min(dt * 4, 1);
    my += (tmy - my) * Math.min(dt * 4, 1);
    rig.rotation.y = mx * 0.07;
    rig.rotation.x = my * 0.028;
    camera.position.x = mx * 0.36;
    camera.lookAt(stage.position.x * 0.5, stage.position.y, 0);

    const flare = ph.id === 2 ? Math.max(0, 1 - ph.t * 3.2) : 0;
    const lockA = ph.id === 2 ? Math.min(1, ph.t * 2.4) : ph.id === 3 ? Math.max(0, 1 - ph.t * 4) : 0;

    if (flare > 0.01) {
      shock.scale.setScalar(0.6 + flare * 5.5);
      shock.material.opacity = 0.75 * flare;
      shock.quaternion.copy(camera.quaternion);
      flash.material.opacity = 0.85 * flare;
      pMat.size = 0.085 + flare * 0.075;
    } else {
      shock.material.opacity = 0;
      flash.material.opacity = 0;
      pMat.size = ph.id === 2 ? 0.105 : 0.085;
    }

    // stations breathe with their load
    chipState.kickT *= Math.exp(-dt * 3.2);
    chipState.act += (chipState.hits * 30 - chipState.act) * Math.min(1, dt * 4);
    chipState.hits = 0;
    chipGroup.scale.setScalar(1 + chipState.kickT * 0.28 + chipState.act * 0.05);
    chipGroup.rotation.y += dt * (0.2 + chipState.act * 0.8);
    chipDotMat.opacity = Math.min(1, 0.4 + chipState.act * 0.9 + chipState.kickT * 0.5);
    for (let c = 0; c < 3; c++) {
      cubeAct[c] *= Math.exp(-dt * 2.2);
      chainGroups[c].rotation.y += dt * 0.25;
      chainGroups[c].userData.dot.opacity = Math.min(1, 0.35 + cubeAct[c] * 0.8);
      chainGroups[c].scale.setScalar(1 + cubeAct[c] * 0.16);
    }
    ingestGroup.rotation.z = 0.62 + Math.sin(t * 0.6) * 0.05;
    heartAct *= Math.exp(-dt * 1.6);
    heart.material.opacity = Math.min(1, 0.12 + heartAct * 0.5 + lockA * 0.45 + flare * 0.6);
    heart.scale.setScalar(1.5 + heartAct * 0.9 + flare * 1.6);
    lockRing.material.opacity = 0.14 + lockA * 0.85 + heartAct * 0.12;
    lockRing.rotation.z += dt * 0.15;
    pMat.opacity = ph.id === 2 ? 1.0 : 0.93;

    if (!REDUCED) {
      const mpx = stage.position.x + mx * 2.6;
      const mpy = stage.position.y - my * 1.5;
      for (let i = 0; i < N; i++) {
        const i3 = i * 3;
        const sd = seeds[i];
        if (ph.id === 0 && isRiver[i] && returning[i] < 1) {
          // gliding back onto the river after the burst
          returning[i] = Math.min(1, returning[i] + dt / 1.4);
          riverPos(i, tmpV);
          const e = smoothstep(returning[i]);
          pos[i3] += (tmpV.x - pos[i3]) * e;
          pos[i3 + 1] += (tmpV.y - pos[i3 + 1]) * e;
          pos[i3 + 2] += (tmpV.z - pos[i3 + 2]) * e;
        } else if (ph.id === 0 && isRiver[i]) {
          const prevU = uParam[i];
          uParam[i] = Math.min(1, prevU + riverSpeed[i] * dt);
          // sign crossing: the mote is certified white-hot
          if (prevU < uSign && uParam[i] >= uSign) {
            heat[i] = 1;
            hotFlag[i] = 1;
            chipState.hits++;
            chipState.kickT = 1;
          }
          // chain cubes tick as the river threads them
          for (let c = 0; c < 3; c++) {
            if (prevU < uChain[c] && uParam[i] >= uChain[c]) cubeAct[c] = 1;
          }
          if (uParam[i] >= 0.995) {
            // absorbed by the seal
            uParam[i] = Math.random() * 0.04;
            heartAct = Math.min(1.6, heartAct + 0.045);
          }
          riverPos(i, tmpV);
          pos[i3] = tmpV.x;
          pos[i3 + 1] = tmpV.y;
          pos[i3 + 2] = tmpV.z;
        } else if (ph.id === 0) {
          // ambient drift: the raw data cloud
          const x = pos[i3], y = pos[i3 + 1], z = pos[i3 + 2];
          const vx = Math.sin(y * 1.35 + t * 0.45 + sd) * 0.34 + Math.sin(z * 0.8 + t * 0.2) * 0.12;
          const vy = Math.sin(z * 1.1 + t * 0.35 + sd * 1.7) * 0.3 - 0.03;
          const vz = Math.sin(x * 0.9 + t * 0.3 + sd * 0.6) * 0.16;
          pos[i3] += vx * dt;
          pos[i3 + 1] += vy * dt;
          pos[i3 + 2] += vz * dt;
          const dcx = pos[i3] * 0.42, dcy = pos[i3 + 1] * 0.55;
          if (dcx * dcx + dcy * dcy > 1) {
            pos[i3] -= dcx * 0.02;
            pos[i3 + 1] -= dcy * 0.02;
          }
          const rdx = pos[i3] - mpx + stage.position.x, rdy = pos[i3 + 1] - mpy;
          const rd2 = rdx * rdx + rdy * rdy;
          if (rd2 < 1.2) {
            const f = (1.2 - rd2) * 0.9 * dt;
            const rl = Math.max(0.05, Math.sqrt(rd2));
            pos[i3] += (rdx / rl) * f;
            pos[i3 + 1] += (rdy / rl) * f;
          }
        } else if (ph.id === 1) {
          const tp = Math.min(1, Math.max(0, (ph.t - delays[i] * 0.5) / 0.5));
          const e = easeOut(tp);
          pos[i3] = startPos[i3] + (targets[i3] - startPos[i3]) * e;
          pos[i3 + 1] = startPos[i3 + 1] + (targets[i3 + 1] - startPos[i3 + 1]) * e;
          pos[i3 + 2] = startPos[i3 + 2] + (targets[i3 + 2] - startPos[i3 + 2]) * e;
        } else if (ph.id === 2) {
          const j = 0.012;
          pos[i3] = targets[i3] + Math.sin(t * 2.6 + sd) * j;
          pos[i3 + 1] = targets[i3 + 1] + Math.cos(t * 2.2 + sd * 1.3) * j;
          pos[i3 + 2] = targets[i3 + 2] + Math.sin(t * 1.8 + sd) * j * 1.5;
        } else {
          pos[i3] += burstVel[i3] * dt * 2.1;
          pos[i3 + 1] += burstVel[i3 + 1] * dt * 2.1;
          pos[i3 + 2] += burstVel[i3 + 2] * dt * 2.1;
        }
      }

      // certified heat fades back to crimson
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

    // schematic labels track their stations
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    for (const { el, at } of tags) {
      projV.copy(at());
      stage.localToWorld(projV);
      projV.project(camera);
      const lx = (projV.x * 0.5 + 0.5) * cw;
      const ly = (-projV.y * 0.5 + 0.5) * ch;
      el.style.transform = `translate(${lx.toFixed(1)}px, ${ly.toFixed(1)}px) translate(-50%, 4px)`;
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
    for (let i = 0; i < NR; i++) { uParam[i] = 0.2 + (i / NR) * 0.75; riverPos(i, tmpV); pos[i * 3] = tmpV.x; pos[i * 3 + 1] = tmpV.y; pos[i * 3 + 2] = tmpV.z; }
    pGeo.attributes.position.needsUpdate = true;
    lockRing.material.opacity = 0.9;
    frame();
  } else {
    renderer.setAnimationLoop(() => {
      if (running && !document.hidden) { frames++; frame(); }
    });
  }
  return {
    getFrames: () => frames,
    dispose() { renderer.setAnimationLoop(null); labelHost.remove(); },
  };
}
