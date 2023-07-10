import { Box, Stack } from "@mui/material";

import QuizPanel from "./quiz-panel";
import TrainingsList from "./TrainingsList";
import CourseDescription from "./CourseDescription";
import { Unit } from "src/redux/interfaces/challenges.interface";

interface Props {
  dataLessons: Unit;
  index: number;
}

export default function CourseDetailsMain({
  dataLessons,
  index,
}: Props): React.ReactElement {
  return (
    <Box
      sx={(theme) => ({
        ml: "33px",
        background: "#fff",
        borderRadius: "25px",
        px: "19px",
        pb: "39px",
        display: "block",
        [theme.breakpoints.down(1250)]: {
          display: "none",
        },
      })}
    >
      <CourseDescription
        name={dataLessons.name}
        desc={dataLessons.description ?? ""}
        index={index}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={(theme) => ({
          mt: "10px",
          display: "flex",
          justifyContent: "space-between",
          pl: "30px",
          [theme.breakpoints.down(1650)]: {
            pl: 0,
          },
        })}
      >
        <TrainingsList lessons={dataLessons.lessons} unitId={dataLessons.id} />
        <QuizPanel lessons={dataLessons.lessons} />
      </Stack>
    </Box>
  );
}
