// voice-ai.jsx — Capitaine Yann voice + chat panel.
// Uses window.claude.complete for the AI text, Web Speech for STT/TTS.

const { useState, useRef, useEffect, useCallback } = React;

// System prompt for Captain Yann
const YANN_SYSTEM = (lang, sceneIdx) => `
You are Capitaine Yann Le Goff, a fictional first-person guide for an immersive tourist webpage
about Lorient, France. You are warmly playful, slightly old-fashioned but never pompous. You speak
in ${lang === 'fr' ? 'French' : 'English'} ONLY. Keep replies SHORT — 2 to 4 sentences max, the kind a
real guide would say between scenes. You can use occasional period flourishes ("ma foi", "voyez-vous")
but stay accessible. You ground answers in real Lorient history when asked:
- Founded 1666 around the French East India Company (Compagnie des Indes Orientales)
- Golden age 18th c. (sole French port trading with Asia: tea, silks, porcelain)
- Occupied 1940-1944, Keroman submarine base (largest U-boat base on Atlantic)
- 85% destroyed by Allied bombing January-February 1943
- Rebuilt 1948-1960 under architect Georges Tourry
- Modern: Interceltic Festival, Lorient La Base (offshore racing), Île de Groix, Ria d'Étel, Cité de la Voile Éric Tabarly, Port-Louis Citadel
- Cuisine: cotriade (fisher's stew), Breton butter, oysters from Étel
The user is currently on scene ${sceneIdx} of an 11-scene narrative journey. Stay in character.
If asked something off-topic, gently steer back to Lorient. NEVER break character to discuss being an AI.
NEVER use markdown. Plain conversational text only.
`.trim();

// Pick the best available voice for Yann
function pickVoice(voices, lang, persona) {
  if (!voices?.length) return null;
  const base = lang === 'fr' ? 'fr' : 'en';
  const all = voices.filter(v => v.lang?.toLowerCase().startsWith(base));
  if (!all.length) return voices[0];
  // crude persona heuristic
  const wantsMale = persona === 'man' || persona === 'breton';
  const wantsFemale = persona === 'woman';
  const score = (v) => {
    const n = (v.name || '').toLowerCase();
    let s = 0;
    if (wantsMale && /(thomas|daniel|paul|david|alex|fred|martin|louis|yann|antoine|nicolas|pierre|marc)/.test(n)) s += 3;
    if (wantsFemale && /(amelie|amélie|audrey|virginie|aurelie|aurélie|julie|emma|samantha|victoria|karen|allison|moira)/.test(n)) s += 3;
    if (/google|premium|enhanced|natural/.test(n)) s += 2;
    return s;
  };
  return all.sort((a, b) => score(b) - score(a))[0];
}

