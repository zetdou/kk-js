// Open quick shopping modal window
const shopList = document.querySelector(".shop-list");
shopList.addEventListener("click", function (ev) {
  const modal = document.querySelector("[modalOpen]");
  const modalClose = document.querySelector("[modalClose]");

  if (ev.target.closest(".openCartModal")) {
    openModal(modal, modalClose);
  }
});

function openModal(modal, modalClose) {
  modal.classList.toggle("isHidden");

  function close() {
    modal.classList.toggle("isHidden");
    document.removeEventListener("keydown", keyClose);
    modal.removeEventListener("click", clickOutClose);
    modalClose.removeEventListener("click", close);
  }

  function keyClose(ev) {
    if (ev.key === "Escape" && !modal.classList.contains("isHidden")) {
      close();
    }
  }

  function clickOutClose(ev) {
    if (ev.target === modal || ev.target.classList.contains("isHidden")) {
      close();
    }
  }
  document.addEventListener("keydown", keyClose);
  modal.addEventListener("click", clickOutClose);
  modalClose.addEventListener("click", close);
}

const quickBasketBtn = document.querySelector(".basket-btn");
const showQuickBasket = document.querySelector("[dataBasket");
const closeQuickBasket = document.querySelector(".quickBasketHide");

quickBasketBtn.addEventListener("click", show);
closeQuickBasket.addEventListener("click", close);
function show() {
  showQuickBasket.classList.toggle("isHidden");
}
function close() {
  showQuickBasket.classList.toggle("isHidden");
}
