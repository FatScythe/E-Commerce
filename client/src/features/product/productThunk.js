import { toast } from "react-toastify";

export const productsThunk = async (url, thunkAPI) => {
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

export const singleProductThunk = async (url, thunkAPI) => {
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

export const crudProductThunk = async (url, thunkAPI) => {
  const {
    name,
    price,
    image,
    desc,
    category,
    color,
    inventory,
    freeShipping,
    type,
  } = thunkAPI;

  let method = "POST";

  if (type === "edit") {
    method = "PATCH";
  }
  if (type === "delete") {
    method = "DELETE";
  }

  toast.loading("Processing...");
  try {
    const response = await fetch(url, {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        image,
        desc,
        category,
        color,
        inventory,
        freeShipping,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.msg);
      return data;
    }

    toast.dismiss();

    let answer = "added";

    if (type === "edit") {
      answer = "updated";
    }

    if (type === "delete") {
      answer = "deleted";
    }

    toast.success(`Product has been ${answer}`);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
