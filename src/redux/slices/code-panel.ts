import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IClass } from "../interfaces/class.interface";

export interface ICodePanelSlice {
  class: IClass | null;
}

const initialState: ICodePanelSlice = {
  class: null,
};

export const codePanelSlice = createSlice({
  name: "code-panel",
  initialState,
  reducers: {
    setClass: (state, action: PayloadAction<IClass>) => {
      state.class = action.payload;
    },
    removeClass: (state, action: PayloadAction<null>) => {
      state.class = null;
    },
  },
});

export const { setClass, removeClass } = codePanelSlice.actions;

export default codePanelSlice.reducer;
