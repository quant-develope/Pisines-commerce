// Offline shell for the installed app. App files: network first (updates show up at once), cache as fallback.
// Photos and libraries: cache first. API: never cached, except the last catalogue for opening offline.
const CACHE = 'pisines-v12';
const SHELL = ['/', '/app.js', '/style.css', '/manifest.webmanifest', '/logo.png', '/icon-192.png',
  '/vendor/pdfmake.min.js', '/vendor/vfs_fonts.js', '/vendor/pdf.min.js', '/vendor/pdf.worker.min.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

async function networkFirst(req, key) {
  const c = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) c.put(key || req, res.clone());
    return res;
  } catch (err) {
    const hit = await c.match(key || req);
    if (hit) return hit;
    throw err;
  }
}
async function cacheFirst(req) {
  const c = await caches.open(CACHE);
  const hit = await c.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) c.put(req, res.clone());
  return res;
}

self.addEventListener('fetch', (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (url.pathname === '/api/data') return e.respondWith(networkFirst(req, '/api/data'));
  if (url.pathname.startsWith('/api/img/') || url.pathname.startsWith('/img/') || url.pathname.startsWith('/vendor/')) return e.respondWith(cacheFirst(req));
  if (url.pathname.startsWith('/api/')) return;
  if (req.mode === 'navigate') return e.respondWith(networkFirst(req, '/'));
  e.respondWith(networkFirst(req));
});
