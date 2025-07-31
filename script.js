// ——————————————————————
// 1. Cassette animation
// ——————————————————————
const cassetteBtn    = document.getElementById("cassetteBtn");
const audioPlayer    = document.getElementById("audioPlayer");
const cassetteImg    = document.getElementById("cassetteImg");
const cassetteImgs   = [
  "assets/page2.png",
  "assets/page3.png",
  "assets/page4.png",
  "assets/page5.png",
];
let cassetteIndex    = 0;
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
audioPlayer.addEventListener("play",  startCassetteAnimation);
audioPlayer.addEventListener("pause", stopCassetteAnimation);
audioPlayer.addEventListener("ended", stopCassetteAnimation);

// ——————————————————————
// 2. Book-flip bằng radio + CSS
// ——————————————————————
const bookEl   = document.querySelector(".book");
const data     = window.dataFromSubdomain?.data || {};
const nameBook = data.nameBook   || "Cuốn Nhật Ký";
const pages    = data.pageInfos  || [];

function createPage(item, isCover = false) {
  const div = document.createElement("div");
  div.className = isCover ? "cover" : "page";
  if (isCover) {
    div.innerHTML = `<h1>${nameBook}</h1>`;
  } else {
    div.innerHTML = `
      <div class="page-img-wrap">
        <img class="page-img" src="${item.image}" />
      </div>
      <div class="page-text">${item.text}</div>
    `;
  }
  return div;
}

function renderBook() {
  for (let i = 0; i <= pages.length; i++) {
    // 1. Radio input
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "page";
    input.id   = `page-${i}`;
    if (i === 0) input.checked = true;
    bookEl.appendChild(input);

    // 2. Cover or blank page-left
    bookEl.appendChild(createPage({}, true));

    // 3. Content-page or cover-front
    if (i > 0) bookEl.appendChild(createPage(pages[i - 1]));
    else       bookEl.appendChild(createPage({}, true));
  }
}

renderBook();

// 3. Click trái/phải để tick radio
bookEl.addEventListener("click", e => {
  const rect      = bookEl.getBoundingClientRect();
  const x         = e.clientX - rect.left;
  const half      = rect.width / 2;
  const inputsArr = Array.from(bookEl.querySelectorAll("input[name=page]"));
  const current   = inputsArr.findIndex(i => i.checked);

  if (x > half && current < inputsArr.length - 1) {
    inputsArr[current + 1].checked = true;
  } else if (x < half && current > 0) {
    inputsArr[current - 1].checked = true;
  }
});
