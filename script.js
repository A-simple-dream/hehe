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

// Tạo trang nhật ký
const book = document.querySelector(".book");
let html = `<input type="radio" name="page" id="page-1" checked />`;
html += `<label class="page cover" for="page-3"><h1>Cuốn Nhật Ký Mùa Hạ</h1></label>`;
html += `<label class="page cover" for="page-1"></label>`;

for (let i = 1; i <= 6; i += 2) {
  const nextId = i + 2;
  html += `<input type="radio" name="page" id="page-${i}" />`;
  html += `<label class="page" for="page-${nextId}">
    <div class="page-img-wrap">
      <img src="photo/photo${i}.jpg" class="page-img" />
    </div>
    <div class="page-text">Ký ức ${i}</div>
  </label>`;
  html += `<label class="page" for="page-${i}">
    <div class="page-img-wrap">
      <img src="photo/photo${i + 1}.jpg" class="page-img" />
    </div>
    <div class="page-text">Ký ức ${i + 1}</div>
  </label>`;
}
book.innerHTML = html;
