import Head from "next/head";

import { Container } from "@mui/system";

import { useSettingsContext } from "@components";
import { SchoolDashboardLayout } from "@layouts/dashboard/SchoolDashboardLayout";
import DefaultClassInfo from "@sections/main/DefaultClassInfo";
import QuestsTable from "@sections/main/quests/QuestsTable";
import { useGetCourseQuery } from "src/redux/services/student/courses-manager";

// ----------------------------------------------------------------------

HomeOverview.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function HomeOverview(): React.ReactElement {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Home Overview | Code Tribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"} disableGutters>
        <DefaultClassInfo />
        <QuestsTable />
      </Container>
    </>
  );
}
