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
import Account from "../pages/Account";

import ScrollToTop from "../components/ScrollToTop";
import Favorites from "../pages/Favorites";
import ShoppingCart from "../pages/ShoppingCart";
import ProductDetail from "../pages/ProductDetaills";
import OrderConfirmation from "../pages/OrderConfirmation";
import Checkout from "../pages/Checkout";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Pages with Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/account" element={<Account />} />

          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> 
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes> 
    </>
  );
}
