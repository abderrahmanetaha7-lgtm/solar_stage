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

import AppThemeProvider from "./context/AppThemeProvider.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="291446996496-2bcgmlad4df79ccmj4ihqo7ipng346gv.apps.googleusercontent.com">
      <HelmetProvider>
        <Provider store={store}>
          <LanguageProvider>
            <AppThemeProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AppThemeProvider>
          </LanguageProvider>
        </Provider>
      </HelmetProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
