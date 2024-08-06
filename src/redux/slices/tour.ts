import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ITourSlice {
  isStarted: boolean
  readyToStartMainTour: boolean
}

const initialState: ITourSlice = {
  isStarted: false,
  readyToStartMainTour: false,
}

export const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setStartTour: (state, { payload }: PayloadAction<boolean>): void => {
      state.isStarted = payload
    },
    setReadyToStartMainTour: (state, { payload }: PayloadAction<boolean>): void => {
      state.readyToStartMainTour = payload
    },
  },
})

export const { setStartTour, setReadyToStartMainTour } = tourSlice.actions

export default tourSlice.reducer
