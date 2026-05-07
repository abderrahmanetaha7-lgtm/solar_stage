import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { store } from "./app/store";
import { Provider } from "react-redux";

import "./i18n";
import "focus-visible";

import LanguageProvider from "./context/LanguageContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import AppThemeProvider from "./context/AppThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <AuthProvider>
          <AppThemeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AppThemeProvider>
        </AuthProvider>
      </LanguageProvider>
    </Provider>
  </StrictMode>,
);