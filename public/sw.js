// Service Worker para JP Traslados Card PWA
const CACHE_NAME = 'jp-card-v3';
const urlsToCache = [
  '/card',
  '/images/logo.png',
  '/images/virtus.png',
  '/images/corolla.png',
  '/images/civic.png',
  '/images/corolla-cross.png',
  '/favicon.ico',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
  // Força a ativação imediata do novo service worker
  self.skipWaiting();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Força o controle imediato de todas as abas
      return self.clients.claim();
    })
  );
});
