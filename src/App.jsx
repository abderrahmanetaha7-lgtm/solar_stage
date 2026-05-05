import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider, CssBaseline, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AdminRoutes from "./routes/AdminRoutes";
import {AdminProvider} from "./admin/Context/AdminContext";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      <AdminProvider>
        <AdminRoutes />
      </AdminProvider>
      <AppRoutes />
    </>
  );
}

export default App;
