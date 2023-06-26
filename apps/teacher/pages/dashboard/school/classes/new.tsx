import { useSettingsContext, CustomBreadcrumbs } from "@ct-nx/components";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { Container } from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import StudentNewEditForm from "@sections/dashboard/student/StudentNewEditForm";
import Head from "next/head";

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
        <title> Student: Create a new student | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Create a new student"
          links={[
            {
              name: "School",
              href: PATH_DASHBOARD.school.general,
            },
            {
              name: "Students",
              href: PATH_DASHBOARD.school.students,
            },
            { name: "New student" },
          ]}
        />
        <StudentNewEditForm />
      </Container>
    </>
  );
}
