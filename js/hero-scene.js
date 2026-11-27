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
    lockRing.material.opacity = lockA;
    lockRing.rotation.z += dt * 0.15;
    pMat.opacity = ph.id === 2 ? 1.0 : 0.92;

    if (!REDUCED) {
      for (let i = 0; i < N; i++) {
        const i3 = i * 3;
        const sd = seeds[i];
        if (ph.id === 0) {
          // living flow field
          const x = pos[i3], y = pos[i3 + 1], z = pos[i3 + 2];
          const vx = Math.sin(y * 1.35 + t * 0.45 + sd) * 0.34 + Math.sin(z * 0.8 + t * 0.2) * 0.12;
          const vy = Math.sin(z * 1.1 + t * 0.35 + sd * 1.7) * 0.3 - 0.03;
          const vz = Math.sin(x * 0.9 + t * 0.3 + sd * 0.6) * 0.16;
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
