import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { useAtom } from "jotai";
import { AiOutlineClockCircle } from "react-icons/ai";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { HiLockClosed } from "react-icons/hi2";
import RocketIcon from "../icons/RocketIcon";
import { TbPlayerPlay } from "react-icons/tb";

import {
  Box,
  Button,
  Collapse,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import {
  IGlobalCodePanelAtom,
  globalCodePanelAtom,
} from "@sections/code-panel/atoms/global-code-panel.atom";
import { ILessonCurrent } from "src/redux/interfaces/content.interface";

import TrainingProgress from "./LessonProgress";
import {
  DURATION_SX,
  LINK_BTN_SX,
  LOCKED_BTN_CONT_SX,
  LOCKED_BTN_SX,
  MODE_TITLE_SX,
  SEE_MORE_SX,
  getLessonContentSx,
  getLessonSx,
} from "./constants";

interface ILessonItemProps {
  lesson: ILessonCurrent;
  unitId: string;
  lastVisitedData: boolean;
  locked: boolean;
}

interface IUpdateCodePanelAtom {
  courseId: string;
  unitId: string;
  lessonId: string;
}

const MAX_DESC = 50;

export default function LessonItem({
  lesson,
  unitId,
  lastVisitedData,
  locked,
}: ILessonItemProps): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(600));
  const [openDetails, setOpenDetails] = useState(false);
  const [, setGlobalCodePanel] = useAtom(globalCodePanelAtom);
  const courseId = useRouter().query.id;

  const updateCodePanelAtom = ({
    courseId,
    unitId,
    lessonId,
  }: IUpdateCodePanelAtom) => {
    setGlobalCodePanel((prev: IGlobalCodePanelAtom) => ({
      ...prev,
      courseId,
      unitId,
      lessonId,
    }));
  };

  return (
    <Stack sx={getLessonSx(theme)}>
      <TrainingProgress progress={lesson?.progress ?? 0} locked={locked} />
      <Stack sx={getLessonContentSx(isMobile)}>
        <Stack>
          <Typography variant="h4" mb={1}>
            {lesson.name}
          </Typography>
          <Typography
            variant="body1"
            mb={lesson?.description?.length < MAX_DESC ? 3 : 0}
          >
            {lesson?.description?.length < MAX_DESC
              ? lesson?.description
              : `${lesson?.description?.slice(0, 47)} ${
                  openDetails ? "" : "..."
                }`}
          </Typography>
          {lesson?.description?.length > MAX_DESC ? (
            <>
              <Collapse in={openDetails}>
                {lesson?.description?.slice(47)}
              </Collapse>
              <Button
                onClick={() => {
                  setOpenDetails(!openDetails);
                }}
                sx={SEE_MORE_SX}
              >
                See more {!openDetails ? <GoTriangleDown /> : <GoTriangleUp />}
              </Button>
            </>
          ) : null}
          <Stack direction="row" gap={2} flexWrap="wrap">
            <Typography variant="body2" sx={MODE_TITLE_SX}>
              <RocketIcon width={20} height={20}/>
              Part of Project
            </Typography>
            <Typography variant="body2" sx={DURATION_SX}>
              <AiOutlineClockCircle size={20} />
              20 mins
            </Typography>
          </Stack>
        </Stack>
        {!locked ? (
          <Link
            component={NextLink}
            href={`${STUDENT_PATH_DASHBOARD.codePanel.workSpace(
              courseId as string
            )}?unitId=${unitId}&lessonId=${lesson.id}`}
            underline="none"
            sx={{
              display: "flex",
              gap: 3,
              p: 0.5,
              pl: 2,
              alignItems: "center",
              borderRadius: "80px",
              mt: "auto",
              color: "#fff",
              background:
                "linear-gradient(308.87deg, #FFF739 -19.29%, #FF6DC5 89.25%)",
            }}
            onClick={() => {
              updateCodePanelAtom({
                courseId: courseId as string,
                unitId,
                lessonId: lesson.id,
              });
            }}
          >
            <Typography variant="h5"> Start </Typography>
            <Box sx={LINK_BTN_SX}>
              <TbPlayerPlay size={30} style={{ color: "#364954" }} />
            </Box>
          </Link>
        ) : (
          <Box sx={LOCKED_BTN_CONT_SX}>
            <Typography variant="h5"> Start </Typography>
            <Box sx={LOCKED_BTN_SX}>
              <HiLockClosed size={30} style={{ color: "#C4CDD5" }} />
            </Box>
          </Box>
        )}
      </Stack>
    </Stack>
  );
}
