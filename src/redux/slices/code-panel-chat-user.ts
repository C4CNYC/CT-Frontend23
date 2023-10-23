import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type BaseResponseInterface } from "@utils";

import { type IFriend } from "../interfaces/friends.interface";

export type User =
  | (IFriend & BaseResponseInterface)
  | (Pick<IFriend, "first_name" | "last_name" | "avatar"> &
      Pick<BaseResponseInterface, "id">);

interface UserSlice {
  user: User | null
}

const initialState: UserSlice = {
  user: null
};

export const codePanelChatUser = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User | null>): void => {
      state.user = payload
    }
  },
});

export const { setUser } = codePanelChatUser.actions;

export default codePanelChatUser.reducer;
