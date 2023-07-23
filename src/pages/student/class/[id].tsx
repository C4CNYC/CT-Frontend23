import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Skeleton, Stack } from "@mui/material";
import { Container } from "@mui/system";

import { useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import DefaultClassInfo from "@sections/main/class-info/DefaultClassInfo";
import Notes from "@sections/main/main-notes/Notes";
import QuestsTable from "@sections/main/quests/QuestsTable";
import { useGetClassQuery } from "src/redux/services/student/classes-manager";

// ----------------------------------------------------------------------

HomeOverview.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

// ----------------------------------------------------------------------

export default function HomeOverview(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const { query, push, isReady } = useRouter();
  const { data, isLoading } = useGetClassQuery(
    { id: query.id as string },
    { skip: !query.id }
  );

  useEffect(() => {
    if (!data || !isReady) {
      return;
    }
    push(
      `${STUDENT_PATH_DASHBOARD.class.id(
        query.id as string
      )}?${new URLSearchParams({ schoolId: data.school.id })}`,
      undefined,
      { shallow: true }
    );
  }, [data]);
  if (isLoading || !data) {
    return (
      <Skeleton
        sx={{ width: "100%", height: "188px" }}
        variant="rectangular"
        animation="wave"
      />
    );
  }
  return (
    <>
      <Head>
        <title>Home Overview | Code Tribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"} disableGutters>
        <DefaultClassInfo data={data} />
        <Stack
          sx={{
            flexDirection: { lg: "row" },
          }}
        >
          <QuestsTable data={data} />
          <Notes />
        </Stack>
      </Container>
    </>
  );
}
