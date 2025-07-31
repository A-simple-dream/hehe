// 🎶 Cassette xử lý
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

// 📖 Dựng nhật ký bằng radio + dữ liệu từ data.js
const bookEl = document.querySelector(".book");
const pageInfos = window.dataFromSubdomain?.data?.pageInfos || [];
const nameBook = window.dataFromSubdomain?.data?.nameBook || "Cuốn Nhật Ký";

function createPage(text, image, isCover = false) {
  const div = document.createElement("div");
  div.className = isCover ? "cover" : "page";
  div.innerHTML = isCover
    ? `<h1>${nameBook}</h1>`
    : `<div class="page-img-wrap"><img class="page-img" src="${image}" /></div><div class="page-text">${text}</div>`;
  return div;
}

function renderBook() {
  for (let i = 0; i <= pageInfos.length; i++) {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "page";
    input.id = `page-${i}`;
    if (i === 0) input.checked = true;
    bookEl.appendChild(input);

    bookEl.appendChild(createPage('', '', true)); // bìa hoặc mặt trái
    if (i > 0) {
      const p = pageInfos[i - 1];
      bookEl.appendChild(createPage(p.text, p.image)); // trang nội dung
    }
  }
}

renderBook();
