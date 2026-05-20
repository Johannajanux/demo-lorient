// app.jsx — Root component. Theme, language, navigation, per-scene ambient, voice AI, tweaks.

const { useState, useEffect, useRef, useMemo, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "cinematic",
  "voice": "man",
  "narrationSpeed": 0.95,
  "ambient": false
}/*EDITMODE-END*/;

// One entry per scene: component name + ambient mood key.
const SCENES = [
  { key: 'intro',     comp: 'SceneIntro',          mood: 'sea' },
  { key: 'fondation', comp: 'SceneFondation',      mood: 'port' },
  { key: 'ageor',     comp: 'SceneAgeOr',          mood: 'market' },
  { key: 'guerre',    comp: 'SceneGuerre',         mood: 'march' },
  { key: 'bombing',   comp: 'SceneBombing',        mood: 'airplane' },
  { key: 'recon',     comp: 'SceneReconstruction', mood: 'construction' },
  { key: 'keroman',   comp: 'SceneKeroman',        mood: 'rigging' },
  { key: 'today',     comp: 'SceneToday',          mood: 'gulls' },
  { key: 'festival',  comp: 'SceneFestival',       mood: 'celtic' },
  { key: 'flavors',   comp: 'SceneFlavors',        mood: 'tavern' },
  { key: 'outro',     comp: 'SceneOutro',          mood: 'calm' },
];

/* ─── Ambient sound engine ────────────────────────────────────── */
// Builds a small Web Audio graph per mood. Cleans up between moods.

function makeNoiseSource(ctx, duration = 2) {
  const len = duration * ctx.sampleRate;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1);
  const n = ctx.createBufferSource();
  n.buffer = buf; n.loop = true;
  return n;
}

// Brown-noise via filtering: 1-pole LP at very low freq
function makeBrownNoise(ctx) {
  const n = makeNoiseSource(ctx);
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass'; lp.frequency.value = 80; lp.Q.value = 0.7;
  n.connect(lp);
  return { src: n, out: lp };
}

