import Head from "next/head";
import { useRouter } from "next/router";

import { Container, Skeleton } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import QuestDescription from "@sections/quest/QuestDescription";
import QuestHeader from "@sections/quest/QuestHeader";
import QuestMain from "@sections/quest/QuestMain";
import QuestRating from "@sections/quest/QuestRating";
import { useGetAssignmentQuery } from "src/redux/services/manager/assignments-manager";
import { useGetMentorsQuery } from "src/redux/services/manager/class-mentor-manager";

Quest.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function Quest(): React.ReactElement | null {
  const { query } = useRouter();
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetAssignmentQuery(
    { schoolId: query.id as string, assignmentId: query.id as string },
    { skip: !query.id }
  );
  const { data: mentors } = useGetMentorsQuery(
    { schoolId: query.id as string, classId: query.id as string },
    { skip: !query.schoolId || !query.id }
  );

  if (isLoading || !data) {
    return <Skeleton />;
  }

  return (
    <>
      <Head>
        <title>Quest | CodeTribe</title>
      </Head>
      <Container
        maxWidth={themeStretch ? false : "lg"}
        sx={{ borderRadius: 1, background: "#F6F9FC", pt: 2, pb: 2 }}
      >
        <CustomBreadcrumbs
          heading="Quest"
          links={[
            { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
            { name: "Quest" },
          ]}
        />

        <QuestHeader />
        <QuestMain mentor={mentors?.data[0]} questName={data.name} />
        <QuestDescription description={data?.description} />
        <QuestRating name={data?.name} />
      </Container>
    </>
  );
}
