let staticCacheName = 'cache-v1';
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
    caches.open(staticCacheName).then(cache => cache.addAll(urlsToCache))
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName =>cacheName.startsWith('cache-') && cacheName != staticCacheName)
        .map(cacheName => delete(cacheName))
        
      )
    })
)
});
