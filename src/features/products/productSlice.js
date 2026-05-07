import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../../api/dataApi";

/* FETCH PRODUCTS */

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await getProducts();
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export default productSlice.reducer;