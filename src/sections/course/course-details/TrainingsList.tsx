import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

import { BaseResponseInterface } from "@utils";
import { ILesson } from "src/redux/interfaces/content.interface";

import TrainingsItem from "./TrainingsItem";

interface ITrainingsListProps {
  lessons: Array<ILesson & BaseResponseInterface>;
  unitId: string;
}

export default function TrainingsList({
  lessons,
  unitId,
}: ITrainingsListProps): React.ReactElement {
  return (
    <Stack>
      <Typography
        variant="h5"
        sx={{
          color: "#43D4DD",
          mt: 2,
          mb: 3,
        }}
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
