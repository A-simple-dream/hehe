const vinylImg = document.getElementById('vinyl-img');
const vinylZone = document.getElementById('vinyl-zone');
const audio = document.getElementById('bgm');
const bookCover = document.getElementById('book-cover');
const book = document.getElementById('book');
const left = document.getElementById('book-left');
const right = document.getElementById('book-right');
const closeBook = document.getElementById('close-book');

let isPlaying = false;
let spinning = false;
let spinInterval;
let vinylFrames = ['page2.jpg', 'page3.jpg', 'page4.jpg', 'page5.jpg'];
let frameIndex = 0;

vinylZone.addEventListener('click', () => {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    spinning = true;
    spinInterval = setInterval(() => {
      vinylImg.src = 'assets/' + vinylFrames[frameIndex];
      frameIndex = (frameIndex + 1) % vinylFrames.length;
    }, 500);
  } else {
    audio.pause();
    isPlaying = false;
    spinning = false;
    clearInterval(spinInterval);
    vinylImg.src = 'assets/page1.jpg';
  }
});

let photos = [];
let currentIndex = 0;

function loadPhotos() {
  fetch('photo/photos.json')
    .then(res => res.json())
    .then(data => {
      photos = data;
      renderPages();
    });
}

function renderPages() {
  left.innerHTML = currentIndex > 0
    ? `<img src="photo/${photos[currentIndex - 1]}" />`
    : '';
  right.innerHTML = currentIndex < photos.length
    ? `<img src="photo/${photos[currentIndex]}" />`
    : '';
}

bookCover.addEventListener('click', () => {
  book.classList.remove('hidden');
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
  }
});

closeBook.addEventListener('click', () => {
  book.classList.add('hidden');
});

left.addEventListener('click', () => {
  if (currentIndex > 1) {
    currentIndex -= 2;
    renderPages();
  }
});

right.addEventListener('click', () => {
  if (currentIndex < photos.length - 1) {
    currentIndex += 2;
    renderPages();
  }
});

[right, left].forEach(side => {
  side.addEventListener('contextmenu', e => {
    e.preventDefault();
  });
  side.addEventListener('mousedown', e => {
    if (e.button === 0) {
      e.target.dataset.downTime = Date.now();
    }
  });
  side.addEventListener('mouseup', e => {
    if (Date.now() - e.target.dataset.downTime > 600) {
      const img = e.target.closest('img');
      if (img) {
        const link = document.createElement('a');
        link.href = img.src;
        link.download = img.src.split('/').pop();
        link.click();
      }
    }
  });
});

window.onload = loadPhotos;
