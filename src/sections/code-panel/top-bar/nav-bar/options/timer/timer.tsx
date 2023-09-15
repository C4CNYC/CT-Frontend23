import React, { useEffect, useRef, useState } from "react";

import { MdOutlineTimer } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import {
  IconButton,
  InputBase,
  Popover,
  PopoverVirtualElement,
  Stack,
  Typography,
} from "@mui/material";

import TimerButton from "./button/timer-button";
import { CircularProgressWithLabel } from "./progress/circularProgress";
import { useStyles } from "./styles";

interface Props {
  mobile: boolean;
}

const Timer = ({ mobile }: Props): React.ReactElement => {
  const classes = useStyles({ mobile });
  const [minutes, setMinutes] = useState(1);
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
  const timerIdRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(
    () => () => {
      // @ts-expect-error old code
      clearInterval(timerIdRef);
    },
    []
  );

  const onStartClick = (): void => {
    if (minutes >= 1) {
      setStart(true);
      timeRef.current = minutes * 60;
      setTime(minutes);
      setAnimationsStart(performance.now());
      // @ts-expect-error old code
      timerIdRef.current = setInterval(() => {
        if (!pauseRef.current) {
          timeRef.current -= 1;
          if (timeRef.current <= 0) {
            // @ts-expect-error old code
            clearInterval(timerIdRef);
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

  const timerHandler = (e: { currentTarget: Element }): void => {
    setTimerAnchorEl(e.currentTarget);
    setOpenTimer((state) => !state);
  };

  const onTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    // @ts-expect-error expecting new element
    if (value > 60) {
      setMinutes(60);
      // @ts-expect-error expecting new element
    } else if (value < 0) {
      setMinutes(0);
    } else {
      // @ts-expect-error expecting new element
      setMinutes(value);
    }
  };

  return (
    <span>
      <IconButton
        onClick={timerHandler}
        classes={{ root: classes.menuButton }}
        aria-label="Timer"
        size="large"
      >
        {start && !finish ? (
          <CircularProgressWithLabel
            width={mobile ? 24 : 30}
            height={mobile ? 24 : 30}
            min={minutes}
            pause={pause}
            delay={animationsStart}
            setFinish={setFinishTimer}
          />
        ) : (
          <MdOutlineTimer size={22} />
        )}
      </IconButton>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={timerAnchorEl}
        open={openTimer}
        onClose={onCloseClick}
        PaperProps={{
          classes: { root: classes.paper },
        }}
      >
        <Stack
          direction="column"
          classes={{ root: classes.container }}
          alignItems="center"
          justifyContent="space-around"
        >
          {!start && !finish ? (
            <Stack direction="column" alignItems="center">
              <InputBase
                type="number"
                value={minutes}
                onChange={onTimeInputChange}
                classes={{ root: classes.inputNumber }}
              />
              <Typography variant="body1" classes={{ root: classes.textHint }}>
                {String(minutes) === "1" ? "Minute" : "Minutes"}
              </Typography>
            </Stack>
          ) : start && !finish ? (
            <Stack direction="column" alignItems="center">
              <CircularProgressWithLabel
                width={112}
                height={112}
                min={minutes}
                pause={pause}
                delay={animationsStart}
                open={openTimer}
                time={time}
              />
              <Typography variant="body1" classes={{ root: classes.textHint }}>
                {String(minutes) === "1" ? "Minute" : "Minutes"}
              </Typography>
            </Stack>
          ) : (
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                variant="body1"
                classes={{ root: classes.finishText }}
              >
                Great Job! High-five!
              </Typography>
              <img
                src="https://i.giphy.com/l4HogV6533Je2oG40.gif"
                width="150px"
                height="130px"
                alt="Your GIF"
              />
            </Stack>
          )}
          {!start && !finish ? (
            <Stack
              direction="row"
              gap={2}
              mt={2}
              justifyContent="space-between"
            >
              <TimerButton
                text="CANCEL"
                color="#C4C4C4"
                onClick={onCloseClick}
              />
              <TimerButton
                text="START"
                color="#43D4DD"
                disabled={minutes < 1}
                onClick={onStartClick}
              />
            </Stack>
          ) : start && !finish ? (
            <Stack
              direction="row"
              gap={2}
              mt={2}
              justifyContent="space-between"
            >
              {pause ? (
                <TimerButton
                  text="RESUME"
                  color="#C4C4C4"
                  onClick={onResumeClick}
                />
              ) : (
                <TimerButton
                  text="PAUSE"
                  color="#C4C4C4"
                  onClick={onPauseClick}
                />
              )}
              <TimerButton
                text="KEEP CODING"
                color="#000000"
                onClick={onKeepCodingClick}
              />
            </Stack>
          ) : (
            <Stack direction="row" gap={2} justifyContent="space-between">
              <TimerButton
                text="CLOSE"
                color="#C4C4C4"
                onClick={onCloseClick}
              />
              <TimerButton
                text="RESTART"
                color="#43D4DD"
                onClick={onRestartClick}
              />
            </Stack>
          )}
        </Stack>
        <IconButton
          className={classes.closeButton}
          onClick={start ? onKeepCodingClick : onCloseClick}
        >
          <RxCross2 size={25} />
        </IconButton>
      </Popover>
    </span>
  );
};

export default Timer;
