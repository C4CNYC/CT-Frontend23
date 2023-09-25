import Head from "next/head";
import { useRouter } from "next/router";

import { Container, Stack } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import LessonsList from "@sections/module/LessonsList";
import ModuleHeader from "@sections/module/ModuleHeader";
import ModuleSidebar from "@sections/module/module-sidebar";
import { useGetStudentModulesLessonsQuery } from "src/redux/services/manager/courses-student";

ModulePage.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function ModulePage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const { query } = useRouter();
  const { data, isLoading } = useGetStudentModulesLessonsQuery(
    { id: query?.unit as string },
    { skip: !query?.id }
  );

  return (
    <>
      <Head>
        <title>Course | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs
          sx={{ pl: 10 }}
          links={[
            { name: "Dashboard", href: STUDENT_PATH_DASHBOARD.root },
            { name: "Course", href: STUDENT_PATH_DASHBOARD.courses.root },
            // { name: `${data?.name}`, href: "" },
          ]}
        />
        <Stack direction="row" gap={3} flexWrap="wrap">
          <Stack
            sx={{
              background: "#ECF4FF",
              borderRadius: 2,
              py: 3,
              px: 5,
              flex: "1",
            }}
          >
            <ModuleHeader />
            <LessonsList />
          </Stack>
          <ModuleSidebar />
        </Stack>
      </Container>
    </>
  );
}
