import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  Container,
  Skeleton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import LessonsList from "@sections/module/LessonsList";
import ModuleHeader from "@sections/module/ModuleHeader";
import {
  CONTAINER_SX,
  getBreadcrumbsSx,
  getLessonListSx,
  getPageContainerSx,
} from "@sections/module/constants";
import ModuleSidebar from "@sections/module/module-sidebar";
import { IModuleContent } from "src/redux/interfaces/content.interface";
import {
  useGetCoursContentQuery,
  useGetStudentCourseModulesQuery,
  useGetStudentModulesLessonsQuery,
} from "src/redux/services/manager/courses-student";
import { useGetStudentLastVisitedUnitAndLessonQuery } from "src/redux/services/manager/lesson-student";

ModulePage.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function ModulePage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(660));
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
  const { data: course } = useGetCoursContentQuery(
    {
      id: query.id as string,
    },
    { skip: !query.id }
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
      <Container
        maxWidth={themeStretch ? false : "xl"}
        disableGutters
        sx={getPageContainerSx(isMobile, theme.palette.mode === "light")}
      >
        <CustomBreadcrumbs
          sx={getBreadcrumbsSx(isMobile, theme)}
          links={[
            { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
            {
              name: "Courses",
              href: STUDENT_PATH_DASHBOARD.courses.root,
            },
            {
              name: course?.name ?? "Course",
              href: STUDENT_PATH_DASHBOARD.courses.course(course?.id as string),
            },
            {
              name: currentModule?.name ?? "Module",
            },
          ]}
        />
        <Stack direction="row" gap={3} flexWrap="wrap">
          <Stack sx={CONTAINER_SX}>
            {!isLoadingModule && currentModule ? (
              <ModuleHeader
                name={currentModule.name}
                description={currentModule.description}
                avatar={currentModule.avatar}
              />
            ) : (
              <Skeleton
                variant="rounded"
                sx={{ width: "100%", height: "280px", minWidth: "410px" }}
              />
            )}
            {!isLoading ? (
              <LessonsList
                lessons={data ?? []}
                unitId={query?.unit as string}
                lastVisitedData={lastVisitedData?.lastVisitedLessonId ?? ""}
              />
            ) : (
              <Stack sx={getLessonListSx(isMobile, theme)}>
                <Skeleton
                  variant="rounded"
                  sx={{
                    width: "84px",
                    height: "37px",
                    alignSelf: "flex-end",
                    mr: -3,
                  }}
                />
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
          <ModuleSidebar
            level="Beginner"
            grade="6th-10th Grade"
            duration={ currentModule ? currentModule?.duration : "20 min"}
            lessonCount={`${data?.length} lessons`}
            description={currentModule ? currentModule.description : "Description"}
          />
        </Stack>
      </Container>
    </>
  );
}
