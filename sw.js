let staticCacheName = 'cache-v1';
let urlsToCache = [
  '/',
  '/seven_daysofcode_challenge_currency_converter/',
  './index.html',
  './style.css',
  './currencyConverter.js',
];
self.addEventListener('fetch', event => {
  event.respondWith(
      caches.match(event.request)
      .then(response => {console.log(response)
            return response || fetch(event.request))
      });
});
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => cache.addAll(urlsToCache))
  );
});
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('cache-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
