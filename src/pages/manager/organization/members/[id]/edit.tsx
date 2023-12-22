import Head from "next/head";
import { useRouter } from "next/router";

import { Container } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import DashboardLayout from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import UserNewEditForm from "@sections/dashboard/user/UserNewEditForm";
import { useGetOrgMemberQuery } from "src/redux/services/admin/members-admin";
import { useTranslate } from "src/utils/translateHelper";

UserEditPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function UserEditPage(): React.ReactElement {
  const {
    query: { id },
  } = useRouter();
  const { themeStretch } = useSettingsContext();
  const translate = useTranslate();

  const { data } = useGetOrgMemberQuery({
    user_id: id as string,
  });

  return (
    <>
      <Head>
        <title> {translate("members_user_edit_user")} </title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading=""
          links={[
            {
              name: translate("home"),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            { name: data?.email },
          ]}
        />

        <UserNewEditForm isEdit currentUser={data} />
      </Container>
    </>
  );
}
