import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./features/ui/uiSlice";
import userSlice from "./features/user/userSlice";
import productSlice from "./features/product/productSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    user: userSlice,
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
