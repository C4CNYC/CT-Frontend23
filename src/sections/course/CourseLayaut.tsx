import { useState } from "react";

import { 
  Box, 
  Stack, 
  Typography,
 } from "@mui/material";

import { EmptyContent } from "@components";

import CourseCard from "./CourseCard";
import CourseSummarily from "./CourseSummarily";
import CourseDetailsMain from "./course-details/CourseDetailsMain";
import { ICourseContent } from "src/redux/interfaces/content.interface";

interface Props {
  course: ICourseContent;
}

export default function CourseLayaut({ course }: Props): React.ReactElement {
  const [active, setActive] = useState(0);
  if (!course.units) {
    return <Typography>Course has no units yet</Typography>;
  }
  return (
    <Box
      sx={(theme) => ({
        mt: "32px",
        display: "flex",
        [theme.breakpoints.down(1500)]: {
          justifyContent: "center",
        },
      })}
    >
      <Box>
        <CourseSummarily data={course} />
        <Stack
          spacing="40px"
          sx={(theme) => ({
            mt: "80px",
            ml: "-22px",
            [theme.breakpoints.down(1500)]: {
              mt: "40px",
              ml: 0,
            },
          })}
        >
          {course?.units.length ? (
            course?.units.map((unit, index) => (
              <CourseCard
                key={index}
                index={index}
                unit={unit}
                active={active === index}
                setActive={setActive}
                lastItem={(course?.units?.length) - 1 === index}
              />
            ))
          ) : (
            <EmptyContent title="There are no units" />
          )}
        </Stack>
      </Box>
      <CourseDetailsMain dataLessons={course?.units[active]} index={active} />
    </Box>
  );
}
