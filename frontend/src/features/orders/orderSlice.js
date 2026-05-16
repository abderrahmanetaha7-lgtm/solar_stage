import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOrders,
  createOrder,
  updateOrder,
  updateOrderStatus,
  cancelOrder,
  archiveOrder as archiveOrderApi,
} from "../../api/ordersApi"; 

/* ================= FETCH ================= */

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const res = await getOrders();
  return res.data;
});

/* ================= CREATE ================= */

export const addOrder = createAsyncThunk("orders/addOrder", async (data) => {
  const res = await createOrder(data);
  return res.data;
});

/* ================= UPDATE ================= */

export const editOrder = createAsyncThunk(
  "orders/editOrder",
  async ({ id, data }) => {
    const res = await updateOrder(id, data);
    return res.data;
  },
);

/* ================= DELETE ================= */

export const cancelUserOrder = createAsyncThunk(
  "orders/cancelUserOrder",

  async (id) => {
    const res = await cancelOrder(id);

    return res.data;
  },
);

/* ================= ARCHIVE ================= */

export const archiveOrder = createAsyncThunk(
  "orders/archiveOrder",

  async (id) => {
    await archiveOrderApi(id);

    return id;
  },
);

export const changeOrderStatus = createAsyncThunk(
  "orders/changeOrderStatus",

  async ({ id, status }) => {
    const res = await updateOrderStatus(id, {
      status,
    });

    return res.data;
  },
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
        state.orders.push(action.payload.order);
      })

      /* UPDATE */
      .addCase(editOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((o) =>
          o.id === action.payload.order.id ? action.payload.order : o,
        );
      })

      /* CANCEL ORDER */
      .addCase(cancelUserOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((o) =>
          o.id === action.payload.order.id ? action.payload.order : o,
        );
      })

      /* ARCHIVE ORDER */
      .addCase(archiveOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((o) =>
          o.id === action.payload ? { ...o, status: "Archived" } : o,
        );
      })

      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.orders = state.orders.map((o) =>
          o.id === action.payload.order.id ? action.payload.order : o,
        );
      });
  },
});

export default orderSlice.reducer;
