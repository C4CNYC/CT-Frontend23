import Head from "next/head";
import { Container } from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import { useSettingsContext } from "@components/settings";
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import StudentNewEditForm from "@sections/dashboard/student/StudentNewEditForm";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";

// ----------------------------------------------------------------------

UserCreatePage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function UserCreatePage() {
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
