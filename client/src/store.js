import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./features.js/ui/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