function buildMood(ctx, mood, master) {
  const stops = [];
  const intervals = [];
  const now = ctx.currentTime;

  const connect = (src, gain = 1) => {
    const g = ctx.createGain();
    g.gain.value = gain;
    src.connect(g).connect(master);
    return g;
  };

  // Each mood is a function returning teardown handles
  switch (mood) {
    case 'sea':
    case 'port':
    case 'gulls': {
      // Long, filtered-noise sea swell with LFO on filter freq
      const n = makeNoiseSource(ctx);
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 260; lp.Q.value = 0.6;
      const ng = ctx.createGain(); ng.gain.value = 0.7;
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.08;
      const lfoG = ctx.createGain(); lfoG.gain.value = 90;
      lfo.connect(lfoG).connect(lp.frequency);
      n.connect(lp).connect(ng).connect(master);
      n.start(); lfo.start();
      stops.push(() => { try { n.stop(); lfo.stop(); } catch {} });

      // Subtle bell drone
      const d = ctx.createOscillator(); d.type = 'sine'; d.frequency.value = 174;
      const dg = ctx.createGain(); dg.gain.value = 0.012;
      d.connect(dg).connect(master); d.start();
      stops.push(() => { try { d.stop(); } catch {} });

      if (mood === 'gulls') {
        // Random short upward chirps
        const chirp = () => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sine';
          const start = ctx.currentTime;
          o.frequency.setValueAtTime(900 + Math.random() * 800, start);
          o.frequency.exponentialRampToValueAtTime(1400 + Math.random() * 600, start + 0.18);
          g.gain.setValueAtTime(0, start);
          g.gain.linearRampToValueAtTime(0.04, start + 0.02);
          g.gain.exponentialRampToValueAtTime(0.001, start + 0.32);
          o.connect(g).connect(master);
          o.start(start); o.stop(start + 0.35);
        };
        intervals.push(setInterval(() => { if (Math.random() < 0.4) chirp(); }, 1800));
      }
      break;
    }

    case 'market': {
      // Warm crowd murmur via band-passed brown noise + occasional bell + drone
      const { src, out } = makeBrownNoise(ctx);
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 320; bp.Q.value = 1.3;
      const g = ctx.createGain(); g.gain.value = 0.6;
      out.connect(bp).connect(g).connect(master);
      src.start();
      stops.push(() => { try { src.stop(); } catch {} });

      // Low pad drone
      const d1 = ctx.createOscillator(); d1.type = 'sawtooth'; d1.frequency.value = 110;
      const d2 = ctx.createOscillator(); d2.type = 'sine'; d2.frequency.value = 165;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420; lp.Q.value = 1;
      const dg = ctx.createGain(); dg.gain.value = 0.025;
      d1.connect(lp); d2.connect(lp); lp.connect(dg).connect(master);
      d1.start(); d2.start();
      stops.push(() => { try { d1.stop(); d2.stop(); } catch {} });

      // Coin / bell tings
      const ting = () => {
        const o = ctx.createOscillator(); o.type = 'triangle';
        const og = ctx.createGain();
        const t0 = ctx.currentTime;
        o.frequency.value = 1200 + Math.random() * 800;
        og.gain.setValueAtTime(0, t0);
        og.gain.linearRampToValueAtTime(0.04, t0 + 0.01);
        og.gain.exponentialRampToValueAtTime(0.001, t0 + 0.6);
        o.connect(og).connect(master);
        o.start(t0); o.stop(t0 + 0.7);
      };
      intervals.push(setInterval(() => { if (Math.random() < 0.3) ting(); }, 1400));
      break;
    }

    case 'march': {
      // Marching boots: low rhythmic thuds + tense filter sweep + minor-key drone
      const drone1 = ctx.createOscillator(); drone1.type = 'sawtooth'; drone1.frequency.value = 65;
      const drone2 = ctx.createOscillator(); drone2.type = 'sawtooth'; drone2.frequency.value = 98;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 240; lp.Q.value = 1.5;
      const dg = ctx.createGain(); dg.gain.value = 0.05;
      drone1.connect(lp); drone2.connect(lp); lp.connect(dg).connect(master);
      drone1.start(); drone2.start();

      // Slow LFO on filter
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.05;
      const lfoG = ctx.createGain(); lfoG.gain.value = 140;
      lfo.connect(lfoG).connect(lp.frequency); lfo.start();

      stops.push(() => { try { drone1.stop(); drone2.stop(); lfo.stop(); } catch {} });

      // Boot thuds: very low filtered noise burst at ~1.6 Hz (96 bpm march)
      const boot = () => {
        const n = makeNoiseSource(ctx, 0.4);
        const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 110; f.Q.value = 1.8;
        const g = ctx.createGain();
        const t0 = ctx.currentTime;
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(0.18, t0 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.22);
        n.connect(f).connect(g).connect(master);
        n.start(t0); n.stop(t0 + 0.25);
      };
      intervals.push(setInterval(boot, 620));  // ~96 bpm
      break;
    }

    case 'airplane': {
      // Propeller drone: square + slight detune + bandpass; bombs every ~6s
      const o1 = ctx.createOscillator(); o1.type = 'square'; o1.frequency.value = 78;
      const o2 = ctx.createOscillator(); o2.type = 'square'; o2.frequency.value = 81;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 180; bp.Q.value = 1.2;
      const dg = ctx.createGain(); dg.gain.value = 0.06;
      o1.connect(bp); o2.connect(bp); bp.connect(dg).connect(master);
      o1.start(); o2.start();

      // Engine drift via LFO on filter
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.12;
      const lfoG = ctx.createGain(); lfoG.gain.value = 60;
      lfo.connect(lfoG).connect(bp.frequency); lfo.start();

      stops.push(() => { try { o1.stop(); o2.stop(); lfo.stop(); } catch {} });

      // Distant explosion: filtered noise burst with low frequency rumble
      const boom = () => {
        const n = makeNoiseSource(ctx, 1.2);
        const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 220; f.Q.value = 0.8;
        const g = ctx.createGain();
        const t0 = ctx.currentTime;
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(0.32, t0 + 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + 1.2);
        n.connect(f).connect(g).connect(master);
        n.start(t0); n.stop(t0 + 1.3);

        // Sub-rumble
        const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = 42;
        const og = ctx.createGain();
        og.gain.setValueAtTime(0, t0);
        og.gain.linearRampToValueAtTime(0.18, t0 + 0.06);
        og.gain.exponentialRampToValueAtTime(0.001, t0 + 1.4);
        o.connect(og).connect(master);
        o.start(t0); o.stop(t0 + 1.5);
      };
      intervals.push(setInterval(() => { if (Math.random() < 0.6) boom(); }, 5500));
      break;
    }

    case 'construction': {
      // Light port ambience + hammer taps + occasional saw buzz
      const n = makeNoiseSource(ctx);
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 320;
      const ng = ctx.createGain(); ng.gain.value = 0.4;
      n.connect(lp).connect(ng).connect(master);
      n.start();
      stops.push(() => { try { n.stop(); } catch {} });

      const hammer = () => {
        const o = ctx.createOscillator(); o.type = 'triangle';
        const og = ctx.createGain();
        const t0 = ctx.currentTime;
        o.frequency.value = 600 + Math.random() * 300;
        og.gain.setValueAtTime(0, t0);
        og.gain.linearRampToValueAtTime(0.08, t0 + 0.005);
        og.gain.exponentialRampToValueAtTime(0.001, t0 + 0.18);
        o.connect(og).connect(master);
        o.start(t0); o.stop(t0 + 0.2);
      };
      intervals.push(setInterval(() => {
        // 3 hammers in quick succession
        hammer(); setTimeout(hammer, 220); setTimeout(hammer, 460);
      }, 3500));
      break;
    }

    case 'rigging': {
      // Wind through halyards: filtered noise + metallic ting
      const n = makeNoiseSource(ctx);
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 380; lp.Q.value = 0.8;
      const ng = ctx.createGain(); ng.gain.value = 0.55;
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.18;
      const lfoG = ctx.createGain(); lfoG.gain.value = 160;
      lfo.connect(lfoG).connect(lp.frequency);
      n.connect(lp).connect(ng).connect(master);
      n.start(); lfo.start();
      stops.push(() => { try { n.stop(); lfo.stop(); } catch {} });

      // Metallic halyard tings
      const ting = () => {
        const o = ctx.createOscillator(); o.type = 'triangle';
        const og = ctx.createGain();
        const t0 = ctx.currentTime;
        o.frequency.value = 1800 + Math.random() * 600;
        og.gain.setValueAtTime(0, t0);
        og.gain.linearRampToValueAtTime(0.025, t0 + 0.008);
        og.gain.exponentialRampToValueAtTime(0.001, t0 + 1.2);
        o.connect(og).connect(master);
        o.start(t0); o.stop(t0 + 1.3);
      };
      intervals.push(setInterval(() => { if (Math.random() < 0.35) ting(); }, 1600));
      break;
    }

    case 'celtic': {
      // Bagpipe-like drone: sawtooth fundamental + fifth + chanter melody on triangle
      const tonic = 220, fifth = 330;
      const d1 = ctx.createOscillator(); d1.type = 'sawtooth'; d1.frequency.value = tonic / 2;
      const d2 = ctx.createOscillator(); d2.type = 'sawtooth'; d2.frequency.value = tonic;
      const d3 = ctx.createOscillator(); d3.type = 'sawtooth'; d3.frequency.value = fifth;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1400; lp.Q.value = 2;
      const dg = ctx.createGain(); dg.gain.value = 0.04;
      d1.connect(lp); d2.connect(lp); d3.connect(lp);
      lp.connect(dg).connect(master);
      d1.start(); d2.start(); d3.start();
      stops.push(() => { try { d1.stop(); d2.stop(); d3.stop(); } catch {} });

      // Chanter — pentatonic melody
      const scale = [220, 247, 277, 330, 370, 440];
      let stepi = 0;
      const chanter = ctx.createOscillator(); chanter.type = 'triangle';
      const cg = ctx.createGain(); cg.gain.value = 0.05;
      chanter.connect(cg).connect(master);
      chanter.frequency.value = scale[0];
      chanter.start();
      stops.push(() => { try { chanter.stop(); } catch {} });
      intervals.push(setInterval(() => {
        stepi = (stepi + (Math.random() < .5 ? 1 : -1) + scale.length) % scale.length;
        chanter.frequency.exponentialRampToValueAtTime(scale[stepi], ctx.currentTime + 0.05);
      }, 320));

      // Bodhran-ish drum every 1.6s
      const drum = () => {
        const o = ctx.createOscillator(); o.type = 'sine';
        const og = ctx.createGain();
        const t0 = ctx.currentTime;
        o.frequency.setValueAtTime(95, t0);
        o.frequency.exponentialRampToValueAtTime(55, t0 + 0.15);
        og.gain.setValueAtTime(0, t0);
        og.gain.linearRampToValueAtTime(0.12, t0 + 0.005);
        og.gain.exponentialRampToValueAtTime(0.001, t0 + 0.3);
        o.connect(og).connect(master);
        o.start(t0); o.stop(t0 + 0.32);
      };
      intervals.push(setInterval(drum, 1600));
      break;
    }

    case 'tavern': {
      // Warm muffled crowd: brown noise + filtered + bandpass at speech freqs + glass clinks
      const { src, out } = makeBrownNoise(ctx);
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 280; bp.Q.value = 1.5;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 600;
      const g = ctx.createGain(); g.gain.value = 0.5;
      out.connect(bp).connect(lp).connect(g).connect(master);
      src.start();
      stops.push(() => { try { src.stop(); } catch {} });

      // Warm low drone
      const d = ctx.createOscillator(); d.type = 'sine'; d.frequency.value = 110;
      const dg = ctx.createGain(); dg.gain.value = 0.02;
      d.connect(dg).connect(master); d.start();
      stops.push(() => { try { d.stop(); } catch {} });

      // Glass clinks: high triangle blip
      const clink = () => {
        const o = ctx.createOscillator(); o.type = 'triangle';
        const og = ctx.createGain();
        const t0 = ctx.currentTime;
        o.frequency.value = 1600 + Math.random() * 800;
        og.gain.setValueAtTime(0, t0);
        og.gain.linearRampToValueAtTime(0.03, t0 + 0.005);
        og.gain.exponentialRampToValueAtTime(0.001, t0 + 0.4);
        o.connect(og).connect(master);
        o.start(t0); o.stop(t0 + 0.42);
        // second clink
        setTimeout(() => {
          const o2 = ctx.createOscillator(); o2.type = 'triangle';
          const og2 = ctx.createGain();
          const t1 = ctx.currentTime;
          o2.frequency.value = 1900 + Math.random() * 400;
          og2.gain.setValueAtTime(0, t1);
          og2.gain.linearRampToValueAtTime(0.025, t1 + 0.005);
          og2.gain.exponentialRampToValueAtTime(0.001, t1 + 0.3);
          o2.connect(og2).connect(master);
          o2.start(t1); o2.stop(t1 + 0.32);
        }, 80);
      };
      intervals.push(setInterval(() => { if (Math.random() < 0.4) clink(); }, 2200));
      break;
    }

    case 'calm':
    default: {
      // Very low ambient pad
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = 174;
      const g = ctx.createGain(); g.gain.value = 0.015;
      o.connect(g).connect(master); o.start();
      stops.push(() => { try { o.stop(); } catch {} });
    }
  }

  return () => {
    intervals.forEach(clearInterval);
    stops.forEach(fn => fn());
  };
}

