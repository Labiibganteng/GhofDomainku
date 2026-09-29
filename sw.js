self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('ghofdomain-v1').then((cache) => {
      return cache.addAll(['/', '/index.html', '/dashboard.html', '/style.css', '/script.js']);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
