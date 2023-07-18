import { toast } from "react-toastify";

export const reviewsThunk = async (url, thunkAPI) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const reviewThunk = async (url, thunkAPI) => {
  const { title, comment, rating, type, productId } = thunkAPI;

  let method = "POST";

  if (type === "edit") {
    method = "PATCH";
  }
  if (type === "delete") {
    method = "DELETE";
  }

  try {
    const response = await fetch(url, {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ product: productId, title, comment, rating }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.msg);
      return data;
    }

    let answer = "added";

    if (type === "edit") {
      answer = "updated";
    }

    if (type === "delete") {
      answer = "deleted";
    }

    toast.success(`Review has been ${answer}`);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