function useAmbient(active, mood) {
  const ctxRef = useRef(null);
  const teardownRef = useRef(null);

  useEffect(() => {
    if (!active) {
      // tear down
      try { teardownRef.current?.(); } catch {}
      teardownRef.current = null;
      if (ctxRef.current) {
        try {
          ctxRef.current.master.gain.linearRampToValueAtTime(0, ctxRef.current.ctx.currentTime + 0.3);
        } catch {}
        const c = ctxRef.current;
        ctxRef.current = null;
        setTimeout(() => { try { c.ctx.close(); } catch {} }, 600);
      }
      return;
    }

    // Active — create context if missing
    if (!ctxRef.current) {
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        const ctx = new Ctx();
        const master = ctx.createGain();
        master.gain.value = 0;
        master.connect(ctx.destination);
        ctxRef.current = { ctx, master };
        // try to resume (user gesture may be needed)
        ctx.resume?.().catch(() => {});
      } catch (e) {
        console.warn('Audio init failed', e);
        return;
      }
    }

    const { ctx, master } = ctxRef.current;
    try { teardownRef.current?.(); } catch {}
    // fade master down briefly, then back up
    try {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
    } catch {}

    const tearMood = buildMood(ctx, mood, master);
    teardownRef.current = tearMood;

    // fade back up
    try {
      const target = ['airplane', 'celtic'].includes(mood) ? 0.05 : 0.08;
      master.gain.linearRampToValueAtTime(target, ctx.currentTime + 1.5);
    } catch {}

    return () => {
      try { teardownRef.current?.(); } catch {}
      teardownRef.current = null;
    };
  }, [active, mood]);
}

