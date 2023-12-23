import { useMemo, useState } from "react";

import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import { Button, Stack, Typography, useTheme } from "@mui/material";

import { Image } from "@components";
import { useTranslate } from "src/utils/translateHelper";

import CourseSummarily from "./CourseSummarily.1";
import {
  COURSE_INFO_IMAGE_SX,
  SEE_MORE_BTN_SX,
  getCourseInfoWrapperSx,
} from "./constants";

interface ICourseInfoProps {
  cover?: string;
  name: string;
  description: string;
  lessonsCount: number;
  duration: string;
  level: string;
}

const MAX_DESCRIPTION_LENGTH = 250;

export default function CourseInfo({
  cover,
  name,
  description,
  duration,
  lessonsCount,
  level,
}: ICourseInfoProps): React.ReactElement {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const translate = useTranslate();

  const containerStyles = useMemo(() => getCourseInfoWrapperSx(theme), [theme]);

  return (
    <Stack sx={containerStyles}>
      <Stack maxWidth="680px">
        <Typography variant="h3" pb={2}>
          {name}
        </Typography>
        <Typography variant="subtitle1" sx={{ pb: !open ? 1 : 1 }}>
          {description.length > MAX_DESCRIPTION_LENGTH && !open
            ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}... `
            : description}
        </Typography>
        <Button
          sx={SEE_MORE_BTN_SX}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open
            ? translate("actions_show_less")
            : translate("actions_see_more")}
          {open ? (
            <SlArrowUp style={{ marginLeft: "10px" }} />
          ) : (
            <SlArrowDown style={{ marginLeft: "10px" }} />
          )}
        </Button>
        <CourseSummarily
          duration={duration}
          lessonsCount={lessonsCount}
          level={level}
        />
      </Stack>
      <Image
        alt="course cover"
        src={cover ?? "/assets/courses/courseImg.png"}
        sx={COURSE_INFO_IMAGE_SX}
      />
    </Stack>
  );
}
