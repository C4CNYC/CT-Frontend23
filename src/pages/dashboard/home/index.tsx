import { useSettingsContext } from "@components";
import DashboardLayout from "@layouts/dashboard/";
import { Container } from "@mui/system";
import DefaultClassInfo from "@sections/main/class-info/DefaultClassInfo";
import { useGetCourseQuery } from "src/redux/services/student/courses-manager";

import QuestsTable from "@sections/main/quests/QuestsTable";
import Head from "next/head";

// ----------------------------------------------------------------------

HomeOverview.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function HomeOverview(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  // const { data, isLoading } = useGetCourseQuery({ take: GET_COURSES });
  return (
    <>
      <Head>
        <title>Home Overview | Code Tribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"} disableGutters>
        {/* {!isLoading && <DefaultClassInfo />} */}
        <QuestsTable />
      </Container>
    </>
  );
}
