/* ============================================================
   Chasing Dreams Interactive — Regie

   Eine einzige Scroll-Schleife treibt alles an:
     · orbit.js dreht die Kamera (leicht nachziehend — das gibt der
       Rüstung Gewicht),
     · die Tafeln links und rechts kommen von außen herein und
       ziehen nach oben wieder ab (exakt am Scroll, ohne Nachlauf),
     · Überschriften hellen sich Wort für Wort auf,
     · die Leiste rechts zeigt den Winkel der Umrundung.

   Keine fremden Bibliotheken. Nichts wird von einem CDN geladen —
   die Seite überträgt beim Aufruf keine IP-Adresse an Dritte.

   Aufbau
     1  Sprachen (DE / EN / ES)
     2  Text vorbereiten: Buchstaben und Wörter
     3  Kapitelleiste
     4  Vermessung
     5  Die Schleife
     6  Kopfzeile und Kleinigkeiten
   ============================================================ */
(() => {
  "use strict";

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

  /* ============================================================
     1 · Sprachen
     Bewusst clientseitig: die URL bleibt gleich, damit die von
     Suchmaschinen indexierte Struktur unangetastet bleibt.
     ============================================================ */
  const I18N = {
    de: {
      docTitle: "Chasing Dreams Interactive — App Studio",
      docDesc: "Chasing Dreams Interactive ist ein unabhängiges App-Studio. Wir jagen Träumen hinterher – und gießen sie in Apps.",
      "nav.studio": "Studio", "nav.works": "Projekte", "nav.contact": "Kontakt",
      "a11y.skip": "Zum Inhalt",
      "hero.kicker": "Ein unabhängiges App-Studio",
      "hero.tagline": "Wir jagen Träumen hinterher – und gießen sie in Apps.",
      "hero.scroll": "Scrollen",
      "studio.kicker": "Studio",
      "studio.line": "Ich habe einen Traum, und ich mache ihn real.",
      "studio.copy": "Das ist der Grundsatz unseres kleinen Entwicklerstudios. Man beginnt ganz klein und sieht, wie man Stück für Stück einem Traum näherkommt, den man sich vor ein paar Jahren noch nicht zu träumen gewagt hätte. Wir bauen Apps mit Liebe zum Detail — von der ersten Skizze bis zum letzten Pixel. Nicht jede Idee träumt sich zu Ende. Aber aufzuhören zu träumen — das tun wir nie.",
      "works.open": "Ansehen",
      "works.openExt": "Öffnen",
      "works.bowTags": "iOS · Tower Defense",
      "works.bowDesc": "Tower Defense für iOS. Stellungen bauen, Wellen halten, Bogen spannen.",
      "works.growTags": "iOS · In Entwicklung",
      "works.growDesc": "Baby-Tracking für iOS. Schlaf, Mahlzeiten, Wachstum — ruhig festgehalten.",
      "works.worldName": "Weltkarte mit Geschichte",
      "works.worldTags": "Web · Bildungsprojekt",
      "works.worldDesc": "Interaktiver 3D-Globus: 100 Jahre Grenzen, Reiche und Regierungsformen von 1926 bis 2026.",
      "cta.kicker": "Kontakt",
      "cta.btn": "Schreib uns",
      "foot.claim": "Handgemachte Apps aus Deutschland.",
      "foot.imprint": "Impressum", "foot.privacy": "Datenschutz",
      "act.hero": "Auftakt", "act.studio": "Studio", "act.bow": "Bow & Arrow",
      "act.grow": "Grow into Life", "act.world": "Weltkarte",
    },
    en: {
      docTitle: "Chasing Dreams Interactive — App Studio",
      docDesc: "Chasing Dreams Interactive is an independent app studio. We chase dreams and turn them into apps.",
      "nav.studio": "Studio", "nav.works": "Work", "nav.contact": "Contact",
      "a11y.skip": "Skip to content",
      "hero.kicker": "An independent app studio",
      "hero.tagline": "We chase dreams – and turn them into apps.",
      "hero.scroll": "Scroll",
      "studio.kicker": "Studio",
      "studio.line": "I have a dream, and I am making it real.",
      "studio.copy": "That is the principle behind our small development studio. You start out tiny and watch yourself get closer, step by step, to a dream you would not have dared to have a few years ago. We build apps with care for the detail — from the first sketch to the last pixel. Not every idea gets dreamt to the end. But we never stop dreaming.",
      "works.open": "View",
      "works.openExt": "Open",
      "works.bowTags": "iOS · Tower defense",
      "works.bowDesc": "Tower defense for iOS. Build your line, hold the waves, draw the bow.",
      "works.growTags": "iOS · In development",
      "works.growDesc": "Baby tracking for iOS. Sleep, feeds, growth — quietly kept.",
      "works.worldName": "A World Map with History",
      "works.worldTags": "Web · Educational",
      "works.worldDesc": "An interactive 3D globe: 100 years of borders, empires and forms of government, 1926 to 2026.",
      "cta.kicker": "Contact",
      "cta.btn": "Get in touch",
      "foot.claim": "Handmade apps from Germany.",
      "foot.imprint": "Legal notice", "foot.privacy": "Privacy",
      "act.hero": "Opening", "act.studio": "Studio", "act.bow": "Bow & Arrow",
      "act.grow": "Grow into Life", "act.world": "World map",
    },
    es: {
      docTitle: "Chasing Dreams Interactive — Estudio de apps",
      docDesc: "Chasing Dreams Interactive es un estudio de apps independiente. Perseguimos sueños y los convertimos en apps.",
      "nav.studio": "Estudio", "nav.works": "Proyectos", "nav.contact": "Contacto",
      "a11y.skip": "Ir al contenido",
      "hero.kicker": "Un estudio de apps independiente",
      "hero.tagline": "Perseguimos sueños – y los convertimos en apps.",
      "hero.scroll": "Desplázate",
      "studio.kicker": "Estudio",
      "studio.line": "Tengo un sueño y lo estoy haciendo realidad.",
      "studio.copy": "Ese es el principio de nuestro pequeño estudio de desarrollo. Empiezas siendo muy pequeño y ves cómo te acercas, paso a paso, a un sueño que hace unos años no te habrías atrevido a tener. Construimos apps con cariño por el detalle — desde el primer boceto hasta el último píxel. No todas las ideas llegan al final. Pero nunca dejamos de soñar.",
      "works.open": "Ver",
      "works.openExt": "Abrir",
      "works.bowTags": "iOS · Tower defense",
      "works.bowDesc": "Tower defense para iOS. Levanta la línea, aguanta las oleadas, tensa el arco.",
      "works.growTags": "iOS · En desarrollo",
      "works.growDesc": "Seguimiento de bebés para iOS. Sueño, tomas, crecimiento — con calma.",
      "works.worldName": "Mapa del mundo con historia",
      "works.worldTags": "Web · Proyecto educativo",
      "works.worldDesc": "Un globo 3D interactivo: 100 años de fronteras, imperios y formas de gobierno, de 1926 a 2026.",
      "cta.kicker": "Contacto",
      "cta.btn": "Escríbenos",
      "foot.claim": "Apps hechas a mano desde Alemania.",
      "foot.imprint": "Aviso legal", "foot.privacy": "Privacidad",
      "act.hero": "Apertura", "act.studio": "Estudio", "act.bow": "Bow & Arrow",
      "act.grow": "Grow into Life", "act.world": "Mapa del mundo",
    },
  };

  /* ============================================================
     2 · Text vorbereiten
     ============================================================ */

  /* Der Name im Auftakt zerfällt in Buchstaben — jeder bekommt
     seinen Index, die Verzögerung rechnet das CSS. */
  const title = document.getElementById("title");
  if (title) {
    const text = title.textContent.trim();
    title.setAttribute("aria-label", text);
    title.textContent = "";
    let n = 0;
    text.split(" ").forEach((word, i, all) => {
      const w = document.createElement("span");
      w.className = "w";
      w.setAttribute("aria-hidden", "true");
      for (const chr of word) {
        const c = document.createElement("span");
        c.className = "ch";
        c.style.setProperty("--i", n++);
        c.textContent = chr;
        w.appendChild(c);
      }
      title.appendChild(w);
      if (i < all.length - 1) title.appendChild(document.createTextNode(" "));
    });
  }

  /* Überschriften mit [data-words] hellen sich Wort für Wort auf.
     Jedes Wort merkt sich seine Position; die Schleife schiebt --lit
     darüber hinweg. */
  function splitWords(el, text) {
    el.setAttribute("aria-label", text);
    el.textContent = "";
    const parts = text.trim().split(/\s+/);
    parts.forEach((word, i) => {
      const w = document.createElement("span");
      w.className = "wd";
      w.setAttribute("aria-hidden", "true");
      w.style.setProperty("--i", i);
      w.textContent = word;
      el.appendChild(w);
      if (i < parts.length - 1) el.appendChild(document.createTextNode(" "));
    });
    el.__words = parts.length;
  }
  document.querySelectorAll("[data-words]").forEach((el) => splitWords(el, el.textContent));

  /* ============================================================
     3 · Kapitelleiste
     ============================================================ */
  const acts = [...document.querySelectorAll(".act")].map((el) => ({
    el,
    panel: el.querySelector(".panel"),
    words: el.querySelector("[data-words]"),
    key: el.dataset.actKey,
    label: el.dataset.act,
    top: 0, h: 0, p: 0,
    blur: -1,
    dot: null,
  }));

  const railDots = document.getElementById("rail-dots");
  const railDeg = document.getElementById("rail-deg");
  const railTrack = document.querySelector(".rail-track");
  const column = document.getElementById("column");
  if (railDots) {
    acts.forEach((a) => {
      const link = document.createElement("a");
      link.href = "#" + a.el.id;
      link.innerHTML = "<span></span>";
      link.setAttribute("aria-label", a.label);
      link.firstChild.textContent = a.label;
      railDots.appendChild(link);
      a.dot = link;
    });
  }

  /* ============================================================
     4 · Vermessung — einmal, und erst wieder, wenn sich etwas
     am Layout ändert. In der Schleife wird nur noch gerechnet.
     ============================================================ */
  const scene = document.getElementById("scene");
  let range = 1;
  let sceneTop = 0;

  function measure() {
    if (!innerHeight) return;   // Seite liegt in einem unsichtbaren Fenster
    sceneTop = scene.getBoundingClientRect().top + scrollY;
    range = Math.max(1, sceneTop + scene.offsetHeight - innerHeight);
    acts.forEach((a) => {
      const r = a.el.getBoundingClientRect();
      a.top = r.top + scrollY;
      a.h = r.height;
      // Position des Akts auf der Umrundung — dort sitzt sein Punkt.
      a.p = clamp((a.top + a.h / 2 - innerHeight / 2) / range, 0, 1);
      if (a.dot) a.dot.style.setProperty("--p", a.p.toFixed(4));
    });
  }

  /* ============================================================
     5 · Die Schleife
     ============================================================ */
  const head = document.getElementById("site-head");
  const navLinks = [...document.querySelectorAll(".site-nav a")];

  let smooth = 0;      // nachziehender Wert für die Kamera
  let lastY = scrollY;
  let prev = performance.now();
  let activeIdx = -1;
  let lastDeg = -1;
  let lastSettle = -1;

  function tick(now) {
    const dt = Math.min(64, now - prev) || 16;
    prev = now;

    const y = scrollY;
    const drift = y - lastY;
    lastY = y;

    const p = clamp((y - sceneTop) / range, 0, 1);

    // Bildratenunabhängiges Nachziehen: bei 60 wie bei 120 Hz
    // braucht die Kamera gleich lange, um aufzuholen.
    smooth += (p - smooth) * (1 - Math.pow(0.00005, dt / 1000));
    if (Math.abs(p - smooth) < 0.0002) smooth = p;

    // --orbit und --settle sitzen bewusst auf dem Element, das sie
    // braucht, nicht auf :root: eine Variable am Wurzelelement zu
    // ändern lässt den Browser den ganzen Baum neu bewerten.
    if (railTrack) railTrack.style.setProperty("--orbit", smooth.toFixed(4));
    if (window.CDIOrbit) window.CDIOrbit.render(smooth, drift, dt);

    // Die Gradzahl kommt aus orbit.js: die Kamera geht über die Seite
    // anderthalb Mal herum, der Scroll-Fortschritt allein sagt also
    // nichts über den Blickwinkel.
    const deg = window.CDIOrbit ? window.CDIOrbit.angle : 0;
    if (railDeg && deg !== lastDeg) { railDeg.textContent = deg + "°"; lastDeg = deg; }

    // Die Säule sitzt im Auftakt einen Hauch größer und beruhigt sich.
    const settle = +clamp(1 - y / Math.max(1, innerHeight * 0.9), 0, 1).toFixed(3);
    if (column && settle !== lastSettle) {
      column.style.setProperty("--settle", settle);
      lastSettle = settle;
    }

    // Tafeln: exakt am Scroll, ohne Nachlauf.
    const mid = y + innerHeight / 2;
    let best = 0, bestD = Infinity;
    for (let i = 0; i < acts.length; i++) {
      const a = acts[i];
      const t = clamp((a.top + a.h / 2 - mid) / (innerHeight * 0.85), -1.25, 1.25);
      const abs = t < 0 ? -t : t;
      if (a.panel && !reduced) {
        a.panel.style.setProperty("--t", t.toFixed(3));
        a.panel.style.setProperty("--a", abs.toFixed(3));
        // Die Unschärfe wird in Stufen gesetzt. Jeder neue filter-Wert
        // zwingt den Browser, die Tafel neu zu rastern — bei jedem Bild
        // wäre das die teuerste Zeile der ganzen Seite.
        const b = Math.round(abs * 8) / 8;
        if (b !== a.blur) { a.panel.style.setProperty("--b", b); a.blur = b; }
      }
      if (a.words) {
        // --lit wandert von 0 bis über das letzte Wort hinaus,
        // während der Akt von unten in die Mitte kommt.
        const lit = clamp((0.62 - t) / 0.78, 0, 1) * (a.words.__words + 2.5);
        a.words.style.setProperty("--lit", lit.toFixed(2));
      }
      if (abs < bestD) { bestD = abs; best = i; }
    }

    if (best !== activeIdx) {
      activeIdx = best;
      acts.forEach((a, i) => {
        if (a.dot) a.dot.setAttribute("aria-current", String(i === best));
      });
      const id = acts[best].el.id;
      navLinks.forEach((l) => {
        l.setAttribute("aria-current", String(l.getAttribute("href") === "#" + id));
      });
    }

    head.classList.toggle("is-scrolled", y > 24);
    requestAnimationFrame(tick);
  }

  /* ============================================================
     6 · Kopfzeile und Kleinigkeiten
     ============================================================ */
  const descTag = document.querySelector('meta[name="description"]');
  const STORE = "cdi-lang";

  function apply(lang) {
    const dict = I18N[lang] || I18N.de;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = dict[el.dataset.i18n];
      if (val == null) return;
      if (el.hasAttribute("data-words")) splitWords(el, val);
      else el.textContent = val;
    });

    // Beschriftungen der Kapitelleiste
    acts.forEach((a) => {
      const val = a.key && dict[a.key];
      if (!val || !a.dot) return;
      a.label = val;
      a.dot.setAttribute("aria-label", val);
      a.dot.firstChild.textContent = val;
    });

    root.lang = lang;
    if (dict.docTitle) document.title = dict.docTitle;
    if (descTag && dict.docDesc) descTag.setAttribute("content", dict.docDesc);
    document.querySelectorAll(".lang-switch button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    try { localStorage.setItem(STORE, lang); } catch (e) { /* privater Modus */ }

    measure();
  }

  function initialLang() {
    let saved;
    try { saved = localStorage.getItem(STORE); } catch (e) { /* egal */ }
    if (saved && I18N[saved]) return saved;
    const nav = (navigator.language || "de").slice(0, 2).toLowerCase();
    return I18N[nav] ? nav : "de";
  }

  document.querySelectorAll(".lang-switch button").forEach((b) => {
    b.addEventListener("click", () => apply(b.dataset.lang));
  });

  /* Los. Neu vermessen, wenn sich Schriften, Bilder oder Fenster
     ändern — sonst laufen Punkte und Tafeln aus dem Takt. */
  apply(initialLang());
  measure();
  requestAnimationFrame(tick);

  let rt = 0;
  const later = () => { clearTimeout(rt); rt = setTimeout(measure, 120); };
  addEventListener("resize", later, { passive: true });
  addEventListener("orientationchange", later, { passive: true });
  addEventListener("load", measure);
  addEventListener("visibilitychange", () => { if (!document.hidden) later(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
})();
