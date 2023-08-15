import Head from "next/head";
import { useRouter } from "next/router";

import { Skeleton } from "@mui/material";
import { Container } from "@mui/system";

import { useSettingsContext } from "@components";
import { SchoolDashboardLayout } from "@layouts/dashboard/SchoolDashboardLayout";
import DefaultClassInfo from "@sections/main/class-info/DefaultClassInfo";
import QuestsTable from "@sections/main/quests/ClassInfoTable";
import { useGetClassQuery } from "src/redux/services/manager/classes-student";

HomeOverview.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

export default function HomeOverview(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const { query } = useRouter();
  const { data, isLoading } = useGetClassQuery(
    { id: query.id as string },
    { skip: !query.id }
  );

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
        <title>Home | Code Tribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"} disableGutters>
        <DefaultClassInfo classData={data} />
        <QuestsTable classData={data} />
      </Container>
    </>
  );
}
