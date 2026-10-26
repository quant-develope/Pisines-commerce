# Pisines commerce

Commercial offers (Οικονομική προσφορά) for Spartakos prefab pools, as a small Cloudflare Worker.

- `public/` — the phone app (RU/ΕΛ interface, Greek PDF made in the browser with pdfmake).
- `src/worker.js` — `/api/*` routes; all data lives in one SQLite-backed Durable Object (`Store`): PIN, materials and prices, categories, settings, saved offers, uploaded photos. Nothing private is stored in this public repo.
- `src/seed.js` — starting catalogue written once when the PIN is first set (no prices).

Deploy: push to `main`; Cloudflare Workers Builds runs `npx wrangler deploy`.
Local: `npm install && npx wrangler dev`.
