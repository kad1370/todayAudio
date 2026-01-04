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

 const audios = document.querySelectorAll('audio');

 audios.forEach(audio => {
   audio.addEventListener('play', () => {
    alert("state: " + audio.readyState);
     // 2. 만약 데이터가 전혀 없으면 강제 로드
     if (audio.readyState === 0) {
       audio.load();
     }

       audio.play().then(() => {
           console.log("재생 성공");
         })
         .catch(error => {
           alert("play error: " + error.name);
         });
   });

   // 4. 오디오 객체 자체에서 발생하는 에러 감시 (파일 없음, 네트워크 단절 등)
   audio.onerror = () => {
     const err = audio.error;
     alert(`오디오 에러: ${err}`);
   };
 });
