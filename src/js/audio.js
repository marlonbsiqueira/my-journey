/* ============================================================================
 *  MY JOURNEY — audio.js
 *  Self-contained soundscape, synthesized with the Web Audio API. No files,
 *  no dependencies — works offline / on GitHub Pages.
 *
 *    • Ambient MUSIC — choose between several generative styles (slow chord
 *      progressions + a sparse bell melody + reverb). Live-auditionable from the
 *      in-page Sound panel; the choice is persisted.
 *    • Custom track  — the user can drop in their own audio file instead.
 *    • Whoosh        — a filtered-noise travel sweep on every country change.
 *
 *  Public API: window.JourneyAudio = {
 *      start, whoosh, setMuted, toggleMuted, isMuted, onMuteChange,
 *      getStyles, getStyle, setStyle, onStyleChange,
 *      setCustomTrack, hasCustomTrack, clearCustomTrack }
 * ========================================================================== */

(function () {
  "use strict";

  const LS_MUTE  = "journey-muted";
  const LS_STYLE = "journey-music-style";
  const LS_FILE  = "journey-music-file";

  let ctx = null, master = null, ambientGain = null, padBus = null, melodyBus = null;
  let started = false;
  let muted = localStorage.getItem(LS_MUTE) === "1";
  const muteListeners = [], styleListeners = [];

  const TARGET_VOL = 0.10;  // master ceiling
  const mf = m => 440 * Math.pow(2, (m - 69) / 12);   // midi -> Hz

  /* ---- music styles ----------------------------------------------------- */
  const PRESETS = [
    // deep, dark, minor — low register, slow, brooding motif
    { id: "cosmos",   name: { en: "Cosmos",    pt: "Cosmos" },
      dur: 12, lp: 850, w1: "sawtooth", w2: "sine", mGap: 2600,
      phrase: [64, null, 60, null, 62, 60, null, 57, null, 60, 64, null, 67, null, 64, null],
      chords: [ {bass:33,notes:[45,48,52]}, {bass:29,notes:[41,45,48]}, {bass:38,notes:[50,53,57]}, {bass:40,notes:[52,55,59]} ] },
    // bright, hopeful, major — higher register, faster, singable tune
    { id: "horizon",  name: { en: "Horizon",   pt: "Horizonte" },
      dur: 7, lp: 3400, w1: "triangle", w2: "sine", mGap: 1350,
      phrase: [79, 81, 83, null, 86, 83, 81, null, 79, 76, 79, null, 81, null, 79, null],
      chords: [ {bass:48,notes:[60,64,67,71]}, {bass:43,notes:[55,59,62,67]}, {bass:45,notes:[57,60,64,67]}, {bass:41,notes:[53,57,60,64]} ] },
    // cinematic, restless minor (Dm–Bb–F–C) — mid register
    { id: "voyage",   name: { en: "Voyage",    pt: "Viagem" },
      dur: 9, lp: 1500, w1: "sawtooth", w2: "triangle", mGap: 1700,
      phrase: [74, null, 77, 79, null, 81, 79, 77, null, 74, 72, null, 74, null, null, null],
      chords: [ {bass:38,notes:[50,53,57,60]}, {bass:34,notes:[46,50,53,58]}, {bass:41,notes:[53,57,60,65]}, {bass:36,notes:[48,52,55,60]} ] },
    // dreamy, very bright, high shimmering bells
    { id: "aurora",   name: { en: "Aurora",    pt: "Aurora" },
      dur: 13, lp: 2800, w1: "sine", w2: "sine", mGap: 2900,
      phrase: [88, null, null, 91, null, 86, null, 84, null, 88, null, 91, 93, null, 88, null],
      chords: [ {bass:41,notes:[60,64,67,71]}, {bass:43,notes:[62,66,69,73]}, {bass:45,notes:[64,67,71,74]}, {bass:40,notes:[59,62,66,69]} ] },
    // pure low drone, extremely slow, no melody
    { id: "stillness",name: { en: "Stillness", pt: "Quietude" },
      dur: 16, lp: 760, w1: "sine", w2: "sine", mGap: 0, phrase: [],
      chords: [ {bass:36,notes:[48,55,60]}, {bass:33,notes:[45,52,57]}, {bass:38,notes:[50,57,62]} ] },
  ];
  let styleId = localStorage.getItem(LS_STYLE) || "cosmos";
  let chordIdx = 0, chordTimer = null, melodyTimer = null, phraseIdx = 0;
  let mode = "gen";                 // "gen" (generative) or "file" (custom track)
  let fileEl = null, fileSrc = null;

  const preset = () => PRESETS.find(p => p.id === styleId) || PRESETS[0];
  let activeVoices = [];            // currently-sounding voices, so we can cut them on a style switch

  function killActiveVoices(fade) {
    if (!ctx) return;
    const now = ctx.currentTime;
    fade = fade || 0.45;
    activeVoices.forEach(v => {
      try {
        v.gain.gain.cancelScheduledValues(now);
        v.gain.gain.setValueAtTime(Math.max(v.gain.gain.value, 0.0001), now);
        v.gain.gain.linearRampToValueAtTime(0.0001, now + fade);
        v.oscs.forEach(o => { try { o.stop(now + fade + 0.05); } catch (e) {} });
      } catch (e) {}
    });
    activeVoices = [];
  }

  /* ---- context ---------------------------------------------------------- */
  function ensureContext() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC({ latencyHint: "playback" }); } catch (e) { try { ctx = new AC(); } catch (e2) { return null; } }
    master = ctx.createGain();
    master.gain.value = muted ? 0 : TARGET_VOL;
    master.connect(ctx.destination);
    // Unlock audio on iOS — play a zero-length silent buffer immediately on creation
    try {
      const buf = ctx.createBuffer(1, 1, ctx.sampleRate);
      const src = ctx.createBufferSource(); src.buffer = buf; src.connect(ctx.destination); src.start(0);
    } catch (e) {}
    return ctx;
  }

  /* ---- reverb-ish feedback delay --------------------------------------- */
  function makeSpace(output) {
    const pre = ctx.createGain();
    const delay = ctx.createDelay(1.0); delay.delayTime.value = 0.36;
    const fb = ctx.createGain(); fb.gain.value = 0.46;
    const tone = ctx.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 2200;
    pre.connect(delay); delay.connect(tone); tone.connect(fb); fb.connect(delay);
    tone.connect(output); pre.connect(output);
    return pre;
  }

  /* ---- voices ----------------------------------------------------------- */
  function padVoice(midi, time, dur, gain) {
    const p = preset();
    const o1 = ctx.createOscillator(); o1.type = p.w1 || "sine";     o1.frequency.value = mf(midi);
    const o2 = ctx.createOscillator(); o2.type = p.w2 || "triangle"; o2.frequency.value = mf(midi); o2.detune.value = 7;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = p.lp;
    const g = ctx.createGain(); g.gain.value = 0.0001;
    o1.connect(lp); o2.connect(lp); lp.connect(g); g.connect(padBus);
    const atk = 1.8, rel = 3.0;
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(gain, time + atk);
    g.gain.setValueAtTime(gain, time + Math.max(atk, dur - rel));
    g.gain.linearRampToValueAtTime(0.0001, time + dur);
    o1.start(time); o2.start(time); o1.stop(time + dur + 0.1); o2.stop(time + dur + 0.1);
    activeVoices.push({ gain: g, oscs: [o1, o2] });
  }

  function bell(midi, time, gain) {
    const o = ctx.createOscillator();  o.type = "sine";  o.frequency.value = mf(midi);
    const o2 = ctx.createOscillator(); o2.type = "sine"; o2.frequency.value = mf(midi + 12);
    const g = ctx.createGain();  g.gain.value = 0.0001;
    const g2 = ctx.createGain(); g2.gain.value = 0.0001;
    o.connect(g); o2.connect(g2); g.connect(melodyBus); g2.connect(melodyBus);
    const dur = 2.6;
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(gain, time + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    g2.gain.setValueAtTime(0.0001, time);
    g2.gain.exponentialRampToValueAtTime(gain * 0.4, time + 0.02);
    g2.gain.exponentialRampToValueAtTime(0.0001, time + dur * 0.7);
    o.start(time);  o.stop(time + dur + 0.1);
    o2.start(time); o2.stop(time + dur + 0.1);
    activeVoices.push({ gain: g, oscs: [o, o2] });
  }

  function scheduleChord() {
    if (!started || mode !== "gen") return;
    const p = preset();
    const c = p.chords[chordIdx % p.chords.length];
    const now = ctx.currentTime + 0.05;
    const dur = p.dur + 1.2;
    padVoice(c.bass, now, dur, 0.16);
    padVoice(c.bass + 12, now, dur, 0.10);
    c.notes.forEach((n, i) => padVoice(n, now, dur, 0.072 - i * 0.006));
    chordIdx++;
    chordTimer = setTimeout(scheduleChord, p.dur * 1000);
  }

  function scheduleMelody() {
    if (!started || mode !== "gen") return;
    const p = preset();
    if (p.phrase && p.phrase.length) {
      const note = p.phrase[phraseIdx % p.phrase.length];
      phraseIdx++;
      if (note != null) bell(note, ctx.currentTime + 0.05, 0.045);
      melodyTimer = setTimeout(scheduleMelody, p.mGap || 1800);
    }
  }

  function restartGen() {
    clearTimeout(chordTimer); clearTimeout(melodyTimer);
    killActiveVoices(0.45);          // cut the previous style so the new one is heard immediately
    chordIdx = 0; phraseIdx = 0;
    if (mode === "gen") { scheduleChord(); melodyTimer = setTimeout(scheduleMelody, 2500); }
  }

  /* ---- ambient setup ---------------------------------------------------- */
  function buildAmbient() {
    ambientGain = ctx.createGain(); ambientGain.gain.value = 0.85; ambientGain.connect(master);
    const space = makeSpace(ambientGain);
    padBus = ctx.createGain();    padBus.gain.value = 1.0;   padBus.connect(space);
    melodyBus = ctx.createGain(); melodyBus.gain.value = 0.9; melodyBus.connect(space);
    if (mode === "file" && fileSrc) startFile(); else restartGen();
  }

  /* ---- custom track ----------------------------------------------------- */
  function startFile() {
    if (!fileEl) {
      fileEl = new Audio();
      fileEl.loop = true; fileEl.crossOrigin = "anonymous";
    }
    fileEl.src = fileSrc;
    try {
      if (!fileEl._node) { fileEl._node = ctx.createMediaElementSource(fileEl); fileEl._node.connect(master); }
    } catch (e) { /* already connected */ }
    fileEl.play().catch(() => {});
  }
  function stopFile() { if (fileEl) { try { fileEl.pause(); } catch (e) {} } }

  function makeNoise(seconds) {
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.2; }
    return buf;
  }

  /* ---- travel whoosh ---------------------------------------------------- */
  function whoosh() {
    if (!ctx || muted) return;
    if (ctx.state === "suspended") { ctx.resume().then(() => _doWhoosh()).catch(() => {}); return; }
    _doWhoosh();
  }
  function _doWhoosh() {
    if (!ctx || muted) return;
    try {
      const now = ctx.currentTime, dur = 1.5;
      const src = ctx.createBufferSource(); src.buffer = makeNoise(2);
      const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 1.1;
      bp.frequency.setValueAtTime(180, now);
      bp.frequency.exponentialRampToValueAtTime(1600, now + 0.5);
      bp.frequency.exponentialRampToValueAtTime(260, now + dur);
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass";
      lp.frequency.setValueAtTime(2400, now);
      lp.frequency.exponentialRampToValueAtTime(700, now + dur);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(4.0, now + 0.28);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      src.connect(bp); bp.connect(lp); lp.connect(g);
      if (pan) {
        pan.pan.setValueAtTime(-0.6, now);
        pan.pan.linearRampToValueAtTime(0.6, now + dur);
        g.connect(pan); pan.connect(master);
      } else {
        g.connect(master);
      }
      const sub = ctx.createOscillator(); sub.type = "sine";
      sub.frequency.setValueAtTime(140, now); sub.frequency.exponentialRampToValueAtTime(48, now + 0.9);
      const subG = ctx.createGain();
      subG.gain.setValueAtTime(0.0001, now);
      subG.gain.exponentialRampToValueAtTime(2.5, now + 0.12);
      subG.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
      sub.connect(subG); subG.connect(master);
      src.start(now); src.stop(now + dur + 0.05);
      sub.start(now); sub.stop(now + 1.2);
    } catch (e) {}
  }

  /* ---- lifecycle -------------------------------------------------------- */
  function start() {
    if (!ensureContext()) return;
    const doStart = () => {
      if (started) return;
      started = true;
      if (localStorage.getItem(LS_FILE)) { fileSrc = localStorage.getItem(LS_FILE); mode = "file"; }
      buildAmbient();
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(0.0001, now);
      master.gain.linearRampToValueAtTime(muted ? 0 : TARGET_VOL, now + 2.5);
    };
    // On mobile (especially iOS) ctx.resume() is async — await it before
    // scheduling any audio so notes aren't lost while the context is still suspended.
    if (ctx.state === "suspended") {
      ctx.resume().then(doStart).catch(doStart);
    } else {
      doStart();
    }
  }

  function setMuted(m) {
    muted = m;
    localStorage.setItem(LS_MUTE, m ? "1" : "0");
    if (master && ctx) {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(m ? 0 : TARGET_VOL, now + 0.4);
    }
    if (m) stopFile(); else if (started && mode === "file") startFile();
    muteListeners.forEach(fn => fn(muted));
  }
  function toggleMuted() { setMuted(!muted); }
  function isMuted() { return muted; }
  function onMuteChange(fn) { muteListeners.push(fn); fn(muted); }

  /* ---- style selection (live audition) ---------------------------------- */
  function getStyles() { return PRESETS.map(p => ({ id: p.id, name: p.name })); }
  function getStyle() { return mode === "file" ? "custom" : styleId; }
  function onStyleChange(fn) { styleListeners.push(fn); fn(getStyle()); }
  function setStyle(id) {
    start();                       // ensure engine running (user gesture)
    if (muted) setMuted(false);    // selecting a style implies "play it"
    if (id === "custom") { if (fileSrc) { mode = "file"; clearTimeout(chordTimer); clearTimeout(melodyTimer); killActiveVoices(0.45); startFile(); } }
    else { mode = "gen"; stopFile(); styleId = id; localStorage.setItem(LS_STYLE, id); restartGen(); }
    styleListeners.forEach(fn => fn(getStyle()));
  }

  /* ---- custom track API ------------------------------------------------- */
  function setCustomTrack(dataURL) {
    fileSrc = dataURL;
    try { localStorage.setItem(LS_FILE, dataURL); } catch (e) { /* too big for LS — keep in memory only */ }
    setStyle("custom");
  }
  function hasCustomTrack() { return !!fileSrc; }
  function clearCustomTrack() {
    fileSrc = null; localStorage.removeItem(LS_FILE); stopFile();
    setStyle(styleId || "cosmos");
  }

  window.JourneyAudio = {
    start, whoosh, setMuted, toggleMuted, isMuted, onMuteChange,
    getStyles, getStyle, setStyle, onStyleChange,
    setCustomTrack, hasCustomTrack, clearCustomTrack,
  };
})();
