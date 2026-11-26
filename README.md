# Sigillo - landing page

The black box for autonomous machines. A tamper-evident, vendor-neutral evidence
layer for the EU Machinery Regulation (EU) 2023/1230, applying 20 January 2027.

Single-page static site. Three code-built 3D scenes (Three.js) with automatic
2D isometric fallbacks for browsers without working WebGL, Motion scroll effects,
anime.js micro-animations, and a live SHA-256 hash-chain tamper demo computed in
the visitor's browser.

## Run locally

```bash
python3 -m http.server 4173
# open http://localhost:4173
```

The page also works opened directly as a file (classic script bundle, no modules).

## Build

```bash
npm install
npm run build   # rebuilds js/bundle.js from js/*.js
```

## Structure

- `index.html`, `css/style.css`
- `js/main.js` - boot, reveals, counters, countdown, 3D facade + fallback switch
- `js/hero-scene.js`, `js/explode.js` - Three.js scenes
- `js/fallback-hero.js`, `js/fallback-explode.js` - 2D canvas isometric fallbacks
- `js/petri.js` - Petri net conformance animation
- `js/tamper.js` - live hash-chain tamper demo (WebCrypto)
- `js/bundle.js` - built output (committed so the site works straight from the repo)
- `vendor/` - not used; libraries are bundled

URL flags: `?renderer=2d` forces the 2D renderer, `?debug` exposes scene internals.

## Deploy

GitHub Pages serves the repository root on `main`.
