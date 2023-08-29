import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

import { ILesson } from "src/redux/interfaces/content.interface";

import QuizItem from "./QuizItem";

interface IQuizItemsListProps {
  lesson: ILesson;
}

export default function QuizItemsList({
  lesson,
}: IQuizItemsListProps): React.ReactElement {
  return (
    <>
      <Typography variant="h6" fontWeight={500} gutterBottom>
        {lesson.name}
      </Typography>
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mb: 2 }}>
        {lesson?.skills?.map((skill) => (
          <QuizItem
            key={skill.id}
            name={skill.name}
            description={skill.description}
          />
        ))}
      </Stack>
    </>
  );
}
