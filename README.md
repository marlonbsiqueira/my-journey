# My Journey — Marlon B. Siqueira

An interactive, **globe-based personal storytelling experience**. A realistic
rotating 3D Earth (Three.js + NASA "Blue Marble" textures) becomes the thread of
a life story — flying chapter by chapter from Belo Horizonte to Portugal, Brazil,
New York, across Europe and back out to space. **Bilingual (EN / PT)**, fully
**data-driven**, with **no API keys, no paid services and no build step.**

Open `index.html` and travel.

---

## ✨ Features

- **Cinematic globe backdrop** — Blue-Marble day texture, night city-lights,
  ocean sun-glint, topographic relief, a drifting cloud layer and a Fresnel
  atmospheric glow. The globe stays **gently zoomed out and slowly rotating**
  throughout, sitting low in frame so it never competes with the content.
- **Soft-filled country highlights** — each chapter's country is filled with a
  soft green glow (not just an outline) and centred on the globe, with a pulsing
  **origin star marker** ("Where It All Began") on Belo Horizonte.
- **Globe-rotation transitions** — chapters fly the camera smoothly to their real
  place on Earth with subtle, eased moves (Google-Earth-Studio style).
- **Bilingual EN / PT** — a top-bar toggle switches every word instantly and the
  choice persists across navigation and reloads.
- **Two-sided storytelling layout** — media (photos / videos / logos) on one
  side, text on the other, alternating per chapter so the screen always feels
  full and balanced.
- **Slideshow navigation** — Previous / Next, a chapter counter, clickable
  progress dots, full keyboard (`←` `→` `Home` `End`) and touch-swipe. Position
  is remembered on reload.
- **17 chapters** — Welcome · Who I Am · Career · Education · Brazil · United
  States · England · Italy · Ireland · Northern Ireland · France · Germany ·
  Spain · Portugal · Achievements · Reflection · Thank You. Each country is its
  own destination, with its **flag**, highlighted territory and experiences.
- **Media-ready** — every image / video slot is a labelled placeholder that
  swaps to your real file the moment you add it.
- **Responsive** — adapts from widescreen presentations to mobile.

---

## 🚀 Run locally

A static site — any static server works (recommended so the border data loads):

```bash
npx serve .            # Node
# or
python3 -m http.server 8080
```

Then open the printed URL.

---

## 🖼️ Add your photos & videos

Drop your files into **`public/images/`** — wait, the slots point at
**`images/…`**, so create an **`images/`** folder next to `index.html` (or change
the paths in `src/data/journey.js`). Use these exact names and they appear
automatically — until then a labelled placeholder is shown:

| Slot | File(s) |
| --- | --- |
| Personal intro | `images/mi1.jpg` |
| Company logos | `images/logo1.jpg` … `images/logo6.jpg` |
| Education | `images/edu1.jpg` … `images/edu4.jpg` |
| Brazil videos | `images/BR_video1.mp4` … `images/BR_video4.mp4` |
| United States | `images/US_liberty.jpg`, `US_wtc.jpg`, `US_brooklyn.jpg`, `US_centralpark.jpg`, `US_nba.jpg`, `US_video1.mp4` |
| England | `images/england1.jpg`, `images/england2.jpg` |
| Italy | `images/italy1.jpg`, `images/italy2.jpg` |
| Ireland | `images/ireland1.jpg`, `images/ireland2.jpg` |
| Northern Ireland | `images/nireland1.jpg`, `images/nireland2.jpg` |
| France | `images/france1.jpg`, `images/france2.jpg` |
| Germany | `images/germany1.jpg`, `images/germany2.jpg` |
| Spain | `images/spain1.jpg`, `images/spain2.jpg` |
| Portugal | `images/portugal1.jpg`, `images/portugal2.jpg` |
| Achievements | `images/sports.jpg`, `images/achv1.jpg`, `images/achv2.jpg` |

> Every image/video slot is a labelled placeholder until you add the file —
> just drop a file with the matching name and it appears automatically. Update
> your email & LinkedIn in the final slide's `contact` block in
> `src/data/journey.js`.

> Recommended: landscape images ~1600×900, MP4 (H.264) videos. Logos look best
> as square ~200×200 with a transparent or dark background.

### Update your contact details
Edit the `contact` array of the final slide in `src/data/journey.js` (email +
LinkedIn placeholders are there now).

---

## ✏️ Edit the story

Everything lives in **[`src/data/journey.js`](src/data/journey.js)** — text (in
both languages), the globe focus point per chapter, and media. Add a chapter by
copying a `slides` block. No other file needs to change.

```js
{
  id: "japan", layout: "story", chapter: "09",
  focus: { coordinates: [138.2, 36.2], dist: 165, match: "Japan" },
  media: { type: "image", src: "images/japan.jpg", label: "images/japan.jpg" },
  en: { kicker: "Japan · …", title: "…", body: "…" },
  pt: { kicker: "Japão · …", title: "…", body: "…" }
}
```

`focus` options: `{ overview: true }` for the full rotating globe, or
`{ coordinates: [lng, lat], dist: 160, match: "CountryName" }` to fly in and
optionally outline a country's border.

---

## 🌐 Deploy (no configuration)

The whole folder is static — deploy it anywhere.

- **GitHub Pages** — push the repo, then *Settings → Pages → Deploy from a
  branch → `main` / root*.
- **Vercel** — `npx vercel`, or import the repo (Framework Preset = *Other*, no
  build command). `vercel.json` is included.
- **Netlify** — drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop),
  or connect the repo (no build command, publish dir = `.`). `netlify.toml` is
  included.

---

## 🎮 Controls

| Action | Control |
| --- | --- |
| Next / Previous chapter | `→` / `←`, swipe, or the nav buttons |
| Jump to a chapter | Click a progress dot |
| First / last chapter | `Home` / `End` |
| Switch language | EN / PT toggle (top right) |
| Rotate / zoom the globe | Drag / scroll |

---

## 🔧 Tech & sources

- **Three.js r160** (CDN) — WebGL rendering.
- **Earth textures** — NASA Blue-Marble / night-lights via
  [three-globe](https://github.com/vasturiano/three-globe); clouds from
  [turban/webgl-earth](https://github.com/turban/webgl-earth).
- **Borders** — [Natural Earth](https://www.naturalearthdata.com/) GeoJSON
  (`nvkelso/natural-earth-vector`).

All sources are free, key-free and CORS-enabled. For a fully offline build,
download them into `public/assets/` and update the URLs in `src/js/globe.js` and
`src/js/journey.js`.

## License
MIT.
