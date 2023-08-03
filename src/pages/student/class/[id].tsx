import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Skeleton, Stack } from "@mui/material";
import { Container } from "@mui/system";

import { useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import JoinTribeModal from "@sections/join-tribe/JoinTribeModal";
import DefaultClassInfo from "@sections/main/class-info/DefaultClassInfo";
import Notes from "@sections/main/main-notes/Notes";
import ClassInfoTable from "@sections/main/quests/ClassInfoTable";
import { useGetPublicTribeQuery } from "src/redux/services/public/tribe-public";
import { useGetClassQuery } from "src/redux/services/student/classes-manager";

HomeOverview.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function HomeOverview(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const { query, push, isReady } = useRouter();
  const { data, isLoading } = useGetClassQuery(
    { id: query.id as string },
    { skip: !query.id }
  );
  const { data: classInfo } = useGetPublicTribeQuery(
    {
      joinCode: query.joinCode as string,
    },
    { skip: !query.joinCode }
  );
  console.log(data);
  useEffect(() => {
    if (!data || !isReady) {
      return;
    }
    const queryParams: Record<string, any> = {
      schoolId: data?.school?.id as string,
    };
    if (query.joinCode) {
      queryParams.joinCode = query.joinCode;
    }
    push(STUDENT_PATH_DASHBOARD.class.id(query.id as string, queryParams));
  }, [data]);

  return (
    <>
      <Head>
        <title>Home Overview | Code Tribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"} disableGutters>
        {classInfo && <JoinTribeModal classInfo={classInfo} isSingIn={true} />}
        {!(isLoading || !data) ? (
          <>
            <DefaultClassInfo classData={data} />
            <Stack
              sx={{
                flexDirection: { lg: "row" },
              }}
            >
              <ClassInfoTable classData={data} />
              <Notes />
            </Stack>
          </>
        ) : (
          <Skeleton
            sx={{ width: "100%", height: "188px" }}
            variant="rectangular"
            animation="wave"
          />
        )}
      </Container>
    </>
  );
}
