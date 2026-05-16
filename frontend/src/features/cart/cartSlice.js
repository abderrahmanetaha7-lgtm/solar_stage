import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const exist = state.cart.find((item) => item.id === product.id);

      if (exist) {
        if (exist.quantity < exist.stock_quantity) {
          exist.quantity += 1;
        }
      } else {
        state.cart.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.cart.find((i) => i.id === id);
      if (item) {
        if (quantity <= item.stock_quantity && quantity >= 1) {
          item.quantity = quantity;
        }
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { clearCart, addToCart, removeFromCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
