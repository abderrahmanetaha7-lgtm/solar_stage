import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ThemeContextProvider from "./context/AuthContext.jsx";
import { CssBaseline } from "@mui/material";
import { ProductProvider } from "./context/ProductContext";
import "./i18n";
import "focus-visible";
import { AuthToken } from "./context/AuthContextToken.jsx";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <BrowserRouter>
        <AuthToken>
          <CartProvider>
            <CssBaseline />
            <ProductProvider>
              <App />
            </ProductProvider>
          </CartProvider>
        </AuthToken>
      </BrowserRouter>
    </ThemeContextProvider>
  </StrictMode>,
);
