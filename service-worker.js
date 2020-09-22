const cacheName = 'neumepiano-v1';
const staticAssets = [
  './',
  './index.html',
  './neumepiano.js',
  './lib/audiosynth.js',
  './img/icon-512x512.jpg',
  './img/neume_0.png',
  './img/neume_1.png',
  './img/neume_2.png',
  './img/neume_3.png',
  './img/neume_4.png',
  './img/neume_5.png',
  './img/neume_6.png',
  './img/neume_7.png',
  './img/neume_8.png',
  './img/neume_9.png',
  './img/neume_10.png',
  './img/neume_11.png',
  './img/neume_12.png',
];

self.addEventListener('install', async event => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

self.addEventListener('fetch', async event => {
  console.log('fetch');
});
