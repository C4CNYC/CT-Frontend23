import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Container, Skeleton, Stack } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import LessonsList from "@sections/module/LessonsList";
import ModuleHeader from "@sections/module/ModuleHeader";
import ModuleSidebar from "@sections/module/module-sidebar";
import { IModuleContent } from "src/redux/interfaces/content.interface";
import {
  useGetStudentCourseModulesQuery,
  useGetStudentModulesLessonsQuery,
} from "src/redux/services/manager/courses-student";
import { useGetStudentLastVisitedUnitAndLessonQuery } from "src/redux/services/manager/lesson-student";

ModulePage.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function ModulePage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const { query } = useRouter();
  const [currentModule, setCurrentModule] = useState<IModuleContent>();
  const { data: modules, isLoading: isLoadingModule } =
    useGetStudentCourseModulesQuery(
      { id: query?.id as string },
      { skip: !query?.id }
    );
  const { data, isLoading } = useGetStudentModulesLessonsQuery(
    { id: query?.unit as string },
    { skip: !query?.id }
  );
  const { data: lastVisitedData } =
    useGetStudentLastVisitedUnitAndLessonQuery();

  useEffect(() => {
    if (modules) {
      setCurrentModule(modules.filter((m) => m.id === query.unit)[0]);
    }
  }, [isLoadingModule]);

  return (
    <>
      <Head>
        <title>{currentModule?.name ?? "Module"} | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs
          links={[
            { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
            { name: "Courses", href: STUDENT_PATH_DASHBOARD.courses.root },
            {
              name: currentModule?.name ?? "Module",
            },
          ]}
        />
        <Stack direction="row" gap={3} flexWrap="wrap">
          <Stack
            sx={{
              background: "#ECF4FF",
              borderRadius: 2,
              py: 3,
              px: { xs: 2, lg: 5 },
              flex: "1",
            }}
          >
            {!isLoadingModule && currentModule ? (
              <ModuleHeader
                name={currentModule.name}
                description={currentModule.description}
                avatar={currentModule.avatar ?? ""}
              />
            ) : (
              <Skeleton sx={{ mb: "40px", width: "100%", height: "250px" }} />
            )}
            {!isLoading ? (
              <LessonsList
                lessons={data ?? []}
                unitId={query?.unit as string}
                lastVisitedData={lastVisitedData?.lastVisitedLessonId ?? ""}
              />
            ) : (
              <Stack gap={2} mt={4}>
                {Array.from("12345").map((el) => (
                  <Skeleton
                    key={el + 32}
                    variant="rounded"
                    width="100%"
                    height="158px"
                  />
                ))}
              </Stack>
            )}
          </Stack>
          <ModuleSidebar />
        </Stack>
      </Container>
    </>
  );
}
