import { combineReducers } from "redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// slices
import { adminApi } from "./services/admin";
import { authApi } from "./services/auth";
import { managerApi } from "./services/manager";
import { publicApi } from "./services/public/tribe-public";
import { studentApi } from "./services/student";
import { studentAuthApi } from "./services/student-auth";
import { studentPublicApi } from "./services/student/public-student";
import { schoolSettingsApi } from "./services/student/school-settings-manager";
import assignmentsReducer from "./slices/assignments";
import globalRducer from "./slices/global";
import lessonStepsReducer from "./slices/lesson-steps";
import managerReducer from "./slices/manager";
import schoolSettingsReducer from "./slices/schoolSettings";

// ----------------------------------------------------------------------
interface INoopStorage {
  getItem: (_key: string) => Promise<null>;
  setItem: (_key: string, value: any) => Promise<any>;
  removeItem: (_key: string) => Promise<void>;
}
export const createNoopStorage = (): INoopStorage => ({
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
  [adminApi.reducerPath]: adminApi.reducer,
  [managerApi.reducerPath]: managerApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [studentAuthApi.reducerPath]: studentAuthApi.reducer,
  [studentApi.reducerPath]: studentApi.reducer,
  [schoolSettingsApi.reducerPath]: schoolSettingsApi.reducer,
  [studentPublicApi.reducerPath]: studentPublicApi.reducer,
  [publicApi.reducerPath]: publicApi.reducer,
  global: globalRducer,
  manager: managerReducer,
  assignments: assignmentsReducer,
  lessonSteps: lessonStepsReducer,
  schoolSettings: schoolSettingsReducer,
});

export default rootReducer;
