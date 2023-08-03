import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./features/ui/uiSlice";
import userSlice from "./features/user/userSlice";
import productSlice from "./features/product/productSlice";
import cartSlice from "./features/cart/cartSlice";
import reviewSlice from "./features/review/reviewSlice";
import storeSlice from "./features/store/storeSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
    review: reviewSlice,
    store: storeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
