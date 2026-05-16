import API, { CSRF } from "./axios";

/* ================= CSRF ================= */

export const getCSRF = async () => {
  return await CSRF.get("/sanctum/csrf-cookie", {});
};

/* ================= AUTH ================= */

export const registerApi = async (data) => {
  return await API.post("/register", data);
};

export const loginApi = async (data) => {
  return await API.post("/login", data);
};

export const logoutApi = async () => {
  return await API.post("/logout");
};

export const userApi = async () => {
  return await API.get("/user");
};

export const adminApi = async () => {
  return await API.get("/admin");
};

/* ================= PASSWORD RESET ================= */

export const forgotPasswordApi = async (data) => {
  return await API.post("/forgot-password", data);
};

export const resetPasswordApi = async (data) => {
  return await API.post("/reset-password", data);
};