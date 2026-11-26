// Sigillo landing: entrance motion, scroll reveals, counters,
// the countdown to 20 January 2027, and module init.
import { animate, inView, scroll } from 'motion';
import { initHeroScene } from './hero-scene.js';
import { initExplodeScene } from './explode.js';
import { initPetri } from './petri.js';
import { initTamper } from './tamper.js';
import { initFallbackHero } from './fallback-hero.js';
import { initFallbackExplode } from './fallback-explode.js';

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- hero entrance safety ----------
function heroSafety() {
  setTimeout(() => {
    document.querySelectorAll('.hero h1, .hero-sub, .hero-ctas').forEach((el) => {
      const op = parseFloat(getComputedStyle(el).opacity);
      if (op < 0.99) {
        el.style.animation = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
  }, 1600);
}

// ---------- scroll progress ----------
function progressBar() {
  if (REDUCED) return;
  scroll(animate('#progress', { scaleX: [0, 1], ease: 'linear' }));
}

// ---------- reveals ----------
function reveals() {
  if (REDUCED) return;
  const els = [...document.querySelectorAll(
    '.clause, .ledger-row, .tier, .stat, .fact, .quote-card, .demo-shell, .section-h'
  )];
  const shown = new Set();
  const show = (el) => {
    if (shown.has(el)) return;
    shown.add(el);
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  };
  els.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    inView(el, () => show(el), { amount: 0.25 });
  });
  // insurance: never leave content invisible if inView misses
  setTimeout(() => els.forEach(show), 3200);
}

// ---------- counters ----------
function counters() {
  const els = document.querySelectorAll('[data-count]');
  const run = (el) => {
    const target = +el.dataset.count;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '%';
    if (REDUCED) { el.textContent = prefix + target + suffix; return; }
    const t0 = performance.now();
    const dur = 1400;
    function tick(now) {
      const t = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(target * e) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  els.forEach((el) => io.observe(el));
}

// ---------- countdown ----------
const DEADLINE = new Date('2027-01-20T00:00:00+01:00').getTime();

function pad(n) { return String(n).padStart(2, '0'); }

function countdown() {
  const daysEl = document.getElementById('count-days');
  const clockEl = document.getElementById('count-clock');
  const ctaEl = document.getElementById('cta-count');
  function update() {
    const diff = Math.max(0, DEADLINE - Date.now());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000) % 24;
    const mins = Math.floor(diff / 60000) % 60;
    const secs = Math.floor(diff / 1000) % 60;
    if (daysEl) daysEl.textContent = days;
    if (clockEl) clockEl.textContent = `${pad(days)} : ${pad(hours)} : ${pad(mins)} : ${pad(secs)}`;
    if (ctaEl) ctaEl.textContent = `${days} days to go`;
  }
  update();
  setInterval(update, 1000);
}

// ---------- magnetic buttons ----------
function magnetic() {
  if (REDUCED) return;
  const els = document.querySelectorAll('.magnetic');
  els.forEach((el) => {
    let raf = 0;
    let cx = 0, cy = 0, tx = 0, ty = 0;
    const strength = 0.18;
    function tick() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(tick);
    }
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      if (!raf) raf = requestAnimationFrame(tick);
    });
    el.addEventListener('pointerleave', () => {
      tx = 0; ty = 0;
      setTimeout(() => {
        if (Math.abs(cx) < 0.4 && Math.abs(cy) < 0.4) {
          cancelAnimationFrame(raf); raf = 0;
          el.style.transform = '';
          cx = cy = 0;
        }
      }, 350);
    });
  });
}

// ---------- 3D boot with guaranteed 2D fallback ----------
let using2D = false;
let heroHandle = null;
let explodeHandle = null;

function heroCanvasProbe() {
  const c = document.getElementById('hero-canvas');
  if (!c) return 0;
  try {
    const probe = document.createElement('canvas');
    probe.width = 72;
    probe.height = 45;
    const g = probe.getContext('2d');
    g.drawImage(c, 0, 0, 72, 45);
    const d = g.getImageData(0, 0, 72, 45).data;
    let bright = 0;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i] + d[i + 1] + d[i + 2] > 60) bright++;
    }
    return bright;
  } catch {
    return 0;
  }
}

function switchTo2D(reason) {
  if (using2D) return;
  using2D = true;
  console.warn('[sigillo] 2D renderer active:', reason);
  document.documentElement.setAttribute('data-renderer', '2d');
  try { if (heroHandle) heroHandle.dispose(); } catch {}
  try { if (explodeHandle) explodeHandle.dispose(); } catch {}
  try {
    initFallbackHero(document.querySelector('.hero'), document.getElementById('hero-canvas'));
  } catch (e) { console.error('[sigillo] fallback hero', e); }
  try {
    initFallbackExplode(
      document.querySelector('.pipeline'),
      document.getElementById('explode-canvas'),
      document.getElementById('layer-chips')
    );
  } catch (e) { console.error('[sigillo] fallback explode', e); }
}

function boot3D() {
  if (new URLSearchParams(location.search).get('renderer') === '2d') {
    switchTo2D('forced by URL');
    return;
  }
  let ok = false;
  if (webglAvailable()) {
    try {
      heroHandle = initHeroScene(document.getElementById('hero-canvas'), {
        onFatal: () => switchTo2D('webgl context lost'),
      });
      explodeHandle = initExplodeScene(
        document.querySelector('.pipeline'),
        document.getElementById('explode-canvas'),
        document.getElementById('leader-lines'),
        document.getElementById('layer-chips')
      );
      ok = true;
    } catch (e) {
      console.error('[sigillo] webgl init failed', e);
    }
  }
  if (!ok) {
    switchTo2D(webglAvailable() ? 'webgl init failed' : 'webgl unavailable');
    return;
  }
  document.documentElement.setAttribute('data-renderer', 'webgl');
  // watchdog: if the canvas draws nothing (silent GPU failure), switch to 2D
  const check = (attempt) => {
    setTimeout(() => {
      if (using2D) return;
      if (document.visibilityState !== 'visible') {
        if (attempt < 6) check(attempt + 1);
        return;
      }
      const frames = heroHandle ? heroHandle.getFrames() : 0;
      if (frames < 3) { switchTo2D('render loop idle'); return; }
      if (heroCanvasProbe() < 12) { switchTo2D('blank canvas'); }
    }, attempt === 0 ? 2200 : 1600);
  };
  check(0);
}

// ---------- boot ----------
function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function safe(label, fn) {
  try { fn(); } catch (e) { console.error('[sigillo]', label, e); }
}

function boot() {
  window.__sigilloBooted = true;
  safe('progress', () => progressBar());
  safe('reveals', () => reveals());
  safe('heroSafety', () => heroSafety());
  safe('counters', () => counters());
  safe('countdown', () => countdown());
  safe('magnetic', () => magnetic());

  safe('3d', () => boot3D());

  safe('petri', () => initPetri(document.getElementById('petri-canvas'), document.getElementById('deviation-feed')));
  safe('tamper', () => initTamper());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
