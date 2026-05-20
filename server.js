// server.js — Lorient demo server.
// Serves the static HTML/CSS/JS files and proxies Claude API calls
// so voice-ai.jsx can work without the Claude Design runtime.
//
// Usage:
//   ANTHROPIC_API_KEY=sk-ant-... node server.js
// or with a .env file in the parent directory (JARVIS root).

const path = require('path');
const fs = require('fs');

// Load .env from parent directory (JARVIS root) if present
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from this directory
app.use(express.static(__dirname));

// POST /api/claude — proxy to Anthropic Messages API
app.post('/api/claude', async (req, res) => {
  const { system, messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
    return res.status(503).json({
      error: 'ANTHROPIC_API_KEY not configured — set it in the JARVIS .env file or as an environment variable.'
    });
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      system: system || '',
      messages,
    });
    const text = response.content[0]?.text ?? '';
    res.json({ content: text });
  } catch (err) {
    console.error('Claude API error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🌊  Lorient — Embarquement\n`);
  console.log(`   http://localhost:${PORT}/D%C3%A9mo%20Lorient.html`);
  console.log(`   ou : http://localhost:${PORT}/\n`);
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_anthropic_api_key_here') {
    console.warn('⚠  ANTHROPIC_API_KEY manquante — le Capitaine Yann ne pourra pas répondre.\n');
  }
});
