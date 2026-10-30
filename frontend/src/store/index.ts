import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice.ts";
import { contactApi } from "./api.ts";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

