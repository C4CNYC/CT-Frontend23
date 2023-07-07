import { EmptyContent, useSettingsContext } from "@components";
import DashboardLayout from "@layouts/dashboard/";
import { Box, Grid, Link, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { PATH_DASHBOARD } from "@routes/paths";
import DefaultClassInfo from "@sections/main/DefaultClassInfo";
import { useGetCourseQuery } from "src/redux/services/student/courses-manager";

import ProjectList from "@sections/main/projectList";
import QuestsTable from "@sections/main/quests/QuestsTable";
import Head from "next/head";

// ----------------------------------------------------------------------

HomeOverview.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

const GET_COURSES = 2;

export default function HomeOverview(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetCourseQuery({ take: GET_COURSES });

  return (
    <>
      <Head>
        <title>Home Overview | Code Tribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"} disableGutters>
        {!isLoading && <DefaultClassInfo />}
        <QuestsTable />
      </Container>
    </>
  );
}
