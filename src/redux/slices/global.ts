import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { OrganizationResponce } from "../services/interfaces/organization.interface";

export interface CounterState {
  org_id: string;
  organizations: OrganizationResponce[];
}

const token =
  typeof window === "object" ? localStorage.getItem("accessToken") : "";

const initialState: CounterState = {
  org_id: "",
  organizations: [],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setOrganization: (state, action: PayloadAction<string>) => {
      state.org_id = action.payload;
    },
    setOrganizationList: (state, action: PayloadAction<any[]>) => {
      state.organizations = action.payload;
    },
  },
});

export const { setOrganization, setOrganizationList } = globalSlice.actions;

export default globalSlice.reducer;
