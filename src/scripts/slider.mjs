let currentIndex = 0;
const contents = document.querySelectorAll(".slider-content");
const contentsArr = [...contents];
const maxIndex = contentsArr.length - 1;

function startSetInterval() {
  setInterval(
    (function nextImage() {
      currentIndex++;

      if (currentIndex > maxIndex) {
        currentIndex = 0;
      }

      contentsArr.forEach(function (content) {
        content.classList.remove("active");
      });

      contentsArr[currentIndex].classList.add("active");
      return nextImage;
    })(),
    8000
  );
}

startSetInterval();
