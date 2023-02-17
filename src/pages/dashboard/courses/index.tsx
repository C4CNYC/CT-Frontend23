import { useState } from "react";
//next
import Head from "next/head";
//path
import { PATH_DASHBOARD } from "src/routes/paths";
import SchoolDashboardLayout from "src/layouts/dashboard/SchoolDashboardLayout";
import { Container } from "@mui/system";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import AddClassDialog from "src/sections/@dashboard/schools/CreateClassDialog";
import {
  Button,
  Card,
  Divider,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
  Tooltip,
} from "@mui/material";
import { UserTableToolbar } from "src/sections/@dashboard/user/list";
import { useFilters } from "src/hooks/useFilters";
import { ClassSearchParams } from "src/redux/services/interfaces/class.interface";
import { useSettingsContext } from "src/components/settings";
import TableSelectedAction from "src/components/table/TableSelectedAction";
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from "src/components/table";
import {
  useCreateClassesMutation,
  useDeleteClassesMutation,
  useGetClassesQuery,
  useUpdateClassesMutation,
} from "src/redux/services/manager";
import Iconify from "src/components/iconify";
import { RootState } from "src/redux/store";
import { useSelector } from "react-redux";
import { useSnackbar } from "src/components/snackbar";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import { ClassesTableRow } from "src/sections/@dashboard/classes/list";
import ConfirmDialog from "src/components/confirm-dialog";
import DashboardLayout from "src/layouts/dashboard/DashboardLayout";

const STATUS_OPTIONS = ["all"];
const TABLE_HEAD = [
  { id: "", label: "icon" },
  { id: "name", label: "name", align: "left" },
  { id: "total_students", label: "Total (Students)" },
  { id: "started_id", label: "Start Date", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "" },
];
// ----------------------------------------------------------------------

CoursesListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function CoursesListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
  } = useTable();

  const [openConfirm, setOpenConfirm] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
  const school_id = useSelector((state: RootState) => state.manager.school_id);
  const { filters, setFilter, resetFilters } = useFilters<ClassSearchParams>({
    name: "",
  });

  const [updateClassByManager] = useUpdateClassesMutation();
  const [createClassByManager] = useCreateClassesMutation();
  const [deleteCasses] = useDeleteClassesMutation();
  const { data, isLoading } = useGetClassesQuery(
    { school_id, ...filters },
    { skip: !school_id }
  );

  const handleDeleteMember = async (class_id: string) => {
    try {
      await deleteCasses({ class_id, school_id }).unwrap();
    } catch (e) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };

  const handleDeleteRow = (user_id: string) => {
    handleDeleteMember(user_id);
    enqueueSnackbar("Member deleted");
  };

  const handleDeleteRows = (selected: string[]) => {
    for (let i = 0; i < selected.length; i++) {
      handleDeleteMember(selected[i]);
    }
    enqueueSnackbar("Members deleted");
  };

  const handleEditRow = async (id: string, name: string) => {
    try {
      await updateClassByManager({ school_id, class_id: id, name }).unwrap();
      enqueueSnackbar(`Class updated successfuly!`);
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      console.error(error);
    }
  };

  const createClass = async (name: string) => {
    try {
      await createClassByManager({ school_id, name }).unwrap();
      enqueueSnackbar(`School ${name} created successfuly!`);
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title> Courses | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Courses"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Courses", href: PATH_DASHBOARD.courses.root },
          ]}
          action={
            <AddClassDialog createClass={createClass}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Add Courses
              </Button>
            </AddClassDialog>
          }
        />
        <Card>
          <Tabs
            value={"all"}
            onChange={() => ""}
            sx={{
              px: 2,
              bgcolor: "background.neutral",
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />
          <UserTableToolbar
            filterName={filters.name as string}
            onFilterName={(e) => {
              setFilter("name", e.target.value);
            }}
            onResetFilter={resetFilters}
          />
          <>
            <TableContainer>
              <TableSelectedAction
                dense={dense}
                numSelected={selected.length}
                rowCount={data?.data.length || 0}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    data?.data.map((row) => row.id) as string[]
                  )
                }
                action={
                  <Tooltip title="Delete">
                    <IconButton
                      color="primary"
                      onClick={() => setOpenConfirm(true)}
                    >
                      <Iconify icon="eva:trash-2-outline" />
                    </IconButton>
                  </Tooltip>
                }
              />
              <Scrollbar>
                <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
                  <TableHeadCustom
                    headLabel={TABLE_HEAD}
                    order={order}
                    orderBy={orderBy}
                    rowCount={data?.data.length}
                    numSelected={selected.length}
                    onSort={onSort}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        data?.data.map((row) => row.id) as string[]
                      )
                    }
                  />
                  <TableBody>
                    {data?.data.map((row) => (
                      <ClassesTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={handleEditRow}
                      />
                    ))}

                    <TableEmptyRows
                      height={dense ? 52 : 72}
                      emptyRows={emptyRows(
                        page,
                        rowsPerPage,
                        data?.data.length || 0
                      )}
                    />

                    <TableNoData
                      isNotFound={!data?.data.length && !isLoading}
                    />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
            <TablePaginationCustom
              count={data?.meta.itemCount ? data?.meta.itemCount : 0}
              page={data?.meta.page ? data?.meta.page - 1 : 0}
              rowsPerPage={data?.meta.take || 0}
              onPageChange={(e, page) => {
                setFilter("page", page + 1);
              }}
              onRowsPerPageChange={(e) => {
                setFilter("take", e.target.value);
              }}
              dense={dense}
              onChangeDense={onChangeDense}
            ></TablePaginationCustom>
          </>
        </Card>
      </Container>
      <ConfirmDialog
        open={openConfirm}
        title="Delete"
        onClose={() => setOpenConfirm(false)}
        content={
          <>
            Are you sure want to delete <strong>{selected.length}</strong>
            {""} items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              setOpenConfirm(false);
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
