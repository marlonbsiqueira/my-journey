/* ============================================================================
 *  MY JOURNEY — audio.js
 *
 *    • Music   — public/audio/journey-theme.mp3 ("Sci-Fi Ambient" by Leberch,
 *                Pixabay Content License), looping, starts with the site.
 *    • Effects — whoosh on every slide change and a soft arrival ping,
 *                synthesised with the Web Audio API.
 *
 *  The sound button toggles the MUSIC only; effects always play (they use
 *  their own output, independent of the music).
 *
 *  Browsers block sound until the page is interacted with, unless sound is
 *  allowed for the site. So start() is tried on load and again on the first
 *  click / key / touch; in Chrome, allowing "Sound" for the site makes the
 *  music start on its own every time (see README).
 *
 *  Public API: window.JourneyAudio = {
 *      start, whoosh, ping, setMuted, toggleMuted, isMuted, onMuteChange }
 * ========================================================================== */

(function () {
  "use strict";

  const TRACK    = "public/audio/journey-theme.mp3";
  const LS_MUTE  = "journey-muted";
  const MUSIC_VOL = 0.28;     // background level (track is loudness-normalised)
  const FADE_IN   = 3000;     // ms
  const FADE_OUT  = 700;

  // localStorage throws in some privacy modes — fall back to in-memory defaults
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  let muted = store.get(LS_MUTE) === "1";
  const muteListeners = [];

  /* ── Music (plain <audio>, so it can start before any Web Audio unlock) ── */
  const music = new Audio();
  music.src = TRACK;
  music.loop = true;
  music.preload = "auto";
  music.volume = 0;
  let playing = false, fadeRAF = 0;

  function fadeTo(target, ms, done) {
    cancelAnimationFrame(fadeRAF);
    const from = music.volume, t0 = performance.now();
    const step = now => {
      // a rAF timestamp can precede t0 (it marks the frame start), so clamp
      // both ends: a volume outside [0, 1] throws and would stall the fade
      const k = Math.max(0, Math.min(1, (now - t0) / ms));
      music.volume = Math.max(0, Math.min(1, from + (target - from) * k));
      if (k < 1) fadeRAF = requestAnimationFrame(step); else if (done) done();
    };
    fadeRAF = requestAnimationFrame(step);
  }

  // Try to (re)start the music; resolves true when it is actually playing.
  function start() {
    unlockEffects();
    if (muted || playing) return Promise.resolve(playing);
    return music.play().then(() => {
      playing = true;
      fadeTo(MUSIC_VOL, FADE_IN);
      return true;
    }).catch(() => false); // blocked until the first interaction
  }

  function setMuted(m) {
    muted = m;
    store.set(LS_MUTE, m ? "1" : "0");
    if (m) {
      fadeTo(0, FADE_OUT, () => { music.pause(); playing = false; });
    } else {
      start();
    }
    muteListeners.forEach(fn => fn(muted));
  }
  function toggleMuted() { setMuted(!muted); }
  function isMuted()     { return muted; }
  function onMuteChange(fn) { muteListeners.push(fn); fn(muted); }

  /* ── Effects: Web Audio context ───────────────────────────────────────── */
  let ctx = null;
  function ensureContext() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC({ latencyHint: "interactive" }); } catch (e) { try { ctx = new AC(); } catch (e2) { return null; } }
    return ctx;
  }
  function unlockEffects() {
    if (ensureContext() && ctx.state === "suspended") ctx.resume().catch(() => {});
  }

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

  // whoosh/ping use their own output, so muting the music never silences them
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

  window.JourneyAudio = { start, whoosh, ping, setMuted, toggleMuted, isMuted, onMuteChange };
})();
