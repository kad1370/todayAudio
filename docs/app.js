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

      audioElement.addEventListener('play', () => {
        alert("현재 상태(readyState):" + audioElement.readyState);

        if (audioElement.readyState === 0) {
          audioElement.load();
        }

        audioElement.play().then(() => {
          console.log("재생 성공");
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