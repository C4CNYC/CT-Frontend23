import { GiThreeFriends } from "react-icons/gi";

import { Box, CircularProgress, Typography } from "@mui/material";

import { convertNumber } from "@utils";

interface IModuleStatistics {
  progress: number;
  totalProgress: number;
}

export default function ModuleStatistics({
  progress,
  totalProgress,
}: IModuleStatistics): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
        ml: { xs: 1, sm: 1, md: 2, lg: 4 },
        background: "rgba(54, 179, 126, 0.16)",
        borderRadius: "25px",
        p: { xs: 1, sm: 2, md: 3 },
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <GiThreeFriends size="25px" color="#43D4DD" />
        <Typography
          variant="body1"
          sx={{
            ml: "10px",
          }}
        >
          {convertNumber(totalProgress)}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          alignSelf: "center",
        }}
      >
        <CircularProgress
          color="success"
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
