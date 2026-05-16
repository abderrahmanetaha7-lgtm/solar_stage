/* ========== ORDERS ========== */

import API from "./axios";

export const getOrders = () => API.get("/orders");

export const createOrder = (data) => API.post("/orders", data);

export const updateOrder = (id, data) => API.put(`/orders/${id}`, data);

export const archiveOrder = (id) => {
  return API.delete(`/orders/${id}`);
};

export const getArchivedOrders = () => API.get("/archived-orders");

export const restoreOrder = (id) => API.patch(`/orders/${id}/restore`);

export const cancelOrder = (id) => {
  return API.patch(`/orders/${id}/cancel`);
};

export const updateOrderStatus = (id, data) => {
  return API.patch(`/orders/${id}/status`, data);
};