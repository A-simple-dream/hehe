
const recordPlayer = document.getElementById("record-player");
const audio = document.getElementById("bg-music");
const journalCover = document.getElementById("journal-cover");
const book = document.getElementById("book");
const leftPage = document.getElementById("left-page");
const rightPage = document.getElementById("right-page");

const recordFrames = ["page2.jpg", "page3.jpg", "page4.jpg", "page5.jpg"];
let recordInterval = null;
let playing = false;
let pageIndex = 0;
let photos = [];

for (let i = 1; i <= 6; i++) {
  photos.push(`assets/images/photo/photo${i}.jpg`);
}

recordPlayer.addEventListener("click", () => {
  if (!playing) {
    audio.play();
    let frameIndex = 0;
    recordInterval = setInterval(() => {
      recordPlayer.style.backgroundImage = `url('assets/images/${recordFrames[frameIndex]}')`;
      frameIndex = (frameIndex + 1) % recordFrames.length;
    }, 500);
    playing = true;
  } else {
    audio.pause();
    clearInterval(recordInterval);
    recordPlayer.style.backgroundImage = "url('assets/images/page1.jpg')";
    playing = false;
  }
});

journalCover.addEventListener("click", () => {
  journalCover.style.display = "none";
  book.classList.remove("hidden");
  updatePages();
});

function updatePages() {
  leftPage.style.backgroundImage = `url('${photos[pageIndex] || ""}')`;
  rightPage.style.backgroundImage = `url('${photos[pageIndex + 1] || ""}')`;
}

book.addEventListener("click", (e) => {
  const rect = book.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  if (clickX > rect.width / 2) {
    if (pageIndex + 2 < photos.length) pageIndex += 2;
  } else {
    if (pageIndex - 2 >= 0) pageIndex -= 2;
  }
  updatePages();
});

[leftPage, rightPage].forEach((page) => {
  page.addEventListener("mousedown", () => {
    page.addEventListener("mouseup", downloadPage, { once: true });
    setTimeout(() => {
      page.removeEventListener("mouseup", downloadPage);
    }, 800);
  });
});

function downloadPage(e) {
  const bg = e.target.style.backgroundImage;
  const url = bg.slice(5, -2); 
  const a = document.createElement("a");
  a.href = url;
  a.download = url.split("/").pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
