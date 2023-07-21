import Head from "next/head";

import { Container } from "@mui/system";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import DashboardLayout from "@layouts/dashboard";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import ProfileEditForm from "@sections/profile/ProfileEditForm";
import { useProfileQuery } from "src/redux/services/auth";

Profile.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default function Profile(): React.ReactElement {
  const { data } = useProfileQuery();
  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Head>
        <title>Profile | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Profile"
          links={[
            { name: "Dashboard", href: MANAGER_PATH_DASHBOARD.root },
            { name: data?.email },
          ]}
        />
        <ProfileEditForm currentUser={data} />
      </Container>
    </>
  );
}
