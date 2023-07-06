import { CustomBreadcrumbs, useSettingsContext } from "@components";
import DashboardLayout from "@layouts/dashboard";
import { Container } from "@mui/system";
import { PATH_DASHBOARD } from "@routes/paths";
import ProfileEditForm from "@sections/profile/ProfileEditForm";
import Head from "next/head";
import { useProfileQuery } from "src/redux/services/auth";

Profile.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default function Profile() {
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
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: data?.email },
          ]}
        />
        <ProfileEditForm currentUser={data} />
      </Container>
    </>
  );
}
