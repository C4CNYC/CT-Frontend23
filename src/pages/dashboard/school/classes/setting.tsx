// next
import Head from "next/head";
// @mui
import { Card, Container, Typography, Box } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../../routes/paths";
// components
import { useSettingsContext } from "../../../../components/settings";
import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
// sections
import SchoolDashboardLayout from "src/layouts/dashboard/SchoolDashboardLayout";
import AddUserInput from "./AddUserInput";
import AddUserForm from "./AddUserForm";

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

      <Container maxWidth={themeStretch ? false : "lg"} sx={{ height: "100%" }}>
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
        <Box
          gap={3}
          display="grid"
          gridTemplateRows={{ md: "repeat(2, 1fr)" }}
          sx={{ height: "100%" }}
        >
          <Card sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
              Add someone to class
            </Typography>
            <AddUserForm />
            <Typography variant="h4" sx={{ mb: 4, mt: 8 }}>
              Add someone to class
            </Typography>
            <AddUserForm />
          </Card>
        </Box>
      </Container>
    </>
  );
}
