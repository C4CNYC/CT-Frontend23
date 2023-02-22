import Head from "next/head";
import { Button, Box, Container } from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import Iconify from "@components/iconify";
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import { useSettingsContext } from "@components/settings";
import { useGetModulesQuery } from "src/redux/services/manager";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import ModuleCard from "@sections/dashboard/modules/ModuleCard";
import CreateModuleDialog from "@sections/dashboard/modules/CreateModuleDialog";
import FilterModules from "@pages/dashboard/modules/filter";

// ----------------------------------------------------------------------

ModulesListPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function ModulesListPage() {
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetModulesQuery();

  if (isLoading) return "loading";
  if (data.data.length === 0) return "no data";

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
