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

let basket = JSON.parse(localStorage.getItem("basket")) || [];

function syncBasketFromStorage() {
  basket = JSON.parse(localStorage.getItem("basket")) || [];
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

  const addToCart = document.querySelector(".modal-add-to-cart");
  addToCart.addEventListener("click", () => {
    syncBasketFromStorage();

    const selectedOption = variantSelect.options[variantSelect.selectedIndex];
    const selectedIndex = variantSelect.selectedIndex;
    const selectedVariant = item.variants[selectedIndex];
    const selectedPrice = parseFloat(selectedOption.value);

    const existingProduct = basket.find(
      (element) =>
        element.id === item.id && element.variant.size === selectedVariant.size
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      basket.push({
        id: item.id,
        name: item.name,
        variant: selectedVariant,
        quantity: 1,
        price: selectedPrice,
      });
    }

    localStorage.setItem("basket", JSON.stringify(basket));

    const modal = document.querySelector("[modalOpen]");
    modal.classList.add("isHidden");

    renderQuickBasket();
    showQB();
  });
}

const quickBasketBtn = document.querySelector(".basket-btn");
const closeQuickBasket = document.querySelector(".quickBasketHide");

const quickBasket = document.querySelector("[dataBasket");

quickBasketBtn.addEventListener("click", showQB);
closeQuickBasket.addEventListener("click", closeQB);
function showQB() {
  quickBasket.classList.toggle("isHidden");
}
function closeQB() {
  quickBasket.classList.toggle("isHidden");
}

function renderQuickBasket() {
  const quickBasketContent = document.querySelector(".quickBasketDetails");
  let storedBasket = JSON.parse(localStorage.getItem("basket")) || [];

  quickBasketContent.innerHTML = "";

  if (storedBasket.length === 0) {
    quickBasketContent.innerHTML = `<p class="emptyQB">Twój koszyk jest pusty.</p>`;
  }

  let total = 0;

  storedBasket.forEach((product, idx) => {
    total += product.price * product.quantity;

    quickBasketContent.innerHTML += `
      <div class="quickBasketItems" data-index="${idx}">
        <p>${product.name} (${product.variant.size})</p>
          <div class="quantityControls">
            <button class="decreaseQuantityItem" data-index="${idx}">-
            </button>
            <span>${product.quantity}</span>
            <button class="increaseQuantityItem" data-index="${idx}">+</button>
          </div>
          <p>${product.price * product.quantity} zł</p>
          <button class="removeItem" data-index="${idx}">Usuń</button>
      </div>
      `;
  });

  if (storedBasket.length > 0) {
    quickBasketContent.innerHTML += `
    <span class="quickBasketTotal">Suma: ${total} zł</span>
    <button class="quickBasketOrder">Zamówienie</button>
    <button class="clearBasket">Wyczyść koszyk</button>
  `;
  }

  quickBasketContent
    .querySelectorAll(".increaseQuantityItem")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.dataset.index;
        storedBasket[idx].quantity++;
        localStorage.setItem("basket", JSON.stringify(storedBasket));
        renderQuickBasket();
      });
    });

  quickBasketContent
    .querySelectorAll(".decreaseQuantityItem")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.dataset.index;
        if (storedBasket[idx].quantity > 1) {
          storedBasket[idx].quantity--;
        } else {
          storedBasket.splice(idx, 1);
        }
        localStorage.setItem("basket", JSON.stringify(storedBasket));
        renderQuickBasket();
      });
    });

  quickBasketContent.querySelectorAll(".removeItem").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = btn.dataset.index;
      storedBasket.splice(idx, 1);
      localStorage.setItem("basket", JSON.stringify(storedBasket));
      renderQuickBasket();
    });
  });

  quickBasketContent
    .querySelector(".clearBasket")
    .addEventListener("click", () => {
      localStorage.removeItem("basket");
      renderQuickBasket();
    });
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuickBasket();
});
