import { AiOutlineClockCircle } from "react-icons/ai";
import { MdCelebration } from "react-icons/md";

import { Box, Stack, Typography } from "@mui/material";

import { ICourse } from "@types";
import { useTranslate } from "src/utils/translateHelper";

interface Props {
  course: ICourse;
}

export default function CourseInfo({ course }: Props): React.ReactElement {
  const { price, total_lessons: totalLessons, level } = course;
  const translate = useTranslate();

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        maxWidth: "450px",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AiOutlineClockCircle size="15px" />
        <Typography variant="body2" sx={{ ml: 1 }}>
          9 Hours
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AiOutlineClockCircle size="15px" />
        <Typography variant="body2" sx={{ ml: 1, textTransform: "capitalize" }}>
          {level}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <MdCelebration size="18px" />
        <Typography variant="body2" sx={{ ml: 1 }}>
          {+price.charAt(1) === 0 ? translate("free") : price}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <MdCelebration size="18px" />
        <Typography variant="body2" sx={{ ml: 1 }}>
          {totalLessons}
          {totalLessons && totalLessons > 1
            ? translate("lessons")
            : translate("lesson")}
        </Typography>
      </Box>
    </Stack>
  );
}
