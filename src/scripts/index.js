let currentIndex = 0;
const contents = document.querySelectorAll('.slider-content');
const contentsArr = [...contents];
const maxIndex = contentsArr.length - 1;

function startSetInterval() {
    setInterval(function nextImage() {
        currentIndex++;

        if(currentIndex > maxIndex) {
            currentIndex = 0;
        }

        contentsArr.forEach(function(content){
            content.classList.remove('active');
        })

        contentsArr[currentIndex].classList.add('active');
        return nextImage;
    }(), 8000)
};

startSetInterval();

let  className = "sticky-header-bg";
let scrollTrigger = "120";

window.onscroll = function() {
    if(window.scrollY >= scrollTrigger) {
        document.getElementsByTagName("header")[0].classList.add(className);
     } else {
        document.getElementsByTagName("header")[0].classList.remove(className);        
    }
};