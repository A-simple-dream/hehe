const pageInfos = [
  { text: "Mùa hè rực rỡ của chúng ta", image: "photo/photo1.jpg" },
  { text: "Em và biển", image: "photo/photo2.jpg" },
  // Thêm ảnh & text tuỳ ý...
];

// Render trang sách
function renderBookPages() {
  const book = document.querySelector(".book");
  let html = `
    <input type="radio" name="page" id="page-1" checked />
    <label class="page cover" for="page-3"><h1>Cuốn Nhật Ký Mùa Hạ</h1></label>
    <label class="page cover" for="page-1"></label>
  `;
  let pageIndex = 3;

  for (let i = 0; i < pageInfos.length; i += 2) {
    const nextPageId = pageIndex + 2;
    html += `<input type="radio" name="page" id="page-${pageIndex}" />`;
    for (let j = 0; j < 2; j++) {
      const item = pageInfos[i + j];
      if (item) {
        html += `<label class="page" for="page-${j === 0 ? nextPageId : pageIndex}">
          <div class="page-img-wrap">
            <img src="${item.image}" class="page-img" />
          </div>
          ${item.text ? `<div class="page-text">${item.text}</div>` : ""}
        </label>`;
      }
    }
    pageIndex += 2;
  }

  html += `
    <input type="radio" name="page" id="page-${pageIndex}" />
    <label class="page cover" for="page-${pageIndex + 2}"></label>
    <label class="page cover" for="page-${pageIndex}"></label>
    <input type="radio" name="page" id="page-${pageIndex + 2}" />
  `;
  book.innerHTML = html;
}

renderBookPages();
updateBookShadow();

// Bóng đổ trái/phải
function updateBookShadow() {
  const book = document.querySelector(".book");
  const radios = document.querySelectorAll("input[type=radio][name=page]");
  let current = Array.from(radios).findIndex(r => r.checked);
  const total = radios.length;

  book.classList.remove("has-left", "has-right");
  if (current === 0) book.classList.add("has-right");
  else if (current === total - 1) book.classList.add("has-left");
  else book.classList.add("has-left", "has-right");

  book.querySelectorAll(".shadow-left, .shadow-right").forEach(e => e.remove());
  if (book.classList.contains("has-left")) {
    const left = document.createElement("div");
    left.className = "shadow-left";
    book.appendChild(left);
  }
  if (book.classList.contains("has-right")) {
    const right = document.createElement("div");
    right.className = "shadow-right";
    book.appendChild(right);
  }
}

// Cassette hiệu ứng
const cassetteBtn = document.getElementById("cassetteBtn");
const audioPlayer = document.getElementById("audioPlayer");
const cassetteImg = document.querySelector(".cassette-img");
const cassetteImgs = [
  "assets/page2.png",
  "assets/page3.png",
  "assets/page4.png",
  "assets/page5.png",
];
let cassetteIndex = 0, cassetteInterval = null;

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

// Auto phát khi mở sách
let firstBookOpen = false;
document.addEventListener("change", (e) => {
  if (e.target.matches("input[type=radio][name=page]")) {
    updateBookShadow();
    if (!firstBookOpen && e.target.id !== "page-1" && audioPlayer) {
      firstBookOpen = true;
      if (audioPlayer.paused) audioPlayer.play();
    }
  }
});
