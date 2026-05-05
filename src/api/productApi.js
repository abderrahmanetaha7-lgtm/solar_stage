import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

/* ========== PRODUCTS ========== */

export const getProducts = () => API.get("/products");

// export const getProduct = (id) => API.get(`/products/${id}`);