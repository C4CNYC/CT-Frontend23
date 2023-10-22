import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ICheckersAnimationSlice {
  isVisible: boolean;
  isTextOpened: boolean;
  isActivateCompeated: boolean;
}

const initialState: ICheckersAnimationSlice = {
  isVisible: false,
  isTextOpened: false,
  isActivateCompeated: false
};

type PickedSliceItem<T extends keyof ICheckersAnimationSlice> = ICheckersAnimationSlice[T]

export const chekersAnimationSlice = createSlice({
  name: "checkers-animation",
  initialState,
  reducers: {
    setIsVisible: (state, { payload }: PayloadAction<PickedSliceItem<"isVisible">>): void => {
      state.isVisible = payload
    },
    setIsTextOpened: (state, { payload }: PayloadAction<PickedSliceItem<"isTextOpened">>): void => {
      state.isTextOpened = payload
    },
    setIsActivateCompeated: (state, { payload }: PayloadAction<PickedSliceItem<"isActivateCompeated">>): void => {
      state.isActivateCompeated = payload
    }
  },
});

export const {
  setIsVisible,
  setIsTextOpened,
  setIsActivateCompeated
} = chekersAnimationSlice.actions;

export default chekersAnimationSlice.reducer;
