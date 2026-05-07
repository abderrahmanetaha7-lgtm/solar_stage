import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import themeReducer from "../features/theme/themeSlice";
import orderReducer from "../features/orders/orderSlice";
import productsReducer from "../features/products/productSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
    orders: orderReducer,
  },
});
