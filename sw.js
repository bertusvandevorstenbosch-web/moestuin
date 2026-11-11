// Service worker: cached de app-bestanden zodat de app offline werkt.
const CACHE_NAAM = "moestuin-v2";
const BESTANDEN = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/data.js",
  "./js/app.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAAM).then(c => c.addAll(BESTANDEN)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(namen =>
      Promise.all(namen.filter(n => n !== CACHE_NAAM).map(n => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(gecached => gecached || fetch(e.request))
  );
});
