// Dữ liệu tĩnh fallback nếu không có data.js
const pageInfos = [
  { text: "Kỷo bấ̉n", image: "images/1.jpg" },
  { text: "Kỷo dấu", image: "images/5.jpg" },
];

const nameBook = "Mèo meoo";

function renderBookPages() {
  const book = document.querySelector(".book");
  let html = "";

  html += `<input type="radio" name="page" id="page-1" checked />`;
  html += `<label class="page cover" for="page-3"><h1>${nameBook}</h1></label>`;
  html += `<label class="page cover" for="page-1"></label>`;

  let pageIndex = 3;
  for (let i = 0; i < pageInfos.length; i += 2) {
    const nextPageId = pageIndex + 2;
    html += `<input type="radio" name="page" id="page-${pageIndex}" />`;
    html += `<label class="page" for="page-${nextPageId}">`;
    if (pageInfos[i]) {
      html += `<div class="page-img-wrap"><img src="${pageInfos[i].image}" class="page-img"/></div>`;
      if (pageInfos[i].text) html += `<div class="page-text">${pageInfos[i].text}</div>`;
    }
    html += `</label>`;

    html += `<label class="page" for="page-${pageIndex}">`;
    if (pageInfos[i + 1]) {
      html += `<div class="page-img-wrap"><img src="${pageInfos[i + 1].image}" class="page-img"/></div>`;
      if (pageInfos[i + 1].text) html += `<div class="page-text">${pageInfos[i + 1].text}</div>`;
    }
    html += `</label>`;

    pageIndex += 2;
  }

  html += `<input type="radio" name="page" id="page-${pageIndex}" />`;
  html += `<label class="page cover" for="page-${pageIndex + 2}"></label>`;
  html += `<label class="page cover" for="page-${pageIndex}"></label>`;
  html += `<input type="radio" name="page" id="page-${pageIndex + 2}" />`;

  book.innerHTML = html;
}

function updateBookShadow() {
  const book = document.querySelector(".book");
  const radios = document.querySelectorAll("input[type=radio][name=page]");
  let current = 0;

  radios.forEach((r, idx) => {
    if (r.checked) current = idx;
  });

  const total = radios.length;
  book.classList.remove("has-left", "has-right");

  if (current === 0) {
    book.classList.add("has-right");
  } else if (current === total - 1) {
    book.classList.add("has-left");
  } else {
    book.classList.add("has-left", "has-right");
  }

  book.querySelectorAll(".shadow-left, .shadow-right").forEach((e) => e.remove());

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

window.addEventListener("DOMContentLoaded", () => {
  renderBookPages();
  updateBookShadow();
  lockPortrait();
});

document.addEventListener("change", (e) => {
  if (e.target.matches("input[name=page]")) {
    updateBookShadow();
  }
});

// Audio & cassette
const cassetteBtn = document.getElementById("cassetteBtn");
const audioPlayer = document.getElementById("audioPlayer");
let cassetteInterval = null;
const cassetteImg = document.querySelector(".cassette-img");
const cassetteImgs = ["casstte/2.png", "casstte/3.png", "casstte/4.png", "casstte/5.png"];
let cassetteIndex = 0;

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
  cassetteImg.src = "casstte/1.png";
}

cassetteBtn.addEventListener("click", () => {
  if (audioPlayer.paused) audioPlayer.play();
  else audioPlayer.pause();
});
audioPlayer.addEventListener("play", startCassetteAnimation);
audioPlayer.addEventListener("pause", stopCassetteAnimation);
audioPlayer.addEventListener("ended", stopCassetteAnimation);

// Khóa portrait trên mobile
function lockPortrait() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock("portrait").catch(() => {});
  }
}
