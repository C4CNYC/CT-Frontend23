import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import omit from 'lodash-es/omit'

const initialState: {
  items: Record<string, { id: string; email: string; avatar: string }>
} = { items: {} }

export const rabitsSlice = createSlice({
  name: 'schoolSettings',
  initialState,
  reducers: {
    createRabit: (state, action: PayloadAction<{ id: string; email: string; avatar: string }>) => {
      state.items = {
        ...state.items,
        [action.payload.id]: action.payload,
      }
    },
    removeRabit: (state, action: PayloadAction<{ id: string }>) => {
      state.items = {
        ...omit(state.items, action.payload.id),
      }
    },
  },
})

export const { createRabit, removeRabit } = rabitsSlice.actions

export default rabitsSlice.reducer
