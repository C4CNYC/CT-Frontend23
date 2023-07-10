import { useSettingsContext } from "@components";
import { Container } from "@mui/system";
import DefaultClassInfo from "@sections/main/DefaultClassInfo";
import { useGetCourseQuery } from "src/redux/services/student/courses-manager";

import QuestsTable from "@sections/main/quests/QuestsTable";
import Head from "next/head";
import SchoolStudentDashboardLayout from "@layouts/dashboard/SchoolStudentDashboardLayout";

// ----------------------------------------------------------------------

HomeOverview.getLayout = (page: React.ReactElement) => (
  <SchoolStudentDashboardLayout>{page}</SchoolStudentDashboardLayout>
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
