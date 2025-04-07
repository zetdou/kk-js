import axios from "axios";

const productsDb = process.env.DB_BASE_URL;

const fetchProducts = async () => {
  try {
    const res = await axios.get(productsDb);
    console.log(res.data); //podgląd w konsoli odpowiedzi z bazy danych api
    const products = res.data;
    const shopList = document.querySelector(".shop-list");
    shopList.innerHTML = "";

    products.forEach((element) => {
      const productShoppingCart = document.createElement("li");
      productShoppingCart.classList.add("shop-list-item");

      productShoppingCart.innerHTML = `
        <a href="#">
          <img class="item-image" height="320px" width="320px" src="${element.image}" alt="${element.name}" />
          <div class="shop-list-info">
            <p>${element.category}</p>
            <h3>${element.name}</h3>
            <button class="openCartModal">Wybierz opcje</button>
          </div>
        </a>
      `;

      shopList.appendChild(productShoppingCart);
    });
  } catch (err) {
    console.error("Error fetching products: ", err);
    throw err;
  }
};

document.addEventListener("DOMContentLoaded", fetchProducts);
