import ConfirmDialog from "@components/confirm-dialog";
import CustomAutocomplete from "@components/custom-autocomplete";
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import Iconify from "@components/iconify";
import Scrollbar from "@components/scrollbar";
import { useSettingsContext } from "@components/settings";
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableLoader,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from "@components/table";
import { useFilters } from "@hooks/useFilters";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
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
import { UserTableRow } from "@sections/dashboard/user/list";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useDeleteStudentMutation,
  useGetStudentsQuery,
} from "src/redux/services/manager/students-manager";
import { RootState } from "src/redux/store";

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ["all"];

const TABLE_HEAD = [
  { id: "", label: "Avatar" },
  { id: "email", label: "Email", align: "left" },
  { id: "first_name", label: "first name", align: "left" },
  { id: "last_name", label: "last name", align: "left" },
  { id: "isVerified", label: "Verified", align: "center" },
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
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
  } = useTable();

  const [openConfirm, setOpenConfirm] = useState(false);

  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const { filters, setFilter, resetFilters } = useFilters({
    name: "",
    class_id: "",
  });
  const [deleteStudent] = useDeleteStudentMutation();

  const { data, isLoading } = useGetStudentsQuery(
    { schoolId, ...filters },
    { skip: !schoolId }
  );

  const handleDeleteMember = async (studentId: string): Promise<void> => {
    try {
      await deleteStudent({ studentId, schoolId }).unwrap();
    } catch (e) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };

  const handleDeleteRow = (userId: string): void => {
    handleDeleteMember(userId);
    enqueueSnackbar("Member deleted");
    setSelected([]);
  };

  const handleDeleteRows = (selected: string[]): void => {
    for (let i = 0; i < selected.length; i++) {
      handleDeleteMember(selected[i]);
    }
    enqueueSnackbar("Members deleted");
    setSelected([]);
  };

  const handleEditRow = (id: string): void => {
    push(PATH_DASHBOARD.school.edit(id));
  };

  return (
    <>
      <Head>
        <title> Students | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Students"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Students", href: PATH_DASHBOARD.organization.root },
            { name: "List" },
          ]}
          action={
            <Button
              component={NextLink}
              href={PATH_DASHBOARD.school.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add Student
            </Button>
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

          <CustomAutocomplete
            filterName={filters.name}
            onFilterName={(name: string) => {
              setFilter("name", name);
            }}
            onFilterClass={(classId: string) => {
              setFilter("classId", classId);
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
                    onSelectAllRows={(checked: any) => {
                      onSelectAllRows(
                        checked,
                        data?.data.map((row) => row.id) as string[]
                      );
                    }}
                  />
                  <TableBody sx={{ minHeight: 12 }}>
                    {isLoading
                      ? [...Array(5)].map((item, i) => (
                          <SkeletonMembers key={i} />
                        ))
                      : data?.data.map((row) => (
                          <UserTableRow
                            loading={isLoading}
                            key={row.id}
                            row={row}
                            selected={selected.includes(row.id)}
                            onSelectRow={() => {
                              onSelectRow(row.id);
                            }}
                            onDeleteRow={() => {
                              handleDeleteRow(row.id);
                            }}
                            onEditRow={() => {
                              handleEditRow(row.id);
                            }}
                          />
                        ))}
                    <TableLoader isLoading={isLoading} />

                    <TableNoData
                      isNotFound={!data?.data.length && !isLoading}
                    />

                    <TableEmptyRows
                      height={dense ? 52 : 72}
                      emptyRows={emptyRows(
                        page,
                        filters?.take ?? 10,
                        data?.data.length ?? 0
                      )}
                    />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
            <TablePaginationCustom
              count={data?.meta.itemCount ? data?.meta.itemCount : 0}
              page={data?.meta.page ? data?.meta.page - 1 : 0}
              rowsPerPage={data?.meta.take ?? 0}
              onPageChange={(e, page) => {
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
