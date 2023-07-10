import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

import TrainingsItem from "./TrainingsItem";
import { BaseResponseInterface } from "@utils";
import { ILesson } from "src/redux/interfaces/content.interface";

interface Props {
  lessons: Array<ILesson & BaseResponseInterface>;
  unitId: string;
}

export default function TrainingsList({
  lessons,
  unitId,
}: Props): React.ReactElement {
  return (
    <Stack sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        mt={3}
        mb={2}
        sx={(theme) => ({
          color: "#43D4DD",
          [theme.breakpoints.down(680)]: {
            mt: 2,
            mb: 3,
          },
        })}
        gutterBottom
      >
        TRAININGS:
      </Typography>
      <Stack spacing={2}>
        {lessons.map((lesson, i) => (
          <TrainingsItem
            key={lesson.id}
            lesson={lesson}
            index={i}
            unitId={unitId}
          />
        ))}
      </Stack>
    </Stack>
  );
}
