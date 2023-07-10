import Head from "next/head";

import { Container } from "@mui/system";

import { useSettingsContext } from "@components";

import QuestsTable from "@sections/main/quests/QuestsTable";
import DefaultClassInfo from "@sections/main/DefaultClassInfo";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { useGetCourseQuery } from "src/redux/services/student/courses-manager";

HomeOverview.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

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
