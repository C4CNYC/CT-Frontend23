import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  schoolId: string;
}

const initialState: CounterState = {
  schoolId: "",
};

export const managerSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSchool: (state, action: PayloadAction<string>) => {
      state.schoolId = action.payload;
    },
  },
});

export const { setSchool } = managerSlice.actions;

export default managerSlice.reducer;
