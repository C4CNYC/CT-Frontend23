// next
import Head from "next/head";
import { useRouter } from "next/router";
// @mui
import { useSettingsContext, CustomBreadcrumbs } from "@components";
import { Container } from "@mui/material";
import DashboardLayout from "@layouts/dashboard";
import { useGetOrgMemberQuery } from "src/redux/services/admin/members-admin";
import UserNewEditForm from "@sections/dashboard/user/UserNewEditForm";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

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
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Edit user"
          links={[
            {
              name: "Dashboard",
              href: MANAGER_PATH_DASHBOARD.root,
            },
            { name: data?.email },
          ]}
        />

        <UserNewEditForm isEdit currentUser={data} />
      </Container>
    </>
  );
}
