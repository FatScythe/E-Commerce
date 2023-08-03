import { toast } from "react-toastify";

export const storesThunk = async (url, thunkAPI) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.msg);
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const storeThunk = async (url, thunkAPI) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.msg);
      return;
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const storeCrudThunk = async (url, thunkAPI) => {
  const { name, desc, insta, fb, tiktok, type, storeId } = thunkAPI;
  console.log(thunkAPI, "In thunk");

  let method = "POST";

  if (type === "edit") {
    method = "PATCH";
  }
  if (type === "delete") {
    method = "DELETE";
  }

  toast.loading("Processing...");
  let baseUrl = url;
  if (type !== "add") {
    baseUrl += "/" + storeId;
  }

  try {
    const response = await fetch(baseUrl, {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        desc,
        insta,
        fb,
        tiktok,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.msg);
      toast.dismiss();
      return data;
    }

    toast.dismiss();

    let answer = "created";

    if (type === "edit") {
      answer = "updated";
    }

    if (type === "delete") {
      answer = "deleted";
    }

    toast.success(`Store has been ${answer}`);
    return data;
  } catch (error) {
    toast.dismiss();
    console.error(error);
    return error;
  }
};