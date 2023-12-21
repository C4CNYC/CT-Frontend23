// node modules
import { type FC } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

// @mui
import {
  IconButton,
  InputBase,
  Popover,
  Stack,
  Typography,
} from "@mui/material";

// components
import TimerButton from "./button/timer-button";
import { CircularProgressWithLabel } from "./progress";

// local files
import {
  CIRCULAR_PROGRESS_WIDTH,
  RX_CROSS_SIZE,
  MIN_GAP,
  POPOVER_TRANSFORM_ORIGIN,
  POPOVER_ANCHOR_ORIGIN,
  PROGRESS_LABEL_MOBILE_SIZE,
  PROGRESS_LABEL_DESKTOP_SIZE,
  PAROGRESS_LABEL_FONT_SIZE,
  OUTLINE_TIMER_SIZE
} from "./constants"
import { useTimer, DEFAULT_MINUTES } from "./useTimer.hook";
import { useStyles } from "./styles";

interface TimerProps {
  mobile?: boolean;
}

const Timer: FC<TimerProps> = ({ mobile = false }) => {
  const classes = useStyles({ mobile });

  const {
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
  } = useTimer()

  const isTimerStartButtonDisabled = minutes < DEFAULT_MINUTES
  const minuteTitle = minutes === DEFAULT_MINUTES ? "Minute" : "Minutes"
  const labelSize = mobile
    ? PROGRESS_LABEL_MOBILE_SIZE
    : PROGRESS_LABEL_DESKTOP_SIZE

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
            width={labelSize}
            height={labelSize}
            fontSize={PAROGRESS_LABEL_FONT_SIZE}
            min={minutes}
            pause={pause}
            delay={animationsStart}
            setFinish={setFinishTimer}
          />
        ) : (
          <MdOutlineTimer size={OUTLINE_TIMER_SIZE} />
        )}
      </IconButton>
      <Popover
        anchorOrigin={POPOVER_ANCHOR_ORIGIN}
        transformOrigin={POPOVER_TRANSFORM_ORIGIN}
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
                {minuteTitle}
              </Typography>
            </Stack>
          ) : start && !finish ? (
            <Stack direction="column" alignItems="center">
              <CircularProgressWithLabel
                width={CIRCULAR_PROGRESS_WIDTH}
                height={CIRCULAR_PROGRESS_WIDTH}
                min={minutes}
                pause={pause}
                delay={animationsStart}
                open={openTimer}
                time={time}
              />
              <Typography variant="body1" classes={{ root: classes.textHint }}>
                {minuteTitle}
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
              gap={MIN_GAP}
              mt={MIN_GAP}
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
                disabled={isTimerStartButtonDisabled}
                onClick={onStartClick}
              />
            </Stack>
          ) : start && !finish ? (
            <Stack
              direction="row"
              gap={MIN_GAP}
              mt={MIN_GAP}
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
            <Stack direction="row" gap={MIN_GAP} justifyContent="space-between">
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
          <RxCross2 size={RX_CROSS_SIZE} />
        </IconButton>
      </Popover>
    </span>
  );
};

export default Timer;
