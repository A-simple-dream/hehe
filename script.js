const vinyl = document.getElementById('vinyl');
const book = document.getElementById('book');
const audio = document.getElementById('bgm');
const bookPages = document.getElementById('book-pages');
const closeBtn = document.getElementById('close-book');

let isPlaying = false;

vinyl.addEventListener('click', () => {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
  } else {
    audio.pause();
    isPlaying = false;
  }
});

book.addEventListener('click', () => {
  bookPages.classList.add('show');
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
  }
});

closeBtn.addEventListener('click', () => {
  bookPages.classList.remove('show');
});
