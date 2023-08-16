import { Dispatch, SetStateAction } from "react";

import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Unit } from "src/redux/interfaces/challenges.interface";

import CourseInfoDialog from "./CourseInfoDialog";

interface ICourseCardProps {
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
}: ICourseCardProps): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(850));

  if (!unit) {
    return <Typography variant="h3">Course is empty</Typography>;
  }

  return (
    <Stack
      onClick={() => {
        if (!active) {
          setActive(index);
        }
      }}
      direction="row"
      sx={{
        height: "250px",
        background: "#fff",
        borderRadius: !active || !isDesktop ? "30px" : "30px 0 0 30px",
        maxWidth: "645px",
        position: "relative",
        zIndex: 5,
        "&:hover": {
          cursor: active ? "" : "pointer",
        },
        [theme.breakpoints.down(600)]: {
          height: "auto",
        },
      }}
    >
      <Box
        sx={{
          background: 'url("/assets/projects/bg1.png") center no-repeat',
          minWidth: "125px",
          [theme.breakpoints.down(500)]: {
            minWidth: "0",
          },
        }}
      />
      <Box
        sx={{
          p: 2,
          pr: 3,
          maxWidth: "600px",
        }}
      >
        <Typography
          variant="h4"
          noWrap
          sx={{
            width: "350px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordWrap: "break-word",
            [theme.breakpoints.down(1400)]: {
              width: "250px",
            },
          }}
        >
          {unit.name}
        </Typography>
        <Typography
          variant="body1"
          height="100px"
          sx={{
            height: "100px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box !important",
            "-webkit-line-clamp": "4",
            "-webkit-box-orient": "vertical",
            whiteSpace: "normal",
            [theme.breakpoints.down(500)]: {
              "-webkit-line-clamp": "5",
            },
          }}
        >
          {unit.description}
        </Typography>
        <Stack direction="row" sx={{ mt: "25px", alignItems: "center" }}>
          <CourseInfoDialog unit={unit} index={index}>
            <Button
              sx={{
                display: active && isDesktop ? "none" : "inline-flex",
                color: "#364954",
                border: "2px solid #364954",
                borderRadius: 3,
                fontSize: "1.2rem",
              }}
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
      {isDesktop && (
        <Box
          sx={{
            display: active ? "block" : "none",
            content: '""',
            position: "absolute",
            right: -50,
            top: -42,
            height: !lastItem ? "330px" : "292px",
            background: "#fff",
            width: "65px",
            overflow: "hidden",
          }}
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
      )}
    </Stack>
  );
}
