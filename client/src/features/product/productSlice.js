import { createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// Thunk
import { productsThunk, singleProductThunk } from "./productThunk";
// Categories Enum
import { categories } from "../../assets/data/productCategories";
import url from "../../utils/url";

const initialState = {
  products: [],
  product_loading: false,
  filters: {
    text: "",
    category: "",
    store: "",
    color: "",
    price: 0,
    sort: "a-z",
    min_price: 0,
    max_price: 0,
    shipping: false,
  },
  filteredProducts: [],
  enumProducts: {
    categories,
    maxPrice: Math.pow(10, 1000),
    minPrice: 0,
    colors: [],
    store: [],
  },
  isList: false,
  singleProduct: null,
  singleProduct_loading: false,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (thunkAPI) => {
    return productsThunk(url + "/api/v1/products", thunkAPI);
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (thunkAPI) => {
    const { user, id } = thunkAPI;
    return singleProductThunk(
      user
        ? url + "/api/v1/products/auth/" + id
        : url + "/api/v1/products/" + id,
      thunkAPI
    );
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
      let filter = [...current(state).filteredProducts];

      if (!state.products) {
        state.filteredProducts = [];
        return;
      }

      if (payload.text !== "") {
        filter = [...current(state).products].filter(
          (item) => item.name.toLowerCase() === payload.text
        );
      } else {
        filter = state.products;
      }

      if (payload.category !== "all") {
        filter = [...current(state).products].filter(
          (item) => item.category === payload.category
        );
      } else {
        filter = state.products;
      }

      if (payload.store !== "all") {
        filter = filter.filter(
          (item) => item.store.toLowerCase() === payload.store
        );
      }

      if (payload.color !== "") {
        filter = filter.filter((item) => item.color.includes(payload.color));
      }

      if (payload.price >= 0) {
        filter = filter.filter((item) => payload.price >= item.price);
      }

      if (payload.shipping) {
        filter = filter.filter((item) => item.freeShipping);
      }

      if (payload.sort !== "none") {
        if (payload.sort === "name (a-z)") {
          filter = filter.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            return 0;
          });
        }

        if (payload.sort === "name (z-a)") {
          filter = filter.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return 1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return -1;
            }
            return 0;
          });
        }

        if (payload.sort === "price (lowest)") {
          filter = filter.sort((a, b) => a.price - b.price);
        }

        if (payload.sort === "price (highest)") {
          filter = filter.sort((a, b) => b.price - a.price);
        }
      }

      state.filteredProducts = filter;
    },

    reset: (state) => {
      state.filteredProducts = state.products;
    },
  },
  extraReducers(builder) {
    builder
      //Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.product_loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
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
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.product_loading = false;
        toast.error(payload.msg);
      })
      // Single Products
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleProduct_loading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, { payload }) => {
        state.singleProduct = payload;
        state.singleProduct_loading = false;
      })
      .addCase(fetchSingleProduct.rejected, (state, { payload }) => {
        state.product_loading = false;
        toast.error(payload.msg);
      });
  },
});

export const { gridView, listView, sort, reset } = productSlice.actions;

export default productSlice.reducer;
