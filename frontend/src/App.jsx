import { Suspense, useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider, CssBaseline, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { fetchSettings } from "./features/settings/settingsSlice";
import { fetchUser } from "./features/auth/authSlice";
import AppSkeleton from "./components/skeleton/AppSkeleton";  

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchSettings());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <> 
      <Suspense fallback={<AppSkeleton />}>
        <AppRoutes />
      </Suspense>
    </>
  );
}

export default App;