/* ─── App ──────────────────────────────────────────────────────── */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState('fr');
  const [sceneIdx, setSceneIdx] = useState(0);
  const [yannOpen, setYannOpen] = useState(false);
  const mainRef = useRef(null);
  const sceneRefs = useRef([]);

  useEffect(() => {
    document.body.setAttribute('data-theme', t.theme);
  }, [t.theme]);

  useEffect(() => {
    const open = () => setYannOpen(true);
    window.addEventListener('open-yann', open);
    return () => window.removeEventListener('open-yann', open);
  }, []);

  // Per-scene ambient
  useAmbient(t.ambient, SCENES[sceneIdx]?.mood || 'calm');

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let best = 0, bestDist = Infinity;
      sceneRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const d = Math.abs(center - mid);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setSceneIdx(best);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault(); gotoScene(Math.min(SCENES.length - 1, sceneIdx + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault(); gotoScene(Math.max(0, sceneIdx - 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sceneIdx]);

  const gotoScene = (i) => {
    const el = sceneRefs.current[i];
    if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  };

  const labels = window.CONTENT[lang].sceneLabels;
  const ui = window.CONTENT[lang].ui;
  const nav = window.CONTENT[lang].nav;
  const brand = window.CONTENT[lang].brand;
  const moodLabel = {
    sea: lang === 'fr' ? 'mer' : 'sea',
    port: lang === 'fr' ? 'port' : 'port',
    market: lang === 'fr' ? 'marché' : 'market',
    march: lang === 'fr' ? 'soldats en marche' : 'marching soldiers',
    airplane: lang === 'fr' ? 'avions, bombardement' : 'planes, bombing',
    construction: lang === 'fr' ? 'chantier' : 'construction',
    rigging: lang === 'fr' ? 'gréement, vent' : 'rigging, wind',
    gulls: lang === 'fr' ? 'mouettes, rade' : 'gulls, harbour',
    celtic: lang === 'fr' ? 'cornemuses' : 'pipes',
    tavern: lang === 'fr' ? 'taverne' : 'tavern',
    calm: lang === 'fr' ? 'calme' : 'calm',
  };

  const sceneEls = SCENES.map((s, i) => {
    const Comp = window[s.comp];
    if (!Comp) return null;
    const props = { lang };
    if (s.key === 'intro') props.onEmbark = () => gotoScene(1);
    if (s.key === 'outro') props.onRestart = () => gotoScene(0);
    return (
      <div key={s.key} ref={(el) => sceneRefs.current[i] = el}>
        <Comp {...props} />
      </div>
    );
  });

  return (
    <>
      <div className="top-frame">
        <div className="brand">
          <span className="mark">{brand}</span>
          <span className="ord">{String(sceneIdx + 1).padStart(2, '0')} / {String(SCENES.length).padStart(2, '0')}</span>
        </div>
        <div className="tools">
          <button className="lang-pill" onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}>
            <span className={lang === 'fr' ? 'active' : ''}>FR</span>
            <span className="sep">·</span>
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
          </button>
          <button className={"tool-btn" + (t.ambient ? " active" : "")}
            onClick={() => setTweak('ambient', !t.ambient)}
            title={`${ui.ambient} · ${moodLabel[SCENES[sceneIdx]?.mood] || ''}`}>
            {t.ambient ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H3v6h3l5 4V5z" /><path d="M19 9a5 5 0 0 1 0 6" /><path d="M22 6a9 9 0 0 1 0 12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H3v6h3l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <VoiceAI
        open={yannOpen}
        onClose={() => setYannOpen(false)}
        lang={lang}
        sceneIdx={sceneIdx}
        voicePersona={t.voice}
        narrationSpeed={t.narrationSpeed}
        ambientOn={t.ambient}
      />

      <main ref={mainRef}>
        {sceneEls}
      </main>

      <div className="compass">
        <div className="legend">
          {lang === 'fr' ? 'Voyage' : 'Journey'}
          {t.ambient && <span className="mood-badge">· {moodLabel[SCENES[sceneIdx]?.mood] || ''}</span>}
        </div>
        <div className="track">
          {SCENES.map((s, i) => (
            <div key={i}
              className={"step" + (i < sceneIdx ? " done" : "") + (i === sceneIdx ? " active" : "")}
              onClick={() => gotoScene(i)}
              data-label={labels[i]} />
          ))}
        </div>
        <div className="meta">
          <span>{labels[sceneIdx]}</span>
          <span>{String(sceneIdx + 1).padStart(2, '0')}/{String(SCENES.length).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="nav-arrows">
        {sceneIdx > 0 && (
          <button className="nav-btn" onClick={() => gotoScene(sceneIdx - 1)}>
            ← {nav.prev}
          </button>
        )}
        {sceneIdx < SCENES.length - 1 && (
          <button className="nav-btn primary" onClick={() => gotoScene(sceneIdx + 1)}>
            {sceneIdx === 0 ? nav.embark : nav.next} →
          </button>
        )}
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label={lang === 'fr' ? 'Direction esthétique' : 'Aesthetic direction'} />
        <TweakRadio
          label={lang === 'fr' ? 'Thème' : 'Theme'}
          value={t.theme}
          options={[
            { value: 'cinematic', label: lang === 'fr' ? 'Cinéma' : 'Cinema' },
            { value: 'editorial', label: lang === 'fr' ? 'Éditorial' : 'Editorial' },
            { value: 'narratif', label: lang === 'fr' ? 'Chaleur' : 'Warm' },
          ]}
          onChange={(v) => setTweak('theme', v)}
        />
        <TweakSection label={lang === 'fr' ? 'Capitaine Yann' : 'Captain Yann'} />
        <TweakRadio
          label={lang === 'fr' ? 'Voix' : 'Voice'}
          value={t.voice}
          options={[
            { value: 'man', label: lang === 'fr' ? 'Homme' : 'Man' },
            { value: 'woman', label: lang === 'fr' ? 'Femme' : 'Woman' },
            { value: 'breton', label: 'Breton' },
          ]}
          onChange={(v) => setTweak('voice', v)}
        />
        <TweakSlider
          label={lang === 'fr' ? 'Vitesse narration' : 'Narration speed'}
          value={t.narrationSpeed}
          min={0.6} max={1.4} step={0.05} unit="×"
          onChange={(v) => setTweak('narrationSpeed', v)}
        />
        <TweakSection label={lang === 'fr' ? 'Ambiance sonore' : 'Ambient sound'} />
        <TweakToggle
          label={lang === 'fr' ? 'Son ambiant par scène' : 'Per-scene ambient'}
          value={t.ambient}
          onChange={(v) => setTweak('ambient', v)}
        />
        {t.ambient && (
          <div className="mood-list">
            <small>{lang === 'fr' ? 'Scène actuelle' : 'Current scene'}</small>
            <b>{moodLabel[SCENES[sceneIdx]?.mood] || ''}</b>
          </div>
        )}
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
