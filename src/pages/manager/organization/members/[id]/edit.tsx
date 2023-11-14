import Head from "next/head";
import { useRouter } from "next/router";

import { Container } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import DashboardLayout from "@layouts/dashboard";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import UserNewEditForm from "@sections/dashboard/user/UserNewEditForm";
import { useGetOrgMemberQuery } from "src/redux/services/admin/members-admin";

UserEditPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function UserEditPage(): React.ReactElement {
  const {
    query: { id },
  } = useRouter();
  const { themeStretch } = useSettingsContext();

  const { data } = useGetOrgMemberQuery({
    user_id: id as string,
  });

  return (
    <>
      <Head>
        <title> User: Edit user </title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading=""
          links={[
            { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
            { name: data?.email },
          ]}
        />

        <UserNewEditForm isEdit currentUser={data} />
      </Container>
    </>
  );
}
