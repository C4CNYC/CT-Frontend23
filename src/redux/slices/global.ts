import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  org_id: string;
}

const initialState: CounterState = {
  org_id: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setOrganization: (state, action: PayloadAction<string>) => {
      state.org_id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrganization } = globalSlice.actions;

export default globalSlice.reducer;
