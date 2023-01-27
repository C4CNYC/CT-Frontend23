import { useState } from "react";
import Head from "next/head";
import { Stack, Button, Container } from "@mui/material";
import { PATH_DASHBOARD } from "../../../routes/paths";
import DashboardLayout from "../../../layouts/dashboard";
import { _allFiles } from "../../../_mock/arrays";
import { IFile } from "../../../@types/file";
import ConfirmDialog from "../../../components/confirm-dialog";
import { fileFormat } from "../../../components/file-thumbnail";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { useSettingsContext } from "../../../components/settings";
import { useTable, getComparator } from "../../../components/table";
import { useDateRangePicker } from "../../../components/date-range-picker";
// sections
import {
  ContactsFilterName,
  ContactsGridView,
} from "../../../sections/@dashboard/contacts";

import AddContactsDialog from "../../../sections/@dashboard/contacts/portal/AddContactsDialog";

Contacts.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function Contacts() {
  const table = useTable({ defaultRowsPerPage: 10 });

  const {
    startDate,
    endDate,
    open: openPicker,
    onOpen: onOpenPicker,
    onClose: onClosePicker,
    onReset: onResetPicker,
    isSelected: isSelectedValuePicker,
    isError,
  } = useDateRangePicker(null, null);

  const { themeStretch } = useSettingsContext();

  const [filterName, setFilterName] = useState("");

  const [tableData, setTableData] = useState(_allFiles);

  const [filterType, setFilterType] = useState<string[]>([]);

  const [openConfirm, setOpenConfirm] = useState(false);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
    filterType,
    filterStartDate: startDate,
    filterEndDate: endDate,
    isError: !!isError,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    table.setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteItem = (id: string) => {
    const { page, setPage, setSelected } = table;
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <Head>
        <title> Contacts | Codetribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Contacts"
          links={[
            {
              name: "Organization",
              href: PATH_DASHBOARD.organization.contacts,
            },
            { name: "Contacts" },
          ]}
          action={<AddContactsDialog />}
        />
        <Stack
          spacing={2.5}
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-end", md: "center" }}
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <ContactsFilterName
            filterName={filterName}
            onFilterName={handleFilterName}
          />
        </Stack>
        <ContactsGridView
          table={table}
          data={tableData}
          dataFiltered={dataFiltered}
          onDeleteItem={handleDeleteItem}
          onOpenConfirm={handleOpenConfirm}
        />
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Archive"
        content={
          <>
            Are you sure want to delete{" "}
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
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterType,
  filterStartDate,
  filterEndDate,
  isError,
}: {
  inputData: IFile[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterType: string[];
  filterStartDate: Date | null;
  filterEndDate: Date | null;
  isError: boolean;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (file) => file.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterType.length) {
    inputData = inputData.filter((file) =>
      filterType.includes(fileFormat(file.type))
    );
  }

  return inputData;
}
