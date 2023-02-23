import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import Iconify from "@components/iconify";
import SearchNotFound from "@components/search-not-found/SearchNotFound";
import { useSettingsContext } from "@components/settings";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import FilterLessons from "@pages/dashboard/lessons/filter";
import { PATH_DASHBOARD } from "@routes/paths";
import CreateLessonDialog from "@sections/dashboard/lessons/CreateLessonDialog";
import LessonCard from "@sections/dashboard/lessons/LessonCard";
import Head from "next/head";
import { useGetLessonsQuery } from "src/redux/services/manager";

// ----------------------------------------------------------------------

LessonsListPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function LessonsListPage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetLessonsQuery();

  if (isLoading) return <CircularProgress/>;
  if (data?.data.length === 0) return <SearchNotFound/>;

  return (
    <>
      <Head>
        <title> Classes | CodeTribe</title>
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
              >
                Create Lesson
              </Button>
            </CreateLessonDialog>
          }
        />

        <FilterLessons />
        <Box
          gap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
          }}
        >
          {data?.data.map((lesson) => (
            <LessonCard key={lesson?.id} lesson={lesson} active={false} name={""} description={""} />
          ))}
        </Box>
      </Container>
    </>
  );
}
