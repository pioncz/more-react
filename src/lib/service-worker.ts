const v = 1;

console.log('Service worker v', v);
clients.claim();
skipWaiting();

self.addEventListener('install', (event) => {
  console.log('Install for v', v);
});

self.addEventListener('activate', (event) => {
  console.log('Activate for v', v);
});

self.addEventListener('message', (evt) => {
  console.log('PostMessage v' + v + ' received', evt.data);

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({ calculation: 'results' });
    });
  });
});
