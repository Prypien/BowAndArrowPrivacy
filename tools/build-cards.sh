#!/usr/bin/env bash
# ============================================================
#  build-cards.sh — Projektkarten für die Startseite
#
#  Aus tools/karten/*.html werden die Bilder der Projektkacheln:
#    assets/work-bow-and-arrow.webp
#    assets/work-grow-into-life.webp
#
#  Jede Karte zeigt das App-Symbol als Kachel und darunter den Namen
#  in der Schrift der jeweiligen App — Farben und Maße stammen aus
#  deren eigenem Design-System, nicht aus dem der Studio-Seite.
#
#  Voraussetzung: der lokale Server läuft.
#    python3 tools/devserver.py 8124
#
#  Aufruf:  bash tools/build-cards.sh [port]
#  Bedarf:  Google Chrome, cwebp
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT="${1:-8124}"
W=1200; H=750          # 16:10 — dasselbe Format wie .work-media

[ -x "$CHROME" ] || { echo "Chrome nicht gefunden: $CHROME" >&2; exit 1; }
command -v cwebp >/dev/null || { echo "Fehlt: cwebp (brew install webp)" >&2; exit 1; }
curl -sfo /dev/null "http://localhost:$PORT/" || {
  echo "Kein Server auf Port $PORT — erst: python3 tools/devserver.py $PORT" >&2; exit 1; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Chrome schreibt PNG; ausgeliefert wird nur WebP. Ein PNG-Rückfall
# wäre das Zwanzigfache an Bytes für Browser, die es nicht mehr gibt —
# das CSS dieser Seite verlangt ohnehin color-mix() und svh.
for name in bow-and-arrow grow-into-life; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --window-size="$W,$H" --force-device-scale-factor=1 \
    --virtual-time-budget=6000 \
    --screenshot="$TMP/$name.png" \
    "http://localhost:$PORT/tools/karten/$name.html" >/dev/null 2>&1
  [ -s "$TMP/$name.png" ] || { echo "Rendern fehlgeschlagen: $name" >&2; exit 1; }
  out="$ROOT/assets/work-$name.webp"
  cwebp -quiet -q 88 -m 6 -sharp_yuv "$TMP/$name.png" -o "$out"
  printf "%-34s %6.1f KB\n" "work-$name.webp" \
    "$(stat -f%z "$out" | awk '{print $1/1024}')"
done
