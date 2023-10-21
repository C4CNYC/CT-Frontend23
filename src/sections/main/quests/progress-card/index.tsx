// import Head from "next/head";
// import { useRouter } from "next/router";
// import { getProgressData } from "@pages/manager/school/progress";
// import _ from "lodash";

// import { Container } from "@mui/material";
// import { Stack } from "@mui/system";

// import { CustomBreadcrumbs } from "@components";
// import { FilterMode, useFilters } from "@hooks";
// import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
// import FilterClassesAutocomplete from "@sections/dashboard/progress/filters/Classes";
// import FilterCoursesAutocomplete from "@sections/dashboard/progress/filters/Courses";
// import ProgressTable from "@sections/dashboard/progress/progressTable/ProgressTable";
// import {
//   SkeletonProgressTable,
//   SkeletonProgressTableRow,
// } from "@sections/dashboard/progress/progressTable/SkeletonProgressTable";
// import { getCountTakingElment } from "@utils";
// import {
//   useGetProgressContentQuery,
//   useGetProgressQuery,
// } from "src/redux/services/manager/progress-manager";
// import { useGetStudentsQuery } from "src/redux/services/manager/students-manager";
// import { useGetClassStudentsQuery } from "src/redux/services/manager/classes-student";

interface IProgressCardProps {
  activeTab: boolean;
}

export default function ProgressCard({
  activeTab,
}: IProgressCardProps): React.ReactElement {
  return <></>;
  // const { query } = useRouter();
  // const { filters, setFilter } = useFilters({
  //   courseId: "",
  //   classId: "",
  //   moduleId: "",
  //   lessonId: "",
  // });

  // const { data: students, isLoading } = useGetClassStudentsQuery(
  //   {
  //     id: query.id as string,
  //   },
  //   { skip: !query.id || !activeTab }
  // );
  // const { data: content, isLoading: isLoadingContent } =
  //   useGetProgressContentQuery(
  //     {
  //       id: query.courseId as string,
  //     },
  //     { skip: !activeTab }
  //   );
  // const { data: progress } = useGetProgressQuery(
  //   {
  //     id: query.courseId as string,
  //   },
  //   { skip: !activeTab }
  // );

  // return (
  //   <>
  //     <Stack
  //       direction="row"
  //       mb={3}
  //       sx={{
  //         flexWrap: { xs: "wrap", sm: "wrap" },
  //         gap: 3,
  //         "& .MuiStack-root, & .MuiAutocomplete-root": {
  //           width: {
  //             xs: "100% !important",
  //             sm: "260px !important",
  //             md: "260px !important",
  //             lg: "260px !important",
  //           },
  //         },
  //       }}
  //     >
  //       <FilterCoursesAutocomplete
  //         courseId={filters.courseId ?? query.courseId}
  //         setCourse={(courseId: string) => {
  //           setFilter("courseId", courseId);
  //         }}
  //       />
  //       <FilterClassesAutocomplete
  //         classId={filters.classId ?? query.classId}
  //         setClass={(classId: string) => {
  //           setFilter("classId", classId);
  //         }}
  //       />
  //     </Stack>
  //     {isLoading ? (
  //       <SkeletonProgressTable />
  //     ) : (
  //       <>
  //         <ProgressTable
  //           goBack={() => {
  //             if (filters.moduleId && filters.lessonId) {
  //               setFilter("lessonId", "");
  //             } else if (filters.moduleId) {
  //               setFilter("moduleId", "");
  //             }
  //           }}
  //           hasBackLink={!!filters.moduleId || !!filters.lessonId}
  //           hasNextLink={!filters.moduleId || !filters.lessonId}
  //           data={getProgressData(
  //             filters.moduleId,
  //             filters.lessonId,
  //             students?.data ?? [],
  //             progress?.data ?? [],
  //             content
  //           )}
  //           onSelectGroup={(groupId: string) => {
  //             if (!filters.moduleId) setFilter("moduleId", groupId);
  //             else if (!filters.lessonId) setFilter("lessonId", groupId);
  //           }}
  //         />
  //         {isLoadingContent
  //           ? Array(
  //               getCountTakingElment(
  //                 Number(students?.meta.itemCount),
  //                 Number(filters.take)
  //               )
  //             )
  //               .fill(null)
  //               .map((v, i) => <SkeletonProgressTableRow key={i} />)
  //           : null}
  //       </>
  //     )}
  //   </>
  // );
}
