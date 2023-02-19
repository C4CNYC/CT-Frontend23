// next
import Head from "next/head";
import { Container } from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import DashboardLayout from "@layouts/dashboard";
import { useSettingsContext } from "@components/settings";
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import UserNewEditForm from "@sections/dashboard/user/UserNewEditForm";

// ----------------------------------------------------------------------

UserCreatePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function UserCreatePage() {
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
