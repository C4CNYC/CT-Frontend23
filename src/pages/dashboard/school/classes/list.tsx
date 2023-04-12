import ConfirmDialog from "@components/confirm-dialog";
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import Iconify from "@components/iconify";
import Scrollbar from "@components/scrollbar";
import { useSettingsContext } from "@components/settings";
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from "@components/table";
import {
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
  Tooltip,
} from "@mui/material";
import SkeletonMembers from "@pages/dashboard/organization/members/SkeletonMembers";
import { PATH_DASHBOARD } from "@routes/paths";
import AddClassDialog from "@sections/dashboard/schools/classes/CreateClassDialog";
import { UserTableToolbar } from "@sections/dashboard/user/list";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFilters } from "src/hooks/useFilters";
import SchoolDashboardLayout from "src/layouts/dashboard/SchoolDashboardLayout";
import { ClassSearchParams } from "src/redux/services/interfaces/class.interface";
import {
  useCreateClassesMutation,
  useDeleteClassesMutation,
  useGetClassesQuery,
  useUpdateClassesMutation,
} from "src/redux/services/manager/classes-manager";
import { RootState } from "src/redux/store";
import { ClassesTableRow } from "src/sections/dashboard/classes/list";

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ["all"];

const TABLE_HEAD = [
  { id: "", label: "Icon" },
  { id: "name", label: "Name", align: "left" },
  { id: "total_students", label: "Total (Students)", align: "left" },
  { id: "total_students", label: "Total (Courses)", align: "left" },
  { id: "started_id", label: "Start date", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "" },
];

// ----------------------------------------------------------------------

UserListPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function UserListPage(): React.ReactElement {
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
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const { filters, setFilter, resetFilters } = useFilters<ClassSearchParams>({
    name: "",
  });

  const [updateClassByManager] = useUpdateClassesMutation();
  const [createClassByManager] = useCreateClassesMutation();
  const [deleteCasses] = useDeleteClassesMutation();
  const { data, isLoading } = useGetClassesQuery(
    { schoolId, ...filters },
    { skip: !schoolId }
  );

  const handleDeleteMember = async (classId: string): Promise<void> => {
    try {
      await deleteCasses({ classId, schoolId }).unwrap();
    } catch (e) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };

  const handleDeleteRow = (user_id: string): void => {
    handleDeleteMember(user_id);
    enqueueSnackbar("Member deleted");
  };

  const handleDeleteRows = (selected: string[]): void => {
    for (let i = 0; i < selected.length; i++) {
      handleDeleteMember(selected[i]);
    }
    enqueueSnackbar("Members deleted");
  };

  const handleEditRow = async (id: string, name: string): Promise<void> => {
    try {
      await updateClassByManager({ schoolId, classId: id, name }).unwrap();
      enqueueSnackbar("Class updated successfuly!");
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      console.error(error);
    }
  };

  const createClass = async (name: string): Promise<void> => {
    try {
      await createClassByManager({ schoolId, name }).unwrap();
      enqueueSnackbar(`School ${name} created successfuly!`);
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title> Classes | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Classes List"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Classes", href: PATH_DASHBOARD.school.classes },
            { name: "List" },
          ]}
          action={
            <AddClassDialog createClass={createClass}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Add Class
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
            filterName={filters.name ?? ""}
            onFilterName={(e: any) => {
              setFilter("name", e.target.value);
            }}
            onResetFilter={resetFilters}
          />
          <>
            <TableContainer sx={{ position: "relative", overflow: "unset" }}>
              <TableSelectedAction
                dense={dense}
                numSelected={selected.length}
                rowCount={data?.data.length ?? 0}
                onSelectAllRows={(checked) => {
                  onSelectAllRows(
                    checked,
                    data?.data.map((row) => row.id) as string[]
                  );
                }}
                action={
                  <Tooltip title="Delete">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setOpenConfirm(true);
                      }}
                    >
                      <Iconify icon="eva:trash-2-outline" />
                    </IconButton>
                  </Tooltip>
                }
              />

              <Scrollbar>
                <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={data?.data.length}
                    numSelected={selected.length}
                    onSort={onSort}
                    onSelectAllRows={(checked) => {
                      onSelectAllRows(
                        checked,
                        data?.data.map((row) => row.id) as string[]
                      );
                    }}
                  />

                  <TableBody>
                    {isLoading
                      ? [...Array(5)].map((item, i) => (
                          <SkeletonMembers key={i} />
                        ))
                      : data?.data.map((row) => (
                          <ClassesTableRow
                            key={row.id}
                            row={row}
                            selected={selected.includes(row.id)}
                            onSelectRow={() => {
                              onSelectRow(row.id);
                            }}
                            onDeleteRow={() => {
                              handleDeleteRow(row.id);
                            }}
                            onEditRow={handleEditRow}
                          />
                        ))}

                    <TableEmptyRows
                      height={dense ? 52 : 72}
                      emptyRows={emptyRows(
                        page,
                        rowsPerPage,
                        data?.data.length ?? 0
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
              rowsPerPage={data?.meta.take ?? 0}
              onPageChange={(e: any, page: number) => {
                setFilter("page", page + 1);
              }}
              onRowsPerPageChange={(e: any) => {
                setFilter("take", e.target.value);
              }}
              dense={dense}
              onChangeDense={onChangeDense}
            />
          </>
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={() => {
          setOpenConfirm(false);
        }}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong>{" "}
            items?
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
