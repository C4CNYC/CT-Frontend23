import Head from "next/head";

import { Box, Button, Container } from "@mui/material";

import {
  CustomBreadcrumbs,
  Iconify,
  SimpleInfiniteList,
  useSettingsContext,
} from "@components";
import { DEFAULT_TAKE_PER_PAGE, FilterMode, useFilters } from "@hooks";
import DashboardLayout from "@layouts/dashboard";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import CreateLesson from "@sections/dashboard/lessons/CreateLessonDialog/CreateLesson";
import LessonCard from "@sections/dashboard/lessons/LessonCard";
import LessonStepMain from "@sections/dashboard/lessons/LessonStep/LessonStepMain";
import SkeletonList, {
  DefaultSkeletonItem,
} from "@sections/dashboard/skeleton/skeletonList";
import { getCountTakingElment } from "@utils";
import { ILessonSearchParams } from "src/redux/services/interfaces/courseUnits.interface";
import { useGetLessonsQuery } from "src/redux/services/manager/lessons-manager";
import { useTranslate } from "src/utils/translateHelper";

import FilterLessons from "./filter";
import SkeletonLesson from "./skeletonLesson";

LessonsListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function LessonsListPage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const translate = useTranslate();
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
        <title> {translate("lessons_list")} | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading=""
          links={[
            {
              name: translate("home"),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            {
              name: translate("lessons"),
              href: MANAGER_PATH_DASHBOARD.lessons.root,
            },
          ]}
          action={
            <CreateLesson>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{ mr: 2 }}
              >
                {translate("lessons_create_lesson")}
              </Button>
            </CreateLesson>
          }
        />

        <FilterLessons filters={filters} setFilter={setFilter} />

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
              if (data?.meta.take !== Number(filters?.take)) return;
              setFilter("take", Number(filters.take) + DEFAULT_TAKE_PER_PAGE);
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
                    Number(data?.meta?.itemCount),
                    Number(filters.take)
                  )
                )
                  .fill(null)
                  .map((v, i) => <DefaultSkeletonItem key={i} />)
              : null}
          </SimpleInfiniteList>
        </Box>
        <LessonStepMain />
      </Container>
    </>
  );
}
