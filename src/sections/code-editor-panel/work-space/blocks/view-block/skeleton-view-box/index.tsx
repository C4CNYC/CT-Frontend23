import { type FC } from "react";
import { Skeleton, Typography } from "@mui/material";
import { Stack } from "@mui/system";

import {
  AVAILABLE_TYP_SX,
  CODING_TYP_SX,
  PARENT_STACK_SX,
  SKELETON_SX,
  STACK_BOTTON_SX
} from "./constants"

const SkeletonViewBlock: FC = () => {
  return (
    <Stack sx={PARENT_STACK_SX} width="100%" height="100vh">
      <Stack
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb="5px"
      >
        <Skeleton height="18px" width="192px" sx={SKELETON_SX} />
        <Stack spacing={1} display="flex" direction="row">
          <Skeleton
            height="13px"
            width="13px"
            variant="circular"
            sx={SKELETON_SX}
          />
          <Skeleton
            height="13px"
            width="13px"
            variant="circular"
            sx={SKELETON_SX}
          />
          <Skeleton
            height="13px"
            width="13px"
            variant="circular"
            sx={SKELETON_SX}
          />
        </Stack>
      </Stack>

      <Stack sx={STACK_BOTTON_SX}>
        <Typography
          sx={AVAILABLE_TYP_SX}
          variant="subtitle1"
        >
          No preview available?
        </Typography>
        <Typography
          variant="subtitle1"
          sx={CODING_TYP_SX}
        >
          That means it’s time to get coding. 🤓
        </Typography>
      </Stack>
    </Stack>
  );
}

export default SkeletonViewBlock;
