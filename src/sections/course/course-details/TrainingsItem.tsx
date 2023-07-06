import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { PATH_DASHBOARD } from "@routes/paths";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineClockCircle } from "react-icons/ai";
import { ILessonCurrent } from "src/redux/interfaces/content.interface";

interface Props {
  lesson: ILessonCurrent;
  index: number;
  unitId: string;
}

export default function TrainingsItem({
  lesson,
  index,
  unitId,
}: Props): React.ReactElement {
  const courseId = useRouter().query.id;
  return (
    <Box
      sx={(theme) => ({
        borderRadius: "20px",
        p: "13px 30px 13px 20px",
        bgcolor: "#F8FFF7",
        minHeight: "150px",
        [theme.breakpoints.down(680)]: {
          maxWidth: "none",
        },
      })}
    >
      <Stack
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          [theme.breakpoints.down(480)]: {
            flexWrap: "wrap",
          },
        })}
      >
        <Stack>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={(theme) => ({
                py: "5px",
                [theme.breakpoints.down(1500)]: {
                  fontSize: "22px",
                },
                [theme.breakpoints.down(600)]: {
                  fontSize: "18px",
                },
              })}
            >
              {index + 1}. {lesson.name}
            </Typography>
            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                [theme.breakpoints.down(480)]: {
                  mb: "10px",
                  ml: "10px",
                },
              })}
            >
              <Box
                sx={(theme) => ({
                  width: "25px",
                  height: "25px",
                  display: "flex",
                  alignItems: "center",
                  [theme.breakpoints.down(1700)]: {
                    width: "20px",
                    height: "20px",
                  },
                  [theme.breakpoints.down(600)]: {
                    width: "15px",
                    height: "15px",
                  },
                })}
              >
                <AiOutlineClockCircle size="100%" />
              </Box>
              <Typography
                variant="body2"
                sx={(theme) => ({
                  fontSize: "17px",
                  ml: "10px",
                  [theme.breakpoints.down(1700)]: {
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    ml: "5px",
                  },
                  [theme.breakpoints.down(600)]: {
                    fontSize: "12px",
                  },
                })}
              >
                20 mins
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="body1"
            gutterBottom
            sx={(theme) => ({
              pb: "5px",
              [theme.breakpoints.down(1500)]: {
                fontSize: "15px",
              },
              [theme.breakpoints.down(600)]: {
                fontSize: "12px",
              },
            })}
          >
            {lesson.description}
          </Typography>
          <Button
            component={Link}
            href={`${PATH_DASHBOARD.codePanel.workSpace(
              courseId as string
            )}?${unitId}&${lesson.id}`}
            variant="outlined"
            sx={(theme) => ({
              color: "#364954",
              alignSelf: "flex-end",
              fontSize: "20px",
              fontWeight: 400,
              p: "0px 20px",
              [theme.breakpoints.down(1700)]: {
                fontSize: "18px",
              },
              [theme.breakpoints.down(600)]: {
                fontSize: "14px",
              },
            })}
          >
            START
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
