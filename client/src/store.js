import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./features/ui/uiSlice";
import userSlice from "./features/user/userSlice";
import productSlice from "./features/product/productSlice";
import cartSlice from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
