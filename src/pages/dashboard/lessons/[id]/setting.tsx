import { ClassMembersAutocomplete } from "@components/class-members-autocomplete";
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import { useSettingsContext } from "@components/settings";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { Box, Card, Container, Typography } from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import Head from "next/head";

// ----------------------------------------------------------------------

ClassSettingPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function ClassSettingPage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Module Setting: CodeTribe UI</title>
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
