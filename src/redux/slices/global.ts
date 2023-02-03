import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { OrganizationResponce } from "../services/interfaces/organization.interface";
import { IUser } from "../services/interfaces/user.interface";

export interface CounterState {
  org_id: string;
  organizations: OrganizationResponce[];
  user: IUser | null;
}

const initialState: CounterState = {
  org_id: "",
  organizations: [],
  user: null,
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
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    cleanUser: (state, action: PayloadAction<undefined>) => {
      state.user = null;
    },
  },
});

export const { setUser, setOrganization, setOrganizationList, cleanUser } =
  globalSlice.actions;

export default globalSlice.reducer;