function VoiceAI({ open, onClose, lang, sceneIdx, voicePersona, narrationSpeed, ambientOn }) {
  const t = window.CONTENT[lang];
  const [messages, setMessages] = useState([]);  // {role, content}
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const transcriptRef = useRef(null);
  const recogRef = useRef(null);

  // Load voices
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const load = () => setVoices(speechSynthesis.getVoices());
    load();
    speechSynthesis.onvoiceschanged = load;
    return () => { speechSynthesis.onvoiceschanged = null; };
  }, []);

  // Greet on open (first time only per language)
  useEffect(() => {
    if (open && messages.length === 0) {
      const greet = { role: 'assistant', content: t.yannGreeting };
      setMessages([greet]);
      speak(t.yannGreeting);
    }
    // eslint-disable-next-line
  }, [open, lang]);

  // Reset transcript on language switch
  useEffect(() => {
    setMessages([]);
  }, [lang]);

  // Auto-scroll
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  // Stop speech if panel closes
  useEffect(() => {
    if (!open && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [open]);

  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = pickVoice(voices, lang, voicePersona);
      if (v) u.voice = v;
      u.lang = v?.lang || (lang === 'fr' ? 'fr-FR' : 'en-US');
      u.rate = Math.max(0.6, Math.min(1.4, narrationSpeed || 1));
      u.pitch = voicePersona === 'woman' ? 1.05 : (voicePersona === 'breton' ? 0.85 : 0.95);
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      speechSynthesis.speak(u);
    } catch (e) {
      console.warn('TTS failed', e);
    }
  }

  async function sendMessage(textRaw) {
    const text = (textRaw ?? input).trim();
    if (!text || thinking) return;
    const userMsg = { role: 'user', content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setThinking(true);
    try {
      // Build a messages array for Claude
      const systemPrompt = YANN_SYSTEM(lang, sceneIdx);
      const claudeMessages = [
        ...history.map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content
        })),
      ];
      // Use the local proxy server if available, fall back to window.claude.complete (design sandbox)
      let reply;
      if (window.claude && window.claude.complete) {
        reply = await window.claude.complete({
          system: systemPrompt,
          messages: claudeMessages,
        });
      } else {
        // /.netlify/functions/claude on Netlify, /api/claude on local server
        const apiUrl = window.location.hostname.includes('netlify')
          ? '/.netlify/functions/claude'
          : '/api/claude';
        const resp = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ system: systemPrompt, messages: claudeMessages }),
        });
        if (!resp.ok) {
          const err = await resp.json().catch(() => ({}));
          throw new Error(err.error || `HTTP ${resp.status}`);
        }
        const data = await resp.json();
        reply = data.content;
      }
      const aiMsg = { role: 'assistant', content: reply };
      setMessages([...history, aiMsg]);
      speak(reply);
    } catch (e) {
      const fallback = lang === 'fr'
        ? "Pardonnez-moi, la liaison se rompt un instant. Reposez votre question dans un moment ?"
        : "Forgive me, the line breaks for a moment. Ask again shortly?";
      setMessages([...history, { role: 'assistant', content: fallback }]);
      speak(fallback);
    } finally {
      setThinking(false);
    }
  }

  function toggleMic() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert(lang === 'fr'
        ? "La reconnaissance vocale n'est pas disponible dans ce navigateur. Utilisez Chrome ou Safari, ou tapez votre question."
        : "Voice input not available in this browser. Use Chrome or Safari, or type your question.");
      return;
    }
    if (listening) {
      try { recogRef.current?.stop(); } catch {}
      setListening(false);
      return;
    }
    const r = new SR();
    r.lang = lang === 'fr' ? 'fr-FR' : 'en-US';
    r.interimResults = false;
    r.maxAlternatives = 1;
    r.onresult = (e) => {
      const txt = e.results[0][0].transcript;
      setInput(txt);
      setListening(false);
      sendMessage(txt);
    };
    r.onerror = () => setListening(false);
    r.onend = () => setListening(false);
    recogRef.current = r;
    setListening(true);
    try { r.start(); } catch { setListening(false); }
  }

  return (
    <>
      <div className="voice-trigger" onClick={() => open ? onClose() : window.dispatchEvent(new CustomEvent('open-yann'))}
           style={{display: open ? 'none' : 'inline-flex'}}>
        <div className={"avatar" + (speaking ? " speaking" : "")} />
        <div className="name">
          {t.captain.name}
          <small>{t.ui.askyann}</small>
        </div>
      </div>

      {open && (
        <div className="voice-panel" role="dialog" aria-label="Captain Yann">
          <div className="vp-head">
            <div className={"av" + (speaking ? " speaking" : "")} />
            <div className="who">
              <b>{t.captain.name}</b>
              <span>{t.captain.title}</span>
            </div>
            <button className="vp-close" onClick={onClose} aria-label="Close">×</button>
          </div>

          <div className="transcript" ref={transcriptRef}>
            {messages.map((m, i) => (
              m.role === 'assistant' ? (
                <div key={i} className="bubble ai">
                  <span className="meta">{t.captain.name}</span>
                  {m.content}
                </div>
              ) : (
                <div key={i} className="bubble user">{m.content}</div>
              )
            ))}
            {thinking && <div className="bubble ai thinking">{lang === 'fr' ? '…réfléchit' : '…thinking'}</div>}
          </div>

          {messages.length <= 1 && !thinking && (
            <div className="suggestions">
              {t.yannSuggestions.map((s, i) => (
                <button key={i} className="sug" onClick={() => sendMessage(s)}>{s}</button>
              ))}
            </div>
          )}

          <div className="vp-input">
            <button className={"mic" + (listening ? " active" : "")} onClick={toggleMic}
                    aria-label={listening ? 'Stop' : 'Speak'} title={lang==='fr'?'Parler':'Speak'}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="3" width="6" height="12" rx="3"/>
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>
              </svg>
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
              placeholder={lang === 'fr' ? "Posez votre question…" : "Ask your question…"}
            />
            <button className="send" onClick={() => sendMessage()} aria-label="Send">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

window.VoiceAI = VoiceAI;
