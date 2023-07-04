import { Box, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

interface Props {
  name: string;
  desc: string;
  index: number;
}

export default function CourseDescription({
  name,
  desc,
  index,
}: Props): React.ReactElement {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={(theme) => ({
        pt: "20px",
        pl: "30px",
        justifyContent: "space-between",
        [theme.breakpoints.down(1650)]: {
          pl: 0,
        },
        [theme.breakpoints.down(680)]: {
          flexWrap: "wrap",
          gap: 2,
        },
      })}
    >
      <Box>
        <Typography
          variant="h3"
          sx={(theme) => ({
            [theme.breakpoints.down(1500)]: {
              fontSize: "25px",
            },
            [theme.breakpoints.down(600)]: {
              fontSize: "20px",
            },
          })}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={(theme) => ({
            fontSize: "20px",
            width: "461px",
            [theme.breakpoints.down(1500)]: {
              fontSize: "15px",
              maxWidth: "300px",
            },
            [theme.breakpoints.down(600)]: {
              fontSize: "12px",
            },
          })}
        >
          {desc}
        </Typography>
      </Box>
      <Box
        sx={(theme) => ({
          background: "#F0EEEE",
          borderRadius: "20px",
          boxShadow: "3px 4px 4px 0px #00000026",
          p: "12px 35px 20px",
          height: "fit-content",
          [theme.breakpoints.down(1500)]: {
            p: "12px 20px 10px",
          },
          [theme.breakpoints.down(600)]: {
            width: "100%",
            p: "12px 20px 20px",
          },
        })}
      >
        <Typography
          variant="h6"
          sx={(theme) => ({
            color: "#364954",
            fontSize: "18px",
            mb: "14px",
            [theme.breakpoints.down(600)]: {
              fontSize: "14px",
            },
          })}
        >
          AUTHOR
        </Typography>
        <Stack
          direction="row"
          sx={(theme) => ({
            [theme.breakpoints.down(1500)]: {
              pl: "0",
            },
          })}
        >
          <Avatar
            alt="Jason"
            src="/static/images/avatar/1.jpg"
            sx={(theme) => ({
              width: "61px",
              height: "61px",
              border: "2px solid #EE467A",
              mr: 3,
              [theme.breakpoints.down(1500)]: {
                width: "61px",
                height: "61px",
              },
            })}
          />
          <Box>
            <Typography
              noWrap
              variant="subtitle1"
              maxWidth="150px"
              sx={(theme) => ({
                my: "5px",
                fontSize: "16px",
                whiteSpace: "nowrap",
                [theme.breakpoints.down(600)]: {
                  fontSize: "12px",
                },
              })}
            >
              Jason Doe
            </Typography>
            <Typography
              noWrap
              maxWidth="150px"
              variant="body1"
              sx={(theme) => ({
                my: "5px",
                fontSize: "16px",
                whiteSpace: "nowrap",
                [theme.breakpoints.down(600)]: {
                  fontSize: "12px",
                },
              })}
            >
              john@gmail.com
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
