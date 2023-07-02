import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// Thunk
import { productsThunk } from "./productThunk";
// Categories Enum
import { categories } from "../../assets/data/productCategories";

const initialState = {
  products: [],
  product_loading: false,
  filters: {
    text: "",
    category: "",
    store: "",
    color: [],
    price: 0,
    sort: "a-z",
    min_price: 0,
    max_price: 0,
    shipping: false,
  },
  filteredProducts: [],
  enumProducts: {
    categories,
    maxPrice: 0,
    minPrice: 0,
    colors: [],
    store: [],
  },
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
    sort: (state, { payload }) => {
      console.log(payload, "Sort Reducer");
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.product_loading = true;
    },
    [fetchProducts.fulfilled]: (state, { payload }) => {
      state.products = payload.products;
      if (state.products) {
        state.filteredProducts = state.products;

        // Price
        let priceArray = [];
        state.filteredProducts.forEach((product) => {
          priceArray.push(product.price);
        });
        priceArray.sort((a, b) => a - b);

        const maxPrice = priceArray[priceArray.length - 1];
        const minPrice = priceArray[0];

        state.enumProducts.minPrice = minPrice;
        state.enumProducts.maxPrice = maxPrice;
        // Color
        let colorArray = [];
        state.filteredProducts.forEach((productColor) => {
          productColor.color.map((color) => colorArray.push(color));
        });

        let colors = new Set([...colorArray]);

        colorArray = [...colors];
        state.enumProducts.colors = colorArray;
      }

      state.product_loading = false;
    },
    [fetchProducts.rejected]: (state, { payload }) => {
      state.product_loading = false;
      toast.error(payload.msg);
    },
  },
});

export const { gridView, listView, sort } = productSlice.actions;

export default productSlice.reducer;
