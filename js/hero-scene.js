// Hero scene: the sealed monolith. A floating obsidian cube branded with a
// pulsing wax seal, a hash spine of evidence blocks feeding into it,
// particle streams, a scan sweep and a mirrored floor reflection.
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
  camera.position.set(0, 2.1, 6.4);
  rig.add(camera);
  scene.add(rig);

  // ---------- lights ----------
  scene.add(new THREE.AmbientLight(0x3c3c44, 1.6));
  const key = new THREE.DirectionalLight(0xfff2e6, 4.2);
  key.position.set(6, 8, 5);
  scene.add(key);
  const top = new THREE.PointLight(0xffffff, 46, 22);
  top.position.set(1.2, 5.4, 2.2);
  scene.add(top);
  const rim = new THREE.PointLight(ACCENT, 130, 20);
  rim.position.set(-3.4, 3.0, -2.2);
  scene.add(rim);
  const fill = new THREE.PointLight(0xb8bcc8, 55, 24);
  fill.position.set(3.4, 2.4, 5);
  scene.add(fill);
  const sealLight = new THREE.PointLight(ACCENT, 70, 10);
  scene.add(sealLight);

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

  // expanding scan ring on the floor
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.96, 1.0, 64),
    new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = -0.29;
  scene.add(ring);
  let ringT = 0;

  // ---------- the monolith ----------
  const stage = new THREE.Group(); // moves with layout
  scene.add(stage);

  const monolith = new THREE.Group();
  monolith.position.y = 2.45;
  stage.add(monolith);

  const obsidian = new THREE.MeshStandardMaterial({ color: 0x101014, metalness: 0.72, roughness: 0.3 });
  const cube = new THREE.Mesh(new RoundedBoxGeometry(1.7, 1.7, 1.7, 4, 0.07), obsidian);
  monolith.add(cube);

  const edgeMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.95 });
  monolith.add(new THREE.LineSegments(new THREE.EdgesGeometry(cube.geometry, 18), edgeMat));

  // engraved inner frame
  const innerFrame = new THREE.LineSegments(
    new THREE.EdgesGeometry(new RoundedBoxGeometry(1.42, 1.42, 1.42, 4, 0.05), 18),
    new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.3 })
  );
  monolith.add(innerFrame);

  // corner studs
  const studMat = new THREE.MeshStandardMaterial({ color: 0x2a2c33, metalness: 0.85, roughness: 0.25 });
  const studGeo = new THREE.SphereGeometry(0.055, 12, 12);
  for (const sx of [-0.78, 0.78]) for (const sy of [-0.78, 0.78]) for (const sz of [-0.78, 0.78]) {
    const s = new THREE.Mesh(studGeo, studMat);
    s.position.set(sx, sy, sz);
    monolith.add(s);
  }

  // wax seal on the front face
  const seal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.34, 0.36, 0.09, 40),
    new THREE.MeshStandardMaterial({ color: ACCENT, emissive: ACCENT, emissiveIntensity: 2.2, metalness: 0.1, roughness: 0.4 })
  );
  seal.rotation.x = Math.PI / 2;
  seal.position.set(0, 0.12, 0.87);
  monolith.add(seal);
  const sealRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.42, 0.012, 8, 48),
    new THREE.MeshStandardMaterial({ color: ACCENT, emissive: ACCENT, emissiveIntensity: 1.1, transparent: true, opacity: 0.75 })
  );
  sealRim.position.set(0, 0.12, 0.9);
  monolith.add(sealRim);
  const sealGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(), transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  sealGlow.scale.set(1.9, 1.9, 1);
  sealGlow.position.set(0, 0.12, 1.05);
  monolith.add(sealGlow);

  // scan sweep bar across the monolith
  const sweep = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 0.025, 1.9),
    new THREE.MeshBasicMaterial({ color: 0xff6369, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  sweep.position.y = -0.95;
  monolith.add(sweep);
  let sweepT = 0;

  // ---------- hash spine: blocks feeding the monolith ----------
  const spine = new THREE.Group();
  stage.add(spine);
  const spineCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(1.38, 0.16, 0.72),
    new THREE.Vector3(1.18, 1.2, 0.92),
    new THREE.Vector3(-0.62, 1.52, 0.55)
  );
  const blocks = [];
  const links = [];
  const blockGeo = new RoundedBoxGeometry(0.34, 0.34, 0.34, 2, 0.05);
  const blockMat = new THREE.MeshStandardMaterial({
    color: 0x242430, metalness: 0.5, roughness: 0.32, emissive: ACCENT, emissiveIntensity: 0.55,
  });
  const blockEdgeMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 1 });
  for (let i = 0; i < 8; i++) {
    const t = i / 7;
    const p = spineCurve.getPoint(t);
    const b = new THREE.Mesh(blockGeo, blockMat);
    b.position.copy(p);
    b.add(new THREE.LineSegments(new THREE.EdgesGeometry(blockGeo), blockEdgeMat));
    b.userData = { curveT: t, phase: i * 0.9 };
    spine.add(b);
    blocks.push(b);
    if (i > 0) {
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([blocks[i - 1].position.clone(), p.clone()]),
        new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.55 })
      );
      spine.add(line);
      links.push(line);
    }
  }

  // ---------- particles: up the spine, spiralling into the seal ----------
  const sealWorld = new THREE.Vector3();
  const flowCurve = new THREE.CatmullRomCurve3([
    spineCurve.getPoint(0).clone(),
    spineCurve.getPoint(0.45).clone(),
    spineCurve.getPoint(1).clone(),
    new THREE.Vector3(-0.5, 2.1, 1.6),
    new THREE.Vector3(0, 2.57, 1.6),
    new THREE.Vector3(0, 2.57, 1.05),
  ]);
  const N = 200;
  const pos = new Float32Array(N * 3);
  const speeds = new Float32Array(N);
  for (let i = 0; i < N; i++) speeds[i] = 0.04 + Math.random() * 0.05;
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0xff6369, size: 0.05, transparent: true, opacity: 0.6,
    blending: THREE.AdditiveBlending, depthWrite: false, map: makeGlowTexture('255,99,105,'),
  });
  stage.add(new THREE.Points(pGeo, pMat));
  const offs = new Float32Array(N);
  for (let i = 0; i < N; i++) offs[i] = Math.random();
  const dummy = new THREE.Vector3();

  // ambient dust
  const dustN = 42;
  const dustPos = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 9;
    dustPos[i * 3 + 1] = Math.random() * 5.5;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0x9aa0ad, size: 0.03, transparent: true, opacity: 0.28, depthWrite: false,
  })));

  // ---------- backdrop glow ----------
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(), transparent: true, opacity: 0.3,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  glow.scale.set(7.5, 5, 1);
  glow.position.set(-1.0, 2.9, -6.5);
  scene.add(glow);

  // ---------- floor reflection ----------
  const mirror = new THREE.Group();
  mirror.scale.y = -1;
  stage.add(mirror);
  const reflection = monolith.clone(true);
  reflection.traverse((o) => {
    if (o.isMesh || o.isLineSegments || o.isSprite) {
      if (o.isMesh && o.material) {
        o.material = o.material.clone();
        o.material.transparent = true;
        o.material.opacity = (o.material.opacity ?? 1) * 0.13;
        o.material.depthWrite = false;
        o.material.side = THREE.DoubleSide;
      } else if (o.isLineSegments) {
        o.material = o.material.clone();
        o.material.transparent = true;
        o.material.opacity = 0.1;
      } else if (o.isSprite) {
        o.material = o.material.clone();
        o.material.opacity = 0.08;
      }
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
    stage.position.set(wide ? 1.05 : 0, wide ? -0.35 : -0.85, 0);
    stage.scale.setScalar(wide ? 1.18 : 0.92);
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
    rig.rotation.y = px * 0.09 + Math.sin(t * 0.12) * 0.03;
    rig.rotation.x = py * 0.035;
    camera.position.x = px * 0.42;
    camera.lookAt(stage.position.x * 0.55, 1.95, 0);

    // floor ring pulse
    ringT = (ringT + dt * 0.4) % 1;
    const rs = 0.4 + ringT * 5.2;
    ring.scale.setScalar(rs);
    ring.material.opacity = 0.55 * (1 - ringT);
    ring.position.x = stage.position.x;

    if (!REDUCED) {
      // monolith drift
      monolith.rotation.y = -0.42 + Math.sin(t * 0.18) * 0.3;
      monolith.rotation.x = Math.sin(t * 0.13) * 0.07;
      monolith.position.y = 2.45 + Math.sin(t * 0.9) * 0.07;
      reflection.rotation.copy(monolith.rotation);
      reflection.position.y = monolith.position.y;

      // seal pulse + light
      const pulse = 1.9 + Math.sin(t * 2.4) * 0.55;
      seal.material.emissiveIntensity = pulse;
      sealRim.material.opacity = 0.55 + Math.sin(t * 2.4) * 0.2;
      sealGlow.material.opacity = 0.75 + Math.sin(t * 2.4) * 0.2;
      sealWorld.set(0, 0.12, 1.25);
      monolith.localToWorld(sealWorld);
      sealLight.position.copy(sealWorld);
      sealLight.intensity = 60 + Math.sin(t * 2.4) * 20;

      // scan sweep: travels up the monolith every ~7s
      sweepT = (sweepT + dt * 0.145) % 1;
      const sy = -0.95 + sweepT * 1.9;
      sweep.position.y = sy;
      const fade = sweepT < 0.08 ? sweepT / 0.08 : sweepT > 0.9 ? (1 - sweepT) / 0.1 : 1;
      sweep.material.opacity = 0.5 * fade;
      if (Math.abs(sy - 0.12) < 0.22) {
        seal.material.emissiveIntensity = 3.4; // flare as the sweep crosses the seal
      }

      // spine blocks bob and their links follow
      for (const b of blocks) {
        const base = spineCurve.getPoint(b.userData.curveT);
        b.position.set(base.x, base.y + Math.sin(t * 1.5 + b.userData.phase) * 0.05, base.z);
      }
      for (let i = 0; i < links.length; i++) {
        links[i].geometry.setFromPoints([blocks[i].position, blocks[i + 1].position]);
      }

      // particles along the flow
      for (let i = 0; i < N; i++) {
        offs[i] = (offs[i] + speeds[i] * dt * 2.2) % 1;
        flowCurve.getPointAt(offs[i], dummy);
        pos[i * 3] = stage.position.x + dummy.x * stage.scale.x;
        pos[i * 3 + 1] = stage.position.y + dummy.y * stage.scale.y;
        pos[i * 3 + 2] = dummy.z;
      }
      pGeo.attributes.position.needsUpdate = true;
      pMat.opacity = 0.5 + Math.sin(t * 2) * 0.15;
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
