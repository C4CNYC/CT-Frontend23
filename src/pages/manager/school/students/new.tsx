// next
import Head from "next/head";

// @mui
import { Container } from "@mui/material";

// components
import { CustomBreadcrumbs, useSettingsContext } from "@components";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
// sections
import { SchoolDashboardLayout } from "src/layouts/dashboard/SchoolDashboardLayout";
import StudentNewEditForm from "src/sections/dashboard/student/StudentNewEditForm";

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
        <title> Create a new student | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading=""
          links={[
            { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
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
