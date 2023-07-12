import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Toastify
import { toast } from "react-toastify";
// Thunk
import {
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
} from "./userThunk";
import url from "../../utils/url";

const initialState = {
  loading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk(user, url + "/api/v1/auth/register", thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk(user, url + "/api/v1/auth/login", thunkAPI);
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (thunkAPI) => {
    return logoutUserThunk(url + "/api/v1/auth/logout", thunkAPI);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, { payload }) => {
      state.user = payload.user;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload.msg);
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        toast.success("Welcome " + state.user.name + ",");
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload.msg);
      })
      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        toast.success("Logging out...");
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload.msg);
      });
  },
});

export const { saveUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
