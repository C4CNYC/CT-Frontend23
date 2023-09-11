import Head from "next/head";

import { Container } from "@mui/system";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import DashboardLayout from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import ProfileEditForm from "@sections/profile/ProfileEditForm";
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
          heading=""
          links={[
            { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
            { name: data?.email },
          ]}
        />
        <ProfileEditForm currentUser={data} />
      </Container>
    </>
  );
}
