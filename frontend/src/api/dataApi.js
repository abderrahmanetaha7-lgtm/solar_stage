import API from "./axios";



/* ========== ANALYTICS ========== */

export const getAnalytics = () => API.get("/analytics");


/* ========== PROFILE ========== */

export const updateProfile = (data) =>
  API.post("/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteProfile = () => API.delete("/profile");

export const sendContactMessage = async (data) => {
  return await API.post("/contact", data);
};
