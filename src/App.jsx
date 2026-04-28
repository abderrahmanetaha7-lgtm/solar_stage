import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
