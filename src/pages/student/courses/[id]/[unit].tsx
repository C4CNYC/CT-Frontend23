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
} from "src/redux/services/manager/courses-student";
import { useGetStudentLastVisitedUnitAndLessonQuery } from "src/redux/services/manager/lesson-student";
import { useGetModuleWithLessonsQuery } from "src/redux/services/manager/modules-student";
import { useTranslate } from "src/utils/translateHelper";

ModulePage.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function ModulePage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(660));
  const { query } = useRouter();
  const [currentModule, setCurrentModule] = useState<IModuleContent>();
  const translate = useTranslate();

  const { data: modules, isLoading: isLoadingModules } =
    useGetStudentCourseModulesQuery(
      { id: query?.id as string },
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

  const { data: module, isLoading: isLoadingModule } =
    useGetModuleWithLessonsQuery(
      { id: query.unit as string },
      { skip: !query.unit }
    );

  useEffect(() => {
    if (modules) {
      setCurrentModule(modules.filter((m) => m.id === query.unit)[0]);
    }
  }, [isLoadingModules]);

  return (
    <>
      <Head>
        <title>{module?.name ?? translate("module")} | CodeTribe</title>
      </Head>
      <Container
        maxWidth={themeStretch ? false : "xl"}
        disableGutters
        sx={getPageContainerSx(isMobile, theme.palette.mode === "light")}
      >
        <CustomBreadcrumbs
          sx={getBreadcrumbsSx(isMobile, theme)}
          links={[
            {
              name: translate("home"),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            {
              name: translate("courses"),
              href: STUDENT_PATH_DASHBOARD.courses.root,
            },
            {
              name: course?.name ?? translate("course"),
              href: STUDENT_PATH_DASHBOARD.courses.course(course?.id as string),
            },
            {
              name: module?.name ?? translate("module"),
            },
          ]}
        />
        <Stack
          sx={{
            gap: 3,
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "column",
              lg: "row",
            },
          }}
        >
          <Stack sx={CONTAINER_SX}>
            {!isLoadingModules && !isLoadingModule && module ? (
              <ModuleHeader
                name={module.name}
                description={
                  module?.description
                    ? module.description
                    : translate("description")
                }
                avatar={module.avatar}
              />
            ) : (
              <Skeleton
                variant="rounded"
                sx={{ width: "100%", height: "280px", minWidth: "410px" }}
              />
            )}
            {!isLoadingModule ? (
              <LessonsList
                lessons={module?.lessons ?? []}
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
            duration={module ? module?.duration : "20 min"}
            lessonCount={`${module?.lessons?.length} ${translate("lessons")}`}
            description={
              module?.description
                ? module.description
                : translate("description")
            }
            certificate={module?.initial_enrolled ?? 0}
            likes={module?.initial_likes ?? 0}
            rated={module?.initial_stars ?? 0}
            teacherForum={currentModule?.teacher_forum ?? ""}
            teacherSlides={currentModule?.teacher_slides}
            lessonPlans={currentModule?.lesson_plans}
            lessons={module?.lessons}
          />
        </Stack>
      </Container>
    </>
  );
}
