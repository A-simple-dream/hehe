const vinyl = document.getElementById('vinyl');
const book = document.getElementById('book');
const audio = document.getElementById('bgm');
const notesContainer = document.getElementById('music-notes');
const bookPages = document.getElementById('book-pages');

vinyl.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    createNotes();
  } else {
    audio.pause();
  }
});

book.addEventListener('click', () => {
  bookPages.classList.toggle('hidden');
});

function createNotes() {
  for (let i = 0; i < 10; i++) {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerText = '🎵';
    note.style.left = Math.random() * window.innerWidth + 'px';
    note.style.top = '80%';
    notesContainer.appendChild(note);
    setTimeout(() => note.remove(), 2000);
  }
}
