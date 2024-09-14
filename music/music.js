document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressBar = document.getElementById('progressBar');
  const currentTimeElem = document.getElementById('currentTime');
  const durationElem = document.getElementById('duration');
  const songTitle = document.getElementById('songTitle');

  // List of songs
  const songs = [
      { src: 'vaaste.mp3', title: 'vaaste' },
      { src: 'leja re.mp3', title: 'leja re' }
  ];

  let currentSongIndex = 0;

  function loadSong(index) {
      audio.src = songs[index].src;
      songTitle.textContent = songs[index].title;
      audio.play();
      playPauseBtn.textContent = 'Pause';
  }

  function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function updateProgress() {
      const { currentTime, duration } = audio;
      if (!isNaN(duration)) {
          progressBar.value = (currentTime / duration) * 100;
          currentTimeElem.textContent = formatTime(currentTime);
          durationElem.textContent = formatTime(duration);
      }
  }

  playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
          audio.play();
          playPauseBtn.textContent = 'Pause';
      } else {
          audio.pause();
          playPauseBtn.textContent = 'Play';
      }
  });

  prevBtn.addEventListener('click', () => {
      if (currentSongIndex > 0) {
          currentSongIndex--;
      } else {
          currentSongIndex = songs.length - 1;
      }
      loadSong(currentSongIndex);
  });

  nextBtn.addEventListener('click', () => {
      if (currentSongIndex < songs.length - 1) {
          currentSongIndex++;
      } else {
          currentSongIndex = 0;
      }
      loadSong(currentSongIndex);
  });

  progressBar.addEventListener('input', () => {
      const { duration } = audio;
      audio.currentTime = (progressBar.value / 100) * duration;
  });

  audio.addEventListener('timeupdate', updateProgress);

  audio.addEventListener('loadedmetadata', () => {
      durationElem.textContent = formatTime(audio.duration);
  });

  // Load the first song on page load
  loadSong(currentSongIndex);
});
