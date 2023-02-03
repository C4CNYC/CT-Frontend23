import { combineReducers } from "redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// slices
import globalRducer from "./slices/global";
import managerReducer from "./slices/manager";
import { adminApi } from "./services/admin";
import { managerApi } from "./services/manager";

// ----------------------------------------------------------------------

export const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

export const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  [adminApi.reducerPath]: adminApi.reducer,
  [managerApi.reducerPath]: managerApi.reducer,
  global: globalRducer,
  manager: managerReducer,
});

export default rootReducer;
