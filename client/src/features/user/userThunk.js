// Toastify
import { toast } from "react-toastify";

export const registerUserThunk = async (user, url, thunkAPI) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
      toast(data.msg);
      return thunkAPI.rejectWithValue(data.msg);
    }

    toast.success(data.msg);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (user, url, thunkAPI) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.msg);
      return thunkAPI.rejectWithValue(data.msg);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const logoutUserThunk = async (url, thunkAPI) => {
  try {
    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.msg);
      return thunkAPI.rejectWithValue(data.msg);
    }

    return data;
  } catch (error) {
    return error;
  }
};
