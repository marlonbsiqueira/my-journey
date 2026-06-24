/* ============================================================================
 *  MY JOURNEY — audio.js
 *  Self-contained soundscape — Web Audio API, no external files.
 *
 *    • Ambient music  — World Journey: pentatonic flute melody over drone bass
 *    • Custom track   — user can drop their own audio file via the sound panel
 *    • Whoosh         — filtered-noise travel sweep on every slide transition
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

  const TARGET_VOL = 0.10;
  const mf = m => 440 * Math.pow(2, (m - 69) / 12);

  /* ── Single style: World Journey ─────────────────────────────────────── */
  const PRESETS = [
    {
      id: "world",
      name: { en: "World Journey", pt: "World Journey" },
    },
  ];
  const styleId = "world";
  let mode = "gen";
  let fileEl = null, fileSrc = null;
  let chordTimer = null, melTimer = null, phraseIdx = 0;
  let activeVoices = [];

  const PENTA = [60, 62, 64, 67, 69, 72, 74, 76, 79, 81, 84];
  const MEL_GAPS = [800, 1050, 650, 950, 750, 1200, 600, 900, 1100, 700, 850, 1000];

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

  /* ── AudioContext ─────────────────────────────────────────────────────── */
  function ensureContext() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC({ latencyHint: "playback" }); } catch (e) { try { ctx = new AC(); } catch (e2) { return null; } }
    master = ctx.createGain();
    master.gain.value = muted ? 0 : TARGET_VOL;
    master.connect(ctx.destination);
    try {
      const buf = ctx.createBuffer(1, 1, ctx.sampleRate);
      const src = ctx.createBufferSource(); src.buffer = buf; src.connect(ctx.destination); src.start(0);
    } catch (e) {}
    return ctx;
  }

  /* ── Reverb delay ─────────────────────────────────────────────────────── */
  function makeSpace(output) {
    const pre   = ctx.createGain();
    const delay = ctx.createDelay(1.2); delay.delayTime.value = 0.48;
    const fb    = ctx.createGain();    fb.gain.value = 0.38;
    const tone  = ctx.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 1800;
    pre.connect(delay); delay.connect(tone); tone.connect(fb); fb.connect(delay);
    tone.connect(output); pre.connect(output);
    return pre;
  }

  /* ── Drone pad voice ──────────────────────────────────────────────────── */
  function droneVoice(midi, time, dur, gainVal, detune) {
    const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = mf(midi);
    if (detune) o.detune.value = detune;
    const g = ctx.createGain(); g.gain.value = 0.0001;
    o.connect(g); g.connect(padBus);
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(gainVal, time + 2.5);
    g.gain.setValueAtTime(gainVal, time + dur - 2.5);
    g.gain.linearRampToValueAtTime(0.0001, time + dur);
    o.start(time); o.stop(time + dur + 0.1);
    activeVoices.push({ gain: g, oscs: [o] });
  }

  /* ── Flute note with vibrato ──────────────────────────────────────────── */
  function fluteNote(midi, time) {
    const freq = mf(midi);
    const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = freq;

    const vib  = ctx.createOscillator(); vib.type = "sine"; vib.frequency.value = 5.2;
    const vibG = ctx.createGain(); vibG.gain.value = freq * 0.013;
    vib.connect(vibG); vibG.connect(o.frequency);

    const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 200;
    const g  = ctx.createGain(); g.gain.value = 0.0001;
    o.connect(hp); hp.connect(g); g.connect(melodyBus);

    const dur = 1.3 + Math.random() * 0.6;
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(0.065, time + 0.1);
    g.gain.setValueAtTime(0.065, time + dur - 0.35);
    g.gain.linearRampToValueAtTime(0.0001, time + dur);

    o.start(time);   o.stop(time + dur + 0.1);
    vib.start(time); vib.stop(time + dur + 0.1);
    activeVoices.push({ gain: g, oscs: [o, vib] });
  }

  /* ── Drone chord cycle ────────────────────────────────────────────────── */
  const DRONES = [
    { root: 36, upper: [43, 48, 55] },
    { root: 33, upper: [40, 45, 52] },
    { root: 38, upper: [45, 50, 57] },
    { root: 31, upper: [38, 43, 50] },
  ];
  let droneIdx = 0;

  function scheduleDrone() {
    if (!started || mode !== "gen") return;
    const d = DRONES[droneIdx % DRONES.length]; droneIdx++;
    const now = ctx.currentTime + 0.05, dur = 12;
    droneVoice(d.root,      now, dur, 0.14,  0);
    droneVoice(d.root,      now, dur, 0.09, -4);
    droneVoice(d.root + 12, now, dur, 0.07,  3);
    d.upper.forEach((n, i) => droneVoice(n, now, dur, 0.045 - i * 0.008, i * 2));
    chordTimer = setTimeout(scheduleDrone, 11500);
  }

  /* ── Pentatonic melody scheduler ─────────────────────────────────────── */
  function scheduleMelody() {
    if (!started || mode !== "gen") return;
    const note = PENTA[phraseIdx % PENTA.length]; phraseIdx++;
    if (Math.random() > 0.25) fluteNote(note, ctx.currentTime + 0.04);
    const gap = MEL_GAPS[phraseIdx % MEL_GAPS.length];
    melTimer = setTimeout(scheduleMelody, gap);
  }

  function restartGen() {
    clearTimeout(chordTimer); clearTimeout(melTimer);
    killActiveVoices(0.45);
    droneIdx = 0; phraseIdx = Math.floor(Math.random() * PENTA.length);
    if (mode === "gen") {
      scheduleDrone();
      melTimer = setTimeout(scheduleMelody, 2200);
    }
  }

  /* ── Ambient setup ────────────────────────────────────────────────────── */
  function buildAmbient() {
    ambientGain = ctx.createGain(); ambientGain.gain.value = 0.85; ambientGain.connect(master);
    const space = makeSpace(ambientGain);
    padBus    = ctx.createGain(); padBus.gain.value    = 1.0;  padBus.connect(space);
    melodyBus = ctx.createGain(); melodyBus.gain.value = 0.95; melodyBus.connect(space);
    if (mode === "file" && fileSrc) startFile(); else restartGen();
  }

  /* ── Custom track ─────────────────────────────────────────────────────── */
  function startFile() {
    if (!fileEl) { fileEl = new Audio(); fileEl.loop = true; fileEl.crossOrigin = "anonymous"; }
    fileEl.src = fileSrc;
    try { if (!fileEl._node) { fileEl._node = ctx.createMediaElementSource(fileEl); fileEl._node.connect(master); } } catch (e) {}
    fileEl.play().catch(() => {});
  }
  function stopFile() { if (fileEl) { try { fileEl.pause(); } catch (e) {} } }

  /* ── Noise buffer for whoosh ──────────────────────────────────────────── */
  function makeNoise(seconds) {
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d   = buf.getChannelData(0);
    let last  = 0;
    for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.2; }
    return buf;
  }

  /* ── Travel whoosh ────────────────────────────────────────────────────── */
  let whooshOut = null;
  function getWhooshOut() {
    if (!whooshOut) { whooshOut = ctx.createGain(); whooshOut.gain.value = 1.0; whooshOut.connect(ctx.destination); }
    return whooshOut;
  }

  function whoosh() {
    if (!ensureContext()) return;
    if (ctx.state === "suspended") { ctx.resume().then(_doWhoosh).catch(() => {}); return; }
    _doWhoosh();
  }

  function _doWhoosh() {
    if (!ctx) return;
    try {
      const out = getWhooshOut();
      const now = ctx.currentTime;
      const dur = 1.15;

      /* main sweep — thinner bandpass, Doppler-like arc */
      const noise1 = ctx.createBufferSource(); noise1.buffer = makeNoise(1.8);
      const bp1 = ctx.createBiquadFilter(); bp1.type = "bandpass"; bp1.Q.value = 1.4;
      bp1.frequency.setValueAtTime(380, now);
      bp1.frequency.exponentialRampToValueAtTime(3600, now + 0.28);
      bp1.frequency.exponentialRampToValueAtTime(700, now + dur);
      const g1 = ctx.createGain();
      g1.gain.setValueAtTime(0.0001, now);
      g1.gain.exponentialRampToValueAtTime(3.8, now + 0.14);
      g1.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      noise1.connect(bp1); bp1.connect(g1);

      /* airy hiss layer */
      const noise2 = ctx.createBufferSource(); noise2.buffer = makeNoise(1.8);
      const hp2 = ctx.createBiquadFilter(); hp2.type = "highpass"; hp2.frequency.value = 4200;
      const g2 = ctx.createGain();
      g2.gain.setValueAtTime(0.0001, now);
      g2.gain.exponentialRampToValueAtTime(0.9, now + 0.22);
      g2.gain.exponentialRampToValueAtTime(0.0001, now + dur * 0.75);
      noise2.connect(hp2); hp2.connect(g2);

      /* stereo pan: left → right (plane passing) */
      const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      if (pan) {
        pan.pan.setValueAtTime(-0.8, now);
        pan.pan.linearRampToValueAtTime(0.8, now + dur);
        g1.connect(pan); g2.connect(pan); pan.connect(out);
      } else {
        g1.connect(out); g2.connect(out);
      }

      noise1.start(now); noise1.stop(now + dur + 0.1);
      noise2.start(now); noise2.stop(now + dur + 0.1);
    } catch (e) {}
  }

  /* ── Arrival ping (soft bell) ─────────────────────────────────────────── */
  function ping() {
    if (!ensureContext()) return;
    if (ctx.state === "suspended") { ctx.resume().then(_doPing).catch(() => {}); return; }
    _doPing();
  }

  function _doPing() {
    if (!ctx) return;
    try {
      const out = getWhooshOut();
      const now = ctx.currentTime;
      const freqs = [1047, 1568, 2093];
      const amps  = [0.14, 0.055, 0.025];
      freqs.forEach((freq, i) => {
        const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(amps[i], now + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + i * 0.25);
        o.connect(g); g.connect(out);
        o.start(now); o.stop(now + 2.2 + i * 0.3);
      });
    } catch (e) {}
  }

  /* ── Lifecycle ────────────────────────────────────────────────────────── */
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
    if (ctx.state === "suspended") { ctx.resume().then(doStart).catch(doStart); } else { doStart(); }
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
  function isMuted()     { return muted; }
  function onMuteChange(fn) { muteListeners.push(fn); fn(muted); }

  /* ── Style API (kept for compatibility — only "world" exists now) ─────── */
  function getStyles()     { return PRESETS.map(p => ({ id: p.id, name: p.name })); }
  function getStyle()      { return mode === "file" ? "custom" : styleId; }
  function onStyleChange(fn) { styleListeners.push(fn); fn(getStyle()); }
  function setStyle(id) {
    start();
    if (muted) setMuted(false);
    if (id === "custom") {
      if (fileSrc) { mode = "file"; clearTimeout(chordTimer); clearTimeout(melTimer); killActiveVoices(0.45); startFile(); }
    } else {
      mode = "gen"; stopFile(); restartGen();
    }
    styleListeners.forEach(fn => fn(getStyle()));
  }

  /* ── Custom track API ─────────────────────────────────────────────────── */
  function setCustomTrack(dataURL) { fileSrc = dataURL; try { localStorage.setItem(LS_FILE, dataURL); } catch (e) {} setStyle("custom"); }
  function hasCustomTrack()        { return !!fileSrc; }
  function clearCustomTrack()      { fileSrc = null; localStorage.removeItem(LS_FILE); stopFile(); setStyle("world"); }

  window.JourneyAudio = {
    start, whoosh, ping, setMuted, toggleMuted, isMuted, onMuteChange,
    getStyles, getStyle, setStyle, onStyleChange,
    setCustomTrack, hasCustomTrack, clearCustomTrack,
  };
})();
