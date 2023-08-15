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
        <QuestRating courseId="" courseName="" />
      </Container>
    </>
  );
}
