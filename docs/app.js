fetch('./audios.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('list');

    data.forEach(audio => {
      const div = document.createElement('div');
      div.className = 'audio-card';
      div.innerHTML = `
        <h3>${audio.title}</h3>
        <p>${audio.desc}</p>
        <audio controls playsinline preload="metadata" src="${audio.url}"></audio>
        <a href="${audio.url}" download>⬇️ 다운로드</a>
      `;

      list.appendChild(div);
    });
  });

  // 오디오 요소들을 모두 찾아서
  const audios = document.querySelectorAll('audio');

  audios.forEach(audio => {
    audio.addEventListener('play', () => {
      alert(audio.readyState);
      if (audio.readyState === 0) {
        audio.load();
      }

      const playPromise = audio.play();

      if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log("재생 성공");
              })
              .catch(error => {
              alert(error.name + ": " + error.message);
          }
    });
  });
