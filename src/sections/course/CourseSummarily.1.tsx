import { AiOutlineClockCircle } from "react-icons/ai";
import { MdCelebration } from "react-icons/md";

import { Box, Stack, Typography } from "@mui/material";

interface ICourseSummarilyProps {
  duration: string;
  level: string;
  lessonsCount: number;
}

export default function CourseSummarily({
  duration,
  level,
  lessonsCount,
}: ICourseSummarilyProps): React.ReactElement {
  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        py: 2,
        gap: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AiOutlineClockCircle size="15px" style={{ marginBottom: "3px" }} />
        <Typography variant="body1" ml={1}>
          9 Hours
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AiOutlineClockCircle size="15px" style={{ marginBottom: "3px" }} />
        <Typography variant="body1" sx={{ ml: 1, textTransform: "capitalize" }}>
          Grade {level}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <MdCelebration size="18px" style={{ marginBottom: "4px" }} />
        <Typography variant="body1" sx={{ ml: 1 }}>
          {lessonsCount} {`Training${lessonsCount !== 1 ? "s" : ""}`}
        </Typography>
      </Box>
    </Stack>
  );
}
