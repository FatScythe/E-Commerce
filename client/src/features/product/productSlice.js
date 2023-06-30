import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// Thunk
import { productsThunk } from "./productThunk";

const initialState = {
  products: [],
  product_loading: false,
  filters: {
    text: "",
    category: "",
    store: "",
    color: "",
    price: 0,
    min_price: 0,
    max_price: 0,
    shipping: false,
  },
  filteredProducts: [],
  isList: false,
  singleProduct: {},
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (thunkAPI) => {
    return productsThunk("http://localhost:5000/api/v1/products", thunkAPI);
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    listView: (state) => {
      state.isList = true;
    },
    gridView: (state) => {
      state.isList = false;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.product_loading = true;
    },
    [fetchProducts.fulfilled]: (state, { payload }) => {
      console.log(state.products);
      state.products = payload.products;
      if (state.products) {
        state.filteredProducts = state.products;
      }
      state.product_loading = false;
    },
    [fetchProducts.rejected]: (state, { payload }) => {
      state.product_loading = false;
      toast.error(payload.msg);
    },
  },
});

export const { gridView, listView } = productSlice.actions;

export default productSlice.reducer;
