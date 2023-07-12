import { SetStateAction, useEffect, useState } from "react";

import { useTimer } from "react-timer-hook";

import { IconButton, Typography, useMediaQuery } from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";

import { Iconify, MenuPopover } from "@components";

import { TimerInput } from "./TimerInput";

const TimerPopup = (): React.ReactElement => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [isTimerInitial, setIsTimerInitial] = useState<boolean>(true);
  const [inputSeconds, setInputSeconds] = useState<number>(0);
  const [isTimerEnding, setIsTimerEnding] = useState<boolean>(false);
  const [onTimerLoad, setOnTimerLoad] = useState<boolean>(true);
  const expiryTimestamp: Date = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + inputSeconds);
  const { seconds, minutes, hours, isRunning, pause, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      onResetTimer();
      timerEnd();
    },
  });
  useEffect(() => {
    setOnTimerLoad(true);
  }, []);
  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (
    event: React.SyntheticEvent<SetStateAction<any>>
  ): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const onStartPlaying = (): void => {
    setIsTimerEnding(false);
    if (!isTimerInitial) {
      const time: Date = new Date();
      time.setSeconds(time.getSeconds() + seconds + minutes * 60);
      restart(time);
    } else {
      const time: Date = new Date();
      time.setSeconds(time.getSeconds() + inputSeconds);
      restart(time, true);
    }
    setIsTimerInitial(false);
  };

  const onPausePlaying = (): void => {
    pause();
  };

  const onResetTimer = (): void => {
    setIsTimerEnding(false);
    const time: Date = new Date();
    time.setSeconds(time.getSeconds());
    setIsTimerInitial(true);
    setInputSeconds(0);
    restart(time, false);
  };
  const timerEnd = (): void => {
    if (!isTimerEnding && inputSeconds > 0) {
      setIsTimerEnding(true);
    }
  };
  return (
    <Box>
      <IconButton
        onClick={handleOpenPopover}
        className="timerTourMobile"
        sx={{
          "&:hover": { borderRadius: "10px" },
          pl: { xs: 0, sm: "8px" },
          ml: { xs: "-5px", sm: 0 },
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            animation: isTimerEnding ? ".2s linear 0s 1 timerEnd forwards" : "",
            "@keyframes timerEnd": {
              "0%": {
                color: "#637381",
              },
              "100%": {
                color: theme.palette.error.main,
              },
            },
          }}
        >
          {!onTimerLoad ? (
            <Stack direction="row">
              <Typography variant="h6">{hours}h</Typography>
              <Typography variant="h6" sx={{ px: 0.5 }}>
                :
              </Typography>
              <Typography variant="h6">{minutes}m</Typography>
              <Typography variant="h6" sx={{ px: 0.5 }}>
                :
              </Typography>
              <Typography variant="h6">{seconds}s</Typography>
            </Stack>
          ) : (
            <Iconify icon="material-symbols:av-timer-rounded" width={23} />
          )}
        </Box>
      </IconButton>
      <MenuPopover
        arrow={isDesktop ? "top-right" : "top-left"}
        open={openPopover}
        onClose={handleClosePopover}
        sx={{
          width: 200,
          py: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 3,
            py: 1,
          }}
        >
          {isTimerInitial ? (
            <TimerInput
              setInputSeconds={setInputSeconds}
              inputSeconds={inputSeconds}
            />
          ) : (
            <Stack direction="row" sx={{ position: "relative" }}>
              <Typography variant="h4">{minutes}m</Typography>
            </Stack>
          )}
        </Box>
        <Stack mt={1} spacing={2} direction="row" justifyContent="center">
          <IconButton
            onClick={() => {
              onResetTimer();
              setOnTimerLoad(false);
            }}
          >
            <Iconify width="30px" icon="ic:baseline-restart-alt" />
          </IconButton>

          <IconButton disabled={!isRunning} onClick={onPausePlaying}>
            <Iconify width="30px" icon="ic:round-pause" />
          </IconButton>
          <IconButton
            disabled={isRunning}
            onClick={() => {
              onStartPlaying();
              setOnTimerLoad(false);
            }}
          >
            <Iconify width="30px" icon="material-symbols:play-arrow-rounded" />
          </IconButton>
        </Stack>
      </MenuPopover>
    </Box>
  );
};

export default TimerPopup;
