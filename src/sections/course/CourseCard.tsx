import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import CourseInfoDialog from "./CourseInfoDialog";
import { Unit } from "src/redux/interfaces/challenges.interface";

interface Props {
  index: number;
  active?: boolean;
  setActive: Dispatch<SetStateAction<number>>;
  unit: Unit;
  lastItem: boolean;
}

export default function CourseCard({
  active = false,
  index,
  setActive,
  unit,
  lastItem,
}: Props): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  if (!unit) {
    return <CircularProgress />;
  }
  return (
    <Stack
      direction="row"
      sx={(theme) => ({
        height: "250px",
        background: "#fff",
        borderRadius: !active ? "30px" : "30px 0 0 30px",
        maxWidth: "740px",
        position: "relative",
        zIndex: 5,
        [theme.breakpoints.down(1250)]: {
          borderRadius: "30px",
        },
        [theme.breakpoints.down(600)]: {
          height: "auto",
        },
      })}
    >
      <Box
        sx={(theme) => ({
          background: 'url("/assets/projects/bg1.png") center no-repeat',
          minWidth: "125px",
          [theme.breakpoints.down(600)]: {
            minWidth: "auto",
            background: "none",
          },
        })}
      />
      <Box
        sx={(theme) => ({
          p: "22px 9px 29px 23px",
          width: "600px",
          [theme.breakpoints.down(1700)]: {
            p: "22px 9px 29px 10px",
            width: "400px",
          },
          [theme.breakpoints.down(1250)]: {},
          [theme.breakpoints.down(500)]: {
            p: "15px 10px 20px 10px",
            width: "100%",
          },
        })}
      >
        <Typography
          variant="h4"
          sx={(theme) => ({
            [theme.breakpoints.down(400)]: {
              fontSize: "16px",
              pb: 1,
            },
          })}
        >
          {unit.name}
        </Typography>
        <Typography
          variant="body2"
          height="100px"
          sx={(theme) => ({
            fontSize: "16px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box !important",
            "-webkit-line-clamp": "4",
            "-webkit-box-orient": "vertical",
            whiteSpace: "normal",
            [theme.breakpoints.down(1700)]: {
              fontSize: "16px",
            },
            [theme.breakpoints.down(500)]: {
              "-webkit-line-clamp": "5",
              fontSize: "13px",
            },
          })}
        >
          {unit.description}
        </Typography>
        <Stack direction="row" sx={{ mt: "25px", alignItems: "center" }}>
          <CourseInfoDialog unit={unit} index={index}>
            <Button
              sx={(theme) => ({
                display: active ? "none" : "inline-flex",
                color: "#364954",
                border: "2px solid #364954",
                borderRadius: "25px",
                width: "150px",
                fontSize: "20px",
                [theme.breakpoints.down(1700)]: {
                  fontSize: "15px",
                  width: "auto",
                },
                [theme.breakpoints.down(1000)]: {
                  fontSize: "12px",
                  display: active ? "inline-flex" : "",
                },
                [theme.breakpoints.down(400)]: {
                  fontSize: "12px",
                },
              })}
              variant="outlined"
              onClick={(e) => {
                if (isDesktop) {
                  e.stopPropagation();
                }
                setActive(index);
              }}
            >
              See more
            </Button>
          </CourseInfoDialog>
        </Stack>
      </Box>
      <Box
        sx={(theme) => ({
          display: active ? "block" : "none",
          content: '""',
          position: "absolute",
          right: -50,
          top: -42,
          height: !lastItem ? "330px" : "292px",
          background: "#fff",
          width: "65px",
          overflow: "hidden",
          [theme.breakpoints.down(1250)]: {
            display: "none",
          },
        })}
      >
        <Box
          sx={{
            position: "relative",
            height: "330px",
            width: "65px",
            "&:before": {
              content: '""',
              position: "absolute",
              top: -148,
              left: -113,
              width: "161px",
              height: "190px",
              borderRadius: "50px",
              background: "#ECF4FF",
            },
            "&:after": !lastItem
              ? {
                  content: '""',
                  position: "absolute",
                  bottom: -152,
                  left: -111,
                  width: "161px",
                  height: "190px",
                  borderRadius: "50px",
                  background: "#ECF4FF",
                }
              : {},
          }}
        />
      </Box>
    </Stack>
  );
}
