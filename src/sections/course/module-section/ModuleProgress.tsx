import { TbFileCertificate } from "react-icons/tb";

import { Box, LinearProgress, Stack } from "@mui/material";

interface IModuleProgressProps {
  progress: number;
}

export default function ModuleProgress({
  progress,
}: IModuleProgressProps): React.ReactElement {
  return (
    <Stack sx={{ position: "relative", my: 1 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          "& .MuiLinearProgress-bar": {
            background: "#454F5B",
          },
          position: "relative",
          background: "#D9D9E2",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: "-10px",
          width: "25px",
          height: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
          borderRadius: "50%",
          border: "2px solid #D9D9E2",
        }}
      >
        <TbFileCertificate size={15} />
      </Box>
    </Stack>
  );
}
