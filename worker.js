addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
  }
  event.respondWith(fetch(url.toString(), event.request));
});
