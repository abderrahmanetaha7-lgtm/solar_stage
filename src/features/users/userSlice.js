import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUser, getUsers, updateUser } from "../../api/dataApi";
 

/* ================= THUNKS ================= */

// Get all users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const res = await getUsers();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// Update user
export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await updateUser(id, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

// Delete user
export const removeUser = createAsyncThunk(
  "users/removeUser",
  async (id, thunkAPI) => {
    try {
      await deleteUser(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

/* ================= SLICE ================= */

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ===== FETCH USERS ===== */
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE USER ===== */
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );

        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      /* ===== DELETE USER ===== */
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user.id !== action.payload
        );
      });
  },
});

export default userSlice.reducer;