import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IGlobalCodePanel {
  slideIndex: number;
  solutionCode: string;
  nextStepAble: boolean;
  lessonId: string;
  unitId: string;
  courseId: string;
  isInstructionsHidden: boolean;
  isBrowserHidden: boolean;
}

const initialState: IGlobalCodePanel = {
  slideIndex: 0,
  solutionCode: "",
  lessonId: "",
  unitId: "",
  courseId: "",
  nextStepAble: true,
  isInstructionsHidden: false,
  isBrowserHidden: false,
};

type PickedStoreItem<T extends keyof IGlobalCodePanel> = IGlobalCodePanel[T]

export const codePanelSlice = createSlice({
  name: "code-panel-global",
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
    setUnitId: (state, { payload }: PayloadAction<PickedStoreItem<'unitId'>>): void=> {
      state.unitId = payload
    },
    setCourseId: (state, { payload }: PayloadAction<PickedStoreItem<'courseId'>>): void => {
      state.courseId = payload
    },
    setLessonId: (state, { payload }: PayloadAction<PickedStoreItem<'lessonId'>>): void => {
      state.lessonId = payload
    },
    toggleInstrations: (state, { payload }: PayloadAction<PickedStoreItem<'isInstructionsHidden'>>): void => {
      state.isInstructionsHidden = payload
    },
    toggleBrowser: (state, { payload }: PayloadAction<PickedStoreItem<'isBrowserHidden'>>): void => {
      state.isBrowserHidden = payload
    }
  },
});

export const {
  setSlideIndex,
  setSolutionCode,
  setNextStepAble,
  setUnitId,
  setCourseId,
  setLessonId,
  toggleInstrations,
  toggleBrowser
} = codePanelSlice.actions;

export default codePanelSlice.reducer;
