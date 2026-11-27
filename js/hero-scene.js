// Hero scene: the Wax Seal. A giant hovering seal of deep crimson wax,
// the sigil embossed at its heart, ember light breathing inside it,
// evidence motes streaming into the wax, drips stretching below, and a
// stamp pulse that plants a glowing imprint on the floor.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const DEBUG = new URLSearchParams(location.search).has('debug');
const ACCENT = 0xe5484d;

function makeGlowTexture(rgb = '229,72,77,') {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, `rgba(${rgb}0.9)`);
  grad.addColorStop(0.35, `rgba(${rgb}0.28)`);
  grad.addColorStop(1, `rgba(${rgb}0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export function initHeroScene(canvas, opts = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    renderer.setAnimationLoop(null);
    if (opts.onFatal) opts.onFatal();
  });

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0a0b, 12, 44);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  const rig = new THREE.Group();
  camera.position.set(0, 2.4, 6.6);
  rig.add(camera);
  scene.add(rig);

  // ---------- lights ----------
  scene.add(new THREE.AmbientLight(0x3c3c44, 1.5));
  const key = new THREE.DirectionalLight(0xfff2e6, 3.6);
  key.position.set(6, 8, 5);
  scene.add(key);
  const top = new THREE.PointLight(0xffffff, 50, 24);
  top.position.set(1.4, 5.6, 2.6);
  scene.add(top);
  const rim = new THREE.PointLight(ACCENT, 110, 20);
  rim.position.set(-3.6, 3.2, -2.4);
  scene.add(rim);
  const fill = new THREE.PointLight(0xb8bcc8, 46, 24);
  fill.position.set(3.6, 2.2, 5);
  scene.add(fill);
  const ember = new THREE.PointLight(0xff6369, 55, 8); // inside the wax
  scene.add(ember);

  // ---------- floor ----------
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(90, 90),
    new THREE.MeshStandardMaterial({ color: 0x0c0c0f, roughness: 1, metalness: 0 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.32;
  scene.add(floor);
  const grid = new THREE.GridHelper(70, 70, 0x4a4a55, 0x26262e);
  grid.position.y = -0.3;
  scene.add(grid);

  // floor ring pulse
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.96, 1.0, 64),
    new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = -0.29;
  scene.add(ring);
  let ringT = 0;

  // the imprint the stamp leaves on the floor
  const imprint = new THREE.Group();
  const impMat = () => new THREE.MeshBasicMaterial({ color: 0xff6369, transparent: true, opacity: 0, side: THREE.DoubleSide });
  const impRing = new THREE.Mesh(new THREE.RingGeometry(0.72, 0.8, 48), impMat());
  impRing.rotation.x = -Math.PI / 2;
  imprint.add(impRing);
  const impRing2 = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.46, 48), impMat());
  impRing2.rotation.x = -Math.PI / 2;
  imprint.add(impRing2);
  const impDot = new THREE.Mesh(new THREE.CircleGeometry(0.14, 24), impMat());
  impDot.rotation.x = -Math.PI / 2;
  imprint.add(impDot);
  imprint.position.y = -0.28;
  scene.add(imprint);

  // ---------- the seal ----------
  const stage = new THREE.Group();
  scene.add(stage);

  const seal = new THREE.Group();
  seal.position.y = 2.7;
  stage.add(seal);

  const waxMat = new THREE.MeshPhysicalMaterial({
    color: 0x6e1b20, roughness: 0.34, metalness: 0.02,
    emissive: 0x8e2e32, emissiveIntensity: 0.35,
    clearcoat: 0.7, clearcoatRoughness: 0.32,
  });

  // wax body: a thick disc with an organic rim
  const wax = new THREE.Mesh(new THREE.SphereGeometry(1.5, 56, 40), waxMat);
  wax.scale.set(1, 0.30, 1);
  seal.add(wax);

  // wax blob irregularities around the rim
  const blobGeo = new THREE.SphereGeometry(0.16, 16, 12);
  const blobAnchors = [0.4, 1.5, 2.7, 3.9, 5.1];
  for (let i = 0; i < blobAnchors.length; i++) {
    const a = blobAnchors[i];
    const r = 1.42 + (i % 2) * 0.05;
    const b = new THREE.Mesh(blobGeo, waxMat);
    b.scale.set(1.4, 0.55, 1.4);
    b.position.set(Math.cos(a) * r, -0.02, Math.sin(a) * r);
    seal.add(b);
  }

  // raised rim ring on the top face
  const rimRidge = new THREE.Mesh(
    new THREE.TorusGeometry(1.34, 0.09, 12, 72),
    new THREE.MeshPhysicalMaterial({ color: 0x7c2026, roughness: 0.4, metalness: 0.02, emissive: 0x8e2e32, emissiveIntensity: 0.3, clearcoat: 0.5, clearcoatRoughness: 0.4 })
  );
  rimRidge.rotation.x = Math.PI / 2;
  rimRidge.position.y = 0.30;
  seal.add(rimRidge);

  // the sigil embossed at the heart of the wax
  const sigilMat = new THREE.MeshStandardMaterial({
    color: 0xff6369, emissive: ACCENT, emissiveIntensity: 1.6,
    roughness: 0.5, metalness: 0.05,
  });
  const sigilRing = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.055, 12, 64), sigilMat);
  sigilRing.rotation.x = Math.PI / 2;
  sigilRing.position.y = 0.38;
  seal.add(sigilRing);
  const sigilRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.035, 10, 48), sigilMat);
  sigilRing2.rotation.x = Math.PI / 2;
  sigilRing2.position.y = 0.39;
  seal.add(sigilRing2);
  const sigilDot = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 16), sigilMat);
  sigilDot.scale.set(1, 0.6, 1);
  sigilDot.position.y = 0.38;
  seal.add(sigilDot);

  // ember halo above the wax face
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(), transparent: true, opacity: 0.6,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  halo.scale.set(4.6, 3.2, 1);
  halo.position.y = 0.55;
  seal.add(halo);

  // wax drips stretching below
  const drips = [];
  const dripMat = new THREE.MeshPhysicalMaterial({
    color: 0x5c161a, roughness: 0.4, metalness: 0.02, emissive: 0x511418, emissiveIntensity: 0.4, clearcoat: 0.5, clearcoatRoughness: 0.4,
  });
  for (const [dx, dz, len] of [[0.95, 0.25, 0.55], [-0.7, 0.5, 0.75], [0.1, -0.9, 0.42]]) {
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 12), dripMat);
    d.scale.set(1, len * 3.2, 1);
    d.position.set(dx, -0.42 - len * 0.5, dz);
    seal.add(d);
    drips.push(d);
  }

  // ---------- evidence motes streaming into the wax ----------
  const flowCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(2.25, 0.05, 1.05),
    new THREE.Vector3(1.45, 1.15, 1.25),
    new THREE.Vector3(0.55, 2.1, 0.85),
    new THREE.Vector3(0.0, 2.62, 0.25),
    new THREE.Vector3(0.0, 2.95, 0.0),
  ]);
  const N = 200;
  const pos = new Float32Array(N * 3);
  const speeds = new Float32Array(N);
  for (let i = 0; i < N; i++) speeds[i] = 0.035 + Math.random() * 0.045;
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0xff6369, size: 0.055, transparent: true, opacity: 0.6,
    blending: THREE.AdditiveBlending, depthWrite: false, map: makeGlowTexture('255,99,105,'),
  });
  stage.add(new THREE.Points(pGeo, pMat));
  const offs = new Float32Array(N);
  for (let i = 0; i < N; i++) offs[i] = Math.random();
  const dummy = new THREE.Vector3();

  // motes orbiting the seal rim before falling in
  const orbitN = 26;
  const orbitGeo = new THREE.BufferGeometry();
  const orbitPos = new Float32Array(orbitN * 3);
  orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPos, 3));
  const orbitMat = new THREE.PointsMaterial({
    color: 0xffa8ab, size: 0.045, transparent: true, opacity: 0.7,
    blending: THREE.AdditiveBlending, depthWrite: false, map: makeGlowTexture('255,170,173,'),
  });
  stage.add(new THREE.Points(orbitGeo, orbitMat));

  // ambient dust
  const dustN = 40;
  const dustPos = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 9;
    dustPos[i * 3 + 1] = Math.random() * 5.5;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0x9aa0ad, size: 0.03, transparent: true, opacity: 0.26, depthWrite: false,
  })));

  // ---------- backdrop glow ----------
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(), transparent: true, opacity: 0.34,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  glow.scale.set(8.5, 6, 1);
  glow.position.set(-0.6, 3.0, -6.5);
  scene.add(glow);

  // ---------- floor reflection ----------
  const mirror = new THREE.Group();
  mirror.scale.y = -1;
  stage.add(mirror);
  const reflection = seal.clone(true);
  reflection.traverse((o) => {
    if (o.isMesh) {
      o.material = o.material.clone();
      o.material.transparent = true;
      o.material.opacity = (o.material.opacity ?? 1) * 0.13;
      o.material.depthWrite = false;
      o.material.side = THREE.DoubleSide;
    } else if (o.isSprite) {
      o.material = o.material.clone();
      o.material.opacity = 0.07;
    }
  });
  mirror.add(reflection);

  // ---------- pointer parallax ----------
  let px = 0, py = 0, tx = 0, ty = 0;
  if (!REDUCED) {
    addEventListener('pointermove', (e) => {
      tx = (e.clientX / innerWidth - 0.5) * 2;
      ty = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  // ---------- layout ----------
  function place() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const wide = w / h > 1.05;
    stage.position.set(wide ? 1.0 : 0, wide ? -0.4 : -0.95, 0);
    stage.scale.setScalar(wide ? 1.15 : 0.94);
    camera.updateProjectionMatrix();
  }
  place();
  new ResizeObserver(place).observe(canvas);

  // ---------- run ----------
  let running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.02 })
    .observe(canvas);
  const clock = new THREE.Clock();

  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    px += (tx - px) * Math.min(dt * 4, 1);
    py += (ty - py) * Math.min(dt * 4, 1);
    rig.rotation.y = px * 0.08 + Math.sin(t * 0.12) * 0.03;
    rig.rotation.x = py * 0.03;
    camera.position.x = px * 0.4;
    camera.lookAt(stage.position.x * 0.55, 2.15, 0);

    // floor ring pulse (continuous, boosted on stamp)
    ringT = (ringT + dt * 0.4) % 1;
    const stampT = REDUCED ? 0.5 : (t * 0.14) % 1;
    const flare = stampT < 0.14 ? 1 - stampT / 0.14 : 0;
    ring.scale.setScalar(0.4 + ringT * 5.4 + flare * 1.5);
    ring.material.opacity = 0.5 * (1 - ringT) + flare * 0.5;
    ring.position.x = stage.position.x;
    imprint.position.x = stage.position.x;
    for (const m of [impRing.material, impRing2.material, impDot.material]) m.opacity = flare * 0.85;

    // wax breathing: ember glow inside
    const breathe = 0.5 + Math.sin(t * 1.6) * 0.18;
    waxMat.emissiveIntensity = breathe + flare * 1.4;
    ember.position.set(stage.position.x, seal.position.y - 0.1, 0.2);
    ember.intensity = 45 + Math.sin(t * 1.6) * 16 + flare * 130;
    halo.material.opacity = 0.5 + Math.sin(t * 1.6) * 0.12 + flare * 0.4;
    sigilMat.emissiveIntensity = 1.5 + Math.sin(t * 2.2) * 0.5 + flare * 3.2;

    // seal drift and sway
    seal.position.y = 2.7 + Math.sin(t * 0.8) * 0.07;
    seal.rotation.y = Math.sin(t * 0.16) * 0.3;
    seal.rotation.x = 0.1 + Math.sin(t * 0.21) * 0.05;
    reflection.rotation.copy(seal.rotation);
    reflection.position.y = seal.position.y;

    // drip sway
    for (let i = 0; i < drips.length; i++) {
      drips[i].rotation.z = Math.sin(t * 1.1 + i * 2) * 0.08;
    }

    if (!REDUCED) {
      // evidence motes flow in
      for (let i = 0; i < N; i++) {
        offs[i] = (offs[i] + speeds[i] * dt * 2.4) % 1;
        flowCurve.getPointAt(offs[i], dummy);
        pos[i * 3] = stage.position.x + dummy.x * stage.scale.x;
        pos[i * 3 + 1] = stage.position.y + dummy.y * stage.scale.y;
        pos[i * 3 + 2] = dummy.z;
      }
      pGeo.attributes.position.needsUpdate = true;
      pMat.opacity = 0.5 + Math.sin(t * 2) * 0.15;

      // rim orbit
      for (let i = 0; i < orbitN; i++) {
        const a = t * 0.55 + (i / orbitN) * Math.PI * 2;
        const sink = (t * 0.1 + i * 0.037) % 1;
        const r = (1.85 - sink * 0.9) * stage.scale.x;
        orbitPos[i * 3] = stage.position.x + Math.cos(a) * r;
        orbitPos[i * 3 + 1] = stage.position.y + (2.95 - sink * 0.75) * stage.scale.y + Math.sin(t + i) * 0.05;
        orbitPos[i * 3 + 2] = Math.sin(a) * r * 0.55;
      }
      orbitGeo.attributes.position.needsUpdate = true;
      orbitMat.opacity = 0.55 + Math.sin(t * 2.4) * 0.15;
    }

    renderer.render(scene, camera);
  }

  let frames = 0;
  if (DEBUG) window.__heroDebug = {
    scene, camera, renderer,
    get running() { return running; },
    get frames() { return frames; },
  };
  if (REDUCED) frame();
  else renderer.setAnimationLoop(() => {
    if (running && !document.hidden) { frames++; frame(); }
  });
  return {
    getFrames: () => frames,
    dispose() { renderer.setAnimationLoop(null); },
  };
}
