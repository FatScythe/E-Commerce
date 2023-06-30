export const productsThunk = async (url, thunkAPI) => {
  try {
    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      console.log(response);
      return thunkAPI.rejectWithValue(data.msg);
    }

    return data;
  } catch (error) {
    return error;
  }
};
