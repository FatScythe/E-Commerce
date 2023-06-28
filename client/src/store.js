import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./features/ui/uiSlice";
import userSlice from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
