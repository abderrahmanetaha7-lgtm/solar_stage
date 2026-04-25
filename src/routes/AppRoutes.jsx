// AppRoutes.jsx
import Navbar from "../components/layout/Navbar";  
import Footer from "../components/layout/Footer";  
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import { Box } from "@mui/material";
import Contact from "../pages/Contact";

export default function AppRoutes() {
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
        <Routes>
          <Route path="/" element={<Home />} />   
          <Route path="/products" element={<Products />} />   
          <Route path="/contact" element={<Contact />} />   
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}