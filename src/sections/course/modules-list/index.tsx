import { useRouter } from "next/router";

import { Skeleton, Stack, useTheme } from "@mui/material";

import { useGetStudentCourseModulesQuery } from "src/redux/services/manager/courses-student";
import { useGetStudentLastVisitedUnitAndLessonQuery } from "src/redux/services/manager/lesson-student";

import ModuleItem from "./module-item";

export default function ModulesListBlock(): React.ReactElement {
  const theme = useTheme();
  const { query } = useRouter();
  const { data, isLoading } = useGetStudentCourseModulesQuery(
    { id: query?.id as string },
    { skip: !query?.id }
  );
  const { data: lastVisitedData } =
    useGetStudentLastVisitedUnitAndLessonQuery();

  return (
    <Stack
      sx={{
        background:
          theme.palette.mode === "light"
            ? "#ECF4FF"
            : theme.palette.background.neutral,
        px: { xs: 1, lg: 8 },
        py: { xs: 3, lg: 6 },
        borderRadius: 3,
        gap: 3,
        flex: 1,
      }}
    >
      {data && !isLoading
        ? data.map((m) => (
            <ModuleItem
              key={m.id}
              unit={m}
              lastVisited={m.id === lastVisitedData?.lastVisitedUnitId}
            />
          ))
        : Array.from("12345").map((el) => (
            <Skeleton
              key={el}
              variant="rounded"
              sx={{
                width: "100%",
                height: "200px",
                mb: "24px",
                background: "#fff",
                display: "flex",
              }}
            />
          ))}
    </Stack>
  );
}
