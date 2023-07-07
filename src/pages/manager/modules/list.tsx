/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useSettingsContext, CustomBreadcrumbs, SimpleInfiniteList, Iconify } from "@components";
import {
  DEFAULT_TAKE_PER_PAGE,
  FilterMode,
  useFilters,
} from "@hooks";
import DashboardLayout from "@layouts/dashboard";
import { Box, Button, Container } from "@mui/material";
import CreateModuleDialog from "@sections/dashboard/modules/CreateModuleDialog";
import ModuleCard from "@sections/dashboard/modules/ModuleCard";
import Head from "next/head";
import { IModulesSearchParams } from "src/redux/services/interfaces/courseUnits.interface";
import { useGetModulesQuery } from "src/redux/services/manager/modules-manager";
// import { getCountTakingElment } from "src/utils/countTakingElments";
import SkeletonList, {
  DefaultSkeletonItem,
} from "@sections/dashboard/skeleton/skeletonList";
import FilterModules from "./filter";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";

// ----------------------------------------------------------------------

ModulesListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
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

  if (isLoading) {
    return <SkeletonList filter={2} count={DEFAULT_TAKE_PER_PAGE} />;
  }
  return (
    <>
      <Head>
        <title> Modules | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Modules List"
          links={[
            { name: "Dashboard", href: MANAGER_PATH_DASHBOARD.root },
            { name: "Modules", href: MANAGER_PATH_DASHBOARD.modules.root },
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
        <Box
          gap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
        >
          <SimpleInfiniteList
            hasNextPage={data?.meta.hasNextPage ?? false}
            onLoadMore={() => {
              if (data?.meta.take !== filters?.take) return;
              setFilter("take", Number(filters.take) + DEFAULT_TAKE_PER_PAGE);
            }}
            loading={isLoading ?? isFetching}
          >
            {data?.data.map((module, index) => (
              <ModuleCard key={index} module={module} />
            ))}
            {isFetching
              ? Array(3)
                  // getCountTakingElment(
                  //   Number(data.meta.itemCount),
                  //   Number(filters.take)
                  // )
                  .fill(null)
                  .map((v, i) => <DefaultSkeletonItem key={i} />)
              : null}
          </SimpleInfiniteList>
        </Box>
      </Container>
    </>
  );
}
