import { useState } from "react";
import { Skeleton, Stack, useMediaQuery, useTheme } from "@mui/material";

import { ICourseContent } from "src/redux/interfaces/content.interface";
import { useGetStudentCourseModulesQuery } from "src/redux/services/manager/courses-student";

import CourseDetailsMain from "./course-details/CourseDetailsMain";
import ModuleItem from "./module-item";
import {
  useGetStudentLastVisitedUnitAndLessonQuery
} from "../../redux/services/manager/lesson-student"
import { isNull } from "lodash"

interface ICourseLayoutProps {
  course?: ICourseContent;
  isLoadingCourse: boolean;
}

export default function CourseLayout({
  course,
  isLoadingCourse,
}: ICourseLayoutProps): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1050));
  const [active, setActive] = useState<number | null>(null);
  const { data, isLoading } = useGetStudentCourseModulesQuery(
    { id: course?.id as string },
    { skip: !course?.id }
  );
  const { data: lastVisitedData, isLoading: isLoadingLesson } = useGetStudentLastVisitedUnitAndLessonQuery();

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
          ? [...Array(5)].map((el, index) => (
              <Skeleton
                variant="rounded"
                sx={{
                  width: "100%",
                  height: "220px",
                  background: "#fff",
                  borderRadius: "30px",
                }}
                key={index}
              />
            ))
          : data?.map((unit, index) => (
              <ModuleItem
                key={index}
                index={index}
                unit={unit}
                active={active === index}
                setActive={setActive}
                isLoadingLesson={isLoadingLesson}
                lastVisitedData={lastVisitedData}
              />
            ))}
      </Stack>
      <CourseDetailsMain unit={!isNull(active) ? data?.[active] : null} level={course?.level ?? ""} />
    </Stack>
  );
}
