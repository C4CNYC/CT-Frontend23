import { Stack, Typography } from "@mui/material";
import LessonListItem from "./LesonListItem";

export default function LessonStepList(): React.ReactElement {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom sx={{ pt: 2, pl: 3 }}>
        Lesson Name
      </Typography>
      <Stack direction="column" spacing={3} sx={{ p: 2 }}>
        <LessonListItem />
        <LessonListItem />
        <LessonListItem />
        <LessonListItem />
        <LessonListItem />
        <LessonListItem />
        <LessonListItem />
      </Stack>
    </>
  );
}
