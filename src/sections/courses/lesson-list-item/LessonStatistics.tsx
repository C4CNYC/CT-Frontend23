import { Box, CircularProgress, Typography } from "@mui/material";

interface ILessonStatistics {
  progress: number;
}

export default function LessonStatistics({
  progress,
}: ILessonStatistics): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
        ml: { xs: 2, sm: 2, md: 2, lg: 4 },
        background: "rgba(255, 171, 0, 0.16)",
        borderRadius: "25px",
        py: { xs: 3, sm: 3, md: 5 },
        px: { xs: 2, sm: 2, md: 3 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          alignSelf: "center",
        }}
      >
        <CircularProgress
          color="warning"
          variant="determinate"
          value={progress < 5 ? 5 : progress}
          size={60}
          thickness={6}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle2">{progress || 0}%</Typography>
        </Box>
      </Box>
    </Box>
  );
}
