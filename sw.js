
let cacheName = 'cache-v1';
let urlsToCache = [
  './index.html',
  './style.css',
  './currencyConverter.js',
];
self.addEventListener('fetch', function(event) {

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(urlsToCache))
  );
});
