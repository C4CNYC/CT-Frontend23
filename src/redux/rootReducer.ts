import { combineReducers } from 'redux'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

// slices
import { adminApi } from './services/admin'
import { authApi } from './services/auth'
import { feedbackApi } from './services/feedback'
import { managerApi } from './services/manager'
import { superAdmin } from './services/manager/super-admin'
import { publicApi } from './services/public/tribe-public'
import { studentPublicApi } from './services/public-student'
import { schoolSettingsApi } from './services/school-settings-manager'
import { studentAuthApi } from './services/student-auth'
import { tenantConfigApi } from './services/tenant-configs'
import chatHandlerReducer from './slices/chat-handler'
import checkersAnimationReducer from './slices/checkers-animation'
import codePanelReducer from './slices/code-panel'
import codePanelGlobalReducer from './slices/code-panel-global'
import globalRducer from './slices/global'
import lessonStepsReducer from './slices/lesson-steps'
import managerReducer from './slices/manager'
import mobileTabManagerReducer from './slices/mobile-tab-manager'
import rabitsReduce from './slices/rabits'
import schoolSettingsReducer from './slices/schoolSettings'
import tenantReducer from './slices/tenant'
import tourReducer from './slices/tour'

interface INoopStorage {
  getItem: (_key: string) => Promise<null>
  setItem: (_key: string, value: any) => Promise<any>
  removeItem: (_key: string) => Promise<void>
}
export const createNoopStorage = (): INoopStorage => ({
  async getItem(_key: string) {
    return await Promise.resolve(null)
  },
  async setItem(_key: string, value: any) {
    return await Promise.resolve(value)
  },
  async removeItem(_key: string) {
    await Promise.resolve()
  },
})

export const storage =
  typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['codePanel'],
}

const rootReducer = combineReducers({
  [superAdmin.reducerPath]: superAdmin.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [managerApi.reducerPath]: managerApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [studentAuthApi.reducerPath]: studentAuthApi.reducer,
  [schoolSettingsApi.reducerPath]: schoolSettingsApi.reducer,
  [studentPublicApi.reducerPath]: studentPublicApi.reducer,
  [publicApi.reducerPath]: publicApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer,
  [tenantConfigApi.reducerPath]: tenantConfigApi.reducer,
  tenant: tenantReducer,
  global: globalRducer,
  manager: managerReducer,
  lessonSteps: lessonStepsReducer,
  schoolSettings: schoolSettingsReducer,
  codePanel: codePanelReducer,
  rabits: rabitsReduce,
  codePanelGlobal: codePanelGlobalReducer,
  tour: tourReducer,
  checkersAnimation: checkersAnimationReducer,
  mobileTabManager: mobileTabManagerReducer,
  chatHandler: chatHandlerReducer,
})

export default rootReducer
