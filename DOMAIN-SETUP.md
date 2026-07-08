# Custom Domain: chasingdreamsinteractive.com

Die `CNAME`-Datei ist **absichtlich noch nicht** im Repository. Sobald sie gepusht ist,
leitet GitHub Pages **alle** alten `prypien.github.io/BowAndArrowPrivacy/…`-URLs per 301
auf die neue Domain um. Steht das DNS zu dem Zeitpunkt nicht, laufen Apples Links ins
Leere — deshalb erst DNS einrichten, dann CNAME aktivieren.

## Schritt 1: DNS beim Domain-Anbieter einrichten

Für die Apex-Domain `chasingdreamsinteractive.com` vier **A-Records** anlegen:

| Typ | Name | Wert |
|-----|------|------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Optional (empfohlen) für `www`:

| Typ | Name | Wert |
|-----|------|------|
| CNAME | www | prypien.github.io |

Warten, bis das DNS propagiert ist (prüfen mit `dig chasingdreamsinteractive.com +short`
— es müssen die vier GitHub-IPs erscheinen; kann bis zu 24 h dauern, meist < 1 h).

## Schritt 2: Domain in GitHub eintragen

Im Repository **Prypien/BowAndArrowPrivacy** → *Settings* → *Pages* →
*Custom domain* → `chasingdreamsinteractive.com` eintragen und speichern.
GitHub committet die `CNAME`-Datei dann automatisch ins Repo — `git pull` nicht vergessen.

*(Alternativ per Hand: `echo "chasingdreamsinteractive.com" > CNAME`, committen, pushen.)*

## Schritt 3: HTTPS erzwingen

Zurück in *Settings* → *Pages* warten, bis das Zertifikat ausgestellt ist
(wenige Minuten bis ~1 h), dann **"Enforce HTTPS"** aktivieren.

## Schritt 4 (empfohlen): Domain verifizieren

GitHub-Profil → *Settings* → *Pages* → *Verified domains* → Domain hinzufügen und den
angezeigten TXT-Record beim DNS-Anbieter setzen. Schützt vor Domain-Takeover.

## Was passiert mit den Apple-URLs?

Die bei Apple hinterlegte URL `https://prypien.github.io/BowAndArrowPrivacy/privacy.html`
wird von GitHub zu `https://chasingdreamsinteractive.com/privacy.html` umgeleitet
(der Repo-Name fällt aus dem Pfad!). Dort liegt ein Redirect-Stub, der sofort auf
`/bow-and-arrow/privacy.html` weiterleitet — die Kette funktioniert also nahtlos:

```
prypien.github.io/BowAndArrowPrivacy/privacy.html
  → 301 → chasingdreamsinteractive.com/privacy.html   (Stub)
  → chasingdreamsinteractive.com/bow-and-arrow/privacy.html   (Ziel)
```

Die von der iOS-App verlinkten `chasingdreamsinteractive.com/BowAndArrowPrivacy/…`-URLs
bedient der Legacy-Stub-Ordner `BowAndArrowPrivacy/`, der auf `/bow-and-arrow/…` weiterleitet.

Nach dem Go-Live der Domain empfiehlt es sich trotzdem, in App Store Connect die
Privacy-URL direkt auf `https://chasingdreamsinteractive.com/bow-and-arrow/privacy.html`
zu aktualisieren (und `LegalDocumentURLs.swift` in der App beim nächsten Update ebenfalls).
