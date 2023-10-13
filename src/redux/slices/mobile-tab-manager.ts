import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IMobileTabManagerSlice {
  activeTab: number;
}

const initialState: IMobileTabManagerSlice = {
  activeTab: 0
};

export const mobileTabManagerSlice = createSlice({
  name: "mobile-tab-manager",
  initialState,
  reducers: {
    setTab: (state, { payload }: PayloadAction<number>): void => {
      state.activeTab = payload
    }
  },
});

export const { setTab } = mobileTabManagerSlice.actions;

export default mobileTabManagerSlice.reducer;
