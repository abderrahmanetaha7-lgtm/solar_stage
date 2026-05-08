import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

/* ================= FETCH ================= */
export const fetchAnalytics = createAsyncThunk(
  "analytics/fetchAnalytics",
  async () => {
    const res = await API.get("/analytics");
    return res.data;
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    salesData: [],
    categoryData: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.salesData = action.payload.salesData;
        state.categoryData = action.payload.categoryData;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default analyticsSlice.reducer;