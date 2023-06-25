import { atomWithStorage } from "jotai/utils";

export interface ILessonViewAtom {
  isFullScreenView: boolean;
  isAllColumnsVisible: boolean;
  fullScreenOpen: () => void;
  fullScreenClose: () => void;
}

export const lessonViewAtom = atomWithStorage<ILessonViewAtom>(
  "LESSON_VIEW_ATOM",
  {
    isAllColumnsVisible: true,
    isFullScreenView: false,
    fullScreenOpen: () => {},
    fullScreenClose: () => {},
  }
);
