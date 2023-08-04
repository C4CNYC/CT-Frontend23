import { AiOutlineClockCircle } from "react-icons/ai";
import { MdCelebration } from "react-icons/md";

import { Box, Stack, Typography } from "@mui/material";

import { ICourseContent } from "src/redux/interfaces/content.interface";

interface Props {
  data: ICourseContent;
}

export default function CourseSummarily({ data }: Props): React.ReactElement {
  return (
    <Stack
      sx={(theme) => ({
        display: "flex",
        flexDirection: "row",
        p: "20px 30px",
        borderRadius: "25px",
        background: "#EAEAEB",
        maxWidth: "646px",
        ml: "8px",
        justifyContent: "space-between",
        [theme.breakpoints.down(600)]: {
          p: "10px 25px",
          ml: 0,
          flexWrap: "wrap",
          gap: 1,
        },
      })}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textTransform: "capitalize",
        }}
      >
        <AiOutlineClockCircle size="15px" />
        <Typography variant="body1" sx={{ ml: 1 }}>
          9 Hours
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AiOutlineClockCircle size="15px" />
        <Typography variant="body1" sx={{ ml: 1, textTransform: "capitalize" }}>
          {data.level}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <MdCelebration size="18px" />
        <Typography variant="body1" sx={{ ml: 1, textTransform: "capitalize" }}>
          +12 Years
        </Typography>
      </Box>
    </Stack>
  );
}
