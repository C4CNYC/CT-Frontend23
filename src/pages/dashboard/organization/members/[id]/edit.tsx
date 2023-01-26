import { paramCase } from "change-case";
// next
import Head from "next/head";
import { useRouter } from "next/router";
// @mui
import { Container } from "@mui/material";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import { useSettingsContext } from "src/components/settings";
import DashboardLayout from "src/layouts/dashboard";
import { PATH_DASHBOARD } from "src/routes/paths";
import UserNewEditForm from "src/sections/@dashboard/user/UserNewEditForm";
import { _userList } from "src/_mock/arrays";
import { useGetOrgMemberQuery } from "src/redux/services/admin";
import { RootState, useSelector } from "src/redux/store";

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const org_id = useSelector(
    (state: RootState) => state.global.org_id
  );
  const {
    query: { id },
  } = useRouter();
  const { themeStretch } = useSettingsContext();

  const { data } = useGetOrgMemberQuery(
    {
      org_id: org_id,
      user_id: id as string,
    },
    { skip: !org_id }
  );

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
