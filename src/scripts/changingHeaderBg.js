let originClass = "header";
let scrollClass = "headerScroll";
let scrollTrigger = 180;

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
