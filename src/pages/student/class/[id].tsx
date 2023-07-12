import Head from "next/head";

import { Stack } from "@mui/material";
import { Container } from "@mui/system";

import { useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import DefaultClassInfo from "@sections/main/class-info/DefaultClassInfo";
import Notes from "@sections/main/main-notes/Notes";
import QuestsTable from "@sections/main/quests/QuestsTable";

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
        <Stack
          sx={{
            flexDirection: { lg: "row" },
          }}
        >
          <QuestsTable />
          <Notes />
        </Stack>
      </Container>
    </>
  );
}
