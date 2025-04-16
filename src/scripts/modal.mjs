import { products } from "./productsDb.mjs";

// Open quick shopping modal window
const shopList = document.querySelector(".shop-list");
shopList.addEventListener("click", (ev) => {
  const modal = document.querySelector("[modalOpen]");
  const modalClose = document.querySelector("[modalClose]");
  const openBtn = ev.target.closest(".openCartModal");

  const productId = openBtn.dataset.id;
  const product = products.find((item) => item.id === productId);
  createModalContent(product);

  if (openBtn) {
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

function createModalContent(item) {
  const modalContent = document.querySelector(".modal-content");

  let imgURL = `http://127.0.0.1:3000${item.image}`;

  modalContent.innerHTML = `
    <h2 class="modal-title">${item.name}</h2>
    <img class="modal-image" height="320px" width="320px" src="${imgURL}" alt="${
    item.name
  }"
    <p class="modal-description">${item.description}</p>
    <label>
      Wariant:
      <select class="modal-variant">
      ${item.variants
        .map(
          (variant, i) =>
            `<option value="${variant.price}" ${i === 0 ? "selected" : ""}>
          ${variant.size}
        </option>`
        )
        .join("")}
      </select>
    </label>
    <p class="modal-price">${item.variants[0].price} zł</p>
    <button class="modal-add-to-cart">Do koszyka</button>
  `;

  const variantSelect = modalContent.querySelector(".modal-variant");
  const priceDisplay = modalContent.querySelector(".modal-price");
  variantSelect.addEventListener("change", (ev) => {
    priceDisplay.textContent = `${ev.target.value} zł`;
  });
}

// const addToCart = document.querySelector(".modal-add-to-cart");
// addToCart.addEventListener("click", (ev) => {
//   openModal();
//   show();
// });

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
