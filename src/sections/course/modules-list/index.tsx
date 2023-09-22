import { useRouter } from "next/router";

import { Skeleton, Stack } from "@mui/material";

import { useGetStudentCourseModulesQuery } from "src/redux/services/manager/courses-student";
import { useGetStudentLastVisitedUnitAndLessonQuery } from "src/redux/services/manager/lesson-student";

import ModuleItem from "./module-item";

export default function ModulesListBlock(): React.ReactElement {
  const { query } = useRouter();
  const { data, isLoading } = useGetStudentCourseModulesQuery(
    { id: query?.id as string },
    { skip: !query?.id }
  );

  const { data: lastVisitedData, isLoading: isLoadingLesson } =
    useGetStudentLastVisitedUnitAndLessonQuery();

  return (
    <Stack
      sx={{
        background: "#ECF4FF",
        px: 8,
        py: 6,
        borderRadius: 3,
        gap: 3,
        flex: 1,
      }}
    >
      {data ? (
        data.map((m) => (
          <ModuleItem key={m.id} unit={m} lastVisitedData={lastVisitedData} />
        ))
      ) : (
        <Skeleton />
      )}
    </Stack>
  );
}
