import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../../api/dataApi";

/* ================= FETCH ================= */

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const res = await getOrders();
    return res.data;
  }
);

/* ================= CREATE ================= */

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (data) => {
    const res = await createOrder(data);
    return res.data;
  }
);

/* ================= UPDATE ================= */

export const editOrder = createAsyncThunk(
  "orders/editOrder",
  async ({ id, data }) => {
    const res = await updateOrder(id, data);
    return res.data;
  }
);

/* ================= DELETE ================= */

export const removeOrder = createAsyncThunk(
  "orders/removeOrder",
  async (id) => {
    await deleteOrder(id);
    return id;
  }
);

/* ================= SLICE ================= */

const orderSlice = createSlice({
  name: "orders",

  initialState: {
    orders: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      /* CREATE */
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })

      /* UPDATE */
      .addCase(editOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((o) =>
          o.id === action.payload.id ? action.payload : o
        );
      })

      /* DELETE */
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (o) => o.id !== action.payload
        );
      });
  },
});

export default orderSlice.reducer;