#!/usr/bin/env python3
"""Statischer Entwicklungsserver ohne Browser-Cache.

Der eingebaute http.server schickt kein Cache-Control. Browser
raten sich dann eine Haltbarkeit zusammen und zeigen beim Neuladen
alte CSS- und JS-Dateien. Hier wird jede Antwort als nicht
zwischenspeicherbar markiert — sonst prüft man minutenlang gegen
eine Version, die längst überschrieben ist.

Aufruf:  python3 tools/devserver.py [port]
"""
import functools
import http.server
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8123
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".webp": "image/webp",
        ".woff2": "font/woff2",
        ".json": "application/json",
        ".mjs": "text/javascript",
    }

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        # Nur Fehler; 200er rauschen sonst die Konsole zu.
        if args and str(args[1]).startswith(("4", "5")):
            super().log_message(fmt, *args)


if __name__ == "__main__":
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    with http.server.ThreadingHTTPServer(
        ("127.0.0.1", PORT),
        functools.partial(Handler, directory=ROOT),
    ) as httpd:
        print(f"http://localhost:{PORT}  (kein Cache)")
        httpd.serve_forever()
