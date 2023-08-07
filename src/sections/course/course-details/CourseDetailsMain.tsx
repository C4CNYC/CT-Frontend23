import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/system";

import { Unit } from "src/redux/interfaces/challenges.interface";

import CourseDescription from "./CourseDescription";
import TrainingsList from "./TrainingsList";
import QuizPanel from "./quiz-panel";

interface ICourseDetailsMainProps {
  dataLessons: Unit;
  index: number;
}

export default function CourseDetailsMain({
  dataLessons,
  index,
}: ICourseDetailsMainProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ml: "33px",
        background: "#fff",
        borderRadius: 3,
        px: 3,
        pb: 4,
        pt: 3,
        [theme.breakpoints.down(850)]: {
          display: "none",
        },
      }}
    >
      <CourseDescription
        name={dataLessons.name}
        desc={dataLessons.description ?? ""}
        index={index}
      />
      <Stack
        sx={{
          gap: 3,
          flexDirection: "row",
          display: "flex",
          [theme.breakpoints.down(1400)]: {
            flexDirection: "column",
          },
        }}
      >
        <TrainingsList lessons={dataLessons.lessons} unitId={dataLessons.id} />
        <QuizPanel lessons={dataLessons.lessons} />
      </Stack>
    </Box>
  );
}
