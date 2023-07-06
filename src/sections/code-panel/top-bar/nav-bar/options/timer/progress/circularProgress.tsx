import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useStyles } from "./styles";

interface Props {
  min: number;
  pause: boolean;
  setFinish?: () => void;
  width: number;
  height: number;
  delay: number;
  time?: number;
  open?: boolean;
}
export const CircularProgressWithLabel = ({
  min,
  pause,
  setFinish,
  width,
  height,
  delay,
  time,
}: Props) => {
  const [delayAnim, setDelayAnim] = React.useState(0);

  useEffect(() => {
    setDelayAnim(delay - performance.now());
  }, []);

  const classes = useStyles({
    min,
    pause,
    width,
    height,
    delay: delayAnim,
  });

  return (
    <Box position="relative" display="inline-flex">
      <div className={classes.box}>
        <svg viewBox="22 22 44 44">
          <circle
            className={classes.circleAfter}
            cx="44"
            cy="44"
            r="20.2"
            fill="none"
            strokeWidth="4"
          />
          <circle
            onAnimationEnd={setFinish}
            className={classes.circleBefore}
            cx="44"
            cy="44"
            r="20.2"
            fill="none"
            strokeWidth="3.6"
          />
        </svg>
      </div>
      {time ? (
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="body1" classes={{ root: classes.minutesNumber }}>
            {time}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};
