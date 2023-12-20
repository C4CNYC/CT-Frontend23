import { type FC, useMemo } from "react";

import { Skeleton, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";

import { useTranslate } from "src/utils/translateHelper";

import {
  AVAILABLE_TYP_SX,
  CODING_TYP_SX,
  getParentStackSx,
  getSkeletonSx,
  getStackBottonSx,
} from "./constants";

interface ISkeletonProps {
  isOpenHeader: boolean | undefined;
}

const SkeletonViewBlock: FC<ISkeletonProps> = ({ isOpenHeader }) => {
  const translate = useTranslate();
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const skeletonSx = useMemo(() => getSkeletonSx(isLight), [isLight]);
  const parentStackSx = useMemo(() => getParentStackSx(isLight), [isLight]);
  const bottonStackSx = useMemo(
    () => getStackBottonSx(isLight, theme),
    [isLight, theme]
  );

  return (
    <Stack
      sx={parentStackSx}
      width="100%"
      height={isOpenHeader ? "calc(100% - 34px)" : "100vh"}
    >
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
          {translate("no_preview_available")}
        </Typography>
        <Typography variant="subtitle1" sx={CODING_TYP_SX}>
          {translate("means_time_to_code")} 🤓
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SkeletonViewBlock;
