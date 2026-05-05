import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

/* ================= REQUEST INTERCEPTOR ================= */

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/* ================= PRODUCTS ================= */

export const getProducts = () => API.get("/products");

export const createProduct = (data) =>
  API.post("/products", data); // FormData auto handled

export const updateProduct = (id, data) =>
  API.post(`/products/${id}?_method=PUT`, data); // no headers needed

export const deleteProduct = (id) => API.delete(`/products/${id}`);

/* ================= ORDERS ================= */

export const getOrders = () => API.get("/orders");

export const updateOrderStatus = (id, status) =>
  API.patch(`/orders/${id}`, { status });

/* ================= USERS ================= */
export const getUsers = () => API.get("/users");

export const updateUser = (id, data) =>
  API.patch(`/users/${id}`, data);

export const deleteUser = (id) =>
  API.delete(`/users/${id}`);