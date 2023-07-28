import Head from "next/head";
import { useRouter } from "next/router";

import { Container, Skeleton, Stack, Typography } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import QuestDescription from "@sections/quest/QuestDescription";
import QuestHeader from "@sections/quest/QuestHeader";
import QuestMain from "@sections/quest/QuestMain";
import { useGetAssignmentQuery } from "src/redux/services/manager/assignments-manager";

Quest.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

interface Props {
  schoolId: string;
}

export default function Quest({ schoolId }: Props): React.ReactElement {
  const { query } = useRouter();
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetAssignmentQuery(
    { schoolId, assignmentId: query.id as string },
    { skip: !query.id }
  );
  // if (isLoading || !data) {
  //   return <Skeleton />;
  // }
  return (
    <>
      <Head>
        <title>Quest | CodeTribe</title>
      </Head>
      <Container
        maxWidth={themeStretch ? false : "lg"}
        sx={{ borderRadius: 1, background: "#F6F9FC", pt: 2 }}
      >
        <CustomBreadcrumbs
          heading="Quest"
          links={[
            { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
            { name: "Quest" },
          ]}
        />

        <QuestHeader />
        <QuestMain />
        <QuestDescription />
      </Container>
    </>
  );
}
