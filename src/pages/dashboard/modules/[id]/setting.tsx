import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import { ModuleLessonsAutocomplete } from "@components/module-lessons-autocomplete";
import { useSettingsContext } from "@components/settings";
import DashboardLayout from "@layouts/dashboard";
import { Box, Card, Container, Typography } from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import Head from "next/head";

// ----------------------------------------------------------------------

ClassSettingPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
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
              name: "Module",
              href: PATH_DASHBOARD.school.modules,
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
              Lessons
            </Typography>
            <ModuleLessonsAutocomplete />
          </Card>
        </Box>
      </Container>
    </>
  );
}
