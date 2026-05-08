import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,

  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;

      const exists = state.favorites.find((p) => p.id === product.id);

      if (exists) {
        state.favorites = state.favorites.filter(
          (p) => p.id !== product.id
        );
      } else {
        state.favorites.push(product);
      }

      localStorage.setItem(
        "favorites",
        JSON.stringify(state.favorites)
      );
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;