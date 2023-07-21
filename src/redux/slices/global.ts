import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { BaseResponseInterface } from "@utils";

import { IUser } from "../interfaces/auth.interface";
import { OrganizationResponce } from "../services/interfaces/organization.interface";

export interface CounterState {
  org_id: string;
  organizations: OrganizationResponce[];
  user: IUser | null;
  isStudent: boolean | null;
}

export interface ISchool extends BaseResponseInterface {
  name: string;
  city: string;
  avatar: string;
  cover: string;
  country: string;
}

const initialState: CounterState = {
  org_id: "",
  organizations: [],
  user: null,
  isStudent: true,
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
    setStudentMode: (state, action: PayloadAction<boolean>) => {
      state.isStudent = action.payload;
    },
    cleanUserRole: (state, action: PayloadAction<undefined>) => {
      state.isStudent = null;
    },
  },
});

export const {
  setUser,
  setOrganization,
  setOrganizationList,
  cleanUser,
  setStudentMode,
  cleanUserRole,
} = globalSlice.actions;

export default globalSlice.reducer;
