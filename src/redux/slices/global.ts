import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { BaseResponseInterface } from "@utils";
import { IUser } from "../interfaces/auth.interface";
import { IClass } from "../interfaces/class.interface";
import { IFriend } from "../interfaces/friends.interface";
import { OrganizationResponce } from "../services/interfaces/organization.interface";

export interface CounterState {
  org_id: string;
  organizations: OrganizationResponce[];
  isStudentManager: boolean;
  user: IUser | null;
}

export interface ISchool extends BaseResponseInterface {
  name: string;
  city: string;
  avatar: string;
  cover: string;
  country: string;
}

export type User =
  | (IFriend & { school: ISchool } & {
      classes: Array<IClass & BaseResponseInterface>;
    } & {
      teacher_profile: (IUser & BaseResponseInterface) | null;
    })
  | null;

const initialState: CounterState = {
  org_id: "",
  organizations: [],
  isStudentManager: false,
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
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isStudentManager = !!action.payload?.teacher_profile;
    },
    cleanUser: (state, action: PayloadAction<undefined>) => {
      state.user = null;
    },
  },
});

export const { setUser, setOrganization, setOrganizationList, cleanUser } =
  globalSlice.actions;

export default globalSlice.reducer;
