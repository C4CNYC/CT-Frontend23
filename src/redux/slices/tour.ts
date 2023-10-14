import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ITourSlice {
  isStarted: boolean;
}

const initialState: ITourSlice = {
  isStarted: false,
};

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setStartTour: (state, { payload }: PayloadAction<boolean>): void => {
      state.isStarted = payload
    }
  },
});

export const { setStartTour } = tourSlice.actions;

export default tourSlice.reducer;
