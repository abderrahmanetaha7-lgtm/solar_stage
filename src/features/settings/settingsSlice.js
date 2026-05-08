import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSettings, saveSettings } from "../../api/dataApi";



/* ================= FETCH ================= */

export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async () => {
    const res = await getSettings();

    return res.data;
  }
);

/* ================= UPDATE ================= */

export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async (formData) => {
    const res = await saveSettings(formData);

    return res.data;
  }
);

const settingsSlice = createSlice({
  name: "settings",

  initialState: {
    settings: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })

      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* UPDATE */
      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })

      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default settingsSlice.reducer;
