import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Toastify
import { toast } from "react-toastify";
// Thunk
import { registerUserThunk, loginUserThunk } from "./userThunk";

const initialState = {
  loading: false,
  user: {},
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk(
      user,
      "http://localhost:5000/api/v1/auth/register",
      thunkAPI
    );
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk(
      user,
      "http://localhost:5000/api/v1/auth/login",
      thunkAPI
    );
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state) => {
      state.loading = false;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload.msg);
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.loading = false;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload.msg);
    },
  },
});

export default userSlice.reducer;
