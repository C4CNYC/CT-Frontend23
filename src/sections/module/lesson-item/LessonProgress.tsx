import { Box, LinearProgress, Stack } from "@mui/material";

import { PROGRESS_DOT_SX, getProgressStyles } from "./constants";

interface ILessonProgressProps {
  progress: number;
  locked: boolean;
}

export default function LessonProgress({
  progress,
  locked,
}: ILessonProgressProps): React.ReactElement {
  return (
    <Stack sx={{ position: "relative", mb: 1 }}>
      <LinearProgress
        variant="determinate"
        value={progress < 3 ? 3 : progress}
        sx={getProgressStyles(!locked)}
      />
      {progress >= 80 ? <Box sx={PROGRESS_DOT_SX} /> : null}
    </Stack>
  );
}
