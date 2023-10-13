import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IChatHandler {
  isChatVisible: boolean;
}

const initialState: IChatHandler = {
  isChatVisible: false,
};

export const chatHandlerSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setChatVisible: (state, { payload }: PayloadAction<boolean>): void => {
      state.isChatVisible = payload
    }
  },
});

export const { setChatVisible } = chatHandlerSlice.actions;

export default chatHandlerSlice.reducer;
