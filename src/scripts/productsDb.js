import axios from "axios";

const productsDb = process.env.DB_BASE_URL;

const getProducts = async () => {
  try {
    const res = await axios.get(productsDb);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching products: ", err);
    throw err;
  }
};
getProducts();
