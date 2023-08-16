import Head from "next/head";
import { useRouter } from "next/router";

import { Container, Skeleton } from "@mui/material";

import { useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import QuestDescription from "@sections/quest/QuestDescription";
import QuestHeader from "@sections/quest/QuestHeader";
import QuestMain from "@sections/quest/QuestMain";
import QuestRating from "@sections/quest/QuestRating";
import { useGetAssignmentStudentQuery } from "src/redux/services/manager/assignments-student";
import { useGetCoursQuery } from "src/redux/services/manager/courses-student";

Quest.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function Quest(): React.ReactElement | null {
  const { query } = useRouter();
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetAssignmentStudentQuery(
    { assignmentId: query.id as string },
    { skip: !query.id }
  );

  const { data: course, isLoading: isLoadingCourse } = useGetCoursQuery(
    { id: data?.course.id as string },
    { skip: !data?.course.id }
  );

  if (isLoading || !data) {
    return <Skeleton variant="rounded" height="600px" />;
  }

  return (
    <>
      <Head>
        <title>Quest | CodeTribe</title>
      </Head>
      <Container
        maxWidth={themeStretch ? false : "lg"}
        sx={{ borderRadius: 1, background: "#F6F9FC", pt: 2, pb: 8 }}
      >
        <QuestHeader />
        <QuestMain questName={data.name} />
        <QuestDescription description={data?.description} />
        {isLoadingCourse ? (
          <Skeleton
            variant="rounded"
            sx={{ height: "98px", mt: 3, background: "#fff", borderRadius: 2 }}
          />
        ) : (
          <QuestRating
            courseId={course?.id ?? ""}
            courseName={course?.name ?? ""}
            progress={course?.progress ?? 0}
          />
        )}
      </Container>
    </>
  );
}
