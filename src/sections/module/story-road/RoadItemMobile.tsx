import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";

import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";

import {
  DESCRIPTION_GRADIENT_TEXT_SX,
  LESSON_TIME_SX,
  getDescriptionBoxSx,
} from "./constants";

import CompleatedIcon from "../icons/CompleatedIcon";
import RocketIcon from "../icons/RocketIcon";

interface RoadItemMobileProps {
  firstItem: boolean;
  compleated: boolean;
  locked: boolean;
  progress: number;
  lastActive?: boolean;
  lastItem?: boolean;
  name: string;
  description: string;
  lessonId: string;
}

const RoadItemMobile = ({
  compleated,
  locked,
  progress,
  lastActive,
  lastItem,
  name,
  description,
  lessonId,
  firstItem,
}: RoadItemMobileProps) => {
  const theme = useTheme();
  const { query, push } = useRouter();
  const [compleatedColor, setCompleatedColor] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const projectTime = "20 mins";

  const redirectToCodePanel = () => {
    push(
      `${STUDENT_PATH_DASHBOARD.codePanel.workSpace(query.id as string)}?${
        query.unitId
      }&${lessonId}`
    );
  };

  useEffect(() => {
    if (!locked) {
      setCompleatedColor("");
    } else {
      setCompleatedColor("Grey");
    }
  }, [locked]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        height: !lastItem ? "280px" : "100px",
        mt: firstItem ? 0 : "-30px",
        pl: "20px",
        background: !lastItem
          ? `top 65px left 5px / 100px url(/assets/projects/roadMobile${compleatedColor}.svg) no-repeat`
          : "",
      }}
    >
      <svg display="hidden" width={0} height={0}>
        <defs>
          <linearGradient id="compleated" x1="50%" y1="0%" x2="0%" y2="50%">
            <stop offset="0%" stopColor={"#1675C9"} />
            <stop offset="100%" stopColor={"rgba(24, 167, 246, 0.71)"} />
          </linearGradient>
        </defs>
      </svg>
      <svg display="hidden" width={0} height={0}>
        <defs>
          <linearGradient id="started" x1="50%" y1="0%" x2="0%" y2="50%">
            <stop offset="0%" stopColor={"#1CE886"} />
            <stop offset="100%" stopColor={"#3CA622"} />
          </linearGradient>
        </defs>
      </svg>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignSelf: "flex-start",
            position: "relative",
            background:
              "linear-gradient(180deg, rgba(168, 172, 169, 0.83) 0%, rgba(60, 63, 61, 0.65) 100%)",
            borderRadius: "50%",
          }}
        >
          <CircularProgress
            size={70}
            value={progress < 5 ? 5 : progress}
            variant="determinate"
            thickness={7}
            sx={{
              "svg circle": {
                stroke: compleated ? "url(#compleated)" : "url(#started)",
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "12px",
              left: "12px",
              background: "#fff",
              borderRadius: "50%",
              width: "46px",
              height: "46px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: compleated ? 0 : "2px",
              pr: compleated ? 0 : "4px",
            }}
          >
            {compleated ? (
              <CompleatedIcon width={40} height={40} />
            ) : (
              <RocketIcon width={32} height={32} />
            )}
          </Box>
        </Box>
        <Button
          variant="contained"
          onClick={redirectToCodePanel}
          disableRipple
          sx={
            lastActive
              ? {
                  background:
                    "top 5px left / 110px url(/assets/projects/lastActive.png) no-repeat",
                  color: "#fff",
                  minHeight: "76px",
                  "&:hover": {
                    background:
                      "top 5px left / 110px url(/assets/projects/lastActive.png) no-repeat",
                    boxShadow: "none",
                  },
                  ml: 1,
                }
              : {
                  background: "rgba(196, 196, 196, .2)",
                  color: "#616161",
                  borderRadius: 3,
                  mt: 2,
                  ml: 1,
                  "&:hover": {
                    background: "rgba(196, 196, 196, .5)",
                    boxShadow: "none",
                  },
                }
          }
        >
          {compleated ? "Review" : null}
          {lastActive ? (
            <Stack direction="row" alignItems="center" gap={0.5}>
              <Stack>
                <Typography variant="body1" fontWeight={700}>
                  Explore
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  Now
                </Typography>
              </Stack>
              <FaArrowRight size={18} />
            </Stack>
          ) : null}
          {locked && !lastActive ? "Open" : null}
        </Button>
      </Box>
      <Stack ml={lastActive ? -5 : 1}>
        <Typography variant="h5" pl={1}> {name} </Typography>
        <Button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          disableRipple
          sx={{
            gap: 1,
            alignSelf: "flex-start",
            color: theme.palette.mode === "light" ? "#364954" : "#fff",
            fontWeight: 400,
            px: 1,
            "&:hover": {
              background: "none",
            },
          }}
        >
          See more <FaChevronDown size={14} />
        </Button>
        <Collapse in={isOpen}>
          <Box sx={getDescriptionBoxSx}>
            <Typography mb={1}>
              {description}
            </Typography>
            <Box sx={{ display: "flex", gap: "20px", }}>
              <Typography sx={{ ...DESCRIPTION_GRADIENT_TEXT_SX, fontSize: "14px" }}>
                <RocketIcon width={20} height={20}/>
                  Part of the project
              </Typography>
              <Typography sx={{ ...LESSON_TIME_SX, fontSize: "14px" }}>
                <AiOutlineClockCircle size={20}/>
                {projectTime}
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Stack>
    </Box>
  );
};

export default RoadItemMobile;
