// scenes.jsx — All chapters of the Lorient demo + reusable Modal + photo slots.

const { useState, useEffect, useRef, useMemo } = React;

/* ─── Reusable bits ──────────────────────────────────────────── */
function SceneHead({ year, eyebrow, title, lead }) {
  return (
    <div className="scene-head">
      <div className="year display">{year}</div>
      <div className="title-block">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="display">{title}</h2>
        <p className="lead">{lead}</p>
      </div>
    </div>
  );
}

// Image slot — wraps the <image-slot> web component.
// `id` MUST be unique-per-prototype so the dropped image persists across reload.
function PhotoSlot({ slotId, hint, shape = "rect", style, className = "", radius }) {
  if (!slotId) return null;
  return (
    <image-slot
      id={slotId}
      shape={shape}
      radius={radius}
      placeholder={hint}
      class={className}
      style={style}
    />
  );
}

function CoastlineSVG() {
  return (
    <svg className="coastline" viewBox="0 0 500 400" preserveAspectRatio="none">
      <path d="M 0,80 Q 60,90 100,130 Q 140,160 170,200 Q 200,240 190,280 Q 180,330 140,370 L 0,400 Z"
        fill="rgba(201,152,93,.10)" stroke="rgba(201,152,93,.5)" strokeWidth=".7" />
      <path d="M 500,60 Q 440,80 400,120 Q 360,160 350,200 Q 340,240 360,280 Q 380,330 440,370 L 500,400 L 500,60 Z"
        fill="rgba(201,152,93,.10)" stroke="rgba(201,152,93,.5)" strokeWidth=".7" />
      <path d="M 220,140 Q 250,200 240,260 Q 230,310 260,360" fill="none"
        stroke="rgba(201,152,93,.55)" strokeWidth=".8" strokeDasharray="3 4" />
      <ellipse cx="250" cy="40" rx="40" ry="12" fill="rgba(201,152,93,.08)" stroke="rgba(201,152,93,.4)" strokeWidth=".5" />
    </svg>
  );
}

function CompassRose() {
  return (
    <svg className="compass-rose" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="none" stroke="currentColor" strokeWidth=".5" />
      <circle cx="30" cy="30" r="2" fill="currentColor" />
      <path d="M 30,6 L 33,30 L 30,54 L 27,30 Z" fill="currentColor" opacity=".7" />
      <path d="M 6,30 L 30,27 L 54,30 L 30,33 Z" fill="currentColor" opacity=".3" />
      <text x="30" y="4" textAnchor="middle" fontSize="6" fill="currentColor" fontFamily="JetBrains Mono">N</text>
    </svg>
  );
}

/* ─── Generic Modal ──────────────────────────────────────────── */
function Modal({ open, onClose, children, size = "lg", labelClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal ${size}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label={labelClose || "Close"}>×</button>
        {children}
      </div>
    </div>
  );
}

