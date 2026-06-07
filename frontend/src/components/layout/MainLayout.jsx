import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import ScrollTopButton from "../ScrollTopButton";
import PageTransition from "../motion/PageTransition";
import { lazy } from "react";
const Navbar = lazy(() => import("./Navbar/Navbar"));

export default function MainLayout() {
  const location = useLocation();
  const hideFooterRoutes = ["/login", "/register"];
  const hideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <Box component="main" sx={{ flex: 1 }}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </Box>

      {!hideFooter && <Footer />}
      <ScrollTopButton />
    </Box>
  );
}
