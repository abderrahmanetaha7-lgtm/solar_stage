import { Route, Routes } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";  
import AuthLayout from "../components/layout/AuthLayout";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login"; 
import About from "../pages/About";

import ScrollToTop from "../components/ScrollToTop";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* ✅ Pages with Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ❌ Authentication pages without Navbar and Footer */}
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} /> 
        </Route>
      </Routes>
    </>
  );
}