// Pipeline scene: the recorder takes itself apart as you scroll.
// Five layers, scroll-driven explode, active-layer highlight with leader lines.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const DEBUG = new URLSearchParams(location.search).has('debug');
const ACCENT = 0xe5484d;

export function initExplodeScene(section, canvas, linesSvg, chipsEl) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
  camera.position.set(3.4, 2.6, 5.0);
  scene.add(camera);

  scene.add(new THREE.AmbientLight(0x34343a, 1.7));
  const key = new THREE.DirectionalLight(0xfff1e4, 3.2);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(ACCENT, 80, 16);
  rim.position.set(-3.5, 1.5, -3);
  scene.add(rim);

  const edgeMat = () => new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 1 });
  const darkMat = () => new THREE.MeshStandardMaterial({
    color: 0x1b1b21, metalness: 0.45, roughness: 0.42, transparent: true, opacity: 1,
  });

  const group = new THREE.Group();
  scene.add(group);

  // ---------- layers, physical stack top(0) -> bottom(4) ----------
  const layers = [];
  const layerRoot = new THREE.Group();
  group.add(layerRoot);

  function addLayer(build, y, anchorOffset) {
    const g = new THREE.Group();
    build(g);
    g.position.y = y;
    g.userData = { baseY: y, mats: [], edges: [], anchor: new THREE.Vector3(anchorOffset[0], y, anchorOffset[2]), op: 1 };
    g.traverse((o) => {
      if (o.isMesh && o.material.transparent !== undefined) {
        o.material = o.material.clone();
        g.userData.mats.push(o.material);
      }
      if (o.isLineSegments) {
        o.material = o.material.clone();
        g.userData.edges.push(o.material);
      }
    });
    layerRoot.add(g);
    layers.push(g);
    return g;
  }

  // layer 0: seal cap (top)
  addLayer((g) => {
    const cap = new THREE.Mesh(new RoundedBoxGeometry(1.15, 0.34, 1.15, 3, 0.05), darkMat());
    g.add(cap);
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(cap.geometry, 22), edgeMat()));
    const seal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.17, 0.17, 0.07, 24),
      new THREE.MeshStandardMaterial({ color: ACCENT, emissive: ACCENT, emissiveIntensity: 1.5, transparent: true })
    );
    seal.position.y = 0.21;
    g.add(seal);
    g.userData.seal = seal.material;
  }, 1.62, [0.6, 0, 0.6]);

  // layer 1: ingest plate
  addLayer((g) => {
    const plate = new THREE.Mesh(new RoundedBoxGeometry(2.25, 0.18, 1.65, 3, 0.04), darkMat());
    g.add(plate);
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(plate.geometry, 22), edgeMat()));
    const studMat = new THREE.MeshStandardMaterial({ color: 0x6a6a72, metalness: 0.85, roughness: 0.3, transparent: true });
    for (let i = 0; i < 10; i++) {
      const s = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.09, 10), studMat);
      s.position.set(-0.9 + (i % 5) * 0.45, 0.13, i < 5 ? -0.45 : 0.45);
      g.add(s);
    }
  }, 1.32, [1.2, 0, 0.9]);

  // layer 2: hash chain core
  addLayer((g) => {
    const core = new THREE.Mesh(new RoundedBoxGeometry(2.0, 0.34, 1.3, 3, 0.05), darkMat());
    g.add(core);
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(core.geometry, 22), edgeMat()));
    const cubeGeo = new RoundedBoxGeometry(0.24, 0.24, 0.24, 2, 0.04);
    for (let i = 0; i < 5; i++) {
      const b = new THREE.Mesh(cubeGeo, darkMat());
      b.position.set(-0.72 + i * 0.36, 0.28, 0);
      g.add(b);
      const be = new THREE.LineSegments(new THREE.EdgesGeometry(cubeGeo), edgeMat());
      b.add(be);
      if (i > 0) {
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-0.72 + (i - 1) * 0.36, 0.28, 0),
            new THREE.Vector3(-0.72 + i * 0.36, 0.28, 0),
          ]),
          new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.45 })
        );
        g.add(line);
      }
    }
  }, 0.98, [1.05, 0, 0.7]);

  // layer 3: TPM secure element
  addLayer((g) => {
    const chip = new THREE.Mesh(new RoundedBoxGeometry(1.5, 0.26, 1.1, 3, 0.04), darkMat());
    g.add(chip);
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(chip.geometry, 22), edgeMat()));
    const padMat = new THREE.MeshStandardMaterial({ color: 0x9a7b3f, metalness: 0.9, roughness: 0.35, transparent: true });
    for (let i = 0; i < 12; i++) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 0.16), padMat);
      p.position.set(-0.62 + (i % 6) * 0.25, 0.15, i < 6 ? -0.4 : 0.4);
      g.add(p);
    }
    const die = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.09, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x0a0a0c, metalness: 0.6, roughness: 0.2, transparent: true })
    );
    die.position.y = 0.17;
    g.add(die);
  }, 0.62, [0.8, 0, 0.6]);

  // layer 4: WORM vault base
  addLayer((g) => {
    const vault = new THREE.Mesh(new RoundedBoxGeometry(2.5, 0.55, 1.9, 3, 0.06), darkMat());
    g.add(vault);
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(vault.geometry, 22), edgeMat()));
    const platter = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.55, 0.06, 36),
      new THREE.MeshStandardMaterial({ color: 0x565660, metalness: 0.85, roughness: 0.25, transparent: true })
    );
    platter.position.set(-0.6, 0.3, 0);
    g.add(platter);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.015, 8, 48),
      new THREE.MeshStandardMaterial({ color: ACCENT, emissive: ACCENT, emissiveIntensity: 0.9, transparent: true })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0.6, 0.3, 0);
    g.add(ring);
    g.userData.ring = ring;
  }, 0.0, [1.3, 0, 1.0]);

  group.position.y = -0.9;

  // ---------- explode params ----------
  // spread per layer index (top layers travel more)
  const SPREAD = [3.1, 1.9, 1.05, 0.45, 0];

  // ---------- sizing ----------
  function place() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const s = Math.min(1, w / 640);
    group.scale.setScalar(1.05 + s * 0.35);
  }
  place();
  new ResizeObserver(place).observe(canvas);

  // ---------- active step ----------
  const chips = [...chipsEl.querySelectorAll('.chip')];
  const steps = [...section.querySelectorAll('.step')];
  let active = -1;

  function setActive(i) {
    if (i === active) return;
    active = i;
    steps.forEach((s) => s.classList.toggle('active', +s.dataset.layer === i));
    chips.forEach((c) => c.classList.toggle('active', +c.dataset.layer === i));
  }

  if (REDUCED) {
    setActive(1);
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) setActive(+e.target.dataset.layer);
      }
    }, { rootMargin: '-42% 0px -42% 0px' });
    steps.forEach((s) => io.observe(s));
  }

  // ---------- leader lines ----------
  const svgNS = 'http://www.w3.org/2000/svg';
  const lineEl = document.createElementNS(svgNS, 'line');
  linesSvg.appendChild(lineEl);
  const hideLines = matchMedia('(max-width: 900px)').matches;

  function drawLeaders() {
    if (hideLines || active < 0) {
      lineEl.setAttribute('opacity', '0');
      return;
    }
    const chip = chipsEl.querySelector('.chip.active');
    if (!chip) return;
    const cb = chip.getBoundingClientRect();
    const sb = canvas.getBoundingClientRect();
    const x1 = cb.right - sb.left;
    const y1 = cb.top + cb.height / 2 - sb.top;

    const anchor = layers[active].userData.anchor.clone();
    layers[active].getWorldPosition ? null : null;
    layers[active].localToWorld(anchor);
    anchor.project(camera);
    const x2 = (anchor.x * 0.5 + 0.5) * sb.width;
    const y2 = (-anchor.y * 0.5 + 0.5) * sb.height;

    lineEl.setAttribute('x1', x1); lineEl.setAttribute('y1', y1);
    lineEl.setAttribute('x2', x2); lineEl.setAttribute('y2', y2);
    lineEl.setAttribute('opacity', '0.55');
  }

  // ---------- scroll progress ----------
  const smooth = (p) => p * p * (3 - 2 * p);
  let prog = 0, progTarget = 0;

  // ---------- run ----------
  let running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.02 })
    .observe(canvas);
  const clock = new THREE.Clock();

  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    // progress from section position
    const rect = section.getBoundingClientRect();
    const vh = innerHeight;
    const total = rect.height - vh;
    progTarget = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    prog += (progTarget - prog) * Math.min(dt * 6, 1);
    const p = REDUCED ? 0.35 : smooth(prog);

    for (let i = 0; i < layers.length; i++) {
      const l = layers[i];
      const spread = SPREAD[i];
      l.position.y = l.userData.baseY + spread * p;
      l.position.x = (i % 2 === 0 ? -1 : 1) * p * 0.28;
      // active dimming
      const want = active < 0 || active === i ? 1 : 0.22;
      l.userData.op += (want - l.userData.op) * Math.min(dt * 8, 1);
      const op = l.userData.op;
      for (const m of l.userData.mats) m.opacity = op;
      for (const m of l.userData.edges) m.opacity = 0.8 * op;
      if (l.userData.seal) l.userData.seal.emissiveIntensity = (1.2 + Math.sin(t * 2.5) * 0.5) * op;
      if (l.userData.ring) l.userData.ring.material.emissiveIntensity = (0.7 + Math.sin(t * 1.8) * 0.3) * op;
    }

    layerRoot.rotation.y = (REDUCED ? 0.5 : t * 0.12) + p * 1.2;
    camera.position.set(3.4, 2.4 + p * 0.7, 5.0 - p * 0.5);
    camera.lookAt(0, 0.9 + p * 0.5, 0);

    renderer.render(scene, camera);
    drawLeaders();
  }

  if (REDUCED) frame();
  else renderer.setAnimationLoop(() => {
    if (running && !document.hidden) frame();
  });
  return {
    dispose() { renderer.setAnimationLoop(null); },
  };
}
