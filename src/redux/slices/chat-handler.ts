import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IChatHandler {
  isChatVisible: boolean
  isUserEdited: boolean
  isUserOwner: boolean
}

const initialState: IChatHandler = {
  isChatVisible: false,
  isUserEdited: false,
  isUserOwner: false,
}

export const chatHandlerSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setChatVisible: (state, { payload }: PayloadAction<boolean>): void => {
      state.isChatVisible = payload
    },
    setUserEdited: (state, { payload }: PayloadAction<boolean>): void => {
      state.isUserEdited = payload
    },
    setUserOwner: (state, { payload }: PayloadAction<boolean>): void => {
      state.isUserOwner = payload
    },
  },
})

export const { setChatVisible, setUserEdited, setUserOwner } = chatHandlerSlice.actions

export default chatHandlerSlice.reducer
