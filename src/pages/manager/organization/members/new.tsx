import Head from "next/head";

import { Container } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import DashboardLayout from "@layouts/dashboard";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import UserNewEditForm from "@sections/dashboard/user/UserNewEditForm";
import { useTranslate } from "src/utils/translateHelper";

UserCreatePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function UserCreatePage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const translate = useTranslate();

  return (
    <>
      <Head>
        <title> {translate("create_new_user")} </title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading=""
          links={[
            {
              name: translate("home"),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            {
              name: translate("members"),
              href: MANAGER_PATH_DASHBOARD.organization.members,
            },
            { name: translate("new_user") },
          ]}
        />
        <UserNewEditForm />
      </Container>
    </>
  );
}
