import Head from "next/head";
import { useRouter } from "next/router";

import { Box, Container, Skeleton, Stack } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import CourseInfo from "@sections/course/CourseInfo";
import CourseSidebar from "@sections/course/course-sidebar";
import ModulesListBlock from "@sections/course/modules-list";
import { useGetCoursContentQuery } from "src/redux/services/manager/courses-student";

CoursePage.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function CoursePage(): React.ReactElement {
  const router = useRouter();
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetCoursContentQuery(
    {
      id: router.query.id as string,
    },
    { skip: !router.query.id }
  );

  return (
    <>
      <Head>
        <title>{data?.name ?? "Course"} | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs
          links={[
            { name: "Dashboard", href: STUDENT_PATH_DASHBOARD.root },
            { name: "Catalog", href: STUDENT_PATH_DASHBOARD.courses.root },
            { name: data?.name ?? "Course" },
          ]}
        />
        <Box
          sx={{
            minHeight: "100vh",
          }}
        >
          {isLoading ? (
            <Stack>
              <Skeleton
                variant="rounded"
                sx={{
                  mb: { sx: "24px", sm: "40px" },
                  height: {
                    xs: "954px",
                    sm: "483px",
                    md: "400px",
                  },
                  width: "100%",
                }}
              />
            </Stack>
          ) : (
            <CourseInfo
              name={data?.name ?? ""}
              description={data?.description ?? ""}
              cover={data?.cover}
              duration={"9"}
              level={data?.level ?? ""}
              lessonsCount={
                data?.units.reduce((total, unit) => {
                  return total + unit.lessons.length;
                }, 0) ?? 0
              }
            />
          )}
          <Stack
            sx={{
              flexDirection: {
                xs: "column-reverse",
                sm: "column-reverse",
                md: "column-reverse",
                lg: "column-reverse",
                xl: "row",
              },
              gap: 6,
            }}
          >
            <ModulesListBlock />
            <CourseSidebar
              duration={"9"}
              grade="5th-10th Grade"
              lessons={data?.total_lessons ?? 0}
              level={data?.level ?? "-"}
            />
          </Stack>
        </Box>
      </Container>
    </>
  );
}
