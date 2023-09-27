import { Box, LinearProgress, Stack } from "@mui/material";

interface ILessonProgressProps {
  progress: number;
}

export default function LessonProgress({
  progress,
}: ILessonProgressProps): React.ReactElement {
  return (
    <Stack sx={{ position: "relative", mb: 1 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          "& .MuiLinearProgress-bar": {
            background:
              "background: linear-gradient(135deg, #90F361 0%, #00D9CC 100%);",
          },
          position: "relative",
          background: "#fff",
        }}
      />
      {progress >= 80 ? (
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: "-8px",
            width: "20px",
            height: "20px",
            backgroundColor: "#FFF",
            backgroundImage: "url(/assets/courses/compleated.svg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "14px",
            borderRadius: "50%",
          }}
        />
      ) : null}
    </Stack>
  );
}
