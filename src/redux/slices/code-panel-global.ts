import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { Socket } from 'socket.io-client'

import { ILessonUserStatus } from '@/types'
import { IValidationMap } from '@/utils'
export interface ContentValidation {
  contentId: string
  checkers?: IValidationMap[] | undefined
}
export interface IGlobalCodePanel {
  slideIndex: number
  solutionCode: string
  nextStepAble: boolean
  lessonId?: string
  unitId?: string
  courseId?: string
  code: string
  isInstructionsHidden: boolean
  isBrowserHidden: boolean
  isRealtimeCodeEnabled: boolean
  isRealtimeCodeHidden: boolean
  usersStatus: ILessonUserStatus[]
  socket?: Socket | undefined
  contentValidations?: ContentValidation[]
  prevLessonId?: string | null
  prevLessonCode?: string | null | undefined
  animationNumber: number
}

const initialState: IGlobalCodePanel = {
  slideIndex: 0,
  solutionCode: '',
  lessonId: undefined,
  unitId: undefined,
  courseId: undefined,
  nextStepAble: true,
  code: '',
  isInstructionsHidden: false,
  isBrowserHidden: false,
  isRealtimeCodeEnabled: true,
  isRealtimeCodeHidden: true,
  usersStatus: [],
  socket: undefined,
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
    setUsersStatus: (state, action: PayloadAction<ILessonUserStatus[]>) => {
      state.usersStatus = action.payload
    },
    setSocket: (state, action: PayloadAction<Socket | undefined>) => {
      state.socket = action.payload as any
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
  setUsersStatus,
  setSocket,
  setContentValidations,
  setPrevLessonId,
  setPrevLessonCode,
  increaceAnimationNumber,
  resetAnimaitonNumber,
} = codePanelSlice.actions

export default codePanelSlice.reducer
