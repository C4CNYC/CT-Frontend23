import { useRouter } from "next/router";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { useGetLessonQuery } from "src/redux/services/manager/lessons-manager";

export default function LessonDetails(): React.ReactElement {
  const { lessonId } = useRouter().query;

  const { data: lesson, isLoading: isLessonLoading } = useGetLessonQuery(
    { id: lessonId as string },
    { skip: !lessonId }
  );

  console.log("lesson", lesson);

  return (
    <Box>
      <Typography variant="h3">Lesson details</Typography>
      <Typography variant="h4">{lesson?.name}</Typography>
      <Typography>{lesson?.description}</Typography>
    </Box>
  );
}
