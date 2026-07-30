#!/usr/bin/env bash
# ============================================================
#  build-orbit.sh — erzeugt die Bildsequenz für die Orbit-Bühne
#
#  Aus dem 10-Sekunden-Clip (720×1280, 24 fps, eine volle
#  Kameraumrundung) entstehen:
#    assets/orbit/hi/0000.webp …   720×1238  (Desktop / Retina)
#    assets/orbit/lo/0000.webp …   440×756   (Mobil / schmale Viewports)
#    assets/orbit/poster.webp      erstes Frame, als Sofort-Bild
#    assets/orbit/accents.json     Leitfarbe je Frame (Ambient-Licht)
#    assets/orbit/meta.json        Framezahl, Maße, LQIP
#    assets/og-cover.jpg           Social-Preview
#
#  Der untere Rand des Quellclips trägt ein fremdes Wasserzeichen
#  (VK/@land_of_art) — CROP_BOTTOM schneidet ihn weg.
#
#  Aufruf:  bash tools/build-orbit.sh [pfad/zum/clip.mp4]
#  Bedarf:  ffmpeg, cwebp, python3 + Pillow
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="${1:-$ROOT/_quellen/orbit-quelle.mp4}"
OUT="$ROOT/assets/orbit"

FRAMES=120          # Frames über die volle Umrundung
CROP_BOTTOM=42      # abgeschnittene Pixelzeilen (Wasserzeichen)
HI_W=720; HI_Q=72
LO_W=440; LO_Q=62

[ -f "$SRC" ] || { echo "Quellclip nicht gefunden: $SRC" >&2; exit 1; }
for bin in ffmpeg ffprobe cwebp python3; do
  command -v "$bin" >/dev/null || { echo "Fehlt: $bin" >&2; exit 1; }
done

W=$(ffprobe -v error -select_streams v:0 -show_entries stream=width  -of csv=p=0 "$SRC")
H=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$SRC")
CH=$(( H - CROP_BOTTOM ))
FPS="$FRAMES/10"    # der Clip ist 10 s lang

echo "Quelle ${W}×${H} → Crop ${W}×${CH} → ${FRAMES} Frames"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

rm -rf "$OUT"; mkdir -p "$OUT/hi" "$OUT/lo" "$TMP/hi" "$TMP/lo"

# -- 1) PNG-Zwischenframes in beiden Größen ------------------
ffmpeg -v error -y -i "$SRC" \
  -vf "crop=${W}:${CH}:0:0,fps=${FPS},scale=${HI_W}:-2:flags=lanczos" \
  -frames:v $FRAMES "$TMP/hi/%04d.png"
ffmpeg -v error -y -i "$SRC" \
  -vf "crop=${W}:${CH}:0:0,fps=${FPS},scale=${LO_W}:-2:flags=lanczos" \
  -frames:v $FRAMES "$TMP/lo/%04d.png"

# -- 2) WebP ------------------------------------------------
i=0
for f in "$TMP"/hi/*.png; do
  n=$(printf "%04d" $i)
  cwebp -quiet -q $HI_Q -m 6 -sharp_yuv "$f" -o "$OUT/hi/$n.webp"
  i=$((i+1))
done
i=0
for f in "$TMP"/lo/*.png; do
  n=$(printf "%04d" $i)
  cwebp -quiet -q $LO_Q -m 6 -sharp_yuv "$f" -o "$OUT/lo/$n.webp"
  i=$((i+1))
done

# -- 3) Poster + Social-Preview -----------------------------
cwebp -quiet -q 82 -m 6 -sharp_yuv "$TMP/hi/0001.png" -o "$OUT/poster.webp"
ffmpeg -v error -y -i "$TMP/hi/0001.png" \
  -vf "scale=1200:-2,crop=1200:630:0:280" -q:v 4 "$ROOT/assets/og-cover.jpg"

# -- 4) Leitfarben + LQIP + Metadaten -----------------------
python3 "$ROOT/tools/orbit_meta.py" "$TMP/lo" "$OUT" "$HI_W" "$LO_W" "$FRAMES"

echo
du -sh "$OUT/hi" "$OUT/lo" "$OUT"
echo "fertig."
