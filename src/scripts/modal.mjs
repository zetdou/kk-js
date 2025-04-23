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

    openQuickBasket();
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

function openQuickBasket() {
  const quickBasketContent = document.querySelector(".quickBasketDetails");

  showQB();

  quickBasketContent.innerHTML = "";

  let total = 0;

  basket.forEach((product) => {
    const details = document.createElement("div");
    details.classList.add("quickBasketItems");
    details.innerHTML = `
    <p>${product.name} (${product.variant.size})</p>
    <p>${product.quantity}</p>
    <p>${product.price * product.quantity} zł</p>`;

    quickBasketContent.appendChild(details);
    total += product.price * product.quantity;
  });

  const totalSpan = document.createElement("span");
  totalSpan.classList.add("quickBasketTotal");
  totalSpan.textContent = `Suma: ${total} zł`;

  const orderBtn = document.createElement("button");
  orderBtn.classList.add("quickBasketOrder");
  orderBtn.textContent = "Zamówienie";

  quickBasketContent.appendChild(totalSpan);
  quickBasketContent.appendChild(orderBtn);
}
