import Head from "next/head";
import { useRouter } from "next/router";

import _ from "lodash";
import { useSelector } from "react-redux";

import { Container } from "@mui/material";
import { Stack } from "@mui/system";

import { CustomBreadcrumbs } from "@components";
import { FilterMode, useFilters } from "@hooks";
import { SchoolDashboardLayout } from "@layouts/dashboard/SchoolDashboardLayout";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import FilterClassesAutocomplete from "@sections/dashboard/progress/filters/Classes";
import FilterCoursesAutocomplete from "@sections/dashboard/progress/filters/Courses";
import ProgressTable from "@sections/dashboard/progress/progressTable/ProgressTable";
import {
  SkeletonProgressTable,
  SkeletonProgressTableRow,
} from "@sections/dashboard/progress/progressTable/SkeletonProgressTable";
import { BaseResponseInterface, getCountTakingElment } from "@utils";
import { ILessonContent } from "src/redux/services/interfaces/courseUnits.interface";
import {
  IProgress,
  IProgressChalanges,
} from "src/redux/services/interfaces/progress.interface";
import { IStudent } from "src/redux/services/interfaces/user.interface";
import {
  useGetProgressContentQuery,
  useGetProgressQuery,
} from "src/redux/services/manager/progress-manager";
import { useGetStudentsQuery } from "src/redux/services/manager/students-manager";
import { RootState } from "src/redux/store";

Progress.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

export interface IProgressTableData {
  y: string;
  x: Array<{
    id: string;
    name: string;
    type: string;
    progress: number;
  }>;
}

export enum ProgressLevel {
  module = "Module",
  lesson = "Lesson",
  chalanges = "Chalanges",
}

export default function Progress(): React.ReactElement {
  const { query } = useRouter();
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const { filters, setFilter } = useFilters(
    {
      courseId: "",
      classId: "",
      moduleId: "",
      lessonId: "",
    }
  );

  const { data: students, isLoading } = useGetStudentsQuery(
    {
      schoolId,
      class_id: filters.classId,
    },
    { skip: !filters.classId }
  );
  const { data: content, isLoading: isLoadingContent } =
    useGetProgressContentQuery({
      id: query.courseId as string,
    });
  const { data: progress } = useGetProgressQuery({
    id: query.courseId as string,
  });

  return (
    <>
      <Head>
        <title>Progress | CodeTribe </title>
      </Head>
      <Container sx={{ ml: 0 }}>
        <CustomBreadcrumbs
          heading=""
          links={[
            { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
            { name: "Progress", href: MANAGER_PATH_DASHBOARD.school.progress },
          ]}
        />
        <Stack
          direction="row"
          mb={3}
          sx={{
            flexWrap: { xs: "wrap", sm: "wrap" },
            gap: 3,
            "& .MuiStack-root, & .MuiAutocomplete-root": {
              width: {
                xs: "100% !important",
                sm: "260px !important",
                md: "260px !important",
                lg: "260px !important",
              },
            },
          }}
        >
          <FilterCoursesAutocomplete
            courseId={filters.courseId ?? query.courseId}
            setCourse={(courseId: string) => {
              setFilter("courseId", courseId);
            }}
          />
          <FilterClassesAutocomplete
            classId={filters.classId ?? query.classId}
            setClass={(classId: string) => {
              setFilter("classId", classId);
            }}
          />
        </Stack>
        {isLoading ? (
          <SkeletonProgressTable />
        ) : (
          <>
            {/* This page will be implemented later */}
            <ProgressTable
              filters={filters}
              setFilter={setFilter}
              data={[]}
              viewBy={{
                main: "course",
                user: "name",
              }}
              levelName={"course"}
            />
            {isLoadingContent
              ? Array(
                  getCountTakingElment(
                    Number(students?.meta.itemCount),
                    Number(filters.take)
                  )
                )
                  .fill(null)
                  .map((v, i) => <SkeletonProgressTableRow key={i} />)
              : null}
          </>
        )}
      </Container>
    </>
  );
}
