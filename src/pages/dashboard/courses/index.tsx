import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import Iconify from "@components/iconify";
import { useSettingsContext } from "@components/settings";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import { Box, Button, CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import FilterCourses from "@pages/dashboard/courses/filter";
import { PATH_DASHBOARD } from "@routes/paths";
import { CourseCard } from "@sections/dashboard/courses/cards";
import CreateCourseDialog from "@sections/dashboard/courses/CreateCourseDialog";
import Head from "next/head";
import { useGetCourseQuery } from "../../../redux/services/manager/courses-manager";

// ----------------------------------------------------------------------

CoursesListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function CoursesListPage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetCourseQuery();

  if (isLoading) return <CircularProgress/>;

  return (
    <>
      <Head>
        <title> Courses | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Courses"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Courses", href: PATH_DASHBOARD.courses.root },
          ]}
          action={
            <CreateCourseDialog>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Add Course
              </Button>
            </CreateCourseDialog>
          }
        />
        <FilterCourses />
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
        >
          {data?.data.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </Box>
      </Container>
    </>
  );
}
