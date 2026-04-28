import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import ScrollTopButton from "../ScrollTopButton";

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
        <Outlet />
      </Box>

      {!hideFooter && <Footer />}
      <ScrollTopButton />
    </Box>
  );
}
