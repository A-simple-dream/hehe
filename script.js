// Kết hợp dynamic/data.js & secure-asset/captured/script.js
const externalData = window.dataFromSubdomain && window.dataFromSubdomain.data;
if (externalData) {
  // Ghi đè pageInfos nếu có
  if (externalData.pageInfos) {
    window.pageInfos = externalData.pageInfos;
  }
  // Ghi đè nameBook nếu có
  if (externalData.nameBook) {
    window.nameBook = externalData.nameBook;
  }
  // Ghi đè bài hát nếu có
  if (externalData.song) {
    document.getElementById("audioPlayer").src = externalData.song;
  }
}
