// 🎶 Xử lý cassette
const cassetteBtn = document.getElementById("cassetteBtn");
const audioPlayer = document.getElementById("audioPlayer");
const cassetteImg = document.querySelector(".cassette-img");
const cassetteImgs = [
  "assets/page2.png",
  "assets/page3.png",
  "assets/page4.png",
  "assets/page5.png",
];
let cassetteIndex = 0;
let cassetteInterval = null;

function startCassetteAnimation() {
  if (cassetteInterval) return;
  cassetteInterval = setInterval(() => {
    cassetteIndex = (cassetteIndex + 1) % cassetteImgs.length;
    cassetteImg.src = cassetteImgs[cassetteIndex];
  }, 500);
}

function stopCassetteAnimation() {
  clearInterval(cassetteInterval);
  cassetteInterval = null;
  cassetteIndex = 0;
  cassetteImg.src = "assets/page1.png";
}

cassetteBtn.addEventListener("click", () => {
  audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
});

audioPlayer.addEventListener("play", startCassetteAnimation);
audioPlayer.addEventListener("pause", stopCassetteAnimation);
audioPlayer.addEventListener("ended", stopCassetteAnimation);

// 📖 Xử lý nhật ký
const bookEl = document.querySelector(".book");
const pageInfos = (window.dataFromSubdomain?.data?.pageInfos) || [];
let currentPageIndex = -1;

function renderBook(index) {
  bookEl.innerHTML = "";

  // Trang trái
  const leftPage = document.createElement("div");
  leftPage.className = "page";
  leftPage.style.left = "1%";
  if (index > 0) {
    const prev = pageInfos[index - 1];
    leftPage.innerHTML = `
      <div class="page-img-wrap"><img class="page-img" src="${prev.image}" /></div>
      <div class="page-text">${prev.text}</div>
    `;
  } else {
    leftPage.classList.add("cover");
  }

  // Trang phải
  const rightPage = document.createElement("div");
  rightPage.className = "page";
  if (index >= 0) {
    const data = pageInfos[index];
    rightPage.innerHTML = `
      <div class="page-img-wrap"><img class="page-img" src="${data.image}" /></div>
      <div class="page-text">${data.text}</div>
    `;
  } else {
    rightPage.classList.add("cover");
    rightPage.innerHTML = `<h1>${window.dataFromSubdomain?.data?.nameBook || 'Cuốn Nhật Ký Mùa Hạ'}</h1>`;
  }

  bookEl.appendChild(leftPage);
  bookEl.appendChild(rightPage);
}

bookEl.addEventListener("click", (e) => {
  const rect = bookEl.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const center = rect.width / 2;

  if (currentPageIndex === -1) {
    currentPageIndex = 0;
    renderBook(currentPageIndex);
    audioPlayer?.play(); // phát nhạc khi mở
  } else {
    if (x > center && currentPageIndex < pageInfos.length - 1) {
      currentPageIndex++;
      renderBook(currentPageIndex);
    } else if (x < center && currentPageIndex > 0) {
      currentPageIndex--;
      renderBook(currentPageIndex);
    }
  }
});

// Khởi tạo chỉ hiển thị bìa
renderBook(currentPageIndex);
