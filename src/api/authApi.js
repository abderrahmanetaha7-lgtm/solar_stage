import API from "./axios";

export const getCSRF = () => API.get("/sanctum/csrf-cookie");

export const loginApi = (data) => API.post("/api/login", data);

export const registerApi = (data) => API.post("/api/register", data);

export const logoutApi = () => API.post("/api/logout");

export const userApi = () => API.get("/api/user");

export const forgotPasswordApi = (data) =>
  API.post("/api/forgot-password", data);
