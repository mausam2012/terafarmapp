self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/css/app.css',
        '/js/app.js',
        '/offline.html', // Add your offline page
        // Add other assets you want to cache
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).catch(function() {
        return caches.match('/offline.html'); // Serve offline page
      });
    })
  );
});