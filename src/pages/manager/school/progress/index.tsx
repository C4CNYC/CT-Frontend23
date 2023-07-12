import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { Stack } from "@mui/system";
import { Container } from "@mui/material";

import { CustomBreadcrumbs } from "@components";

import { 
  getCountTakingElment,
  BaseResponseInterface, 
} from "@utils";

import { 
  useFilters,
  FilterMode, 
} from "@hooks";
import { RootState } from "src/redux/store";
import {
  useGetProgressQuery,
  useGetProgressContentQuery,
} from "src/redux/services/manager/progress-manager";
import {
  IProgress,
  IProgressChalanges,
} from "src/redux/services/interfaces/progress.interface";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { IStudent } from "src/redux/services/interfaces/user.interface";
import {
  SkeletonProgressTable,
  SkeletonProgressTableRow,
} from "@sections/dashboard/progress/progressTable/SkeletonProgressTable";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { useGetStudentsQuery } from "src/redux/services/manager/students-manager";
import ProgressTable from "@sections/dashboard/progress/progressTable/ProgressTable";
import FilterClassesAutocomplete from "@sections/dashboard/progress/filters/Classes";
import FilterCoursesAutocomplete from "@sections/dashboard/progress/filters/Courses";
import { ILessonContent } from "src/redux/services/interfaces/courseUnits.interface";

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
    },
    FilterMode.global
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
          heading="Progress"
          links={[
            {
              name: "Dashboard",
              href: MANAGER_PATH_DASHBOARD.root,
            },
            { name: "Progress", href: MANAGER_PATH_DASHBOARD.school.progress },
          ]}
        />
        <Stack
          direction="row"
          mb={3}
          sx={{ flexWrap: { xs: "wrap", sm: "wrap" }, gap: 3 }}
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
            <ProgressTable
              goBack={() => {
                if (filters.moduleId && filters.lessonId) {
                  setFilter("lessonId", "");
                } else if (filters.moduleId) {
                  setFilter("moduleId", "");
                }
              }}
              hasBackLink={!!filters.moduleId || !!filters.lessonId}
              hasNextLink={!filters.moduleId || !filters.lessonId}
              data={getProgressData(
                filters.moduleId,
                filters.lessonId,
                students?.data ?? [],
                progress?.data ?? [],
                content
              )}
              onSelectGroup={(groupId: string) => {
                if (!filters.moduleId) setFilter("moduleId", groupId);
                else if (!filters.lessonId) setFilter("lessonId", groupId);
              }}
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

function getProgressData(
  moduleId: string,
  lessonId: string,
  students: Array<IStudent & BaseResponseInterface>,
  progress: Array<IProgress & BaseResponseInterface>,
  contents?: IProgressChalanges
): IProgressTableData[] {
  if (!contents || !progress) return [];

  // show progress by chalanges
  if (moduleId && lessonId) {
    const findModuleIndex = contents.findIndex((c) => c.id === moduleId);
    const lesson = contents[findModuleIndex].lessons.find(
      (l) => l.id === lessonId
    );

    return students?.map((student) => ({
      y: student.email,
      x: !lesson
        ? []
        : lesson?.chalanges?.map((chalange) => ({
            id: chalange.id,
            name: chalange.title,
            type: "chalange",
            progress: progress
              .find(
                (progres) =>
                  progres.student.id === student.id &&
                  progres.unit.id === moduleId
              )
              ?.completed_chalanges?.find((c) => c.id === chalange.id)
              ? 100
              : 0,
          })),
    }));
  }

  // show progress by course or module level
  const data = students.map((student) => ({
    y: student.email,
    x:
      (moduleId
        ? contents.find((c) => c.id === moduleId)?.lessons
        : contents
      )?.map((content) => ({
        id: content.id,
        name: content.name,
        type: content.type,
        progress: getProgress(
          progress.find(
            (progres) =>
              progres.student.id === student.id &&
              progres.unit.id === (moduleId || content.id)
          ),
          content.chalanges
        ),
      })) ?? [],
  }));

  return data;
}

function getProgress(
  progres?: IProgress & BaseResponseInterface,
  chalanges?: Array<ILessonContent & BaseResponseInterface>
): number {
  if (!progres || !chalanges) return 0;
  const notReadyChalanges = _.difference(
    chalanges.map((c) => c.id),
    progres.completed_chalanges.map((c) => c.id)
  ).length;
  const countChalanges = chalanges.length;
  const readyChalanges = countChalanges - notReadyChalanges;

  return (readyChalanges * 100) / countChalanges;
}
