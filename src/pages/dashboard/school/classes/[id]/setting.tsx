import Head from "next/head";
import { Card, Container, Typography, Box } from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import { useSettingsContext } from "@components/settings";
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { ClassMembersAutocomplete } from "@components/class-members-autocomplete";

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
        <Box
          gap={3}
          display="grid"
          gridTemplateRows={{ md: "repeat(2, 1fr)" }}
          sx={{ height: "100%" }}
        >
          <Card sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
              Class mates
            </Typography>
            <ClassMembersAutocomplete />
            <Typography variant="h4" sx={{ mb: 4, mt: 8 }}>
              Class courses
            </Typography>
            <ClassMembersAutocomplete />
          </Card>
        </Box>
      </Container>
    </>
  );
}
