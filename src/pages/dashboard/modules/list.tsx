/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import Iconify from "@components/iconify";
import { useSettingsContext } from "@components/settings";
import { FilterMode, useFilters } from "@hooks/useFilters";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import FilterModules from "@pages/dashboard/modules/filter";
import { PATH_DASHBOARD } from "@routes/paths";
import CreateModuleDialog from "@sections/dashboard/modules/CreateModuleDialog";
import ModuleCard from "@sections/dashboard/modules/ModuleCard";
import Head from "next/head";
import { IModulesSearchParams } from "src/redux/services/interfaces/courseUnits.interface";
import { useGetModulesQuery } from "src/redux/services/manager/modules-manager";
import SkeletonList from "../../../sections/dashboard/skeleton/skeletonList";

// ----------------------------------------------------------------------

ModulesListPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function ModulesListPage(): React.ReactElement | string {
  const { themeStretch } = useSettingsContext();
  const { filters, setFilter } = useFilters<IModulesSearchParams>(
    {
      name: "",
      course_id: "",
    },
    FilterMode.global
  );
  const { data, isLoading, isFetching } = useGetModulesQuery(filters);

  if (isLoading) return <SkeletonList filter={2} />;

  return (
    <>
      <Head>
        <title> Modules | CodeTribe</title>
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
        <FilterModules filters={filters} setFilter={setFilter} />
        {isFetching ? (
          <CircularProgress />
        ) : (
          <Box
            gap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              md: "repeat(3, 1fr)",
            }}
          >
            {data?.data.map((module, index) => (
              // @ts-expect-error
              <ModuleCard key={index} module={module} />
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}
