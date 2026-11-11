// Service worker: cached de app-bestanden zodat de app offline werkt.
const CACHE_NAAM = "moestuin-v6";
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
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request)
        .then(resp => {
          const kopie = resp.clone();
          caches.open(CACHE_NAAM).then(c => c.put("./index.html", kopie));
          return resp;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(gecached => gecached || fetch(e.request))
  );
});
