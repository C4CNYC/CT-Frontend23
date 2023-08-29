import { combineReducers } from "redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// slices
import { adminApi } from "./services/admin";
import { authApi } from "./services/auth";
import { managerApi } from "./services/manager";
import { studentPublicApi } from "./services/public-student";
import { publicApi } from "./services/public/tribe-public";
import { schoolSettingsApi } from "./services/school-settings-manager";
import { studentAuthApi } from "./services/student-auth";
import codePanelReducer from "./slices/code-panel";
import globalRducer from "./slices/global";
import lessonStepsReducer from "./slices/lesson-steps";
import managerReducer from "./slices/manager";
import rabitsReduce from "./slices/rabits";
import schoolSettingsReducer from "./slices/schoolSettings";

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
  [schoolSettingsApi.reducerPath]: schoolSettingsApi.reducer,
  [studentPublicApi.reducerPath]: studentPublicApi.reducer,
  [publicApi.reducerPath]: publicApi.reducer,
  global: globalRducer,
  manager: managerReducer,
  lessonSteps: lessonStepsReducer,
  schoolSettings: schoolSettingsReducer,
  codePanel: codePanelReducer,
  rabits: rabitsReduce,
});

export default rootReducer;
