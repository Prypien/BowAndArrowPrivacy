/* ============================================================
   Chasing Dreams Interactive — WebGL-Ebene (Three.js + GLSL)
   Ein GPU-Partikelsystem morpht scroll-synchron durch vier Formen:
     0  Nebel         (Hero / Studio)
     1  Wappen-Löwe   (Works · Bow & Arrow — aus dem App-Icon gesampelt)
     2  Signalringe   (Works · Project II)
     3  Galaxien-Ring (CTA — umschließt das Abschluss-Statement)
   Dazu ein Shader-Sternenfeld, dessen Sterne zur Maus hin
   aufleuchten. Alles prozedural, keine externen 3D-Assets.
   Fallback: lädt WebGL nicht, startet main.js tsParticles.
   ============================================================ */
import * as THREE from "three";

(() => {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.getElementById("gl-canvas");
  if (!canvas) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
  } catch (err) {
    console.warn("WebGL nicht verfügbar — Fallback auf tsParticles.", err);
    return;
  }
  window.__CDI_GL_READY = true; /* main.js überspringt damit den Fallback */

  const DPR = Math.min(window.devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(DPR);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
  camera.position.set(0, 0, 4.6);

  /* ---------- Farbpalette (Galaxie-Blau) ---------- */
  const PALETTE = [
    [0.93, 0.95, 1.00], /* kühles Weiß */
    [0.62, 0.72, 1.00], /* Eisblau     */
    [0.78, 0.86, 1.00], /* helles Blau */
    [0.56, 0.85, 0.91], /* Blau-Cyan   */
    [1.00, 1.00, 1.00], /* Weiß        */
  ];
  const pickColor = () => {
    const r = Math.random();
    if (r < 0.34) return PALETTE[0];
    if (r < 0.60) return PALETTE[1];
    if (r < 0.78) return PALETTE[2];
    if (r < 0.92) return PALETTE[3];
    return PALETTE[4];
  };

  const rand = (a, b) => a + Math.random() * (b - a);
  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

  /* ============================================================
     Prozedurale Formen — je N Punkte (vec3)
     ============================================================ */
  const N = 12000;

  /* 0 · Nebel: weite, weiche Wolke — darf den Hero-Text nicht überstrahlen */
  function shapeNebula() {
    const p = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = Math.pow(Math.random(), 1.15) * 1.7;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(rand(-1, 1));
      p[i * 3] = r * Math.sin(ph) * Math.cos(th) * 1.25;
      p[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
      p[i * 3 + 2] = r * Math.cos(ph) * 0.55;
    }
    return p;
  }

  /* 1 · Start-Fallback: Bogen + Pfeil — wird ersetzt, sobald das
        Löwen-Wappen aus dem echten Spiel-Icon gesampelt ist */
  function shapeBow() {
    const p = new Float32Array(N * 3);
    const jitter = 0.028;
    /* Bogen-Geometrie */
    const C = { x: 0.62, y: 0 };      /* Kreiszentrum des Bogens */
    const R = 1.42;                    /* Bogenradius */
    const A0 = Math.PI * 0.62;        /* obere Bogenspitze */
    const A1 = Math.PI * 1.38;        /* untere Bogenspitze */
    const tipTop = { x: C.x + R * Math.cos(A0), y: R * Math.sin(A0) };
    const tipBot = { x: C.x + R * Math.cos(A1), y: R * Math.sin(A1) };
    const nock = { x: -0.32, y: 0 };  /* gespannte Sehne trifft Pfeilende */
    const tip = { x: 1.42, y: 0 };    /* Pfeilspitze */

    for (let i = 0; i < N; i++) {
      const r = Math.random();
      let x, y;
      if (r < 0.42) {
        /* Bogenschaft (Arc) — leicht dicker */
        const a = rand(A0, A1);
        const rr = R + gauss() * 0.035;
        x = C.x + rr * Math.cos(a);
        y = rr * Math.sin(a);
      } else if (r < 0.60) {
        /* Sehne: zwei Segmente Spitze→Nock (gespannt) */
        const t = Math.random();
        const from = Math.random() < 0.5 ? tipTop : tipBot;
        x = from.x + (nock.x - from.x) * t;
        y = from.y + (nock.y - from.y) * t;
      } else if (r < 0.82) {
        /* Pfeilschaft */
        const t = Math.random();
        x = nock.x + (tip.x - nock.x) * t;
        y = 0;
      } else if (r < 0.93) {
        /* Pfeilspitze (zwei Schrägen) */
        const t = Math.random() * 0.22;
        const s = Math.random() < 0.5 ? 1 : -1;
        x = tip.x - t;
        y = s * t * 0.75;
      } else {
        /* Befiederung am Nock (drei kurze Schrägen) */
        const t = Math.random() * 0.2;
        const s = Math.random() < 0.5 ? 1 : -1;
        const off = (Math.random() * 0.16) | 0;
        x = nock.x + 0.06 + off * 0.09 - t;
        y = s * t * 0.85;
      }
      p[i * 3] = x - 0.45 + gauss() * jitter;   /* Gesamtform zentrieren */
      p[i * 3 + 1] = y + gauss() * jitter;
      p[i * 3 + 2] = gauss() * 0.07;
    }
    return p;
  }

  /* 2 · Signalringe (Project II) */
  function shapeSignal() {
    const p = new Float32Array(N * 3);
    const rings = [0.42, 0.78, 1.14];
    for (let i = 0; i < N; i++) {
      const r = Math.random();
      let x, y, z;
      if (r < 0.18) {
        /* dichter Kern */
        x = gauss() * 0.1; y = gauss() * 0.1; z = gauss() * 0.1;
      } else {
        const ring = rings[(Math.random() * rings.length) | 0];
        const a = Math.random() * Math.PI * 2;
        const rr = ring + gauss() * 0.02;
        x = rr * Math.cos(a);
        y = rr * Math.sin(a) * 0.92;
        z = gauss() * 0.05;
      }
      p[i * 3] = x; p[i * 3 + 1] = y; p[i * 3 + 2] = z;
    }
    return p;
  }

  /* 3 · Galaxien-Ring: legt sich um das Abschluss-Statement.
        Die Mitte bleibt frei — dort steht der Text. */
  function shapeGalaxy() {
    const p = new Float32Array(N * 3);
    const TILT = (-12 * Math.PI) / 180;
    const cosT = Math.cos(TILT), sinT = Math.sin(TILT);
    const RX = 2.05, RY = 0.68;
    for (let i = 0; i < N; i++) {
      const r = Math.random();
      let rr;
      if (r < 0.66) {
        /* Hauptring */
        rr = 1 + gauss() * 0.035;
      } else if (r < 0.9) {
        /* innere Scheibe — endet deutlich vor der Mitte */
        rr = 0.62 + Math.random() * 0.33;
      } else {
        /* äußerer Halo */
        rr = 1.06 + Math.random() * 0.3;
      }
      const a = Math.random() * Math.PI * 2;
      const ex = RX * rr * Math.cos(a) + gauss() * 0.02;
      const ey = RY * rr * Math.sin(a) + gauss() * 0.02;
      p[i * 3] = ex * cosT - ey * sinT;
      p[i * 3 + 1] = ex * sinT + ey * cosT;
      p[i * 3 + 2] = gauss() * 0.06;
    }
    return p;
  }

  /* ============================================================
     Morph-Partikel: Geometrie + Shader
     ============================================================ */
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(shapeNebula(), 3));
  geo.setAttribute("aPos1", new THREE.BufferAttribute(shapeBow(), 3));
  geo.setAttribute("aPos2", new THREE.BufferAttribute(shapeSignal(), 3));
  geo.setAttribute("aPos3", new THREE.BufferAttribute(shapeGalaxy(), 3));

  /* Das Wappen von Bow & Arrow: goldene Pixel des App-Icons werden zu
     Partikelzielen. Läuft asynchron — bis dahin gilt der Bogen-Fallback. */
  (function loadLionShape() {
    const img = new Image();
    img.src = "BowAndArrowPrivacy/assets/ds/app-icon-dark.png";
    img.onload = () => {
      const S = 180;
      const cv = document.createElement("canvas");
      cv.width = S; cv.height = S;
      const c2 = cv.getContext("2d", { willReadFrequently: true });
      c2.drawImage(img, 0, 0, S, S);
      const data = c2.getImageData(0, 0, S, S).data;
      const pts = [];
      for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
          const i = (y * S + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          /* goldene Pixel des Löwen isolieren */
          if (a > 120 && r > 95 && g > 55 && b < r * 0.72) pts.push(x, y);
        }
      }
      if (pts.length < 200) return; /* Sicherung: Bogen-Fallback bleibt */
      const attr = geo.getAttribute("aPos1");
      const H = 2.35; /* Welt-Höhe des Wappens */
      for (let i = 0; i < N; i++) {
        const k = ((Math.random() * (pts.length / 2)) | 0) * 2;
        attr.array[i * 3] = (pts[k] / S - 0.5) * H + gauss() * 0.012;
        attr.array[i * 3 + 1] = (0.5 - pts[k + 1] / S) * H + gauss() * 0.012;
        attr.array[i * 3 + 2] = gauss() * 0.045;
      }
      attr.needsUpdate = true;
      window.CDI_GL_DEBUG && (window.CDI_GL_DEBUG.lionLoaded = true);
    };
  })();

  const seeds = new Float32Array(N);
  const colors = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    seeds[i] = Math.random();
    const c = pickColor();
    colors[i * 3] = c[0]; colors[i * 3 + 1] = c[1]; colors[i * 3 + 2] = c[2];
  }
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

  const uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uReveal: { value: 0 },
    uSize: { value: 4.4 },
    uPixelRatio: { value: DPR },
    uMouse: { value: new THREE.Vector2(10, 10) },
    uMouseStrength: { value: 0.35 }, /* Morph-Objekt reagiert nur dezent */
  };

  const vertexShader = /* glsl */ `
    attribute vec3 aPos1;
    attribute vec3 aPos2;
    attribute vec3 aPos3;
    attribute float aSeed;
    attribute vec3 aColor;
    uniform float uTime;
    uniform float uMorph;
    uniform float uReveal;
    uniform float uSize;
    uniform float uPixelRatio;
    uniform vec2 uMouse;
    uniform float uMouseStrength;
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      float m = clamp(uMorph, 0.0, 3.0);
      vec3 p;
      if (m < 1.0)      p = mix(position, aPos1, smoothstep(0.0, 1.0, m));
      else if (m < 2.0) p = mix(aPos1, aPos2, smoothstep(0.0, 1.0, m - 1.0));
      else              p = mix(aPos2, aPos3, smoothstep(0.0, 1.0, m - 2.0));

      /* organisches Wabern */
      float t = uTime * 0.55 + aSeed * 17.0;
      p += 0.032 * vec3(
        sin(t + p.y * 2.1),
        cos(t * 1.3 + p.x * 1.7),
        sin(t * 0.8 + p.z * 2.3)
      );

      /* Turbulenz mitten im Morph: Form löst sich auf und findet sich neu */
      float seg = fract(m);
      float turb = 4.0 * seg * (1.0 - seg);
      p += turb * 0.24 * vec3(
        sin(aSeed * 91.0 + t * 2.0),
        cos(aSeed * 57.0 - t * 1.6),
        sin(aSeed * 33.0 + t * 1.2)
      );

      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      vec4 proj = projectionMatrix * mv;

      /* Sterne nahe der Maus leuchten auf (Screenspace) */
      vec2 ndc = proj.xy / proj.w;
      float md = length(ndc - uMouse);
      float boost = 1.0 + uMouseStrength * smoothstep(0.38, 0.0, md);

      /* ruhiges, langsames Funkeln — kein Blinken */
      float tw = 0.86 + 0.14 * sin(uTime * (0.45 + aSeed * 0.8) + aSeed * 40.0);
      gl_PointSize = uSize * uPixelRatio * boost * tw * (2.6 / -mv.z);
      gl_Position = proj;

      /* In der Wappen-Phase färben sich die Partikel golden */
      float lionW = 1.0 - min(1.0, abs(m - 1.0));
      vColor = mix(aColor, vec3(0.88, 0.72, 0.30), lionW * 0.85);
      vAlpha = uReveal * (0.5 + 0.5 * tw) * min(1.6, boost) * 0.6;
    }
  `;

  const fragmentShader = /* glsl */ `
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      float r = length(gl_PointCoord - 0.5);
      float a = smoothstep(0.5, 0.06, r);
      gl_FragColor = vec4(vColor, a * vAlpha);
    }
  `;

  const morphPoints = new THREE.Points(
    geo,
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  scene.add(morphPoints);

  /* ============================================================
     Hintergrund-Sternenfeld (gleiches Shader-Paar, statisch)
     ============================================================ */
  const SN = 750;
  const sgeo = new THREE.BufferGeometry();
  const spos = new Float32Array(SN * 3);
  const sseed = new Float32Array(SN);
  const scol = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) {
    spos[i * 3] = rand(-9, 9);
    spos[i * 3 + 1] = rand(-5.5, 5.5);
    spos[i * 3 + 2] = rand(-7, -1.5);
    sseed[i] = Math.random();
    const c = pickColor();
    scol[i * 3] = c[0]; scol[i * 3 + 1] = c[1]; scol[i * 3 + 2] = c[2];
  }
  sgeo.setAttribute("position", new THREE.BufferAttribute(spos, 3));
  sgeo.setAttribute("aPos1", new THREE.BufferAttribute(spos, 3));
  sgeo.setAttribute("aPos2", new THREE.BufferAttribute(spos, 3));
  sgeo.setAttribute("aPos3", new THREE.BufferAttribute(spos, 3));
  sgeo.setAttribute("aSeed", new THREE.BufferAttribute(sseed, 1));
  sgeo.setAttribute("aColor", new THREE.BufferAttribute(scol, 3));

  const suniforms = {
    uTime: uniforms.uTime,
    uMorph: { value: 0 },
    uReveal: uniforms.uReveal,
    uSize: { value: 3.4 },
    uPixelRatio: { value: DPR },
    uMouse: uniforms.uMouse,
    uMouseStrength: { value: 1.7 }, /* Sterne leuchten zur Maus hin auf */
  };
  const starPoints = new THREE.Points(
    sgeo,
    new THREE.ShaderMaterial({
      uniforms: suniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  scene.add(starPoints);


  /* ============================================================
     Scroll-Sync: Morph-Fortschritt direkt aus den DOM-Positionen
     ============================================================ */
  const secBow = document.getElementById("work-bow");
  const secPending = document.getElementById("work-pending");
  const secContact = document.getElementById("contact");

  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  function sectionT(el, startFrac, endFrac) {
    if (!el) return 0;
    const top = el.getBoundingClientRect().top;
    const vh = window.innerHeight;
    return clamp01((startFrac * vh - top) / ((startFrac - endFrac) * vh));
  }
  function scrollMorph() {
    return (
      sectionT(secBow, 0.95, 0.38) +
      sectionT(secPending, 0.95, 0.38) +
      sectionT(secContact, 0.95, 0.45)
    );
  }

  /* Objekt-Lage je Form: [x, y, scale] — sanft dazwischen gemischt.
     Bogen links neben der Bow&Arrow-Kachel, Signal rechts neben
     Project II, Logo-Stern wieder mittig. */
  const POSE = [
    [0, -0.1, 1.0],     /* Nebel — mittig hinter dem Hero */
    [-1.25, 0, 0.78],   /* Wappen-Löwe — linke Seite */
    [1.25, 0, 0.74],    /* Signalringe — rechte Seite */
    [0, 0, 1.0],        /* Galaxien-Ring — umschließt das CTA-Statement */
  ];
  function applyPose(m) {
    const i = Math.min(2, Math.floor(m));
    const t = clamp01(m - i);
    const a = POSE[i], b = POSE[i + 1];
    /* Auf schmalen Screens stapeln die Kacheln — Formen bleiben mittig */
    const side = window.innerWidth > 980 ? 1 : 0;
    const mobileScale = side ? 1 : 0.7;
    morphPoints.position.x = (a[0] + (b[0] - a[0]) * t) * side;
    morphPoints.position.y = a[1] + (b[1] - a[1]) * t;
    const s = (a[2] + (b[2] - a[2]) * t) * mobileScale;
    morphPoints.scale.setScalar(s);
  }

  /* ---------- Maus & Resize ---------- */
  const mouseTarget = new THREE.Vector2(10, 10);
  window.addEventListener("pointermove", (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    mouseTarget.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );
  });

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  /* ---------- Render-Loop ---------- */
  const clock = new THREE.Clock();
  let morphSmooth = 0;

  function frame() {
    const t = clock.getElapsedTime();
    uniforms.uTime.value = t;
    /* ruhiger Auftakt: die Ebene blendet sich einmal weich ein */
    uniforms.uReveal.value = Math.min(1, t / 1.6);

    /* Morph weich nachziehen (fühlt sich physischer an als 1:1) */
    morphSmooth += (scrollMorph() - morphSmooth) * 0.09;
    uniforms.uMorph.value = morphSmooth;
    applyPose(morphSmooth);

    /* Maus weich nachziehen + Kamera-Parallaxe */
    uniforms.uMouse.value.lerp(mouseTarget, 0.08);
    camera.position.x += (mouseTarget.x * 0.14 - camera.position.x) * 0.04;
    camera.position.y += (mouseTarget.y * 0.1 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* Debug-Hook (z. B. für Tests): einen Frame manuell rendern */
  window.CDI_GL_DEBUG = {
    renderOnce() {
      uniforms.uTime.value += 0.016;
      uniforms.uReveal.value = 1;
      morphSmooth = scrollMorph();
      uniforms.uMorph.value = morphSmooth;
      applyPose(morphSmooth);
      uniforms.uMouse.value.copy(mouseTarget);
      renderer.render(scene, camera);
      return {
        morph: +morphSmooth.toFixed(3),
        poseX: +morphPoints.position.x.toFixed(3),
        scale: +morphPoints.scale.x.toFixed(3),
      };
    },
  };
})();
