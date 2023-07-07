import { useSettingsContext, CustomBreadcrumbs, SimpleInfiniteList, Iconify } from "@components";
import {
  DEFAULT_TAKE_PER_PAGE,
  FilterMode,
  useFilters,
} from "@hooks";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import { Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import { CourseCard } from "@sections/dashboard/courses/cards";
import CreateCourseDialog from "@sections/dashboard/courses/CreateCourseDialog";
import FilterCourses from "@sections/dashboard/courses/filter";
import SkeletonCourses from "@sections/dashboard/courses/skeletonCourses";
import SkeletonList from "@sections/dashboard/skeleton/skeletonList";
import Head from "next/head";
import { ICourseSearchParams } from "src/redux/services/interfaces/courseUnits.interface";
import { getCountTakingElment } from "@utils";
import { useGetCourseQuery } from "src/redux/services/manager/courses-manager";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";

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

  if (isLoading) {
    return (
      <SkeletonList item={<SkeletonCourses />} count={DEFAULT_TAKE_PER_PAGE} />
    );
  }
  return (
    <>
      <Head>
        <title> Courses | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Courses"
          links={[
            { name: "Dashboard", href: STUDENT_PATH_DASHBOARD.root },
            { name: "Courses", href: STUDENT_PATH_DASHBOARD.courses.root },
          ]}
          action={
            <CreateCourseDialog id="">
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
            if (data?.meta.take !== filters?.take) return;
            setFilter("take", Number(filters.take) + DEFAULT_TAKE_PER_PAGE);
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
            {isFetching
              ? Array(
                  getCountTakingElment(
                    Number(data.meta.itemCount),
                    Number(filters.take)
                  )
                )
                  .fill(null)
                  .map((v, i) => <SkeletonCourses key={i} />)
              : null}
          </Box>
        </SimpleInfiniteList>
      </Container>
    </>
  );
}
