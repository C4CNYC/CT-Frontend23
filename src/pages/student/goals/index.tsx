import Head from "next/head";

import { Container, Grid, Skeleton } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard/StudentDashboardLayout";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import GoalsList from "@sections/goals/GoalsList";
import { useGetGoalsQuery } from "src/redux/services/student/goals-student";

Goals.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function Goals(): React.ReactElement {
  const { themeStretch } = useSettingsContext();

  const { data, isLoading } = useGetGoalsQuery({});
  if (isLoading || !data) {
    return <Skeleton />;
  }
  return (
    <>
      <Head>
        <title>Goals | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Goals"
          links={[
            { name: "Dashboard", href: STUDENT_PATH_DASHBOARD.root },
            { name: "Goals", href: STUDENT_PATH_DASHBOARD.goals },
          ]}
        />
        <Grid item xs={12} md={6} lg={8}>
          <GoalsList list={data.data} />
        </Grid>
      </Container>
    </>
  );
}
