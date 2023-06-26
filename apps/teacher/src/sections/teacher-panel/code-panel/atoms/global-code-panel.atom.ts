import { atomWithStorage } from "jotai/utils";

export interface IGlobalCodePanelAtom {
  slideIndex: number;
  solutionCode: string;
  lessonId: string;
  nextStepAble: boolean;
  isFullScreenView: boolean;
  isAllColumnsVisible: boolean;
}

export const globalCodePanelAtom = atomWithStorage<IGlobalCodePanelAtom>(
  "GLOBAL_CODE_PANEL_ATOM",
  {
    slideIndex: 0,
    solutionCode: "",
    nextStepAble: true,
    lessonId: "",
    isAllColumnsVisible: true,
    isFullScreenView: false,
  }
);
