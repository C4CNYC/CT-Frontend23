import { useState } from "react";
// next
import Head from "next/head";
// @mui
import { Stack, Button, Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// layouts
import DashboardLayout from "../../../layouts/dashboard";
// _mock_
import { _allFiles } from "../../../_mock/arrays";
// @types
import { IFile } from "../../../@types/file";
// components;
import ConfirmDialog from "../../../components/confirm-dialog";
import { fileFormat } from "../../../components/file-thumbnail";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { useSettingsContext } from "../../../components/settings";
import { useTable, getComparator } from "../../../components/table";
// sections
import {
  FileFilterName,
  SchoolGridView,
} from "../../../sections/@dashboard/schools";

import AddSchoolDialog from '../../../sections/@dashboard/schools/portal/AddSchoolDialog'
import { useGetSchoolListQuery } from "src/redux/services/admin/admin";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";


Schools.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function Schools() {
  const organizationId = useSelector((state: RootState) => state.global.organizationId)
  const table = useTable({ defaultRowsPerPage: 10 });

  const { themeStretch } = useSettingsContext();

  const [filterName, setFilterName] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);

  const { data, isLoading } = useGetSchoolListQuery({ id: organizationId, name: filterName })

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    table.setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteItem = (id: string) => {};

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <Head>
        <title> Schools | Codetribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Schools"
          links={[
            {
              name: "Organizations",
              href: PATH_DASHBOARD.root,
            },
            { name: "Schools" },
          ]}
          action={
            <AddSchoolDialog />
          }
        />
        <Stack
          spacing={2.5}
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-end", md: "center" }}
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <FileFilterName
            filterName={filterName}
            onFilterName={handleFilterName}
          />
        </Stack>
        {
          isLoading || !data?.data ? null : (
            <SchoolGridView
              table={table}
              data={data?.data}
              onDeleteItem={handleDeleteItem}
            />
          )
        }
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Archive"
        content={
          <>
            Are you sure want to archive{" "}
            <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleCloseConfirm();
            }}
          >
            Archive
          </Button>
        }
      />
    </>
  );
}