import { type FC, useMemo } from "react";

import { Skeleton, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";

import {
  AVAILABLE_TYP_SX,
  CODING_TYP_SX,
  getParentStackSx,
  getSkeletonSx,
  getStackBottonSx,
} from "./constants";

const SkeletonViewBlock: FC = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const skeletonSx = useMemo(() => getSkeletonSx(isLight), [isLight]);
  const parentStackSx = useMemo(() => getParentStackSx(isLight), [isLight]);
  const bottonStackSx = useMemo(
    () => getStackBottonSx(isLight, theme),
    [isLight, theme]
  );

  return (
    <Stack sx={parentStackSx} width="100%" height="100vh">
      <Stack
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb="5px"
        pl="30px"
      >
        <Skeleton height="18px" width="192px" sx={skeletonSx} />
        <Stack spacing={1} display="flex" direction="row">
          <Skeleton
            height="13px"
            width="13px"
            variant="circular"
            sx={skeletonSx}
          />
          <Skeleton
            height="13px"
            width="13px"
            variant="circular"
            sx={skeletonSx}
          />
          <Skeleton
            height="13px"
            width="13px"
            variant="circular"
            sx={skeletonSx}
          />
        </Stack>
      </Stack>

      <Stack sx={bottonStackSx}>
        <Typography sx={AVAILABLE_TYP_SX} variant="subtitle1">
          No preview available?
        </Typography>
        <Typography variant="subtitle1" sx={CODING_TYP_SX}>
          That means it’s time to get coding. 🤓
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SkeletonViewBlock;
