import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ILessonUserStatus } from '@/types'
import { IValidationMap } from '@/utils'
export interface ContentValidation {
  contentId: string
  checkers?: IValidationMap[] | undefined
}
export interface IGlobalCodePanel {
  slideIndex: number
  slideId: string
  solutionCode: string
  nextStepAble: boolean
  lessonId?: string
  unitId?: string
  courseId?: string
  code: string
  isInstructionsHidden: boolean
  isBrowserHidden: boolean
  usersStatus: ILessonUserStatus[]
  contentValidations?: ContentValidation[]
  prevLessonId?: string | null
  prevLessonCode?: string | null | undefined
  animationNumber: number
}

const initialState: IGlobalCodePanel = {
  slideIndex: 0,
  slideId: '',
  solutionCode: '',
  lessonId: undefined,
  unitId: undefined,
  courseId: undefined,
  nextStepAble: true,
  code: '',
  isInstructionsHidden: false,
  isBrowserHidden: false,
  usersStatus: [],
  contentValidations: [],
  prevLessonId: null,
  prevLessonCode: null,
  animationNumber: 1,
}

type PickedStoreItem<T extends keyof IGlobalCodePanel> = IGlobalCodePanel[T]

export const codePanelSlice = createSlice({
  name: 'code-panel-global',
  initialState,
  reducers: {
    setSlideIndex: (state, { payload }: PayloadAction<PickedStoreItem<'slideIndex'>>): void => {
      state.slideIndex = payload
    },
    setSlideId: (state, { payload }: PayloadAction<PickedStoreItem<'slideId'>>): void => {
      state.slideId = payload
    },
    setSolutionCode: (state, { payload }: PayloadAction<PickedStoreItem<'solutionCode'>>): void => {
      state.solutionCode = payload
    },
    setNextStepAble: (state, { payload }: PayloadAction<PickedStoreItem<'nextStepAble'>>): void => {
      if (state.nextStepAble === payload) return
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
    setContentValidations: (
      state,
      { payload }: PayloadAction<PickedStoreItem<'contentValidations'>>
    ): void => {
      state.contentValidations = payload
    },
    setPrevLessonId: (state, { payload }: PayloadAction<PickedStoreItem<'prevLessonId'>>): void => {
      state.prevLessonId = payload
    },
    setPrevLessonCode: (
      state,
      { payload }: PayloadAction<PickedStoreItem<'prevLessonCode'>>
    ): void => {
      state.prevLessonCode = payload
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
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload
    },
    setUsersStatus: (state, action: PayloadAction<ILessonUserStatus[]>) => {
      state.usersStatus = action.payload
    },
    increaceAnimationNumber: (state, action: PayloadAction<number>) => {
      state.animationNumber = action.payload
    },
    resetAnimaitonNumber: (state) => {
      state.animationNumber = 1
    },
  },
})

export const {
  setSlideIndex,
  setSlideId,
  setSolutionCode,
  setNextStepAble,
  setUnitId,
  setCourseId,
  setLessonId,
  toggleInstrations,
  toggleBrowser,
  setCode,
  setUsersStatus,
  setContentValidations,
  setPrevLessonId,
  setPrevLessonCode,
  increaceAnimationNumber,
  resetAnimaitonNumber,
} = codePanelSlice.actions

export default codePanelSlice.reducer
