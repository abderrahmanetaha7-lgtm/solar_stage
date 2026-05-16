// features/profile/profileSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { updateProfile, deleteProfile } from "../../api/dataApi";

import { setUser } from "../auth/authSlice";

/* ================= UPDATE PROFILE ================= */

export const updateProfileAction = createAsyncThunk(
  "profile/updateProfile",
  async (formData, thunkAPI) => {
    try {
      const response = await updateProfile(formData);
 
      thunkAPI.dispatch(setUser(response.data.user));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.errors || {});
    }
  },
);

/* ================= DELETE PROFILE ================= */

export const deleteProfileAction = createAsyncThunk(
  "profile/deleteProfile",

  async (_, thunkAPI) => {
    try {
      const response = await deleteProfile();

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || {
          message: "Erreur serveur",
        },
      );
    }
  },
);

const initialState = {
  loading: false,

  success: null,

  errors: {},

  deleteSuccess: false,
};

const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {
    clearProfileState: (state) => {
      state.success = null;

      state.errors = {};
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= UPDATE ================= */

      .addCase(updateProfileAction.pending, (state) => {
        state.loading = true;

        state.errors = {};

        state.success = null;
      })

      .addCase(updateProfileAction.fulfilled, (state, action) => {
        state.loading = false;

        state.success = action.payload.message;
      })

      .addCase(updateProfileAction.rejected, (state, action) => {
        state.loading = false;

        state.errors = action.payload?.errors || {};
      })

      /* ================= DELETE ================= */

      .addCase(deleteProfileAction.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteProfileAction.fulfilled, (state) => {
        state.loading = false;

        state.deleteSuccess = true;
      })

      .addCase(deleteProfileAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearProfileState } = profileSlice.actions;

export default profileSlice.reducer;
