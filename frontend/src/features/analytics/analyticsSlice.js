import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAnalytics } from "../../api/dataApi";

/* ================= FETCH ANALYTICS ================= */

export const fetchAnalytics = createAsyncThunk(
  "analytics/fetchAnalytics",

  async (_, thunkAPI) => {
    try {
      const res = await getAnalytics();

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

/* ================= SLICE ================= */

const analyticsSlice = createSlice({
  name: "analytics",

  initialState: {
    salesData: [],

    categoryData: [],

    topProducts: [],

    stats: {
      totalRevenue: 0,

      totalOrders: 0,

      deliveredOrders: 0,

      pendingOrders: 0,

      totalProducts: 0,

      outOfStock: 0,
    },

    loading: false,

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ===== PENDING ===== */

      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      /* ===== SUCCESS ===== */

      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;

        state.salesData = action.payload.salesData || [];

        state.categoryData = action.payload.categoryData || [];

        state.topProducts = action.payload.topProducts || [];

        state.stats = action.payload.stats || {};
      })

      /* ===== ERROR ===== */

      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Something went wrong";
      });
  },
});

export default analyticsSlice.reducer;
