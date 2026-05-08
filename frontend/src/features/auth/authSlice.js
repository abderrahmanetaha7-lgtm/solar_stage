import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCSRF,
  loginApi,
  registerApi,
  logoutApi,
  userApi,
  updateProfileApi,
  changePasswordApi,
  deleteAccountApi,
} from "../../api/authApi";

/* ================= LOGIN ================= */

export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      await getCSRF();

      await loginApi(data);

      const user = await userApi();

      return user.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Login failed"
      );
    }
  }
);

/* ================= REGISTER ================= */

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      await getCSRF();

      await registerApi(data);

      const user = await userApi();

      return user.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Register failed"
      );
    }
  }
);

/* ================= FETCH CURRENT USER ================= */

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const res = await userApi();

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch user"
      );
    }
  }
);

/* ================= UPDATE PROFILE ================= */

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, thunkAPI) => {
    try {
      const res = await updateProfileApi(data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update profile"
      );
    }
  }
);

/* ================= CHANGE PASSWORD ================= */

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, thunkAPI) => {
    try {
      const res = await changePasswordApi(data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to change password"
      );
    }
  }
);

/* ================= DELETE ACCOUNT ================= */

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, thunkAPI) => {
    try {
      await deleteAccountApi();

      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to delete account"
      );
    }
  }
);

/* ================= LOGOUT ================= */

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await logoutApi();

      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Logout failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    loading: false,
    error: null,
    authenticated: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ================= LOGIN ================= */

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.authenticated = true;
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
        state.loading = true;
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.authenticated = true;
      })

      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.authenticated = false;
      })

      /* ================= UPDATE PROFILE ================= */

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= CHANGE PASSWORD ================= */

      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= DELETE ACCOUNT ================= */

      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.authenticated = false;
      })

      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= LOGOUT ================= */

      .addCase(logout.pending, (state) => {
        state.loading = true;
      })

      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.authenticated = false;
      })

      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;