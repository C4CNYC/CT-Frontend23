import { BiLockOpenAlt } from "react-icons/bi";

import { 
  Box, 
  Stack, 
  Button, 
  Typography,
} from "@mui/material";

import QuizItemsList from "./QuizItemsList";
import { ILesson } from "src/redux/interfaces/content.interface";

interface Props {
  lessons: ILesson[];
}

export default function QuizPanel({ lessons }: Props): React.ReactElement {
  return (
    <Box>
      <Stack
        sx={(theme) => ({
          mt: "68px",
          borderRadius: "20px",
          background: "#364954",
          p: "11px 12px 25px 28px",
          color: "#fff",
          maxWidth: "276px",
          height: "fit-content",
          [theme.breakpoints.down(1500)]: {
            p: "11px 12px 25px 15px",
            ml: "10px",
          },
          [theme.breakpoints.down(715)]: {
            maxWidth: "none",
            ml: 0,
          },
        })}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            sx={(theme) => ({
              fontWeight: 400,
              mr: "85px",
              [theme.breakpoints.down(1500)]: { fontSize: "20px" },
              [theme.breakpoints.down(600)]: { fontSize: "16px" },
            })}
          >
            Skills
          </Typography>
          <Button
            variant="outlined"
            sx={(theme) => ({
              color: "#fff",
              border: "1px solid #75CF6D",
              borderRadius: "30px",
              fontWeight: 400,
              fontSize: "16px",
              [theme.breakpoints.down(600)]: { fontSize: "12px" },
            })}
          >
            Quiz
            <Box
              sx={(theme) => ({
                height: "20px",
                width: "20px",
                ml: "5px",
                display: "flex",

                [theme.breakpoints.down(600)]: {
                  height: "15px",
                  width: "15px",
                },
              })}
            >
              <BiLockOpenAlt size="100%" />
            </Box>
          </Button>
        </Stack>
        <Stack spacing={2}>
          {lessons.map((lesson) => (
            <QuizItemsList key={lesson.id} lesson={lesson} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
