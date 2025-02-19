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

let originClass = "header";
let scrollClass = "headerScroll";
let scrollTrigger = 250;

// With add inline style not by class
// const header = document.querySelector("header");

// window.onscroll = function() {
//     if(window.scrollY >= scrollTrigger) {
//         header.style.backgroundColor = "#e6c979"
//      } else {
//         header.style.removeProperty("background");
//     }

window.onscroll = function () {
  if (window.scrollY >= scrollTrigger) {
    document.querySelector("header").classList.add(scrollClass);
    document.querySelector("header").classList.remove(originClass);
  } else {
    document.querySelector("header").classList.add(originClass);
    document.querySelector("header").classList.remove(scrollClass);
  }
};

const openModalBtn = document.querySelectorAll(".openCartModal");
const modal = document.querySelector("[modalOpen]");

openModalBtn.forEach((btn) => {
  btn.addEventListener("click", toggleModal);
});
function toggleModal() {
  modal.classList.toggle("isHidden");
}
