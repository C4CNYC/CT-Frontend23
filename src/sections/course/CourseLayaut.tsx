import { useState } from "react";

import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

import { EmptyContent } from "@components";
import { ICourseContent } from "src/redux/interfaces/content.interface";

import CourseDetailsMain from "./course-details/CourseDetailsMain";
import ModuleItem from "./module-item";

interface ICourseLayautProps {
  course: ICourseContent;
}

export default function CourseLayaut({
  course,
}: ICourseLayautProps): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1050));
  const [active, setActive] = useState(0);

  if (!course.units) {
    return <Typography>Course has no units yet</Typography>;
  }

  return (
    <Box
      sx={{
        mt: "32px",
        display: "flex",
        gap: "50px",
      }}
    >
      <Stack gap={5} pb="60px" m={isDesktop ? "60px 0 0 0" : "0 auto"}>
        {course?.units.length ? (
          course?.units.map((unit, index) => (
            <ModuleItem
              key={index}
              index={index}
              unit={unit}
              active={active === index}
              setActive={setActive}
            />
          ))
        ) : (
          <EmptyContent title="There are no units" />
        )}
      </Stack>
      <CourseDetailsMain unit={course?.units[active]} level={course.level} />
    </Box>
  );
}
