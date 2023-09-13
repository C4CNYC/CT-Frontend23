import Head from "next/head";
import { useRouter } from "next/router";

import { Box, Container, Skeleton, Stack } from "@mui/material";

import { CustomBreadcrumbs } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import CourseInfo from "@sections/course/CourseInfo";
import CourseLayout from "@sections/course/CourseLayout";
import { useGetCoursContentQuery } from "src/redux/services/manager/courses-student";

CoursePage.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function CoursePage(): React.ReactElement {
  const router = useRouter();
  const { data, isLoading } = useGetCoursContentQuery(
    {
      id: router.query.id as string,
    },
    { skip: !router.query.id }
  );

  return (
    <>
      <Head>
        <title>Course | CodeTribe</title>
      </Head>
      <Container maxWidth={"xl"}>
        <CustomBreadcrumbs
          links={[
            { name: "Dashboard", href: STUDENT_PATH_DASHBOARD.root },
            { name: "Catalog", href: STUDENT_PATH_DASHBOARD.courses.root },
          ]}
        />
      </Container>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          borderRadius: 3,
          px: "20px",
          pt: { xs: 2, sm: 2, md: "35px" },
          pb: "187px",
          background: "#ECF4FF",
          mt: -2,
        }}
      >
        <Container maxWidth={"xl"}>
          {isLoading ? (
            <Stack>
              <Skeleton
                variant="rounded"
                sx={{
                  background: "#fff",
                  height: {
                    xs: "483px",
                    sm: "483px",
                    md: "250px",
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

          <CourseLayout course={data} isLoadingCourse={isLoading} />
        </Container>
      </Box>
    </>
  );
}
