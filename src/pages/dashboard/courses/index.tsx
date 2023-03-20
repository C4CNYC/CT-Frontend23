import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import Iconify from "@components/iconify";
import SimpleInfiniteList from "@components/infinity-pagination/SimpleInfiniteList";
import { useSettingsContext } from "@components/settings";
import { FilterMode, useFilters } from "@hooks/useFilters";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import { Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import FilterCourses from "@pages/dashboard/courses/filter";
import { PATH_DASHBOARD } from "@routes/paths";
import { CourseCard } from "@sections/dashboard/courses/cards";
import CreateCourseDialog from "@sections/dashboard/courses/CreateCourseDialog";
import SkeletonList from "@sections/dashboard/skeleton/skeletonList";
import Head from "next/head";
import { ICourseSearchParams } from "src/redux/services/interfaces/courseUnits.interface";
import { useGetCourseQuery } from "../../../redux/services/manager/courses-manager";
import SkeletonCourses from "./skeletonCourses";

// ----------------------------------------------------------------------

CoursesListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function CoursesListPage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const { filters, setFilter } = useFilters<ICourseSearchParams>(
    {
      name: "",
      school_id: "",
    },
    FilterMode.global
  );
  const { data, isLoading, isFetching } = useGetCourseQuery(filters);

  if (isLoading) return <SkeletonList item={<SkeletonCourses />} filter={2} />;

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
        <FilterCourses filters={filters} setFilter={setFilter} />
        <SimpleInfiniteList
          hasNextPage={data?.meta.hasNextPage ?? false}
          onLoadMore={() => {
            setFilter("page", Number(filters.page) + 1);
          }}
          loading={isLoading ?? isFetching}
        >
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
        </SimpleInfiniteList>
      </Container>
    </>
  );
}
