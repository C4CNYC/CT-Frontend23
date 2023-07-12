import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

import { ILesson } from "src/redux/interfaces/content.interface";

import QuizItem from "./QuizItem";

interface Props {
  lesson: ILesson;
}

export default function QuizItemsList({ lesson }: Props): React.ReactElement {
  return (
    <Stack>
      <Typography
        variant="h5"
        sx={(theme) => ({
          mb: "8px",
          [theme.breakpoints.down(1500)]: {
            fontSize: "15px",
          },
          [theme.breakpoints.down(600)]: {
            fontSize: "12px",
          },
        })}
      >
        {lesson.name}
      </Typography>
      <Stack direction="row" sx={{ flexWrap: "wrap", pr: "8px" }}>
        {lesson.skills.map((skill) => (
          <QuizItem
            key={skill.id}
            name={skill.name}
            description={skill.description}
          />
        ))}
      </Stack>
    </Stack>
  );
}
