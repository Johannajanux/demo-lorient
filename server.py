#!/usr/bin/env python3
"""
server.py — Lorient demo server (Python fallback).
Serves static files + proxies Claude API calls for the voice AI.

Usage:
    python3 server.py
    # or with a custom port:
    PORT=8080 python3 server.py
"""

import http.server
import json
import os
import re
import urllib.request
import urllib.error
from pathlib import Path

PORT = int(os.environ.get("PORT", 3000))
DEMO_DIR = Path(__file__).parent
ROOT_DIR = DEMO_DIR.parent

# Load .env from JARVIS root if present
env_path = ROOT_DIR / ".env"
if env_path.exists():
    for line in env_path.read_text().splitlines():
        m = re.match(r'^([A-Z0-9_]+)=(.*)$', line)
        if m and m.group(1) not in os.environ:
            os.environ[m.group(1)] = m.group(2).strip()

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DEMO_DIR), **kwargs)

    def log_message(self, fmt, *args):
        # Suppress noisy static file logs; keep errors
        if args and str(args[1]) not in ("200", "304"):
            super().log_message(fmt, *args)

    def do_POST(self):
        if self.path != "/api/claude":
            self.send_error(404)
            return

        length = int(self.headers.get("Content-Length", 0))
        body = json.loads(self.rfile.read(length))

        if not ANTHROPIC_API_KEY or ANTHROPIC_API_KEY == "your_anthropic_api_key_here":
            self._json(503, {"error": "ANTHROPIC_API_KEY not configured in JARVIS/.env"})
            return

        system = body.get("system", "")
        messages = body.get("messages", [])

        payload = json.dumps({
            "model": "claude-haiku-4-5-20251001",
            "max_tokens": 256,
            "system": system,
            "messages": messages,
        }).encode()

        req = urllib.request.Request(
            "https://api.anthropic.com/v1/messages",
            data=payload,
            headers={
                "x-api-key": ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read())
                text = data.get("content", [{}])[0].get("text", "")
                self._json(200, {"content": text})
        except urllib.error.HTTPError as e:
            err = e.read().decode()
            self._json(e.code, {"error": err})
        except Exception as e:
            self._json(500, {"error": str(e)})

    def _json(self, code, obj):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def end_headers(self):
        # Allow .jsx files to be served with the right type for Babel
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def guess_type(self, path):
        t = super().guess_type(path)
        if str(path).endswith(".jsx"):
            return "text/javascript"
        return t


if __name__ == "__main__":
    with http.server.HTTPServer(("", PORT), Handler) as httpd:
        print(f"\n🌊  Lorient — Embarquement\n")
        print(f"   http://localhost:{PORT}/D%C3%A9mo%20Lorient.html")
        print(f"   ou : http://localhost:{PORT}/\n")
        if not ANTHROPIC_API_KEY or ANTHROPIC_API_KEY == "your_anthropic_api_key_here":
            print("⚠  ANTHROPIC_API_KEY manquante — le Capitaine Yann ne pourra pas répondre.\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServeur arrêté.")
