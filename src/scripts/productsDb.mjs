import axios from "axios";

const productsDb = process.env.DB_BASE_URL;
let products;

export const fetchProducts = async () => {
  const productsDb = process.env.DB_BASE_URL;
  try {
    const res = await axios.get(productsDb);
    products = res.data;
    console.log("value of products:", products);
    return products;
  } catch (err) {
    console.err("Error fetching products: ", err);
    throw err;
  }
};

export const createProductCart = async () => {
  await fetchProducts();
  const shopList = document.querySelector(".shop-list");
  shopList.innerHTML = "";
  console.log(products);

  products.forEach((element) => {
    const shoppingCart = document.createElement("li");
    shoppingCart.classList.add("shop-list-item");

    let imgURL = `http://127.0.0.1:3000${element.image}`;
    shoppingCart.innerHTML = `
        <a href="#">
          <img class="item-image" height="320px" width="320px" src="${imgURL}" alt="${element.name}" />
          <div class="shop-list-info">
            <p>${element.category}</p>
            <h3>${element.name}</h3>
          </div>
        </a>
        <button class="openCartModal" data-id="${element.id}">Wybierz opcje</button>
      `;

    shopList.appendChild(shoppingCart);
  });
  return;
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    createProductCart();
  } catch (err) {
    console.error("Error", err);
  }
});
// export const fetchProducts = async () => {
//   try {
//     const res = await axios.get(productsDb);
//     console.log(res.data); //podgląd w konsoli odpowiedzi z bazy danych api
//     const products = res.data;
//     const shopList = document.querySelector(".shop-list");
//     shopList.innerHTML = "";

//     products.forEach((element) => {
//       const productShoppingCart = document.createElement("li");
//       productShoppingCart.classList.add("shop-list-item");

//       productShoppingCart.innerHTML = `
//         <a href="#">
//           <img class="item-image" height="320px" width="320px" src="${element.image}" alt="${element.name}" />
//           <div class="shop-list-info">
//             <p>${element.category}</p>
//             <h3>${element.name}</h3>
//           </div>
//         </a>
//         <button class="openCartModal">Wybierz opcje</button>
//       `;

//       shopList.appendChild(productShoppingCart);
//     });
//   } catch (err) {
//     console.error("Error fetching products: ", err);
//     throw err;
//   }
// };
// window.onload = fetchProducts;
