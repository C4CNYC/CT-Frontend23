// next
import Head from "next/head";
import { useRouter } from "next/router";
// @mui
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import { useSettingsContext } from "@components/settings";
import { Container } from "@mui/material";
import DashboardLayout from "src/layouts/dashboard";
import { useGetOrgMemberQuery } from "src/redux/services/admin";
import { PATH_DASHBOARD } from "src/routes/paths";
import UserNewEditForm from "src/sections/dashboard/user/UserNewEditForm";

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
              href: PATH_DASHBOARD.root,
            },
            { name: data?.email },
          ]}
        />

        <UserNewEditForm isEdit currentUser={data} />
      </Container>
    </>
  );
}
