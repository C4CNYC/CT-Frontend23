// next
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import { useSettingsContext } from "@components/settings";
import DashboardLayout from "@layouts/dashboard";
import { Container } from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import UserNewEditForm from "@sections/dashboard/user/UserNewEditForm";
import Head from "next/head";

// ----------------------------------------------------------------------

UserCreatePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function UserCreatePage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> User: Create a new user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Create a new user"
          links={[
            {
              name: "Organization",
              href: PATH_DASHBOARD.organization.root,
            },
            {
              name: "Members",
              href: PATH_DASHBOARD.organization.members,
            },
            { name: "New user" },
          ]}
        />
        <UserNewEditForm />
      </Container>
    </>
  );
}
