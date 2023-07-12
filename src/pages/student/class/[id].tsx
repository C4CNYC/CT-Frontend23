import { useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { Container } from "@mui/system";
import DefaultClassInfo from "@sections/main/class-info/DefaultClassInfo";
import QuestsTable from "@sections/main/quests/QuestsTable";
import Head from "next/head";

// ----------------------------------------------------------------------

HomeOverview.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
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
