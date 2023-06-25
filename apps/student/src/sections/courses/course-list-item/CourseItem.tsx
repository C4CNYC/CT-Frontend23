import { Image } from "@ct-nx/components";
import { Box, Button, Collapse, Stack, Typography } from "@mui/material";
import { PATH_PAGE } from "@routes/paths";
import { useRouter } from "next/router";
import { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { ICourseElement } from "src/redux/interfaces/content.interface";
import CourseButtons from "./CourseButtons";
import CourseChip from "./CourseChip";
import CourseHeader from "./CourseHeader";
import CourseInfo from "./CourseInfo";
import CourseStatistics from "./CourseStatistics";

interface Props {
  course: ICourseElement;
}

export default function CoursesItem({ course }: Props): React.ReactElement {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  const redirect = (): void => {
    push(`${PATH_PAGE.courses.course(course.id as string)}`);
  };
  return (
    <Stack
      sx={{
        background: "#ECF4FF",
        borderRadius: "25px",
        p: {
          xs: "20px 20px 20px 20px",
          sm: "30px 30px 20px 20px",
          md: "30px 55px 37px 80px",
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
        <Box sx={{ maxWidth: "600px" }}>
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
            <CourseStatistics likesCount={course.likes_count ?? 0}/>
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
            progress={20}
            courseId={course.id as string}
          />
          <CourseInfo course={course} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Image
            src={course.cover || "/assets/courses/tiger.png"}
            sx={{
              objectFit: "contain",
              borderRadius: "25px",
              width: {
                xs: "200px",
                sm: "180px",
                md: "250px",
              },
              height: {
                xs: "200px",
                sm: "180px",
                md: "250px",
              },
              display: {
                xs: "none",
                sm: "flex",
                md: "flex",
              },
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
}
