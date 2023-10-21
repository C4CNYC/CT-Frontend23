import { useEffect, useRef, useState } from "react";

import { type PopoverVirtualElement } from "@mui/material";

type VoidFunctions = "setFinishTimer"
  | "onResumeClick"
  | "onPauseClick"
  | "onRestartClick"
  | "onCloseClick"
  | "onKeepCodingClick"
  | "onKeepCodingClick"
  | "onStartClick";

interface TimeHandlerEvent {
  currentTarget: Element
}

interface UseTimerReturn extends Record<VoidFunctions, (() => void)> {
  onTimeInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  timerHandler: (e: TimeHandlerEvent) => void
  timerAnchorEl: null | Element | PopoverVirtualElement
  finish: boolean
  openTimer: boolean
  animationsStart: number
  time: number
  start: boolean
  minutes: number
  pause: boolean
}

export const DEFAULT_MINUTES = 1

export const useTimer = (): UseTimerReturn => {
  const [minutes, setMinutes] = useState(DEFAULT_MINUTES);
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [pause, setPause] = useState(false);
  const [timerAnchorEl, setTimerAnchorEl] = useState<
    null | Element | PopoverVirtualElement
  >(null);
  const [openTimer, setOpenTimer] = useState(false);
  const [delay, setDelay] = useState(0);
  const [animationsStart, setAnimationsStart] = useState(0);
  const [time, setTime] = useState(0);

  const pauseRef = useRef(false);
  const timerIdRef = useRef<NodeJS.Timeout>();
  const timeRef = useRef(0);

  useEffect(() => {
    return () => {
      clearInterval(timerIdRef.current);
    }
  }, []);

  const onStartClick = (): void => {
    if (minutes >= 1) {
      setStart(true);
      timeRef.current = minutes * 60;
      setTime(minutes);
      setAnimationsStart(performance.now());
      timerIdRef.current = setInterval(() => {
        if (!pauseRef.current) {
          timeRef.current -= 1;
          if (timeRef.current <= 0) {
            clearInterval(timerIdRef.current);
          } else setTime(Math.ceil(timeRef.current / 60));
        }
      }, 1000);
    }
  };

  const onKeepCodingClick = (): void => {
    setOpenTimer(false);
    if (start && pause) {
      setAnimationsStart((state) => state + (performance.now() - delay));
      setDelay(performance.now());
    }
  };

  const onCloseClick = (): void => {
    setOpenTimer(false);
  };

  const onRestartClick = (): void => {
    setStart(false);
    setFinish(false);
    setPause(false);
  };

  const onPauseClick = (): void => {
    setPause(true);
    setDelay(performance.now());
    pauseRef.current = true;
  };

  const onResumeClick = (): void => {
    setPause(false);
    setAnimationsStart((state) => state + (performance.now() - delay));
    pauseRef.current = false;
  };

  const setFinishTimer = (): void => {
    setFinish(true);
    setOpenTimer(true);
  };

  const timerHandler = (e: TimeHandlerEvent): void => {
    setTimerAnchorEl(e.currentTarget);
    setOpenTimer((state) => !state);
  };

  const onTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const number = Number(value)

    if (isNaN(number)) {
      return
    }

    if (number > 60) {
      setMinutes(60);
    } else if (number < 0) {
      setMinutes(0);
    } else {
      setMinutes(number);
    }
  };

  return {
    onTimeInputChange,
    timerHandler,
    setFinishTimer,
    onResumeClick,
    onPauseClick,
    onRestartClick,
    onCloseClick,
    onKeepCodingClick,
    onStartClick,
    timerAnchorEl,
    finish,
    openTimer,
    animationsStart,
    time,
    start,
    minutes,
    pause
  }
}
