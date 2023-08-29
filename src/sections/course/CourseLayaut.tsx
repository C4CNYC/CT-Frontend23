import { useState } from "react";

import _ from "lodash";

import { Skeleton, Stack, useMediaQuery, useTheme } from "@mui/material";

import { EmptyContent } from "@components";
import { ICourseContent } from "src/redux/interfaces/content.interface";
import { useGetStudentCourseModulesQuery } from "src/redux/services/manager/courses-student";

import CourseDetailsMain from "./course-details/CourseDetailsMain";
import ModuleItem from "./module-item";

interface ICourseLayautProps {
  course?: ICourseContent;
  isLoadingCourse: boolean;
}

export default function CourseLayaut({
  course,
  isLoadingCourse,
}: ICourseLayautProps): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1050));
  const [active, setActive] = useState(0);
  const { data, isLoading } = useGetStudentCourseModulesQuery(
    { id: course?.id as string },
    { skip: !course?.id }
  );

  return (
    <Stack
      direction="row"
      sx={{
        mt: "32px",
        gap: "50px",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          maxWidth: "540px",
          gap: 5,
          pb: "60px",
          m: isDesktop ? "60px 0 0 0" : "0 auto",
        }}
      >
        {isLoading || isLoadingCourse
          ? [...Array(5)].map((el) => (
              <Skeleton
                variant="rounded"
                sx={{
                  width: "100%",
                  height: "220px",
                  background: "#fff",
                  borderRadius: "30px",
                }}
                key={el}
              />
            ))
          : data?.map((unit, index) => (
              <ModuleItem
                key={index}
                index={index}
                unit={unit}
                active={active === index}
                setActive={setActive}
              />
            ))}
      </Stack>
      <CourseDetailsMain unit={data?.[active]} level={course?.level ?? ""} />
    </Stack>
  );
}
