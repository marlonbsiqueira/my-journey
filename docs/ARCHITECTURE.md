# Architecture

A small, modular, dependency-light front end. Load order (`index.html`):

1. **Three.js** (CDN, global `THREE`).
2. **`src/js/globe.js`** → `window.Globe` — the WebGL engine. Owns the scene
   (Earth shader, clouds, atmosphere, stars, optional borders) and the cinematic
   camera (spherical orbit, eased fly-to arcs, zoom, drag/wheel input). The lit
   hemisphere tracks the camera so each chapter's location is presentable. Emits
   `ready`, `arrive`, `orbit`. Reused as a living backdrop — no markers in this
   build.
3. **`src/data/journey.js`** → `window.JOURNEY_DATA` — the single content source.
   Ten bilingual (EN/PT) slides, each with a globe `focus`, optional border
   `match`, and media. Editing the story never requires touching code.
4. **`src/js/journey.js`** → `window.JOURNEY` — the controller. Builds slide DOM
   from data, manages language (persisted), prev/next + dots + keyboard + swipe
   navigation (position persisted), and drives the globe per chapter (fly-to,
   border highlight, return-to-orbit for overview slides). Includes the media
   renderers (portrait, image, logos, cards, videos, video-feature, places,
   stat-image) that fall back to labelled placeholders until real files exist.

## Styles
- `src/css/styles.css` — design tokens, reset, buttons, loader, backdrop.
- `src/css/globe.css` — cursor affordances + arrival flash.
- `src/css/journey.css` — the slide system, media, top bar (brand + language),
  bottom navigation and the legibility scrim.

## Coordinate system
`latLngToVec3(lat, lng, r)` maps geographic coordinates to a sphere matching the
equirectangular Earth textures. The camera is stored as spherical
`{ az, polar, radius }`; a chapter's `coordinates` convert to the same basis, so
fly-to is a clean eased interpolation with a mid-flight altitude "lift" for the
cinematic arc.

## Borders
Two GeoJSON layers from Natural Earth: a faint 110m world layer for context, and
the 50m map-subunits layer for crisp highlights matched by the `SUBUNIT`
property (which is why UK constituent nations can highlight independently if you
ever target them).

## Static-preview flag
`globe.js` honours `window.__STILL` (verification builds only): it renders at
reduced resolution and halts the loop shortly after textures load so a frame can
be captured on GPU-less machines. No effect in production.
