import API from "./axios";

/* ========== SETTINGS ========== */

export const getSettings = () => API.get("/settings");

export const saveSettings = (data) =>
  API.post("/settings", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

/* ========== settings ========== */

export const getSettingsApi = () => API.get("/settings");
 