import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IGlobalCodePanel {
  slideIndex: number
  solutionCode: string
  nextStepAble: boolean
  lessonId: string
  unitId: string
  courseId: string
  code: string
  isInstructionsHidden: boolean
  isBrowserHidden: boolean
  isRealtimeCodeEnabled: boolean
  isRealtimeCodeHidden: boolean
}

const initialState: IGlobalCodePanel = {
  slideIndex: 0,
  solutionCode: '',
  lessonId: '',
  unitId: '',
  courseId: '',
  nextStepAble: true,
  code: '',
  isInstructionsHidden: false,
  isBrowserHidden: false,
  isRealtimeCodeEnabled: true,
  isRealtimeCodeHidden: true,
}

type PickedStoreItem<T extends keyof IGlobalCodePanel> = IGlobalCodePanel[T]

export const codePanelSlice = createSlice({
  name: 'code-panel-global',
  initialState,
  reducers: {
    setSlideIndex: (state, { payload }: PayloadAction<PickedStoreItem<'slideIndex'>>): void => {
      state.slideIndex = payload
    },
    setSolutionCode: (state, { payload }: PayloadAction<PickedStoreItem<'solutionCode'>>): void => {
      state.solutionCode = payload
    },
    setNextStepAble: (state, { payload }: PayloadAction<PickedStoreItem<'nextStepAble'>>): void => {
      state.nextStepAble = payload
    },
    setUnitId: (state, { payload }: PayloadAction<PickedStoreItem<'unitId'>>): void => {
      state.unitId = payload
    },
    setCourseId: (state, { payload }: PayloadAction<PickedStoreItem<'courseId'>>): void => {
      state.courseId = payload
    },
    setLessonId: (state, { payload }: PayloadAction<PickedStoreItem<'lessonId'>>): void => {
      state.lessonId = payload
    },
    toggleInstrations: (
      state,
      { payload }: PayloadAction<PickedStoreItem<'isInstructionsHidden'>>
    ): void => {
      state.isInstructionsHidden = payload
    },
    toggleBrowser: (
      state,
      { payload }: PayloadAction<PickedStoreItem<'isBrowserHidden'>>
    ): void => {
      state.isBrowserHidden = payload
    },
    toggleRealtimeCodeEnabled: (
      state,
      { payload }: PayloadAction<PickedStoreItem<'isRealtimeCodeEnabled'>>
    ) => {
      state.isRealtimeCodeEnabled = payload
    },
    toggleRealtimeCodeHidden: (
      state,
      { payload }: PayloadAction<PickedStoreItem<'isRealtimeCodeHidden'>>
    ) => {
      state.isRealtimeCodeHidden = payload
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload
    },
  },
})

export const {
  setSlideIndex,
  setSolutionCode,
  setNextStepAble,
  setUnitId,
  setCourseId,
  setLessonId,
  toggleInstrations,
  toggleBrowser,
  toggleRealtimeCodeEnabled,
  toggleRealtimeCodeHidden,
  setCode,
} = codePanelSlice.actions

export default codePanelSlice.reducer
