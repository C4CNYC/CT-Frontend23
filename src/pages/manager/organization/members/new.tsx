import Head from "next/head";

import { Container } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import DashboardLayout from "@layouts/dashboard";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import UserNewEditForm from "@sections/dashboard/user/UserNewEditForm";

UserCreatePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function UserCreatePage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Create a new user </title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading=""
          links={[
            { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
            {
              name: "Members",
              href: MANAGER_PATH_DASHBOARD.organization.members,
            },
            { name: "New user" },
          ]}
        />
        <UserNewEditForm />
      </Container>
    </>
  );
}
