import { type FC } from "react";

import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const LoadingCodeEditor: FC = () => {
  return (
    <Stack sx={STACK_SX} direction="row" flexWrap="wrap" pl="20px" pt="5px">
      {Array(getRandomNumber(60, 200))
        .fill(null)
        .map((el, i) => (
          <Skeleton
            key={i + 7}
            variant="text"
            animation="pulse"
            sx={{
              width: `${getRandomNumber(10, 100)}px`,
              height: "18px",
              mb: "2px",
              mr: `${getRandomNumber(2, 8)}px`,
            }}
          />
        ))}
      <Skeleton />
    </Stack>
  );
};

const STACK_SX = {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  background: "white",
  zIndex: 1,
};

export default LoadingCodeEditor;
