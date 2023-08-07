import { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";

import { EmptyContent } from "@components";
import { ICourseContent } from "src/redux/interfaces/content.interface";

import CourseCard from "./CourseCard";
import CourseSummarily from "./CourseSummarily";
import CourseDetailsMain from "./course-details/CourseDetailsMain";

interface ICourseLayautProps {
  course: ICourseContent;
}

export default function CourseLayaut({
  course,
}: ICourseLayautProps): React.ReactElement {
  const [active, setActive] = useState(0);

  if (!course.units) {
    return <Typography>Course has no units yet</Typography>;
  }

  return (
    <Box
      sx={{
        mt: "32px",
        display: "flex",
      }}
    >
      <Box>
        <CourseSummarily data={course} />
        <Stack spacing="40px" mt="40px">
          {course?.units.length ? (
            course?.units.map((unit, index) => (
              <CourseCard
                key={index}
                index={index}
                unit={unit}
                active={active === index}
                setActive={setActive}
                lastItem={course?.units?.length - 1 === index}
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
