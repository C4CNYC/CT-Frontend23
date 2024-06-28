import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { type BaseResponseInterface } from '@/utils'

import { IUser } from '../services/interfaces/user.interface'

export type User =
  | (IUser & BaseResponseInterface)
  | (Pick<IUser, 'first_name' | 'last_name' | 'avatar'> & Pick<BaseResponseInterface, 'id'>)

interface UserSlice {
  user: IUser | null
}

const initialState: UserSlice = {
  user: null,
}

export const codePanelChatUser = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User | null>): void => {
      //@ts-expect-error
      state.user = payload
    },
  },
})

export const { setUser } = codePanelChatUser.actions

export default codePanelChatUser.reducer
