import Iconify from "@components/iconify";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import MenuPopover from "@components/menu-popover";
import {
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import { useAtom } from "jotai";
import { SetStateAction, useState } from "react";
import { timerCodePanelAtom } from "src/atoms/time-code-panel.atom";
const TimerPopup = (): React.ReactElement => {
  const [openPopover, setOpenPopover] = useState(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [{ isTimerRunning, initialValue }, setTimerAtom] =
    useAtom(timerCodePanelAtom);

  const handleOpenPopover = (
    event: React.SyntheticEvent<SetStateAction<any>>
  ): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const onStartPlaying = (): void => {
    setTimerAtom((prev) => ({
      ...prev,
      isTimerRunning: true,
      dateStarted: new Date(),
    }));
  };

  const onStopPlaying = (): void => {
    // setIsPlaying(false);
    setTimerAtom((prev) => ({
      ...prev,
      isTimerRunning: false,
    }));
  };

  const onResetPlaying = (): void => {
    setTimerAtom((prev) => ({
      ...prev,
      isTimerRunning: false,
      dateStarted: null,
      initialValue: 60,
    }));
  };
  return (
    <Box>
      <IconButton onClick={handleOpenPopover} sx={{color: "#EAEAEB"}}>
        <Iconify icon="majesticons:door-enter-line" />
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
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
        >
          <svg style={{ height: 0 }}>
            <defs>
              <linearGradient id="timer" x1="1" y1="0" x2="0" y2="0">
                <stop offset="30%" stopColor="#02d3d7" />
                <stop offset="95%" stopColor="#fbdd3f" />
              </linearGradient>
            </defs>
          </svg>

          <CountdownCircleTimer
            isPlaying={isTimerRunning}
            duration={initialValue}
            strokeWidth={9}
            size={130}
            colors="url(#timer)"
            // onUpdate={() => {
            //   isTimerRunning &&
            //   setTimerAtom((prev) => ({
            //     ...prev,
            //     initialValue: timeDiff * 60
            //   }));
            // }}
            onComplete={() => {
              return { shouldRepeat: false };
            }}
          >
            {({ remainingTime, elapsedTime }) => (
              <Box>
                {isTimerRunning ? (
                  <Typography variant="h3">{remainingTime}</Typography>
                ) : (
                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    placeholder="Time"
                    value={Math.floor(initialValue / 60)}
                    sx={{ width: "50px" }}
                    variant="standard"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setTimerAtom((prev) => ({
                        ...prev,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        initialValue: event?.target?.value * 60,
                      }));
                    }}
                  />
                )}
              </Box>
            )}
          </CountdownCircleTimer>
          <Stack mt={1} spacing={2} direction="row" justifyContent="center">
            <IconButton onClick={onResetPlaying}>
              <Iconify width="30px" icon="ic:baseline-restart-alt" />
            </IconButton>
            {isTimerRunning ? (
              <IconButton onClick={onStopPlaying}>
                <Iconify width="30px" icon="ic:round-pause" />
              </IconButton>
            ) : (
              <IconButton
                onClick={onStartPlaying}
                disabled={initialValue === 0}
              >
                <Iconify
                  width="30px"
                  icon="material-symbols:play-arrow-rounded"
                />
              </IconButton>
            )}
          </Stack>
        </Box>
      </MenuPopover>
    </Box>
  );
};

export default TimerPopup;
