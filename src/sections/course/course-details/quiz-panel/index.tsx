import { BiLockOpenAlt } from "react-icons/bi";

import { Box, Button, Stack, Typography } from "@mui/material";
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
          mt: "68px",
          borderRadius: "20px",
          background: "#364954",
          px: 2,
          py: 3,
          color: "#fff",
          maxWidth: "300px",
          [theme.breakpoints.down(1400)]: {
            maxWidth: "none",
            mt: 3,
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h4" fontWeight={400}>
            Skills
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              border: "1px solid #75CF6D",
              borderRadius: "30px",
              fontWeight: 400,
            }}
          >
            Quiz
            <BiLockOpenAlt size={18} style={{ marginLeft: "8px" }} />
          </Button>
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
