import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer, { rootPersistConfig } from "./rootReducer";
import { adminApi } from "./services/admin";
import { authApi } from "./services/auth";
import { managerApi } from "./services/manager";
import { studentApi } from "./services/student";

// ----------------------------------------------------------------------

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(adminApi.middleware)
      .concat(managerApi.middleware),
  // .concat(studentApi.middleware),
});

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

const useDispatch = () => useAppDispatch<AppDispatch>();

export { store, persistor, dispatch, useSelector, useDispatch };
