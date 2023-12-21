import Head from "next/head";

import { Box, Container, Grid, Skeleton } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard/StudentDashboardLayout";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { SkeletonBreadcrumbs } from "@sections/dashboard/skeleton/skeletonBreadcrumbs";
import NotesList from "@sections/my-notes/NotesList";
import { useGetGoalsQuery } from "src/redux/services/manager/goals-student";
import { useTranslate } from "src/utils/translateHelper";

Goals.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function Goals(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const translate = useTranslate();
  const { data, isLoading } = useGetGoalsQuery({});

  if (isLoading || !data) {
    return (
      <>
        <Container>
          <Box maxWidth={"fit-content"}>
            <SkeletonBreadcrumbs />
          </Box>
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{
              width: "100%",
              height: "170px",
              mt: 2,
            }}
          />
        </Container>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{translate("notes_my")} | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading=""
          links={[
            {
              name: translate("home"),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            {
              name: translate("notes_my"),
              href: STUDENT_PATH_DASHBOARD.myNotes,
            },
          ]}
        />
        <Grid item xs={12} md={6} lg={8}>
          <NotesList list={data.data} />
        </Grid>
      </Container>
    </>
  );
}
