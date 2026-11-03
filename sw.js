const CACHE_NAME = 'estudio-ep-v240';
const urlsToCache = [
  './',
  './index.html',
  './css/main.css',
  './css/canvas.css',
  './css/cartas.css',
  './css/epes.css',
  './css/game-components.css',
  './js/app.js',
  './js/herramientas.js',
  './js/panel-derecho.js',
  './js/catalogo.js',
  './js/components-engine.js',
  './js/utilities.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});