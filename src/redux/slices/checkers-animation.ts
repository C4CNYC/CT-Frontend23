import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ICheckersAnimationSlice {
  isVisible: boolean
  isTextOpened: boolean
  isActivateCompeated: boolean
  completedSlides: boolean[]
}

const initialState: ICheckersAnimationSlice = {
  isVisible: false,
  isTextOpened: false,
  isActivateCompeated: false,
  completedSlides: [],
}

type PickedSliceItem<T extends keyof ICheckersAnimationSlice> = ICheckersAnimationSlice[T]

export const chekersAnimationSlice = createSlice({
  name: 'checkers-animation',
  initialState,
  reducers: {
    setIsVisible: (state, { payload }: PayloadAction<PickedSliceItem<'isVisible'>>): void => {
      state.isVisible = payload
    },
    setIsTextOpened: (state, { payload }: PayloadAction<PickedSliceItem<'isTextOpened'>>): void => {
      state.isTextOpened = payload
    },
    setIsActivateCompeated: (
      state,
      { payload }: PayloadAction<PickedSliceItem<'isActivateCompeated'>>
    ): void => {
      state.isActivateCompeated = payload
    },
    setCompletedSlides: (
      state,
      { payload }: PayloadAction<PickedSliceItem<'completedSlides'>>
    ): void => {
      state.completedSlides = payload
    },
    resetState: (state): void => {
      state.isVisible = initialState.isVisible
      state.isTextOpened = initialState.isTextOpened
      state.isActivateCompeated = initialState.isActivateCompeated
      state.completedSlides = initialState.completedSlides
    },
  },
})

export const {
  setIsVisible,
  setIsTextOpened,
  setIsActivateCompeated,
  setCompletedSlides,
  resetState,
} = chekersAnimationSlice.actions

export default chekersAnimationSlice.reducer
