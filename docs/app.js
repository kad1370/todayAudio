fetch('./audios.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('list');

    data.forEach(audioData => {
      const div = document.createElement('div');
      div.className = 'audio-card';
      div.innerHTML = `
        <h3>${audioData.title}</h3>
        <p>${audioData.desc}</p>
        <audio controls playsinline preload="metadata" src="${audioData.url}"></audio>
        <a href="${audioData.url}" download>⬇️ 다운로드</a>
      `;
      list.appendChild(div);

      const audioElement = div.querySelector('audio');

      audioElement.addEventListener('play', async () => {
        alert("현재 상태(readyState):" + audioElement.readyState);
        // MediaSession API 강제 활성화 (아이폰 제어센터용)
        if ('mediaSession' in navigator) {
        alert("mediaSession");
          navigator.mediaSession.metadata = new MediaSessionMetadata({
            title: audioData.title,     // JSON에 있는 제목
            artist: '오늘의 오디오',      // 아티스트 이름
            album: '오오',         // 앨범 이름
            artwork: [
              { src: 'icon-192.png', sizes: '192x192', type: 'image/png' } // 아이콘 경로
            ]
          });

          // 제어센터에서 조작 가능하게 만들기
          navigator.mediaSession.setActionHandler('play', () => audioElement.play());
          navigator.mediaSession.setActionHandler('pause', () => audioElement.pause());
        }
        // 1. 상태가 1(Metadata만 있음)이거나 에러 상태라면 강제 리셋
          if (audioElement.readyState === 1 || audioElement.readyState === 0) {
            const currentSrc = audioElement.src;
            audioElement.src = ''; // 소스를 비웠다가
            audioElement.src = currentSrc; // 다시 넣어서 세션을 완전히 새로 고침
            audioElement.load();

            await new Promise(resolve => setTimeout(resolve, 200));
          }

        audioElement.play().then(() => {
          alert("재생성공");
        }).catch(error => {
          alert("재생 에러:"+ error.name);
          // iOS PWA 세션 끊김 대응: 소스 재할당
          if (audioElement.readyState === 0) {
             audioElement.src = audioData.url;
             audioElement.load();
          }
        });
      });

      audioElement.onerror = () => {
        alert("오디오 에러 상세:"+ audioElement.error);
      };
    });
  })
  .catch(err => console.error("JSON 로드 실패:", err));