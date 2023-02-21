import { useState } from "react";
import Head from "next/head";
import {
  Button,
  Box,
  Container, IconButton
} from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import Iconify from "@components/iconify";
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import { useSettingsContext } from "@components/settings";
import { useFilters } from "@hooks/useFilters";
import {
  useCreateClassesMutation,
  useDeleteClassesMutation,
  useGetClassesQuery, useGetModulesQuery, useGetMySchoolsQuery
} from "src/redux/services/manager";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useSnackbar } from "notistack";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { ClassSearchParams } from "src/redux/services/interfaces/class.interface";
import { useUpdateClassesMutation } from "src/redux/services/manager";
import ModuleCard from "@sections/dashboard/modules/ModuleCard";
import CreateModuleDialog from "@sections/dashboard/modules/CreateModuleDialog";
import { _socials } from "../../../_mock/arrays";
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

ModulesListPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function ModulesListPage() {
  const [openConfirm, setOpenConfirm] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
  const school_id = useSelector((state: RootState) => state.manager.school_id);
  const { filters, setFilter, resetFilters } = useFilters<ClassSearchParams>({
    name: ""
  });

  const { data, isLoading } = useGetModulesQuery();

  // const handleDeleteMember = async (class_id: string) => {
  //   try {
  //     await deleteCasses({ class_id, school_id }).unwrap();
  //   } catch (e) {
  //     enqueueSnackbar(e.data.message, {
  //       variant: "error"
  //     });
  //   }
  // };


  const createModule = async (data: string) => {
    console.log("create module");
  };

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
            { name: "List" }
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

        <Box
          gap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)"
          }}
        >
          {data?.data.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              // selected={selected.includes("folder.id")}
              onSelect={() => console.log("qwe")}
              onDelete={() => console.log("qwe")}

            />
          ))}

        </Box>
      </Container>
    </>
  );
}
