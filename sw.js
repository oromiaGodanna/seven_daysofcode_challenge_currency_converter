let staticCacheName = 'cache-v1';
let urlsToCache = [
  '',
  '/index.html',
  '/style.css',
  '/currencyConverter.js'
];
console.log(urlsToCache);
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== staticCacheName) {
            return caches.delete(key);
          }
        }),
      ),
    ),
  );
});
