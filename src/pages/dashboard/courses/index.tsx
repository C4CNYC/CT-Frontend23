import Head from "next/head";
import { PATH_DASHBOARD } from "@routes/paths";
import { Container } from "@mui/system";
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import CreateCourseDialog from "@sections/dashboard/courses/CreateCourseDialog";
import {
  Button, Box
} from "@mui/material";
import Iconify from "@components/iconify";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import { CourseCard } from "@sections/dashboard/courses/cards";
import { useSettingsContext } from "@components/settings";
import { useGetCourseQuery } from "../../../redux/services/manager";
import FilterCourses from "@pages/dashboard/courses/filter";

// ----------------------------------------------------------------------

CoursesListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function CoursesListPage() {
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetCourseQuery();

  if (isLoading) return "Loading";

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
            { name: "Courses", href: PATH_DASHBOARD.courses.root }
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
            md: "repeat(3, 1fr)"
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
