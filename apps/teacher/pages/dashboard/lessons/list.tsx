import { useSettingsContext, SimpleInfiniteList, Iconify, CustomBreadcrumbs } from "@ct-nx/components";
import {
  DEFAULT_TAKE_PER_PAGE,
  FilterMode,
  useFilters,
} from "@ct-nx/hooks";
import DashboardLayout from "@layouts/dashboard";
import { Box, Button, Container } from "@mui/material";
import FilterLessons from "@pages/dashboard/lessons/filter";
import { PATH_DASHBOARD } from "@routes/paths";
import CreateLesson from "@sections/dashboard/lessons/CreateLessonDialog/CreateLesson";
import LessonCard from "@sections/dashboard/lessons/LessonCard";
import LessonStepMain from "@sections/dashboard/lessons/LessonStep/LessonStepMain";
import Head from "next/head";
import { ILessonSearchParams } from "src/redux/services/interfaces/courseUnits.interface";
import { useGetLessonsQuery } from "src/redux/services/manager/lessons-manager";
import { getCountTakingElment } from "@ct-nx/utils";
import SkeletonList, {
  DefaultSkeletonItem,
} from "@sections/dashboard/skeleton/skeletonList";
import SkeletonLesson from "./skeletonLesson";

// ----------------------------------------------------------------------

LessonsListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function LessonsListPage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const { filters, setFilter } = useFilters<ILessonSearchParams>(
    {
      module_id: "",
      name: "",
    },
    FilterMode.global
  );

  const { data, isLoading, isFetching } = useGetLessonsQuery(filters);

  if (isLoading) {
    return <SkeletonList filter={2} count={DEFAULT_TAKE_PER_PAGE} />;
  }

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
            <CreateLesson>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{ mr: 2 }}
              >
                Create Lesson
              </Button>
            </CreateLesson>
          }
        />

        <FilterLessons filters={filters} setFilter={setFilter} />

        {isFetching ? (
          <SkeletonLesson />
        ) : (
          <Box
            gap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
          >
            <SimpleInfiniteList
              hasNextPage={data?.meta.hasNextPage ?? false}
              onLoadMore={() => {
                // if (data?.meta.take !== filters?.take) return;
                // setFilter("take", Number(filters.take) + DEFAULT_TAKE_PER_PAGE);
              }}
              loading={isLoading ?? isFetching}
            >
              {data?.data.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
              {isFetching
                ? Array(
                    getCountTakingElment(
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-expect-error
                      Number(data?.meta?.itemCount),
                      Number(filters.take)
                    )
                  )
                    .fill(null)
                    .map((v, i) => <DefaultSkeletonItem key={i} />)
                : null}
            </SimpleInfiniteList>
          </Box>
        )}
        <LessonStepMain />
      </Container>
    </>
  );
}
