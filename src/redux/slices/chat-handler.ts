import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IChatHandler {
  isChatVisible: boolean
  chatMessages: IChatMessage[]
  slideContext: string
}

export interface IChatMessage {
  body: string
  sender: string
  timestamp: string | number | Date
}

const initialState: IChatHandler = {
  isChatVisible: false,
  chatMessages: [],
  slideContext: '',
}

export const chatHandlerSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setChatVisible: (state, { payload }: PayloadAction<boolean>): void => {
      state.isChatVisible = payload
    },
    setChatMessages: (state, { payload }: PayloadAction<IChatMessage[]>): void => {
      state.chatMessages = payload
    },
    setSlideContext: (state, { payload }: PayloadAction<string>): void => {
      state.slideContext = payload
    },
  },
})

export const { setChatVisible, setChatMessages, setSlideContext } = chatHandlerSlice.actions

export default chatHandlerSlice.reducer
