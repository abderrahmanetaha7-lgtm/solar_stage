import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ThemeContextProvider from "./context/AuthContext.jsx";
import { CssBaseline } from "@mui/material";
import { ProductProvider } from "./context/ProductContext";
import "./i18n";
import { AuthToken } from "./context/AuthContextToken.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <BrowserRouter>
        <AuthToken>
          <CssBaseline />
          <ProductProvider>
            <App />
          </ProductProvider>
        </AuthToken>
      </BrowserRouter>
    </ThemeContextProvider>
  </StrictMode>,
);
