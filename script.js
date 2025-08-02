const pageInfos = 
[
  ...(window.dataFromSubdomain && window.dataFromSubdomain.data.pageInfos
    ? window.dataFromSubdomain.data.pageInfos
    : [
      { text: "Mùa hè rực rỡ của chúng ta", image: "photo/photo1.jpg" },
      { text: "Làm quen", image: "photo/photo2.jpg" },
	{ text: "Kết thúc", image: "photo/photo3.jpg" },
      ]),
];

const nameBook = (window.dataFromSubdomain && window.dataFromSubdomain.data.nameBook)
  ? window.dataFromSubdomain.data.nameBook : "Vui lòng xoay dọc thiết bị để xem nội dung";

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
      html += `<div class="page-img-wrap"><img src="${
        pageInfos[i].image
      }" alt="áº¢nh ${i + 1}" class="page-img" /></div>`;
      if (pageInfos[i].text)
        html += `<div class="page-text">${pageInfos[i].text}</div>`;
    }
    html += `</label>`;
    html += `<label class="page" for="page-${pageIndex}">`;
    if (pageInfos[i + 1]) {
      html += `<div class="page-img-wrap"><img src="${
        pageInfos[i + 1].image
      }" alt="áº¢nh ${i + 2}" class="page-img" /></div>`;
      if (pageInfos[i + 1].text)
        html += `<div class="page-text">${pageInfos[i + 1].text}</div>`;
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

renderBookPages();
updateBookShadow();

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
  book
    .querySelectorAll(".shadow-left, .shadow-right")
    .forEach((e) => e.remove());
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

let firstBookOpen = false;

document.addEventListener("change", function (e) {
  if (e.target.matches("input[type=radio][name=page]")) {
    updateBookShadow();
    if (!firstBookOpen && e.target.id !== "page-1" && audioPlayer) {
      firstBookOpen = true;
      if (audioPlayer.paused) {
        audioPlayer.play();
      }
    }
  }
});

window.addEventListener("DOMContentLoaded", updateBookShadow);

const cassetteBtn = document.getElementById("cassetteBtn");
const audioPlayer = document.getElementById("audioPlayer");

audioPlayer.src = "assets/music.mp3";


let cassetteInterval = null;
const cassetteImg = document.querySelector(".cassette-img");
const cassetteImgs = [
  "assets/page2.png",
  "assets/page3.png",
  "assets/page4.png",
  "assets/page5.png",
];
let cassetteIndex = 0;

function startCassetteAnimation() {
  if (cassetteInterval) return;
  cassetteInterval = setInterval(() => {
    cassetteIndex = (cassetteIndex + 1) % cassetteImgs.length;
    if (cassetteImg) cassetteImg.src = cassetteImgs[cassetteIndex];
  }, 500);
}

function stopCassetteAnimation() {
  if (cassetteInterval) {
    clearInterval(cassetteInterval);
    cassetteInterval = null;
  }
  cassetteIndex = 0;
  if (cassetteImg) cassetteImg.src = "assets/page1.png";
}

if (cassetteBtn && audioPlayer) {
  cassetteBtn.addEventListener("click", function () {
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  });
  audioPlayer.addEventListener("play", startCassetteAnimation);
  audioPlayer.addEventListener("pause", stopCassetteAnimation);
  audioPlayer.addEventListener("ended", stopCassetteAnimation);
}
// Cá»‘ gáº¯ng khÃ³a Ä‘á»‹nh hÆ°á»›ng dá»c trÃªn cÃ¡c trÃ¬nh duyá»‡t há»— trá»£
function lockPortrait() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock("portrait").catch(() => {});
  }
}
window.addEventListener("DOMContentLoaded", lockPortrait);
window.addEventListener("orientationchange", lockPortrait);
