import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./features/ui/uiSlice";
import userSlice from "./features/user/userSlice";
import productSlice from "./features/product/productSlice";
import cartSlice from "./features/cart/cartSlice";
import reviewSlice from "./features/review/reviewSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
    review: reviewSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
