import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  organizationId: string;
}

const initialState: CounterState = {
  organizationId: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setOrganization: (state, action: PayloadAction<string>) => {
      state.organizationId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrganization } = globalSlice.actions;

export default globalSlice.reducer;
