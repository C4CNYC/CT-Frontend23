import { atomWithStorage } from "jotai/utils";

import { voidFunction } from "@utils";

export interface IGlobalCodePanelAtom {
  slideIndex: number;
  solutionCode: string;
  nextStepAble: boolean;
  lessonId: string;
  unitId: string;
  courseId: string;
  isFullScreenView: boolean;
  isAllColumnsVisible: boolean;
  fullScreenOpen: () => void;
  fullScreenClose: () => void;
}

export const globalCodePanelAtom = atomWithStorage<IGlobalCodePanelAtom>(
  "GLOBAL_CODE_PANEL_ATOM",
  {
    slideIndex: 0,
    solutionCode: "",
    lessonId: "",
    unitId: "",
    courseId: "",
    nextStepAble: true,
    isAllColumnsVisible: true,
    isFullScreenView: false,
    fullScreenOpen: voidFunction,
    fullScreenClose: voidFunction,
  }
);
