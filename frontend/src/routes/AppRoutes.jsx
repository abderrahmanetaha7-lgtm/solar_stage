import { Routes, Route } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";
import { lazy } from "react";
import Home from "../pages/Home";
const MainLayout = lazy(() => import("../components/layout/MainLayout"));

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
import Orders from "../pages/Orders";

import OrderDetails from "../components/Order/OrderDetails";

import ProtectedRoute from "./ProtectedRoute";

import AdminRoutes from "./AdminRoutes";
import AdminRoute from "./AdminRoute";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      {/* MAIN APP ROUTES */}
      <Routes>
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminRoutes />
            </AdminRoute>
          }
        />

        {/* MAIN LAYOUT */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          <Route path="/product-detail/:id" element={<ProductDetail />} />

          <Route path="/services" element={<Services />} />

          <Route path="/favorites" element={<Favorites />} />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders-detail/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={ 
                <Checkout /> 
            }
          />

          <Route
            path="/order-confirmation"
            element={ 
                <OrderConfirmation /> 
            }
          />

          <Route path="/shopping-cart" element={<ShoppingCart />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<SignUp />} />

          <Route path="/login" element={<Login />} />

          <Route path="/forget-password" element={<ForgotPassword />} />

          <Route path="/reset-password/:token" element={<ResetPassword />} />

        </Route>
      </Routes>
    </>
  );
}
