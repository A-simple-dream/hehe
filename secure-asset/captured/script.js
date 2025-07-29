// Xóa hoàn toàn mọi hàm checkOrientation / showLandscapePrompt
// Giữ nguyên toàn bộ logic gốc, chỉ gọi initApp() thẳng:
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// Phần còn lại y nguyên file gốc của bạn.
// Ví dụ:
function initApp() {
  const data = window.bookData; // từ data.js
  // … code tạo book và cassette …
  const audio = document.getElementById('bgm');
  const btn = document.getElementById('toggle-music');
  btn.addEventListener('click', () => {
    if (audio.paused) audio.play();
    else audio.pause();
    btn.textContent = audio.paused ? '▶️' : '⏸️';
  });
  // … hiệu ứng lật trang …
}
