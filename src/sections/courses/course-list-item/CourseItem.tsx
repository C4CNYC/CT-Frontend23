import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import {
  Box,
  Button,
  Collapse,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { ICourseElement } from "src/redux/interfaces/content.interface";

import CourseAvatar from "./CourseAvarar";
import CourseButtons from "./CourseButtons";
import CourseChip from "./CourseChip";
import CourseHeader from "./CourseHeader";
import CourseInfo from "./CourseInfo";
import CourseStatistics from "./CourseStatistics";
import { COURSE_DETAILS_WRAPPER_SX, COURSE_ITEM_WRAPPER_SX } from "./constants";

interface Props {
  course: ICourseElement;
}

const MAX_DESCRIPTION_LENGTH = 250;

export default function CoursesItem({ course }: Props): React.ReactElement {
  const { push } = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const redirect = (): void => {
    push(`${STUDENT_PATH_DASHBOARD.courses.course(course.id)}`);
  };
  const coursePath = STUDENT_PATH_DASHBOARD.courses.course(course.id);

  return (
    <Link
      component={NextLink}
      href={coursePath}
      underline="none"
      color="initial"
    >
      <Stack
        sx={{
          ...COURSE_ITEM_WRAPPER_SX,
          transition: (theme) => theme.transitions.create("all"),
        }}
      >
        <CourseHeader progress={course.progress} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "none", sm: "none", md: "600px" },
            }}
          >
            <Typography
              variant="h4"
              sx={{ textTransform: "uppercase", pb: "10px" }}
            >
              {course.name}
            </Typography>
            <Typography variant="body2" sx={{ pb: !open ? 1 : 0 }}>
              {course.description.length > MAX_DESCRIPTION_LENGTH && !open
                ? `${course.description.slice(0, MAX_DESCRIPTION_LENGTH)}... `
                : course.description}
            </Typography>
            <Collapse in={open}>
              <Stack direction="row" sx={COURSE_DETAILS_WRAPPER_SX}>
                {["HTML", "CSS", "BASICS", "AUTO-CHECKED"].map((el) => (
                  <CourseChip text={el} key={el} />
                ))}
              </Stack>
              <CourseStatistics likesCount={course.likes_count ?? 0} />
            </Collapse>
            <Button
              sx={{
                fontSize: "1rem",
                color: "#364954",
                "&:hover": {
                  background: "none",
                },
              }}
              onClick={(e) => {
                setOpen(!open);
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              {open ? "Show less" : "See more"}
              {open ? (
                <SlArrowUp style={{ marginLeft: "10px" }} />
              ) : (
                <SlArrowDown style={{ marginLeft: "10px" }} />
              )}
            </Button>
            <CourseButtons
              redirect={redirect}
              progress={course.progress}
              courseId={course.id}
            />
            {isMobile && (
              <Stack alignItems="center" mb={3} mt={1}>
                <CourseAvatar course={course} />
              </Stack>
            )}
            <CourseInfo course={course} />
          </Box>
          {!isMobile && <CourseAvatar course={course} />}
        </Box>
      </Stack>
    </Link>
  );
}
