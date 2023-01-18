import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./services/admin";
import { authApi } from "./services/auth";
import authSlice from "./slices/auth";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(adminApi.middleware),
});

store.subscribe(() => {});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
