// Service worker Rumahku: membuat aplikasi tetap bisa dibuka tanpa internet.
// Naikkan angka versi ini setiap kali kamu mengubah file aplikasi.
const CACHE = 'rumahku-v20';
const ASSETS = ['./', './index.html', './config.js', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  // Satu file gagal (misalnya config.js belum diupload) tidak menggagalkan yang lain
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(ASSETS.map((a) => c.add(a).catch(() => {})))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Ambil versi terbaru dari internet; kalau offline, pakai salinan tersimpan.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    // cache: 'no-cache' = selalu tanya GitHub dulu apakah ada versi baru (tidak memakai salinan lama browser)
    fetch(new Request(req.url, { cache: 'no-cache', credentials: 'same-origin' }))
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('./index.html')))
  );
});
