import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Toastify
import { toast } from "react-toastify";
// Thunk
import { registerUserThunk, loginUserThunk } from "./userThunk";
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
      toast.success("Welcome " + state.user.name + ",");
      state.loading = false;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload.msg);
    },
  },
});

export const { saveUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
