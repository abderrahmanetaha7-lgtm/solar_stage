import API from "./axios";
 
/* ========== PRODUCTS ========== */
export const getProducts = () => API.get("/products");

/* ========== ORDERS ========== */

export const getOrders = () => API.get("/orders");
 
export const createOrder = (data) => API.post("/orders", data);

export const updateOrder = (id, data) => API.put(`/orders/${id}`, data);

export const deleteOrder = (id) => API.delete(`/orders/${id}`);
