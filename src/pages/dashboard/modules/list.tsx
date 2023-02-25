import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import Iconify from "@components/iconify";
import { useSettingsContext } from "@components/settings";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import FilterModules from "@pages/dashboard/modules/filter";
import { PATH_DASHBOARD } from "@routes/paths";
import CreateModuleDialog from "@sections/dashboard/modules/CreateModuleDialog";
import ModuleCard from "@sections/dashboard/modules/ModuleCard";
import Head from "next/head";
import { useGetModulesQuery } from "src/redux/services/manager/modules-manager";

// ----------------------------------------------------------------------

ModulesListPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function ModulesListPage(): React.ReactElement | string {
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetModulesQuery();

  if (isLoading) return <CircularProgress/>;
  if (data?.data?.length === 0) return "no data";

  return (
    <>
      <Head>
        <title> Classes | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Modules List"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Modules", href: PATH_DASHBOARD.modules.root },
            { name: "List" },
          ]}
          action={
            <CreateModuleDialog>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Create Module
              </Button>
            </CreateModuleDialog>
          }
        />
        <FilterModules />
        <Box
          gap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
          }}
        >
          {data?.data.map((module, index) => (
            <ModuleCard key={index} module={module} />
          ))}
        </Box>
      </Container>
    </>
  );
}
