import Head from "next/head";

import { Container } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import { SchoolDashboardLayout } from "@layouts/dashboard/SchoolDashboardLayout";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import StudentNewEditForm from "@sections/dashboard/student/StudentNewEditForm";

// ----------------------------------------------------------------------

UserCreatePage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function UserCreatePage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Student: Create a new student </title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Create a new student"
          links={[
            {
              name: "School",
              href: MANAGER_PATH_DASHBOARD.school.general,
            },
            {
              name: "Students",
              href: MANAGER_PATH_DASHBOARD.school.students,
            },
            { name: "New student" },
          ]}
        />
        <StudentNewEditForm />
      </Container>
    </>
  );
}
