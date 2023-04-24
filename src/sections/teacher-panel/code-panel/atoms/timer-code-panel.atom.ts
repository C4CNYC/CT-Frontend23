import { atomWithStorage } from "jotai/utils";

interface ITimerAtom {
  isTimerRunning: boolean;
  initialValue: number;
  dateStarted: Date | null;
}

export const timerCodePanelAtom = atomWithStorage<ITimerAtom>(
  "TIMER_CODE_PANEL_ATOM",
  {
    isTimerRunning: true,
    initialValue: 60,
    dateStarted: null,
  }
);
