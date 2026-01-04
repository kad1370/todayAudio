self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('audio-cache').then(cache =>
      cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/app.js'
      ])
    )
  );
});

self.addEventListener('fetch', e => {
  // 오디오 파일 요청이면 서비스 워커가 개입하지 않고 통과시킴
  if (e.request.destination === 'audio' || e.request.url.includes('.mp3')) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});