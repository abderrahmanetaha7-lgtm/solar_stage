import { Suspense, useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { fetchSettings } from "./features/settings/settingsSlice";
import { fetchUser } from "./features/auth/authSlice";
import AppSkeleton from "./components/skeleton/AppSkeleton";
import { Box, Button, Typography } from "@mui/material";

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
    <ErrorBoundary
      fallback={
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Something went wrong.
          </Typography>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </Box>
      }
    >
      <Suspense fallback={<AppSkeleton />}>
        <AppRoutes />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
