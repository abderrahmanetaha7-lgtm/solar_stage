import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productApi";

/* ================= FETCH PRODUCTS ================= */

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await getProducts();

    return res.data;
  },
);

/* ================= CREATE PRODUCT ================= */

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createProduct(data);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/* ================= UPDATE PRODUCT ================= */

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateProduct(id, data);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/* ================= DELETE PRODUCT ================= */

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id) => {
    await deleteProduct(id);

    return id;
  },
);

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* FETCH */

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching products";
      })

      /* CREATE */

      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products.unshift(action.payload);
      })

      .addCase(addProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Error creating product";
      })

      /* UPDATE */

      .addCase(editProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product,
        );
      })

      .addCase(editProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Error updating product";
      })

      /* DELETE */

      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products = state.products.filter(
          (product) => product.id !== action.payload,
        );
      })

      .addCase(removeProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Error deleting product";
      });
  },
});

export default productSlice.reducer;
