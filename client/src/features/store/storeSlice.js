import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storesThunk, storeThunk, storeCrudThunk } from "./storeThunk";

import url from "../../utils/url";

const initialState = {
  stores: [],
  stores_status: "pending",
  singleStore: {},
  singleStore_status: "pending",
};

export const fetchStores = createAsyncThunk(
  "store/fetchStores",
  async (thunkAPI) => {
    return storesThunk(url + "/api/v1/stores", thunkAPI);
  }
);

export const fetchSingleStore = createAsyncThunk(
  "store/fetchSingleStores",
  async (thunkAPI) => {
    return storeThunk(url + "/api/v1/stores/my-store", thunkAPI);
  }
);

export const storeCrud = createAsyncThunk("store/Stores", async (thunkAPI) => {
  return storeCrudThunk(url + "/api/v1/stores", thunkAPI);
});

const storeSlice = createSlice({
  name: "store",
  initialState,
  extraReducers(builder) {
    builder
      // Fetch Stores
      .addCase(fetchStores.pending, (state) => {
        state.stores_status = "pending";
      })
      .addCase(fetchStores.fulfilled, (state, { payload }) => {
        state.stores = payload;
        state.stores_status = "ok";
      })
      .addCase(fetchStores.rejected, (state) => {
        state.stores_status = "err";
      })
      // Fetch Single Store
      .addCase(fetchSingleStore.pending, (state) => {
        state.singleStore_status = "pending";
      })
      .addCase(fetchSingleStore.fulfilled, (state, { payload }) => {
        state.singleStore = payload;
        state.singleStore_status = "ok";
      })
      .addCase(fetchSingleStore.rejected, (state) => {
        state.singleStore_status = "err";
      });
  },
});

export default storeSlice.reducer;
