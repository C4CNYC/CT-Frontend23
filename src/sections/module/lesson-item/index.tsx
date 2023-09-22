import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { useAtom } from "jotai";
import { AiOutlineClockCircle } from "react-icons/ai";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import { TbPlayerPlay } from "react-icons/tb";

import { Button, Collapse, Link, Stack, Typography } from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import {
  IGlobalCodePanelAtom,
  globalCodePanelAtom,
} from "@sections/code-panel/atoms/global-code-panel.atom";
import { ILessonCurrent } from "src/redux/interfaces/content.interface";

import TrainingProgress from "./LessonProgress";

interface ILessonItemProps {
  lesson: ILessonCurrent;
  unitId: string;
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
}: ILessonItemProps): React.ReactElement {
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
    <Stack
      sx={{
        borderRadius: 2,
        p: 2,
        pr: 4,
        bgcolor: "#fff",
        minHeight: "150px",
      }}
    >
      <TrainingProgress progress={80} />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack>
          <Typography variant="h4" mb={2}>
            {lesson.name}
          </Typography>
          <Typography variant="body1">
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
                sx={{
                  alignSelf: "flex-start",
                  color: "#454F5B",
                  gap: 1,
                  alignItems: "center",
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                }}
              >
                See more {!openDetails ? <GoTriangleDown /> : <GoTriangleUp />}
              </Button>
            </>
          ) : null}
          <Stack direction="row" gap={2} flexWrap="wrap">
            <Typography
              variant="body2"
              sx={{
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <HiOutlinePuzzlePiece size={20} />
              Part of Project
            </Typography>
            <Typography
              variant="body2"
              sx={{
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AiOutlineClockCircle size={20} />
              20 mins
            </Typography>
          </Stack>
        </Stack>
        <Link
          component={NextLink}
          href={`${STUDENT_PATH_DASHBOARD.codePanel.workSpace(
            courseId as string
          )}?${unitId}&${lesson.id}`}
          underline="none"
          sx={{
            background: "#fff",
            borderRadius: "50%",
            display: "flex",
            p: 1,
            mb: 2,
            boxShadow: 5,
            alignSelf: "flex-end",
          }}
          onClick={() => {
            updateCodePanelAtom({
              courseId: courseId as string,
              unitId,
              lessonId: lesson.id,
            });
          }}
        >
          {/* <svg width="0" height="0">
            <linearGradient
              id="blue-gradient"
              x1="100%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop stopColor="#61F3F3" offset="0%" />
              <stop stopColor="#00B8D9" offset="100%" />
            </linearGradient>
          </svg> */}
          {/* stroke: "url(#blue-gradient)" */}
          <TbPlayerPlay size={50} style={{ color: "#454F5B" }} />
        </Link>
      </Stack>
    </Stack>
  );
}
