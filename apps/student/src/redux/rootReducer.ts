import { combineReducers } from "redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// slices
import { authApi } from "./services/auth";
import { studentApi } from "./services/student";
import { studentPublicApi } from "./services/student/public-student";
import { schoolSettingsApi } from "./services/student/school-settings-manager";
import globalRducer from "./slices/global";
import schoolSettingsReducer from "./slices/schoolSettings";

// ----------------------------------------------------------------------

export const createNoopStorage = () => ({
  async getItem(_key: string) {
    return await Promise.resolve(null);
  },
  async setItem(_key: string, value: any) {
    return await Promise.resolve(value);
  },
  async removeItem(_key: string) {
    await Promise.resolve();
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
  [studentApi.reducerPath]: studentApi.reducer,
  [schoolSettingsApi.reducerPath]: schoolSettingsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [studentPublicApi.reducerPath]: studentPublicApi.reducer,
  global: globalRducer,
  schoolSettings: schoolSettingsReducer,
});

export default rootReducer;
