#!/usr/bin/env python3
"""
orbit_meta.py — Leitfarben, LQIP und Maße für die Orbit-Sequenz.

Je Frame wird eine Leitfarbe bestimmt: das Bild wird stark verkleinert,
dann gewinnt die Farbe mit dem besten Verhältnis aus Sättigung und
Helligkeit (nicht der Durchschnitt — der wäre immer schlammgrau).
Die Website färbt damit Akzente, Schimmer und Schatten so ein, wie es
gerade um den Ritter herum aussieht.

Aufruf: orbit_meta.py <frame-verzeichnis> <ziel> <hi_w> <lo_w> <frames>
"""
import base64
import colorsys
import io
import json
import math
import pathlib
import sys

from PIL import Image, ImageFilter


def pixels(img: Image.Image, w: int, h: int):
    small = img.convert("RGB").resize((w, h), Image.Resampling.BILINEAR)
    raw = small.tobytes()
    return [tuple(raw[i : i + 3]) for i in range(0, len(raw), 3)]


def lead_color(img: Image.Image) -> str:
    """Stimmungsfarbe eines Frames als #rrggbb.

    Nicht der Bildmittelwert (der ist immer schlammgrau) und auch nicht
    das eine bunteste Pixel (das ist immer die Glut). Stattdessen ein
    nach Sättigung gewichteter Mittelwert im Farbkreis: bei der Feuer-
    seite gewinnt das Rot, bei der Rückseite zieht der Stahl ins Kühle.
    """
    px = pixels(img, 48, 82)
    acc_x = acc_y = acc_l = weight = 0.0
    ember = 0  # Pixel, die wirklich glühen — nicht bloß hell sind
    for r, g, b in px:
        h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        # Sehr dunkle und ausgewaschene Pixel tragen nichts bei.
        if l < 0.10 or l > 0.94:
            continue
        w = (s**1.5) * (l**0.5) + 0.02
        ang = h * 2 * math.pi
        acc_x += math.cos(ang) * w
        acc_y += math.sin(ang) * w
        acc_l += l * w
        weight += w
        if s > 0.30 and l > 0.20:
            ember += 1

    if weight == 0:
        return "#c8ccd6"

    h = (math.atan2(acc_y, acc_x) / (2 * math.pi)) % 1.0
    # Die Sättigung folgt dem Glutanteil im Bild: auf der Feuerseite
    # kräftiges Rot, auf der Rückseite entsättigt es Richtung Stahl.
    # Der Farbton bleibt dabei in derselben Familie — die Seite wechselt
    # beim Scrollen die Stimmung, nicht das Farbkonzept.
    # Gemessene Spanne im Ausgangsclip: 0.052 (Rücken) … 0.261 (Front).
    heat = min(1.0, max(0.0, (ember / len(px) - 0.055) / 0.19))
    s = 0.25 + 0.52 * heat
    l = min(0.72, max(0.55, (acc_l / weight) * 1.62 + 0.05 * heat))
    r, g, b = colorsys.hls_to_rgb(h, l, s)
    return "#%02x%02x%02x" % (round(r * 255), round(g * 255), round(b * 255))


def lqip(img: Image.Image) -> str:
    """Winziges, weiches Vorschaubild als data:-URI (Sofort-Hintergrund)."""
    tiny = img.convert("RGB").resize((24, 41), Image.Resampling.BILINEAR)
    tiny = tiny.filter(ImageFilter.GaussianBlur(0.6))
    buf = io.BytesIO()
    tiny.save(buf, "WEBP", quality=58, method=6)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()


def main() -> None:
    src, dst, hi_w, lo_w, frames = sys.argv[1:6]
    src, dst = pathlib.Path(src), pathlib.Path(dst)
    files = sorted(p for p in src.iterdir() if p.suffix in (".png", ".webp"))
    files = files[: int(frames)]
    if not files:
        raise SystemExit(f"keine Frames in {src}")

    accents = [lead_color(Image.open(f)) for f in files]
    first = Image.open(files[0])
    ratio = first.width / first.height

    (dst / "accents.json").write_text(json.dumps(accents), "utf-8")
    (dst / "meta.json").write_text(
        json.dumps(
            {
                "frames": len(files),
                "ratio": round(ratio, 6),
                "hi": {"w": int(hi_w), "h": round(int(hi_w) / ratio)},
                "lo": {"w": int(lo_w), "h": round(int(lo_w) / ratio)},
                "lqip": lqip(first),
            },
            indent=1,
        ),
        "utf-8",
    )
    print(f"{len(accents)} Leitfarben, Seitenverhältnis {ratio:.4f}")


if __name__ == "__main__":
    main()
