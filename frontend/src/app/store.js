import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import themeReducer from "../features/theme/themeSlice";
import orderReducer from "../features/orders/orderSlice";
import productsReducer from "../features/products/productSlice";
import userReducer from "../features/users/userSlice";
import analyticReducer from "../features/analytics/analyticsSlice";
import settingsReducer from "../features/settings/settingsSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
    orders: orderReducer,
    analytics: analyticReducer,
    settings: settingsReducer,
    users: userReducer,
  },
});
