import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import Iconify from "@components/iconify";
import { useSettingsContext } from "@components/settings";
import { FilterMode, useFilters } from "@hooks/useFilters";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import FilterLessons from "@pages/dashboard/lessons/filter";
import { PATH_DASHBOARD } from "@routes/paths";
import CreateLessonDialog from "@sections/dashboard/lessons/CreateLessonDialog";
import LessonCard from "@sections/dashboard/lessons/LessonCard";
import Head from "next/head";
import { ILessonSearchParams } from "src/redux/services/interfaces/courseUnits.interface";
import { useGetLessonsQuery } from "src/redux/services/manager/lessons-manager";

// ----------------------------------------------------------------------

LessonsListPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function LessonsListPage(): React.ReactElement {
  const { filters, setFilter } = useFilters<ILessonSearchParams>(
    {
      module_id: "",
      name: "",
    },
    FilterMode.global
  );
  const { themeStretch } = useSettingsContext();
  const { data, isLoading, isFetching } = useGetLessonsQuery(filters, {
    skip: !filters,
  });

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <Head>
        <title> Lessons List | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Lessons List"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Lessons", href: PATH_DASHBOARD.lessons.root },
            { name: "List" },
          ]}
          action={
            <CreateLessonDialog>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{ mr: 2 }}
              >
                Create Lesson
              </Button>
            </CreateLessonDialog>
          }
        />

        <FilterLessons filters={filters} setFilter={setFilter} />

        {isFetching
? (
          <CircularProgress />
        )
: (
          <Box
            gap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              md: "repeat(3, 1fr)",
            }}
          >
            {data?.data.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}
