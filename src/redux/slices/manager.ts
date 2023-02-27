import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  school_id: string;
}

const initialState: CounterState = {
  school_id: "",
};

export const managerSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSchool: (state, action: PayloadAction<string>) => {
      state.school_id = action.payload;
    },
  },
});

export const { setSchool } = managerSlice.actions;

export default managerSlice.reducer;
