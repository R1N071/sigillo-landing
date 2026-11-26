// Hero scene: an AMR robot carrying the sealed PoPW recorder,
// a rising hash chain and a particle evidence stream. Built from code.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const DEBUG = new URLSearchParams(location.search).has('debug');
const ACCENT = 0xe5484d;

function makeGlowTexture(inner = 'rgba(229,72,77,') {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, inner + '0.9)');
  grad.addColorStop(0.35, inner + '0.28)');
  grad.addColorStop(1, inner + '0)');
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
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0a0b, 12, 44);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  const rig = new THREE.Group();
  camera.position.set(0, 1.7, 6.2);
  rig.add(camera);
  scene.add(rig);

  // ---------- lights ----------
  scene.add(new THREE.AmbientLight(0x3c3c44, 1.6));
  const key = new THREE.DirectionalLight(0xfff2e6, 4.2);
  key.position.set(6, 8, 5);
  scene.add(key);
  const top = new THREE.PointLight(0xffffff, 40, 18);
  top.position.set(1.2, 4.6, 1.6);
  scene.add(top);
  const rim = new THREE.PointLight(ACCENT, 130, 20);
  rim.position.set(-3.2, 2.8, -2);
  scene.add(rim);
  const fill = new THREE.PointLight(0xb8bcc8, 55, 24);
  fill.position.set(3.4, 2.4, 5);
  scene.add(fill);
  const chainLight = new THREE.PointLight(ACCENT, 60, 12);
  chainLight.position.set(-0.62, 3.4, 0.8);
  scene.add(chainLight);

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

  // expanding scan ring: a floor pulse that sells the space
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.96, 1.0, 64),
    new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.7, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = -0.29;
  scene.add(ring);
  let ringT = 0;

  // ---------- materials ----------
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x9ba1ad, metalness: 0.6, roughness: 0.32 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x17171d, metalness: 0.45, roughness: 0.5 });
  const accentMat = new THREE.MeshStandardMaterial({
    color: ACCENT, emissive: ACCENT, emissiveIntensity: 1.8, metalness: 0.2, roughness: 0.4,
  });
  const edgeMat = () => new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 1 });

  // ---------- robot ----------
  const robot = new THREE.Group();

  const chassis = new THREE.Mesh(new RoundedBoxGeometry(2.3, 0.62, 1.45, 4, 0.09), bodyMat);
  chassis.position.y = 0.16;
  robot.add(chassis);

  const lidarBase = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.13, 24), darkMat);
  lidarBase.position.set(0.78, 0.55, 0);
  robot.add(lidarBase);
  const lidarHead = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.07, 24), darkMat);
  lidarHead.position.set(0.78, 0.65, 0);
  const lidarBeam = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, 0.03, 0.34),
    new THREE.MeshBasicMaterial({ color: ACCENT })
  );
  lidarBeam.position.set(0.78, 0.65, 0.2);
  lidarHead.add(lidarBeam);
  robot.add(lidarHead);

  const wheelGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.14, 24);
  const wheels = [];
  for (const [wx, wz] of [[-0.82, 0.78], [0.82, 0.78], [-0.82, -0.78], [0.82, -0.78]]) {
    const w = new THREE.Mesh(wheelGeo, darkMat);
    w.rotation.z = Math.PI / 2;
    w.position.set(wx, 0.02, wz);
    robot.add(w);
    wheels.push(w);
  }

  const strip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.1, 1.06), accentMat);
  strip.position.set(1.16, 0.16, 0);
  robot.add(strip);

  // side trim lines: bright crimson rails that catch the eye
  for (const side of [1, -1]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.03, 0.03), accentMat);
    rail.position.set(0, 0.3, side * 0.74);
    robot.add(rail);
  }

  // ---------- the recorder ----------
  const recorder = new THREE.Group();
  const recBody = new THREE.Mesh(new RoundedBoxGeometry(0.72, 0.5, 0.62, 3, 0.07), darkMat);
  recorder.add(recBody);
  const recEdges = new THREE.LineSegments(new THREE.EdgesGeometry(recBody.geometry, 20), edgeMat());
  recorder.add(recEdges);
  const seal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.16, 0.07, 32),
    new THREE.MeshStandardMaterial({ color: ACCENT, emissive: ACCENT, emissiveIntensity: 2.2, metalness: 0.1, roughness: 0.35 })
  );
  seal.position.y = 0.28;
  recorder.add(seal);
  const sealGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(), transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  sealGlow.scale.set(1.5, 1.5, 1);
  sealGlow.position.y = 0.28;
  recorder.add(sealGlow);
  recorder.position.set(-0.62, 0.72, 0);
  robot.add(recorder);

  scene.add(robot);

  // ---------- hash chain ----------
  const chain = new THREE.Group();
  const blocks = [];
  const blockGeo = new RoundedBoxGeometry(0.46, 0.46, 0.46, 3, 0.06);
  const blockMat = new THREE.MeshStandardMaterial({
    color: 0x1d1d24, metalness: 0.5, roughness: 0.32, emissive: ACCENT, emissiveIntensity: 0.32,
  });
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 1.5 - 0.4;
    const r = 0.66;
    const y = 1.75 + i * 0.62;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const b = new THREE.Mesh(blockGeo, blockMat);
    b.position.set(x, y, z);
    const be = new THREE.LineSegments(new THREE.EdgesGeometry(blockGeo), edgeMat());
    b.add(be);
    b.userData.phase = i * 1.1;
    chain.add(b);
    blocks.push(b);
    if (i > 0) {
      const prev = blocks[i - 1].position;
      const lineGeo = new THREE.BufferGeometry().setFromPoints([prev.clone(), b.position.clone()]);
      const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.75 }));
      line.userData.pair = [i - 1, i];
      chain.add(line);
      b.userData.link = line;
      blocks[i - 1].userData.linkOut = line;
    }
  }
  chain.position.set(-0.62, 0, 0);
  scene.add(chain);

  // ---------- particle evidence stream ----------
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.62, 1.0, 0),
    new THREE.Vector3(-0.9, 1.7, 0.4),
    new THREE.Vector3(-0.3, 2.6, -0.4),
    new THREE.Vector3(-0.9, 3.6, 0.3),
    new THREE.Vector3(-0.62, 4.9, 0),
  ]);
  const N = 170;
  const pos = new Float32Array(N * 3);
  const speeds = new Float32Array(N);
  for (let i = 0; i < N; i++) speeds[i] = 0.05 + Math.random() * 0.06;
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0xff6369, size: 0.045, transparent: true, opacity: 0.55,
    blending: THREE.AdditiveBlending, depthWrite: false, map: makeGlowTexture('rgba(255,99,105,'),
  });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);
  const dummy = new THREE.Vector3();
  let offs = new Float32Array(N);
  for (let i = 0; i < N; i++) offs[i] = Math.random();

  // ---------- backdrop glow ----------
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(), transparent: true, opacity: 0.26,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  glow.scale.set(6.5, 4.2, 1);
  glow.position.set(-1.2, 2.2, -6);
  scene.add(glow);

  // ---------- pointer parallax ----------
  let px = 0, py = 0, tx = 0, ty = 0;
  if (!REDUCED) {
    addEventListener('pointermove', (e) => {
      tx = (e.clientX / innerWidth - 0.5) * 2;
      ty = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  // ---------- layout for copy side ----------
  function place() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const wide = w / h > 1.05;
    robot.position.set(wide ? 1.45 : 0.72, wide ? -0.02 : -0.42, 0);
    robot.scale.setScalar(wide ? 1.32 : 0.92);
    chain.position.set(wide ? 1.45 : 0.72, wide ? -0.02 : -0.42, 0);
    chain.scale.setScalar(wide ? 1.32 : 0.92);
    ring.position.x = wide ? 1.35 : 0;
    ring.position.z = wide ? 0 : 0;
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

    // parallax
    px += (tx - px) * Math.min(dt * 4, 1);
    py += (ty - py) * Math.min(dt * 4, 1);
    rig.rotation.y = px * 0.09 + Math.sin(t * 0.12) * 0.03;
    rig.rotation.x = py * 0.035;
    camera.position.x = px * 0.42;
    camera.lookAt(robot.position.x * 0.55, 1.55, 0);

    // expanding scan ring on the floor
    ringT = (ringT + dt * 0.4) % 1;
    const rs = 0.4 + ringT * 5.2;
    ring.scale.setScalar(rs);
    ring.material.opacity = 0.55 * (1 - ringT);

    if (!REDUCED) {
      for (const w of wheels) w.rotation.x += dt * 2.4;
      lidarHead.rotation.y += dt * 3.2;
      robot.position.y += Math.sin(t * 1.8) * 0.004;
      robot.rotation.y = Math.sin(t * 0.25) * 0.06;
      seal.material.emissiveIntensity = 1.9 + Math.sin(t * 2.6) * 0.6;
      sealGlow.material.opacity = 0.75 + Math.sin(t * 2.6) * 0.2;
      strip.material.emissiveIntensity = 1.6 + Math.sin(t * 2.6 + 1) * 0.5;
      chain.rotation.y = t * 0.12;
      for (const b of blocks) b.position.y += Math.sin(t * 1.4 + b.userData.phase) * 0.0012;
      for (let i = 0; i < N; i++) {
        offs[i] = (offs[i] + speeds[i] * dt * 2.2) % 1;
        curve.getPointAt(offs[i], dummy);
        const base = chain.position;
        pos[i * 3] = base.x + dummy.x;
        pos[i * 3 + 1] = base.y + dummy.y;
        pos[i * 3 + 2] = dummy.z;
      }
      pGeo.attributes.position.needsUpdate = true;
      pMat.opacity = 0.65 + Math.sin(t * 2) * 0.2;
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
