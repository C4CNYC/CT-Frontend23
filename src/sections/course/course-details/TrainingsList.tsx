import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";

import { BaseResponseInterface } from "@utils";
import { ILesson } from "src/redux/interfaces/content.interface";

import TrainingsItem from "./training-item";

interface ITrainingsListProps {
  lessons?: Array<ILesson & BaseResponseInterface>;
  unitId: string;
}

export default function TrainingsList({
  lessons,
  unitId,
}: ITrainingsListProps): React.ReactElement {
  return (
    <Stack spacing={2}>
      {lessons?.map((lesson) => (
        <TrainingsItem key={lesson.id} lesson={lesson} unitId={unitId} />
      ))}
    </Stack>
  );
}
