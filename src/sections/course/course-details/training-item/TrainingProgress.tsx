import { Box, LinearProgress, Stack } from "@mui/material";

interface ITrainingProgressProps {
  progress: number;
}

export default function TrainingProgress({
  progress,
}: ITrainingProgressProps): React.ReactElement {
  return (
    <Stack sx={{ position: "relative", mb: 1 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          "& .MuiLinearProgress-bar": {
            background: "#454F5B",
            //background: "linear-gradient(150deg,#61F3F3,#00B8D9)",
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
            backgroundImage: "url(/assets/code-panel/compleate.svg)",
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
