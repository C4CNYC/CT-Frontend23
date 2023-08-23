import { Dispatch, SetStateAction } from "react";

import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Image } from "@components";
import { Unit } from "src/redux/interfaces/challenges.interface";

import CourseInfoDialog from "../CourseInfoDialog";
import ImageLightBox from "./ImageLightBox";
import ModuleProgress from "./ModuleProgress";

interface IModuleSectionProps {
  index: number;
  active?: boolean;
  setActive: Dispatch<SetStateAction<number>>;
  unit: Unit;
  lastItem: boolean;
}

export default function ModuleSection({
  active = false,
  index,
  setActive,
  unit,
  lastItem,
}: IModuleSectionProps): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1050));

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
        background: "#fff",
        borderRadius: !active || !isDesktop ? "30px" : "30px 0 0 30px",
        maxWidth: "645px",
        height: "220px",
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
      <ImageLightBox image={"/assets/projects/bg1.png"}>
        <Box
          sx={{
            flexShrink: "0",
            borderRadius: "30px 30px 0 30px",
            overflow: "hidden",
            width: "150px",
            height: "100%",
            background:
              'no-repeat url("/assets/projects/bg1.png") center / cover',
            position: "relative",
            [theme.breakpoints.down(1050)]: {
              width: "100px",
            },
            [theme.breakpoints.down(450)]: {
              width: "50px",
            },
          }}
        />
      </ImageLightBox>
      <Stack
        sx={{
          p: 2,
          pr: 3,
          maxWidth: "600px",
          justifyContent: "space-between",
        }}
      >
        <ModuleProgress progress={60} />
        <Box>
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
          <Typography variant="body1">
            {unit.description && unit.description?.length > 85
              ? `${unit.description.slice(0, 80)} ...`
              : unit.description}
          </Typography>
        </Box>
        <Button
          sx={{
            display: "inline-flex",
            alignSelf: "flex-start",
            gap: 1,
            color: "#364954",
            "&:hover": {
              background: "none",
            },
          }}
          variant="text"
          onClick={(e) => {
            if (isDesktop) {
              e.stopPropagation();
            }
            setActive(index);
          }}
        >
          {active ? "Get Coding" : "Start"}{" "}
          <HiOutlineArrowNarrowRight size={24} />
        </Button>
      </Stack>
      {isDesktop && (
        <Box
          sx={{
            display: active ? "block" : "none",
            content: '""',
            position: "absolute",
            right: -50,
            top: -50,
            height: "320px",
            background: "red",
            width: "50px",
            overflow: "hidden",
            bgcolor: "#fff",
            "&:before": {
              content: '""',
              position: "absolute",
              top: -50,
              left: -50,
              width: "100px",
              height: "100px",
              borderRadius: "50px",
              background: "#ECF4FF",
            },
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -50,
              left: -50,
              width: "100px",
              height: "100px",
              borderRadius: "50px",
              background: "#ECF4FF",
            },
          }}
        />
      )}
    </Stack>
  );
}
