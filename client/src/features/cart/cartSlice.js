import { createSlice } from "@reduxjs/toolkit";

const getCartItemsLocal = () => {
  if (localStorage.getItem("cartItems")) {
    return JSON.parse(localStorage.getItem("cartItems"));
  }
  return [];
};

const getOrderIdLocal = () => {
  if (localStorage.getItem("order")) {
    return JSON.parse(localStorage.getItem("order"));
  }
  return null;
};

const initialState = {
  cartItems: getCartItemsLocal(),
  amount: 0,
  shipping: 0,
  total: 0,
  order: getOrderIdLocal(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      state.cartItems = [payload, ...state.cartItems];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, { payload }) => {
      state.cartItems = {
        ...state.cartItems.filter((item) => item.id !== payload),
      };
    },
    toggleAmount: (state, { payload }) => {
      let cartItem = state.cartItems.find((item) => item.id === payload.id);

      if (payload.type === "+") {
        cartItem.amount++;
      } else {
        if (cartItem.amount <= 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== payload.id
          );

          return;
        }
        cartItem.amount--;
      }
    },
    addOrder: (state, { payload }) => {
      state.order = payload;

      localStorage.setItem("order", JSON.stringify(state.order));
    },
    calculateTotal: (state) => {
      const { amount, total, shipping } = state.cartItems.reduce(
        (acc, curr) => {
          acc.amount += curr.amount;
          acc.total += curr.amount * curr.price;
          acc.shipping += curr.shipping;

          return acc;
        },
        { amount: 0, total: 0, shipping: 0 }
      );

      state.amount = amount;
      state.total = Number(total.toFixed(2));
      state.shipping = Number(shipping);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export default cartSlice.reducer;

export const {
  addToCart,
  clearCart,
  removeItem,
  toggleAmount,
  calculateTotal,
  addOrder,
} = cartSlice.actions;
