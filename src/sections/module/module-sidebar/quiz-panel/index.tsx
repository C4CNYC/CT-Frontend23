import { BiLockOpenAlt } from "react-icons/bi";

import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

import { ILesson } from "src/redux/interfaces/content.interface";

import QuizItemsList from "./QuizItemsList";

interface IQuizPanelProps {
  lessons: ILesson[];
}

export default function QuizPanel({
  lessons,
}: IQuizPanelProps): React.ReactElement {
  const theme = useTheme();
  return (
    <Box>
      <Stack
        sx={{
          borderRadius: "20px",
          background: "#364954",
          p: 2,
          color: "#fff",
          [theme.breakpoints.down(1400)]: {
            maxWidth: "none",
          },
        }}
      >
        <Stack
          direction="row"
          sx={{
            border: "1px solid #75CF6D",
            borderRadius: "30px",
            justifyContent: "center",
            px: 1,
            py: 0.5,
            width: "110px",
            mb: 2,
          }}
        >
          <Typography variant="body1"> SKILLS</Typography>
          <BiLockOpenAlt size={20} style={{ marginLeft: "8px" }} />
        </Stack>
        <Stack>
          {lessons.map((lesson) => (
            <QuizItemsList key={lesson.id} lesson={lesson} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
