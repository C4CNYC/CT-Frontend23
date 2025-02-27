import { type PayloadAction, createListenerMiddleware, createSlice } from '@reduxjs/toolkit'

export interface IMobileTabManagerSlice {
  activeTab: number
  tabsVisible: boolean
}

const initialState: IMobileTabManagerSlice = {
  activeTab: 0,
  tabsVisible: false,
}

export const mobileTabManagerSlice = createSlice({
  name: 'mobile-tab-manager',
  initialState,
  reducers: {
    setTab: (state, { payload }: PayloadAction<number>): void => {
      state.activeTab = payload
    },
    showTabs: (state, { payload }: PayloadAction<boolean>): void => {
      state.tabsVisible = payload
    },
  },
})
export const tabListenerMiddleware = createListenerMiddleware()

tabListenerMiddleware.startListening({
  actionCreator: mobileTabManagerSlice.actions.setTab,
  effect: async (_, listenerApi) => {
    listenerApi.dispatch(mobileTabManagerSlice.actions.showTabs(true))
  },
})

export const { setTab, showTabs } = mobileTabManagerSlice.actions

export default mobileTabManagerSlice.reducer
