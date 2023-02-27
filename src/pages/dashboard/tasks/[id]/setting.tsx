import { ClassMembersAutocomplete } from "@components/class-members-autocomplete";
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import { useSettingsContext } from "@components/settings";
import DashboardLayout from "src/layouts/dashboard";
import { Box, Card, Container, Typography } from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import Head from "next/head";

// ----------------------------------------------------------------------

TasksSettingPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function TasksSettingPage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Class Setting: CodeTribe UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Tasks Setting"
          links={[
            {
              name: "Task",
              href: PATH_DASHBOARD.tasks.root,
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
              Tasks mates
            </Typography>
            <ClassMembersAutocomplete />
            <Typography variant="h4" sx={{ mb: 4, mt: 8 }}>
              Tasks courses
            </Typography>
            <ClassMembersAutocomplete />
          </Card>
        </Box>
      </Container>
    </>
  );
}
