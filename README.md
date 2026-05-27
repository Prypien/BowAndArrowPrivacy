# Legal pages (GitHub Pages)

Host the privacy policy and imprint for App Store Connect and in-app links.

## Setup

1. Replace placeholders in `impressum.html` (name, address, email) and `support@example.com` in `BowAndArrow/Data/LegalDocumentURLs.swift`.
2. Set `LegalDocumentURLs.pagesBaseURL` to your real Pages URL (same as below).
3. GitHub → **Settings → Pages** → Build from branch **`main`**, folder **`/docs`**.
4. After deploy (~1–2 min), open `https://<user>.github.io/BowAndArrow/index.html`.
5. App Store Connect → **Privacy Policy URL** and **Support URL** → use those URLs.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Privacy policy (DE + EN) |
| `impressum.html` | Imprint / Impressum (DE) |
