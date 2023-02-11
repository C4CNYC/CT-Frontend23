// next
import Head from "next/head";
// @mui
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../../routes/paths";
// components
import { useSettingsContext } from "../../../../components/settings";
import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
// sections
import SchoolDashboardLayout from "src/layouts/dashboard/SchoolDashboardLayout";

// ----------------------------------------------------------------------

ClassSettingPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function ClassSettingPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Class Setting: CodeTribe UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Class Setting"
          links={[
            {
              name: "Class",
              href: PATH_DASHBOARD.school.classes,
            },
            { name: "Setting" },
          ]}
        />
      </Container>
    </>
  );
}
