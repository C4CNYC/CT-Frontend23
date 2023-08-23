import { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";

import { EmptyContent } from "@components";
import { ICourseContent } from "src/redux/interfaces/content.interface";

import CourseDetailsMain from "./course-details/CourseDetailsMain";
import ModuleSection from "./module-section";

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
        gap: "50px",
      }}
    >
      <Box>
        <Stack gap={5} mt="60px" pb="60px">
          {course?.units.length ? (
            course?.units.map((unit, index) => (
              <ModuleSection
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
      <CourseDetailsMain
        unit={course?.units[active]}
        level={course.level}
        index={active}
      />
    </Box>
  );
}
