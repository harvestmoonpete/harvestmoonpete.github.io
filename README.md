# Dan O. — engineering portfolio

A static personal website at https://harvestmoonpete.github.io/ presenting Failure Lab, Incident Desk, Referral Tracker, and drift. Each project links to a public browser demo and its source, with an optional embedded preview. Pairwise is explicitly local-only until a public deployment exists.

## Local preview

```sh
python3 -m http.server 5198 --directory site
```

Open http://localhost:5198. No build step or runtime dependencies are needed. The site uses system fonts and loads no demo iframe until a visitor requests one. Closing the preview removes it and returns keyboard focus to its trigger. Opening the full-page demo remains available if framing is blocked.

## Editing and publication

Edit `site/index.html` for project content and links, `site/styles.css` for visual styling, and `site/site.js` for the preview dialog. Keep simulation/local-only disclosures accurate. GitHub Actions checks JavaScript syntax and runs browser checks before deploying `site/` to Pages on `main`.

```sh
npm ci
npx playwright install chromium
npm run check
npm test
```

Tests cover desktop/mobile layout, demo and source destinations, preview keyboard dismissal and focus restoration, and automated WCAG A/AA checks on the landing page. The preview test stubs external demos for repeatability; it does not validate their backend behavior. Automated accessibility checks are not a full conformance audit.

The portfolio contains no tracking, contact form, secrets, or personal records. The linked project repositories document their own architecture and limitations.
