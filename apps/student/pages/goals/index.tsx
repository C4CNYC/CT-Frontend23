import { useSettingsContext, CustomBreadcrumbs } from "@ct-nx/components";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import { Container, Grid, Skeleton } from "@mui/material";
import { PATH_MAIN } from "@routes/paths";
import GoalsList from "@sections/goals/GoalsList";
import Head from "next/head";
import { useGetGoalsQuery } from "src/redux/services/student/goals-student";

Goals.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
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
            { name: "Dashboard", href: PATH_MAIN.index },
            { name: "Goals", href: PATH_MAIN.goals },
          ]}
        />
        <Grid item xs={12} md={6} lg={8}>
          <GoalsList list={data.data} />
        </Grid>
      </Container>
    </>
  );
}
