import API from "./axios";
/* ========== PRODUCTS ========== */

export const getProducts = () => API.get("/products");

export const createProduct = (data) =>
  API.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateProduct = (id, data) => API.put(`/products/${id}`, data);

export const deleteProduct = (id) => API.delete(`/products/${id}`);

/* ========== ORDERS ========== */

export const getOrders = () => API.get("/orders");

export const createOrder = (data) => API.post("/orders", data);

export const updateOrder = (id, data) => API.put(`/orders/${id}`, data);

export const deleteOrder = (id) => API.delete(`/orders/${id}`);

/* ================= USERS ================= */

export const getUsers = () => API.get("/users");

export const createUser = (data) => API.post("/users", data);

export const updateUser = (id, data) => API.put(`/users/${id}`, data);

export const deleteUser = (id) => API.delete(`/users/${id}`);

/* ========== SETTINGS ========== */

export const getSettings = () => API.get("/settings");

export const saveSettings = (data) =>
  API.post("/settings", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
