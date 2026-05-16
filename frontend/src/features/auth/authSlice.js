import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCSRF,
  loginApi,
  registerApi,
  logoutApi,
  userApi,
  forgotPasswordApi,
  resetPasswordApi,
} from "../../api/authApi";

/* ================= LOGIN ================= */

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    await getCSRF();

    await loginApi(data);

    const userRes = await userApi();

    const user = userRes.data.user;

    return {
      user,
      isAdmin: user.role === "admin",
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || {
        message: "Échec de connexion",
      },
    );
  }
});

/* ================= REGISTER ================= */

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      await getCSRF();

      await registerApi(data);

      const res = await userApi();

      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Échec d'inscription",
        },
      );
    }
  },
);

/* ================= FETCH USER ================= */

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const res = await userApi();

      return res.data.user;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Unauthenticated");
    }
  },
);

/* ================= LOGOUT ================= */

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await getCSRF();

    await logoutApi();

    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout failed",
    );
  }
});

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, thunkAPI) => {
    try {
      await getCSRF();

      await forgotPasswordApi(data);

      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Error sending email" },
      );
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    try {
      await getCSRF();

      await resetPasswordApi(data);

      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Reset failed" },
      );
    }
  },
);

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    admin: null,

    authenticated: false,
    adminAuthenticated: false,

    loading: false,

    checkingAuth: true,

    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;

      state.authenticated = true;

      if (action.payload?.role === "admin") {
        state.admin = action.payload;
        state.adminAuthenticated = true;
      }
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= LOGIN ================= */

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        const { user, isAdmin } = action.payload;

        state.user = user;
        state.authenticated = true;

        if (isAdmin) {
          state.admin = user;
          state.adminAuthenticated = true;
        } else {
          state.admin = null;
          state.adminAuthenticated = false;
        }
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= REGISTER ================= */

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload;
        state.authenticated = true;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= FETCH USER ================= */

      .addCase(fetchUser.pending, (state) => {
        state.checkingAuth = true;
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authenticated = true;

        if (action.payload.role === "admin") {
          state.admin = action.payload;
          state.adminAuthenticated = true;
        }

        state.checkingAuth = false;
      })

      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.admin = null;

        state.authenticated = false;
        state.adminAuthenticated = false;

        state.checkingAuth = false;
      })

      /* ================= LOGOUT ================= */

      .addCase(logout.pending, (state) => {
        state.loading = true;
      })

      .addCase(logout.fulfilled, (state) => {
        state.loading = false;

        state.user = null;
        state.admin = null;

        state.authenticated = false;
        state.adminAuthenticated = false;

        state.error = null;
      })

      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })

      // ----------------------

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
