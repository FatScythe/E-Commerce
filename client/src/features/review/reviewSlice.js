import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reviewsThunk, reviewThunk } from "./reviewThunk";

import url from "../../utils/url";

const initialState = {
  allReviews: { count: 0, reviews: [] },
  reviews_status: "pending",
};

export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async (thunkAPI) => {
    return reviewsThunk(url + "/api/v1/reviews", thunkAPI);
  }
);

export const reviewCrud = createAsyncThunk(
  "review/reviewCrud",
  async (thunkAPI) => {
    let baseUrl = url + "/api/v1/reviews/";
    if (thunkAPI.type === "edit" || thunkAPI.type === "delete") {
      baseUrl = baseUrl + thunkAPI.reviewId;
    }
    return reviewThunk(baseUrl, thunkAPI);
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  extraReducers(builder) {
    builder
      // Fetch Review
      .addCase(fetchReviews.pending, (state) => {
        state.reviews_status = "pending";
      })
      .addCase(fetchReviews.fulfilled, (state, { payload }) => {
        state.allReviews = payload;
        state.reviews_status = "ok";
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.reviews_status = "err";
      });
  },
});

export default reviewSlice.reducer;
