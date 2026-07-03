/* ============================================================================
 *  MY JOURNEY — journey.js
 *  Slide controller: builds slides from JOURNEY_DATA, handles EN/PT language
 *  (persisted), prev/next + dots + keyboard + swipe navigation, and drives the
 *  globe per chapter (soft-fill country highlight, origin star marker, distant
 *  rotating overview). Two-sided layout: media panel one side, text the other.
 * ========================================================================== */

(function () {
  "use strict";

  const DATA = window.JOURNEY_DATA;
  const SLIDES = DATA.slides;
  const S = DATA.settings || {};
  const NE = "public/data/";

  const $ = sel => document.querySelector(sel);
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const flagUrl = (code) => `public/flags/${code}.png`;

  const ICON = {
    prev: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="62,20 30,50 62,80" stroke="#5cc8ff" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" filter="drop-shadow(0 0 6px #5cc8ff)"/><polyline points="62,20 30,50 62,80" stroke="#e8f8ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    next: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="38,20 70,50 38,80" stroke="#5cc8ff" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" filter="drop-shadow(0 0 6px #5cc8ff)"/><polyline points="38,20 70,50 38,80" stroke="#e8f8ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    video:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M10 9l5 3-5 3z" fill="currentColor"/></svg>',
    email:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>',
    linkedin:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 6.5A1.94 1.94 0 1 1 5 4.56 1.94 1.94 0 0 1 6.94 6.5zM5.2 8.2h3.5V20H5.2zM10.5 8.2H14v1.6h.05a3.85 3.85 0 0 1 3.46-1.9c3.7 0 4.38 2.43 4.38 5.6V20h-3.5v-5.2c0-1.24 0-2.84-1.73-2.84s-2 1.35-2 2.75V20h-3.5z"/></svg>',
  };

  /* ------------------------------------------------- navigation dot icons */
  // Each slide gets a themed icon in the bottom bar; country slides use their
  // flag (see buildDots). Ids not mapped here fall back to flag, then to a
  // plain dot.
  const DOT_ICON = {
    intro: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    about: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
    education: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>',
    career: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>',
    marathon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/></svg>',
    aviation: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',
    achievements: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>',
    "galo-pelo-mundo": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 5.3l1.35-.95c1.82.56 3.37 1.76 4.38 3.34l-.39 1.34-1.35.46L13 9.7V7.3zm-3.35-.95L11 7.3v2.4l-3.99 2.79-1.35-.46-.39-1.34c1.01-1.57 2.56-2.77 4.38-3.34zM7.08 17.11l-1.14.1C4.73 15.81 4 13.99 4 12c0-.12.01-.23.02-.35l1-.73 1.38.48 1.46 4.34-.78 1.37zm7.42 2.48c-.79.26-1.63.41-2.5.41s-1.71-.15-2.5-.41l-.69-1.49.64-1.1h5.11l.64 1.11-.7 1.48zM14.27 15H9.73l-1.35-4.02L12 8.44l3.63 2.54L14.27 15zm3.79 2.21l-1.14-.1-.79-1.37 1.46-4.34 1.39-.47 1 .73c.01.11.02.22.02.34 0 1.99-.73 3.81-1.94 5.21z"/></svg>',
    reflection: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>',
    thanks: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
  };
  DOT_ICON["half-marathon"] = DOT_ICON.marathon;
  DOT_ICON["other-races"] = DOT_ICON.marathon;

  /* ---------------------------------------------------------------- state */
  let lang = localStorage.getItem("journey-lang") || "en";
  let index = 0; // a jornada recomeça sempre do início

  // honour the user's reduced-motion preference: no auto-rotate, no fly
  // animations, no whoosh/flash on slide change
  const REDUCED = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  const t = (obj) => (obj && (obj[lang] != null ? obj[lang] : obj.en)) || "";

  /* --------------------------------------------------- globe + borders */
  document.documentElement.style.setProperty("--accent", S.accent || "#5cc8ff");
  document.documentElement.style.setProperty("--hl", S.highlight || "#7df2a8");
  const globe = new window.Globe({
    canvas: $("#globe-canvas"),
    accent: S.accent, highlightColor: S.highlight,
    autoRotate: REDUCED ? false : S.autoRotate, rotateSpeed: S.rotateSpeed,
    onProgress: pct => { const b = $("#loader .loader-bar > i"); if (b) b.style.width = Math.round(pct * 100) + "%"; },
  });

  let subunitIndex = {};
  function featureFor(match) {
    const polys = subunitIndex[match];
    if (!polys || !polys.length) return null;
    return { type: "Feature", geometry: { type: "MultiPolygon", coordinates: polys } };
  }
  fetch(NE + "ne_110m_admin_0_countries.geojson").then(r => r.json())
    .then(gj => globe.setGlobalBorders(gj)).catch(() => {});
  fetch(NE + "ne_visited_subunits.geojson").then(r => r.json()).then(gj => {
    gj.features.forEach(f => {
      const k = f.properties && f.properties.SUBUNIT, g = f.geometry; if (!k || !g) return;
      const b = subunitIndex[k] || (subunitIndex[k] = []);
      if (g.type === "Polygon") b.push(g.coordinates);
      else if (g.type === "MultiPolygon") g.coordinates.forEach(p => b.push(p));
    });

    // Paint all visited countries with a subtle permanent fill
    const visited = [...new Set(SLIDES.filter(s => s.focus && s.focus.match).map(s => s.focus.match))];
    const visitedFeatures = visited.map(m => featureFor(m)).filter(Boolean);
    if (visitedFeatures.length) globe.setVisitedCountries(visitedFeatures);

    applyFocus(SLIDES[index].focus, true); // re-apply highlight once data is in
  }).catch(() => {});

  /* --------------------------------------------------- focus star marker */
  const markerEl = $("#marker");
  globe.on("marker", p => {
    if (!p) { markerEl.classList.remove("show"); return; }
    markerEl.style.left = p.x + "px";
    markerEl.style.top = p.y + "px";
    markerEl.classList.toggle("show", !!p.front);
  });
  function setMarker(focus) {
    if (focus && focus.marker) {
      markerEl.querySelector(".m-text").textContent = t(focus.markerLabel);
      globe.setMarker(focus.marker);
    } else {
      globe.setMarker(null);
      markerEl.classList.remove("show");
    }
  }

  /* ------------------------------------------------------ media helpers */
  // Media elements are created with data-src only; hydrateMedia() assigns the
  // real src when the slide (or a neighbour) becomes active. The browser then
  // streams natively — no upfront fetch of the whole deck, videos can range-
  // stream, and switching language re-renders without re-downloading anything.
  function placeholder(cls, src, label, opts) {
    opts = opts || {};
    const box = el("div", "ph " + cls);
    if (opts.icon) box.appendChild(el("div", "ph-icon", ICON.video));
    if (label) box.appendChild(el("div", "ph-tag", label));
    const clear = () => { const tg = box.querySelector(".ph-tag"); tg && tg.remove(); const ic = box.querySelector(".ph-icon"); ic && ic.remove(); };
    if (opts.video) {
      const v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = "metadata"; v.controls = !!opts.controls;
      v.setAttribute("loop", "");
      v.setAttribute("muted", "");
      v.setAttribute("playsinline", "");
      v.setAttribute("data-journey-video", "1");
      v.dataset.src = src;
      // belt-and-suspenders: if a browser ignores the loop attribute, restart on end
      v.addEventListener("ended", () => { try { v.currentTime = 0; v.play(); } catch (e) {} });
      v.addEventListener("loadeddata", () => { clear(); syncVideos(); });
      v.addEventListener("error", () => v.remove());
      box.appendChild(v);
    } else {
      const img = new Image();
      img.decoding = "async";
      img.alt = opts.alt || "";
      img.dataset.src = src;
      img.onload = clear;
      img.onerror = () => img.remove();
      box.appendChild(img);
    }
    return box;
  }

  // assign real src to media on the slide i and its direct neighbours
  function hydrateMedia(i) {
    if (!slideEls.length) return;
    for (let k = Math.max(0, i - 1); k <= Math.min(SLIDES.length - 1, i + 1); k++) {
      slideEls[k].querySelectorAll("img[data-src], video[data-src]").forEach(m => {
        m.src = m.dataset.src;
        m.removeAttribute("data-src");
      });
    }
  }

  function galleryItem(it, square) {
    const card = el("div", "g-card");
    const cap = t(it);
    card.appendChild(placeholder("g-media" + (square ? " sq" : ""), it.src, it.src,
      { video: it.video, icon: it.video, controls: it.video, alt: (cap && cap.cap) || "" }));
    if (cap && cap.cap) card.appendChild(el("div", "g-cap", cap.cap));
    return card;
  }

  function renderMedia(m) {
    if (!m) return null;
    switch (m.type) {
      case "image": {
        const wrap = el("div", "m-single");
        wrap.appendChild(placeholder("single-img", m.src, m.label));
        return wrap;
      }
      case "logos": {
        const container = el("div", "m-logos-wrap");
        const wrap = el("div", "m-logos");
        m.items.forEach(it => {
          const card = el("div", "logo-card");
          card.appendChild(placeholder("lc-img", it.src, it.src));
          card.appendChild(el("div", "lc-t", `<span class="lc-n">${t(it).n}</span><span class="lc-r">${t(it).r}</span>`));
          wrap.appendChild(card);
        });
        container.appendChild(wrap);
        if (m.photos && m.photos.length) {
          const photoGrid = el("div", "g-grid career-photos");
          photoGrid.style.gridTemplateColumns = "repeat(2, 1fr)";
          m.photos.forEach(it => photoGrid.appendChild(galleryItem(it)));
          container.appendChild(photoGrid);
        }
        return container;
      }
      case "gallery": {
        const wrap = el("div", "m-gallery");
        if (m.stat) {
          wrap.appendChild(el("div", "stat-banner",
            `<span class="sb-v">${m.stat.value}</span><span class="sb-u">${m.stat.unit}</span><span class="sb-l">${t(m.stat)}</span>`));
        }
        const grid = el("div", "g-grid");
        grid.style.gridTemplateColumns = `repeat(${m.cols || 2}, 1fr)`;
        m.items.forEach(it => grid.appendChild(galleryItem(it)));
        wrap.appendChild(grid);
        return wrap;
      }
      default: return null;
    }
  }

  /* ------------------------------------------------------- build a slide */
  function buildSlide(s, i) {
    const slide = el("section", "slide");
    slide.dataset.layout = s.layout;
    slide.dataset.index = i;
    slide.dataset.media = s.media ? "1" : "0";
    slide.dataset.side = s.side || (i % 2 ? "left" : "right");
    slide.setAttribute("data-screen-label", "Slide " + String(i + 1).padStart(2, "0"));

    const inner = el("div", "slide-inner");
    const text = el("div", "col-text");
    const L = t(s);

    if (s.layout === "story" && s.chapter)
      text.appendChild(el("div", "s-chapter anim", `${t(DATA.ui.chapter)} ${s.chapter}`));

    const kick = el("div", "s-kicker anim");
    if (s.flag) { const f = document.createElement("img"); f.className = "s-flag"; f.src = flagUrl(s.flag); f.alt = ""; kick.appendChild(f); }
    kick.appendChild(el("span", null, L.kicker || ""));
    text.appendChild(kick);

    if (L.title) text.appendChild(el("h1", "s-title anim", L.title));
    if (L.name) text.appendChild(el("div", "s-name anim", L.name));
    if (L.alt) text.appendChild(el("div", "s-alt anim", L.alt));
    if (L.body) text.appendChild(el("p", "s-body anim", L.body));

    if (s.experiences) {
      const chips = el("div", "chips anim");
      (s.experiences[lang] || s.experiences.en).forEach(c => chips.appendChild(el("span", "chip", c)));
      text.appendChild(chips);
    }

    if (L.cta) {
      const cta = el("button", "btn btn-primary anim", `${ICON.play}<span>${L.cta}</span>`);
      cta.onclick = () => go(i + 1);
      text.appendChild(cta);
    }
    if (s.contact) {
      const c = el("div", "contacts anim");
      s.contact.forEach(ct => {
        const a = el("a", "contact-btn", `${ICON[ct.type] || ""}<span>${ct.value}</span>`);
        a.href = ct.href; a.target = "_blank"; a.rel = "noopener noreferrer";
        c.appendChild(a);
      });
      text.appendChild(c);
    }

    inner.appendChild(text);
    const media = renderMedia(s.media);
    if (media) { media.classList.add("col-media", "anim"); inner.appendChild(media); }

    slide.appendChild(inner);
    return slide;
  }

  /* ------------------------------------------------------------- render */
  // autoplay the active slide's videos (muted, so browsers allow it); pause the rest
  function syncVideos() {
    if (!slideEls || !slideEls.length) return;
    slideEls.forEach((slideEl, i) => {
      slideEl.querySelectorAll('video[data-journey-video]').forEach(v => {
        if (i === index) { v.muted = true; const p = v.play(); if (p && p.catch) p.catch(() => {}); }
        else { try { v.pause(); v.currentTime = 0; } catch (e) {} }
      });
    });
  }

  const deck = $("#deck");
  let slideEls = [];
  function renderAll() {
    deck.innerHTML = "";
    slideEls = SLIDES.map((s, i) => { const e = buildSlide(s, i); deck.appendChild(e); return e; });
    slideEls[index].classList.add("active");
    hydrateMedia(index);
    buildDots();
    syncChrome();
    syncVideos();
    updateScrim();
  }

  const dotsWrap = $("#dots");
  function buildDots() {
    dotsWrap.innerHTML = "";
    SLIDES.forEach((s, i) => {
      const d = el("button", "dot");
      // themed icon > country flag > plain dot
      if (DOT_ICON[s.id]) d.innerHTML = DOT_ICON[s.id];
      else if (s.flag) d.innerHTML = `<img src="${flagUrl(s.flag)}" alt="" draggable="false">`;
      else d.appendChild(el("span", "dot-plain"));
      const label = t(s).title || ("Slide " + (i + 1));
      d.title = label;
      d.setAttribute("role", "tab");
      d.setAttribute("aria-label", label);
      d.setAttribute("aria-selected", i === index ? "true" : "false");
      d.onclick = () => go(i);
      dotsWrap.appendChild(d);
    });
  }

  /* globe focus per slide */
  function applyFocus(focus, silent) {
    if (!focus) return;
    setMarker(focus);
    if (focus.overview) { globe.clearHighlight(); globe.returnToOrbit(); return; }
    if (silent) {
      // snap instantly — no fly animation (used on first load)
      globe.snapTo({ coordinates: focus.coordinates, camDistance: focus.dist || 255 });
    } else {
      globe.flyTo({ coordinates: focus.coordinates, camDistance: focus.dist || 255 });
    }
    globe.clearHighlight();
    if (focus.match) {
      const feat = featureFor(focus.match);
      if (feat) setTimeout(() => globe.highlight(feat), silent ? 0 : 700);
    }
  }

  function updateScrim() {
    const s = SLIDES[index];
    const scrim = $("#scrim");
    scrim.dataset.mode = s.layout === "splash" ? "none"
      : (s.layout === "closing" || s.layout === "thanks") ? "center"
      : (slideEls[index].dataset.side === "left" ? "right" : "left");
  }

  function syncChrome() {
    [...dotsWrap.children].forEach((d, i) => {
      d.classList.toggle("on", i === index);
      d.classList.toggle("done", i < index);
      d.setAttribute("aria-selected", i === index ? "true" : "false");
    });
    const countEl = $("#nav-count");
    countEl.innerHTML = `<b>${String(index + 1).padStart(2, "0")}</b> ${t(DATA.ui.of)} ${String(SLIDES.length).padStart(2, "0")}`;
    countEl.setAttribute("aria-live", "polite");
    countEl.setAttribute("aria-label", `${t(DATA.ui.chapter)} ${index + 1} ${t(DATA.ui.of)} ${SLIDES.length}`);
    const prevBtn = $("#prev-btn"), nextBtn = $("#next-btn");
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === SLIDES.length - 1;
    prevBtn.querySelector(".lbl").textContent = t(DATA.ui.prev);
    nextBtn.querySelector(".lbl").textContent = t(DATA.ui.next);
    prevBtn.setAttribute("aria-label", t(DATA.ui.prev));
    nextBtn.setAttribute("aria-label", t(DATA.ui.next));
  }

  /* navigation */
  const flashEl = $("#flight-flash");
  function triggerFlash() {
    if (!flashEl) return;
    flashEl.classList.add("fire");
    setTimeout(() => flashEl.classList.remove("fire"), 650);
  }

  let busy = false;
  function activateSlide() {
    slideEls[index].classList.add("active");
    const inner = slideEls[index].querySelector(".col-text"); if (inner) inner.scrollTop = 0;
    syncChrome(); updateScrim(); syncVideos();
    busy = false;
  }
  function go(i) {
    if (i < 0 || i >= SLIDES.length || i === index || busy) return;
    busy = true;
    const prevIndex = index;
    const prev = slideEls[index];
    index = i;
    prev.classList.remove("active");
    hydrateMedia(index); // começa a baixar a mídia enquanto o globo voa
    if (!REDUCED) {
      if (window.JourneyAudio) window.JourneyAudio.whoosh();
      triggerFlash();
    }
    const focus = SLIDES[index].focus;
    const prevFocus = SLIDES[prevIndex].focus;
    const fromOverview = !prevFocus || prevFocus.overview;
    if (REDUCED) {
      // sem animação de voo: snap directo e slide entra logo
      applyFocus(focus, true);
      setTimeout(activateSlide, 150);
    } else if (focus && !focus.overview && fromOverview) {
      // vindo de overview → snap directo sem animação de voo
      applyFocus(focus, true);
      setTimeout(activateSlide, 500);
    } else if (!focus || focus.overview) {
      applyFocus(focus);
      setTimeout(activateSlide, 400);
    } else {
      applyFocus(focus);
      setTimeout(activateSlide, 2200); // o texto entra enquanto o voo termina
    }
  }
  function next() { go(index + 1); }
  function prev() { go(index - 1); }

  /* language */
  function setLang(l) {
    if (l === lang) return;
    lang = l;
    localStorage.setItem("journey-lang", l);
    $("#lang-en").classList.toggle("on", l === "en");
    $("#lang-pt").classList.toggle("on", l === "pt");
    document.documentElement.lang = l;
    renderAll();
    setMarker(SLIDES[index].focus);
  }

  /* ------------------------------------------------------------- wire up */
  $("#bar-name").textContent = DATA.brand.name;
  $("#lang-en").onclick = () => setLang("en");
  $("#lang-pt").onclick = () => setLang("pt");
  $("#lang-en").classList.toggle("on", lang === "en");
  $("#lang-pt").classList.toggle("on", lang === "pt");
  document.documentElement.lang = lang;

  $("#prev-btn").innerHTML = `${ICON.prev}<span class="lbl"></span>`;
  $("#next-btn").innerHTML = `<span class="lbl"></span>${ICON.next}`;
  $("#prev-btn").onclick = prev;
  $("#next-btn").onclick = next;

  window.addEventListener("keydown", e => {
    const tag = e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(SLIDES.length - 1);
  });

  let tsx = 0, tsy = 0;
  window.addEventListener("touchstart", e => { const a = e.touches[0]; tsx = a.clientX; tsy = a.clientY; }, { passive: true });
  window.addEventListener("touchend", e => {
    const b = e.changedTouches[0]; const dx = b.clientX - tsx, dy = b.clientY - tsy;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) { dx < 0 ? next() : prev(); }
  }, { passive: true });

  /* loader → first slide */
  function hideLoader() {
    const l = $("#loader"); if (!l || l.classList.contains("gone")) return;
    l.style.opacity = "0"; setTimeout(() => l.classList.add("gone"), 900);
  }
  globe.on("ready", () => setTimeout(hideLoader, 250));
  globe.on("arrive", () => { if (window.JourneyAudio) window.JourneyAudio.ping(); });
  setTimeout(hideLoader, 9000);

  renderAll();
  applyFocus(SLIDES[index].focus, true);
  const lt = $("#loader .loader-text"); if (lt) lt.textContent = t(DATA.brand.loading);

  /* ------------------------------------------------------------- audio */
  (function setupAudio() {
    const A = window.JourneyAudio;
    if (!A) return;
    const btn = $("#sound-btn");
    const panel = $("#sound-panel");
    const wrap = $("#sound-wrap");
    const ICON_ON =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M4 9v6h4l5 4V5L8 9H4z"/>' +
      '<path class="wave" d="M16.5 8.5a5 5 0 0 1 0 7"/>' +
      '<path class="wave" d="M19 6a8.5 8.5 0 0 1 0 12"/>' +
      '<path class="slash" d="M3 3l18 18"/></svg>';
    btn.innerHTML = ICON_ON;

    const LBL = {
      title: { en: "Soundtrack", pt: "Trilha sonora" },
      own:   { en: "Use my own music…", pt: "Usar minha música…" },
      mute:  { en: "Mute", pt: "Mudo" },
      custom:{ en: "My music", pt: "Minha música" },
    };
    const EQ = '<span class="sp-eq"><i></i><i></i><i></i></span>';
    const FILE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';

    function buildPanel() {
      const styles = A.getStyles();
      const cur = A.getStyle();
      let html = `<div class="sp-head">${t(LBL.title)}</div>`;
      styles.forEach(s => {
        html += `<button class="sp-item${cur === s.id ? " on" : ""}" data-style="${s.id}">` +
                `<span class="sp-dot"></span><span>${s.name[lang] || s.name.en}</span>${EQ}</button>`;
      });
      if (A.hasCustomTrack()) {
        html += `<button class="sp-item${cur === "custom" ? " on" : ""}" data-style="custom">` +
                `<span class="sp-dot"></span><span>${t(LBL.custom)}</span>${EQ}</button>`;
      }
      html += `<div class="sp-sep"></div>`;
      html += `<button class="sp-file" id="sp-file-btn">${FILE_ICON}<span>${t(LBL.own)}</span></button>`;
      html += `<input type="file" id="sp-file-input" accept="audio/*" style="display:none">`;
      html += `<button class="sp-mute${A.isMuted() ? " on" : ""}" id="sp-mute">${t(LBL.mute)}</button>`;
      panel.innerHTML = html;

      panel.querySelectorAll(".sp-item").forEach(it => {
        it.onclick = () => { A.setStyle(it.dataset.style); buildPanel(); };
      });
      $("#sp-file-btn").onclick = () => $("#sp-file-input").click();
      $("#sp-file-input").onchange = e => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        const r = new FileReader();
        r.onload = () => { A.setCustomTrack(r.result); buildPanel(); };
        r.readAsDataURL(f);
      };
      $("#sp-mute").onclick = () => { A.toggleMuted(); buildPanel(); };
    }

    let open = false;
    function setOpen(o) { open = o; panel.classList.toggle("gone", !o); if (o) { A.start(); buildPanel(); btn.classList.remove("hint"); } }
    btn.onclick = e => { e.stopPropagation(); setOpen(!open); };
    document.addEventListener("click", e => { if (open && !wrap.contains(e.target)) setOpen(false); });

    A.onMuteChange(m => { btn.classList.toggle("muted", m); });

    // Start the soundscape on the first interaction anywhere (autoplay policy).
    function kick() {
      A.start();
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
    }
    window.addEventListener("pointerdown", kick);
    window.addEventListener("keydown", kick);

    if (!A.isMuted()) setTimeout(() => btn.classList.add("hint"), 1200);
  })();

  window.JOURNEY = { go, next, prev, setLang, globe, get index() { return index; }, get lang() { return lang; } };
})();
