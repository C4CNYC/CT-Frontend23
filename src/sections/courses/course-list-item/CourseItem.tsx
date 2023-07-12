import { 
  SlArrowDown, 
  SlArrowUp,
} from "react-icons/sl";
import { useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Stack,
  Button,
  useTheme,
  Collapse,
  Typography,
  useMediaQuery,
} from "@mui/material";

import CourseChip from "./CourseChip";
import CourseInfo from "./CourseInfo";
import CourseHeader from "./CourseHeader";
import CourseAvatar from "./CourseAvarar";
import CourseButtons from "./CourseButtons";
import CourseStatistics from "./CourseStatistics";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { ICourseElement } from "src/redux/interfaces/content.interface";

interface Props {
  course: ICourseElement;
}

export default function CoursesItem({ course }: Props): React.ReactElement {
  const { push } = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const redirect = (): void => {
    push(`${STUDENT_PATH_DASHBOARD.courses.course(course.id)}`);
  };
  return (
    <Stack
      sx={{
        background: "#ECF4FF",
        borderRadius: "25px",
        p: {
          xs: "20px 20px 20px 20px",
          sm: "30px 20px 20px 20px",
          md: "30px 55px 37px 40px",
        },
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
          <Typography variant="body2" sx={{ pb: "15px" }}>
            {course.description}
          </Typography>
          <Collapse in={open}>
            <Stack
              direction="row"
              sx={{
                gap: "15px",
                flexWrap: "wrap",
                mt: "10px",
                mb: {
                  xs: "10px",
                  sm: "15px",
                  md: "15px",
                },
              }}
            >
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
            onClick={() => {
              setOpen(!open);
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
  );
}