/* ─── SCENE 0 · INTRO ────────────────────────────────────────── */
function SceneIntro({ lang, onEmbark }) {
  const t = window.CONTENT[lang].intro;
  const heroRef = useRef(null);

  useEffect(() => {
    const handle = (e) => {
      if (!heroRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      const ship = heroRef.current.querySelector('.ship-silhouette');
      const sub = heroRef.current.querySelector('.sub2');
      if (ship) ship.style.transform = `translate(calc(-50% + ${x * 0.6}px), ${y * 0.4}px)`;
      if (sub) sub.style.transform = `translate(${x * 0.3}px, ${y * 0.2}px)`;
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <section className="scene intro" data-screen-label="01 Embarquement" ref={heroRef}>
      <div className="sea" />
      <div className="horizon" />
      <svg className="ship-silhouette" viewBox="0 0 600 240" preserveAspectRatio="xMidYMid meet">
        <path d="M 100,180 Q 300,210 500,180 L 480,200 L 120,200 Z" fill="currentColor" opacity=".9" />
        <line x1="300" y1="180" x2="300" y2="20" stroke="currentColor" strokeWidth="2" />
        <line x1="200" y1="180" x2="200" y2="60" stroke="currentColor" strokeWidth="1.5" />
        <line x1="400" y1="180" x2="400" y2="50" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 300,30 Q 340,80 300,130 Q 260,80 300,30 Z" fill="currentColor" opacity=".6" />
        <path d="M 300,80 Q 360,120 300,160 Q 240,120 300,80 Z" fill="currentColor" opacity=".5" />
        <path d="M 200,70 Q 230,100 200,140 Q 175,100 200,70 Z" fill="currentColor" opacity=".55" />
        <path d="M 400,60 Q 430,95 400,140 Q 375,95 400,60 Z" fill="currentColor" opacity=".55" />
        <line x1="500" y1="180" x2="555" y2="160" stroke="currentColor" strokeWidth="1.5" />
        <line x1="300" y1="20" x2="300" y2="6" stroke="currentColor" strokeWidth="1" />
        <path d="M 300,8 L 318,12 L 300,20 Z" fill="currentColor" opacity=".8" />
      </svg>

      <div className="content">
        <div className="eyebrow" style={{ marginBottom: '32px' }}>{t.eyebrow}</div>
        <h1>{t.titleA}<span className="ampersand">'</span>{t.titleB}</h1>
        <div className="sub">{t.sub}</div>
        <div className="sub2 display">{t.tagline}</div>
        <button className="embark" onClick={onEmbark}>
          <span>{t.cta}</span>
          <span className="arrow" />
        </button>
      </div>

      <div className="scroll-hint">
        <span>{t.hint}</span>
        <span className="line" />
      </div>
      <div className="meta-corner">
        <b>{t.meta1}</b>
        <span>{t.meta2}</span>
      </div>
    </section>
  );
}

/* ─── SCENE 1 · FONDATION ────────────────────────────────────── */
function SceneFondation({ lang }) {
  const t = window.CONTENT[lang].fondation;
  const [active, setActive] = useState(null);
  const [explored, setExplored] = useState(new Set());
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const pois = t.pois;
  const cur = active != null ? pois[active] : null;

  useEffect(() => {
    if (!mapRef.current || leafletRef.current || !window.L) return;
    const L = window.L;
    const map = L.map(mapRef.current, {
      center: [47.733, -3.360],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: false,
      keyboard: false,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      subdomains: 'abc',
    }).addTo(map);
    leafletRef.current = map;
    return () => { leafletRef.current.remove(); leafletRef.current = null; };
  }, []);

  return (
    <section className="scene" data-screen-label="02 Fondation 1666">
      <SceneHead year={t.year} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <div className="foundation">
        <div className="left">
          <div className={"poi-panel" + (cur ? "" : " empty")}>
            {cur ? (
              <>
                <div className="num">{String((active ?? 0) + 1).padStart(2, '0')} / {String(pois.length).padStart(2, '0')}</div>
                {cur.slot && (
                  <div className="poi-archive">
                    <PhotoSlot slotId={cur.slot.id} hint={cur.slot.hint} className="poi-img" />
                  </div>
                )}
                <div className="date">{cur.date}</div>
                <h3>{cur.title}</h3>
                <p>{cur.body}</p>
                <div className="quote">
                  {cur.quote}
                  <cite>{cur.cite}</cite>
                </div>
              </>
            ) : (
              <div className="hint">{t.emptyHint}</div>
            )}
          </div>
          <div className="poi-tally">
            {pois.map((_, i) => <div key={i} className={"pip" + (explored.has(i) ? " done" : "")} />)}
            <span style={{ marginLeft: 'auto' }}>{explored.size} / {pois.length} {t.tally}</span>
          </div>
        </div>

        <div className="right">
          <div className="map-canvas">
            <div ref={mapRef} className="leaflet-map-container" />
            <div className="legend-top"><b>{t.mapTitle}</b><br />{t.mapSubtitle}</div>
            {pois.map((p, i) => (
              <button key={i}
                className={"poi" + (explored.has(i) ? " done" : "") + (active === i ? " active" : "")}
                style={{ left: `${p.coord.x}%`, top: `${p.coord.y}%`, border: 0, padding: 0, background: 'transparent' }}
                onClick={() => { setActive(i); setExplored((prev) => new Set([...prev, i])); }}>
                <span className="dot" />
                <span className="pulse" />
                <span className="label">{p.label}</span>
              </button>
            ))}
            <div className="compass-rose-wrap" style={{ position: 'absolute', bottom: 18, right: 18, width: 54, height: 54, color: 'var(--fg-mute)' }}>
              <CompassRose />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SCENE 2 · ÂGE D'OR (+ branch popup) ────────────────────── */
function SceneAgeOr({ lang }) {
  const t = window.CONTENT[lang].ageor;
  const ui = window.CONTENT[lang].ui;
  const [year, setYear] = useState(1745);
  const [branch, setBranch] = useState(null);
  const [popupBranch, setPopupBranch] = useState(null);

  const stats = useMemo(() => {
    const p = (year - 1720) / 69;
    const interp = (a, b) => Math.round(a + (b - a) * Math.max(0, Math.min(1, p)));
    return [
      interp(6000, 22000),
      interp(3, 28),
      interp(120, 1800),
      interp(8000, 165000),
    ];
  }, [year]);

  const ships = Math.max(1, Math.round((year - 1720) / 10) + 1);
  const popup = popupBranch != null ? t.branches[popupBranch].popup : null;

  return (
    <section className="scene" data-screen-label="03 Âge d'or">
      <SceneHead year={t.year} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <div className="golden">
        <div className="golden-illu" data-comment-anchor="31141c4146-div-197-9">
          <div className="sun" />
          <div className="horizon" />
          {/* warm color wash for the era */}
          <div className="golden-wash" />
          {[...Array(ships)].map((_, i) => {
            const offsetX = -40 + i * (80 / ships) + i % 2 * 4;
            const offsetY = -(i % 3 * 4);
            return (
              <svg key={i} className="ship" viewBox="0 0 80 40"
                style={{
                  left: `${offsetX + 50}%`,
                  bottom: `${30 + offsetY}%`,
                  transform: `translateX(-50%) scale(${0.6 + i * 0.05})`,
                  opacity: 0.5 + i / ships * 0.4
                }}>
                <path d="M 5,28 Q 40,34 75,28 L 70,34 L 10,34 Z" fill="var(--fg-mute)" />
                <line x1="40" y1="28" x2="40" y2="4" stroke="var(--fg-mute)" strokeWidth="1" />
                <path d="M 40,6 Q 50,18 40,28 Q 30,18 40,6 Z" fill="var(--accent)" opacity=".7" />
              </svg>
            );
          })}
          {/* flock of birds */}
          <svg className="birds" viewBox="0 0 400 120" preserveAspectRatio="none">
            {[...Array(6)].map((_, i) => (
              <path key={i} d={`M ${60 + i*55},${30 + (i%2)*20} q 4,-6 8,0 q 4,-6 8,0`}
                fill="none" stroke="var(--fg-mute)" strokeWidth="1.2" opacity=".6"/>
            ))}
          </svg>
          <div className="building-row" style={{ opacity: Math.min(1, (year - 1720) / 50) }}>
            {[...Array(28)].map((_, i) => {
              const h = 20 + i * 17 % 60 * Math.min(1, (year - 1720) / 60);
              return <div key={i} className="b" style={{ height: `${h}px` }} />;
            })}
          </div>
        </div>

        <div className="golden-stats">
          <div className="time-slider">
            <div className="yearlabel">{t.sliderLabel}</div>
            <div className="yearbig">{year}</div>
            <div className="rail">
              <input type="range" min={1720} max={1789} step={1} value={year}
                onChange={(e) => setYear(parseInt(e.target.value))} />
            </div>
            <div className="ticks">
              <span>1720</span><span>1740</span><span>1760</span><span>1789</span>
            </div>
          </div>

          {t.stats.map((s, i) => (
            <div key={i} className="stat-row">
              <div className="lbl">{`0${i + 1}`.slice(-2)}</div>
              <div className="name">{s.name}</div>
              <div className="val">{stats[i].toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')}<span style={{ fontSize: '.6em', marginLeft: 6, color: 'var(--fg-dim)' }}>{s.unit}</span></div>
            </div>
          ))}

          <div className="branch-row">
            {t.branches.map((b, i) => (
              <button key={i}
                className={"branch" + (branch === i ? " active" : "")}
                onClick={() => { setBranch(i); setPopupBranch(i); }}>
                <div className="step">{b.step}</div>
                <h4>{b.title}</h4>
                <p>{branch === i ? b.reveal : b.body}</p>
                <span className="branch-more">{ui.read} →</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Modal open={popup != null} onClose={() => setPopupBranch(null)} labelClose={ui.close}>
        {popup && (
          <div className="story-pop">
            <div className="story-img">
              <PhotoSlot slotId={popup.slotId} hint={popup.slotHint} />
            </div>
            <div className="story-body">
              <div className="kicker">{popup.kicker}</div>
              <h3 className="display">{popup.title}</h3>
              {popup.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

/* ─── SCENE 3 · GUERRE ───────────────────────────────────────── */
function SceneGuerre({ lang }) {
  const t = window.CONTENT[lang].guerre;
  const wrapRef = useRef(null);
  const bunkerRef = useRef(null);
  const [hoverPoi, setHoverPoi] = useState(null);

  useEffect(() => {
    const handle = (e) => {
      if (!wrapRef.current || !bunkerRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 16;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
      bunkerRef.current.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.04)`;
    };
    const el = wrapRef.current;
    el?.addEventListener('mousemove', handle);
    el?.addEventListener('mouseleave', () => {
      if (bunkerRef.current) bunkerRef.current.style.transform = '';
    });
    return () => el?.removeEventListener('mousemove', handle);
  }, []);

  return (
    <section className="scene war" data-screen-label="04 Guerre">
      <SceneHead year={t.year} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <div className="bunker-wrap" ref={wrapRef}>
        <div className="bunker" ref={bunkerRef}>
          <div className="top" />
          <div className="pen">
            <div className="slot" /><div className="slot" /><div className="slot" /><div className="slot" /><div className="slot" />
          </div>
          <div className="crane" data-comment-anchor="854a4f0830-div-296-9" />
        </div>
        <div className="war-pois">
          {t.pois.map((p, i) => (
            <button key={i} className="poi"
              style={{ left: `${p.x}%`, top: `${p.y}%`, border: 0, padding: 0, background: 'transparent' }}
              onMouseEnter={() => setHoverPoi(i)} onMouseLeave={() => setHoverPoi(null)}>
              <span className="dot" />
              <span className="pulse" />
              {hoverPoi === i && <span className="label">{p.label}</span>}
            </button>
          ))}
        </div>
        <div style={{
          position: 'absolute', left: 18, top: 18, zIndex: 4,
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.2em', color: 'var(--fg-dim)'
        }}>
          <b style={{ color: 'var(--fg-mute)', fontWeight: 400 }}>{t.bunkerTitle}</b><br />{t.bunkerSubtitle}
        </div>
      </div>

      <div className="war-stats">
        {t.stats.map((s, i) => (
          <div key={i} className="stat">
            <div className="num">{s.num}</div>
            <div className="desc">{s.desc}</div>
            <span className="src">{s.src}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── SCENE 4 · BOMBARDEMENTS ────────────────────────────────── */
function SceneBombing({ lang }) {
  const t = window.CONTENT[lang].bombing;
  return (
    <section className="scene" data-screen-label="05 Bombardements">
      <SceneHead year={t.year} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <div className="bombing">
        <div className="pane before">
          <div className="city">
            {[...Array(40)].map((_, i) => {
              const h = 30 + i * 7 % 50;
              return <div key={i} className="b" style={{ height: `${h}px` }} />;
            })}
          </div>
          <div className="stamp"><b>{t.before.stamp}</b>{t.before.date}</div>
        </div>
        <div className="pane after">
          <div className="city">
            {[...Array(40)].map((_, i) => {
              const isRuin = i % 3 !== 0;
              const h = isRuin ? 4 + i * 5 % 14 : 18 + i * 3 % 20;
              return <div key={i} className={"b" + (isRuin ? " ruin" : "")} style={{ height: `${h}px` }} />;
            })}
          </div>
          <div className="stamp"><b>{t.after.stamp}</b>{t.after.date}</div>
        </div>
      </div>

      <div className="bombing-cap">
        <blockquote>
          {t.quote}
          <cite>{t.cite}</cite>
        </blockquote>
        <div className="bombing-figures">
          <div className="big">{t.figure}</div>
          <div className="lbl">{t.figureLbl}</div>
        </div>
      </div>
    </section>
  );
}

/* ─── SCENE 5 · RECONSTRUCTION (more playful, colorful) ──────── */
function SceneReconstruction({ lang }) {
  const t = window.CONTENT[lang].recon;
  const [year, setYear] = useState(1948);
  const progress = (year - 1948) / 12;

  // Colour palette for blocks — different "houses" of Tourry-era Lorient
  const blockColors = [
    '#f0e6d2', '#d9b780', '#c9985d', '#e8c898', '#a4501f',
    '#8a6939', '#f5d9a8', '#c4a070', '#e07a3e', '#b88a4e'
  ];
  // Roof shapes: 0 flat, 1 triangle, 2 chimney
  const roofShapes = [0, 1, 0, 2, 1, 0, 1, 0, 2, 1, 0, 1, 2, 0, 1, 0];

  return (
    <section className="scene" data-screen-label="06 Reconstruction" data-comment-anchor="recon-anim">
      <SceneHead year={t.year} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <div className="reconstruction">
        <div className="recon-stage">
          {/* sun */}
          <div className="recon-sun" />
          {/* cranes */}
          {[10, 35, 70].map((x, i) => (
            <svg key={i} className="recon-crane" style={{ left: `${x}%`, opacity: Math.max(0, 1 - progress * 1.2) }}
              viewBox="0 0 60 200" preserveAspectRatio="none">
              <line x1="30" y1="0" x2="30" y2="200" stroke="var(--accent)" strokeWidth="2" />
              <line x1="30" y1="20" x2="60" y2="20" stroke="var(--accent)" strokeWidth="2" />
              <line x1="55" y1="20" x2="55" y2="55" stroke="var(--accent)" strokeWidth="1" />
              <rect x="50" y="55" width="10" height="6" fill="var(--accent)" />
            </svg>
          ))}
          {/* blocks */}
          {[...Array(16)].map((_, i) => {
            const start = i % 5 * 0.12;
            const local = Math.max(0, Math.min(1, (progress - start) / 0.55));
            const targetH = 30 + i * 13 % 80;
            const color = blockColors[i % blockColors.length];
            const roof = roofShapes[i];
            return (
              <div key={i} className="block" style={{
                height: `${targetH * local}%`,
                background: `linear-gradient(180deg, ${color} 0%, ${color}cc 60%, ${color}99 100%)`,
              }}>
                {roof === 1 && local > .3 && <div className="roof tri" style={{ borderBottomColor: color }} />}
                {roof === 2 && local > .3 && <div className="roof chim" style={{ background: color }} />}
                {/* windows */}
                {local > .5 && [...Array(3)].map((_, w) => (
                  <div key={w} className="win" style={{
                    bottom: `${10 + w * 24}%`,
                    background: w % 2 ? 'rgba(255,210,150,.8)' : 'rgba(180,160,140,.4)'
                  }} />
                ))}
              </div>
            );
          })}
          {/* photo slots — three archive photos that fade in with time */}
          {[
            { slot: 'recon-1948', x: 6, y: 10, year: 1948, hint: 'Archive · 1948 plan Tourry' },
            { slot: 'recon-1952', x: 38, y: 6, year: 1952, hint: 'Archive · 1952 hôtel de ville' },
            { slot: 'recon-1960', x: 72, y: 10, year: 1960, hint: 'Archive · 1960 vue aérienne' },
          ].map((s, i) => (
            <div key={i} className="recon-photo" style={{
              left: `${s.x}%`, top: `${s.y}%`,
              opacity: year >= s.year ? 1 : .15,
              transform: `rotate(${i % 2 ? -2 : 2}deg)`,
            }}>
              <PhotoSlot slotId={s.slot} hint={s.hint} />
              <span className="cap">{s.year}</span>
            </div>
          ))}
        </div>

        <div className="recon-side">
          <div className="yr">{year}</div>
          <p className="annot">{t.lead}</p>
          <div className="scrub">
            <div className="ticks" style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.16em', color: 'var(--fg-dim)' }}>
              <span>1948</span><span>1952</span><span>1956</span><span>1960</span>
            </div>
            <div className="rail">
              <input type="range" min={1948} max={1960} step={1} value={year}
                onChange={(e) => setYear(parseInt(e.target.value))} />
            </div>
          </div>

          <div className="recon-events">
            {t.events.map((e, i) => (
              <div key={i} className={"ev" + (parseInt(e.year) <= year ? " on" : "")}>
                <div className="yr2">{e.year}</div>
                <div className="txt">{e.txt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SCENE 6 · KEROMAN renaissance (new) ────────────────────── */
function SceneKeroman({ lang }) {
  const t = window.CONTENT[lang].keroman;
  return (
    <section className="scene" data-screen-label="07 Renaissance Keroman">
      <SceneHead year={t.year} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <div className="keroman">
        <div className="keroman-grid">
          {t.slots.map((s, i) => (
            <figure key={i} className={"kp-fig kp-" + i}>
              <PhotoSlot slotId={s.id} hint={s.hint} />
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>

        <aside className="keroman-side">
          <div className="ker-stats">
            {t.stats.map((s, i) => (
              <div key={i} className="ker-stat">
                <div className="num">{s.num}</div>
                <div className="desc">{s.desc}</div>
              </div>
            ))}
          </div>
          <blockquote className="ker-quote">
            {t.quote}
            <cite>{t.cite}</cite>
          </blockquote>
        </aside>
      </div>
    </section>
  );
}

/* ─── SCENE 7 · AUJOURD'HUI (+ 360° popup) ───────────────────── */
function SceneToday({ lang }) {
  const t = window.CONTENT[lang].today;
  const ui = window.CONTENT[lang].ui;
  const [active, setActive] = useState(0);
  const [panoOpen, setPanoOpen] = useState(false);
  const panoRef = useRef(null);
  const cur = t.pois[active];

  // Auto-pan the panorama in the modal
  useEffect(() => {
    if (!panoOpen || !panoRef.current) return;
    let raf, off = 0;
    const tick = () => {
      off = (off + 0.4) % 100;
      if (panoRef.current) panoRef.current.style.backgroundPositionX = `${off}%`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [panoOpen]);

  return (
    <section className="scene" data-screen-label="08 Aujourd'hui">
      <SceneHead year={t.year} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <div className="today">
        <div className="today-map">
          <div className="legend"><b style={{ color: 'var(--fg-mute)', fontWeight: 400 }}>Rade de Lorient</b><br />{t.pois.length} {lang === 'fr' ? 'escales' : 'stops'}</div>
          <svg className="coast" viewBox="0 0 400 340" preserveAspectRatio="none">
            <path d="M 0,80 Q 60,60 120,90 Q 180,120 240,100 Q 300,80 360,120 Q 400,150 400,200 L 400,340 L 0,340 Z"
              fill="rgba(30,74,62,.10)" stroke="rgba(201,152,93,.5)" strokeWidth=".7" />
            <path d="M 250,100 Q 240,140 260,170 Q 270,200 250,230" fill="none" stroke="rgba(201,152,93,.5)" strokeWidth=".7" />
            <ellipse cx="56" cy="240" rx="38" ry="14" fill="rgba(30,74,62,.10)" stroke="rgba(201,152,93,.5)" strokeWidth=".7" />
            <text x="56" y="244" textAnchor="middle" fontSize="8" fill="var(--fg-dim)" fontFamily="JetBrains Mono">GROIX</text>
          </svg>
          {t.pois.map((p, i) => (
            <button key={i} className={"poi" + (active === i ? "" : " done")}
              style={{ left: `${p.x}%`, top: `${p.y}%`, border: 0, padding: 0, background: 'transparent' }}
              onClick={() => setActive(i)}>
              <span className="dot" />
              {active === i && <span className="pulse" />}
              <span className="label">{p.name}</span>
            </button>
          ))}
        </div>

        <div className="today-card">
          <div className="today-img">
            <PhotoSlot slotId={cur.slotId} hint={cur.placeholder} />
            {cur.panorama && (
              <button className="pano-btn" onClick={() => setPanoOpen(true)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="9" />
                  <ellipse cx="12" cy="12" rx="9" ry="3.5" />
                  <path d="M3 12h18M12 3v18" />
                </svg>
                {ui.view360}
              </button>
            )}
          </div>
          <div className="kind">{cur.kind}</div>
          <h3>{cur.name}</h3>
          <p>{cur.body}</p>
          <div className="factrow">
            {cur.facts.map((f, i) => (
              <div key={i} className="f">
                <b>{f.v}</b>
                {f.k}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal open={panoOpen} onClose={() => setPanoOpen(false)} size="xl" labelClose={ui.close}>
        <div className="pano">
          <div ref={panoRef} className="pano-view" aria-label={cur.panorama}>
            <div className="pano-hint">
              <div className="pano-dot" />
              {ui.view360}
              <small>{cur.panorama}</small>
            </div>
          </div>
          <div className="pano-foot">
            <div>
              <b>{cur.name}</b>
              <span>{cur.kind}</span>
            </div>
            <span className="pano-tag">360°</span>
          </div>
        </div>
      </Modal>
    </section>
  );
}

/* ─── SCENE 8 · FESTIVAL INTERCELTIQUE (new) ─────────────────── */
function SceneFestival({ lang }) {
  const t = window.CONTENT[lang].festival;
  return (
    <section className="scene festival-scene" data-screen-label="09 Festival">
      <SceneHead year={t.year} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <div className="festival">
        <div className="festival-slots">
          {t.slots.map((s, i) => (
            <figure key={i} className={"festival-fig f-" + i}>
              <PhotoSlot slotId={s.id} hint={s.hint} />
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="festival-side">
          <div className="festival-stats">
            {t.stats.map((s, i) => (
              <div key={i} className="fs">
                <div className="n">{s.num}</div>
                <div className="d">{s.desc}</div>
              </div>
            ))}
          </div>
          <p className="festival-vibe">{t.vibe}</p>
          <div className="celt-nations">
            {[
              { emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", fr: "Écosse",          en: "Scotland"    },
              { emoji: "🇮🇪",       fr: "Irlande",         en: "Ireland"     },
              { emoji: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",   fr: "Pays de Galles", en: "Wales"       },
              { emoji: "🏴",       fr: "Cornouailles",    en: "Cornwall"    },
              { emoji: "🇫🇷",       fr: "Bretagne",        en: "Brittany"    },
              { emoji: "🇮🇲",       fr: "Île de Man",      en: "Isle of Man" },
              { emoji: "🇪🇸",       fr: "Galice",          en: "Galicia"     },
            ].map((n, i) =>
              <span key={i} className="nation">{n.emoji} {lang === 'fr' ? n.fr : n.en}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SCENE 9 · SAVEURS ──────────────────────────────────────── */
function SceneFlavors({ lang }) {
  const t = window.CONTENT[lang].flavors;
  return (
    <section className="scene" data-screen-label="10 Saveurs">
      <SceneHead year="" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <div className="flavors">
        <div className="dish" data-comment-anchor="dish-photo">
          {t.dishSlot ? (
            <div className="dish-photo">
              <PhotoSlot slotId={t.dishSlot.id} hint={t.dishSlot.hint} shape="circle" />
            </div>
          ) : (
            <div className="bowl" />
          )}
          <div className="label"><b>{t.dishName}</b><span>{t.dishOrigin}</span></div>
        </div>

        <div className="copy">
          <div className="ingredients">
            {t.ingredients.map((ing, i) => <span key={i} className="chip">{ing}</span>)}
          </div>

          <div className="addresses">
            {t.addresses.map((a, i) => (
              <div key={i} className="address">
                {a.slot && (
                  <div className="addr-photo">
                    <PhotoSlot slotId={a.slot.id} hint={a.slot.hint} />
                  </div>
                )}
                <div className="tag">{a.tag}</div>
                <h4>{a.name}</h4>
                <div className="sub">{a.sub}</div>
                <div className="stars">{a.stars}</div>
                <p className="desc" style={{ marginTop: 12 }}>{a.desc}</p>
                <div className="row"><span>{a.row1}</span><span>{a.row2}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SCENE 10 · OUTRO ───────────────────────────────────────── */
function SceneOutro({ lang, onRestart }) {
  const t = window.CONTENT[lang].outro;
  return (
    <section className="scene outro" data-screen-label="11 Escale">
      <div>
        <div className="big display">{t.bigA}<br /><em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{t.bigB}</em></div>
        <p className="lead" style={{ margin: '0 auto 36px', textAlign: 'center' }}>{t.lead}</p>
        <div className="ctas">
          <button className="cta primary">{t.cta1}</button>
          <button className="cta" onClick={onRestart}>{t.cta2}</button>
        </div>
        <div className="signature">{t.signature}</div>
      </div>
    </section>
  );
}

Object.assign(window, {
  SceneIntro, SceneFondation, SceneAgeOr, SceneGuerre, SceneBombing,
  SceneReconstruction, SceneKeroman, SceneToday, SceneFestival, SceneFlavors, SceneOutro,
});
