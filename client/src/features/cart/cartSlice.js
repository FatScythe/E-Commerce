import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      //   console.log("from slice", payload);
      state.cartItems = [...state.cartItems, payload];
    },
  },
});

export default cartSlice.reducer;

export const { addToCart } = cartSlice.actions;
