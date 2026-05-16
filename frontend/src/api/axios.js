import axios from "axios";

export const CSRF = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/* ================= SEND LANGUAGE ================= */

API.interceptors.request.use((config) => {
  const lang = localStorage.getItem("lang") || "fr";

  config.headers["Accept-Language"] = lang;

  return config;
});

export default API;
