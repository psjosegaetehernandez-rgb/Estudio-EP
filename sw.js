const CACHE_NAME = 'estudio-ep-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/main.css',
  './css/canvas.css',
  './css/cartas.css',
  './css/epes.css',
  './js/app.js',
  './js/drag-drop.js',
  './js/herramientas.js',
  './js/panel-derecho.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});