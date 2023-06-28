// Toastify
import { toast } from "react-toastify";

export const registerUserThunkAPI = async (user, url) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.msg);
      return data;
    }

    toast.success(data.msg);

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginUserThunkAPI = async (user, url) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.msg);
      return data;
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
