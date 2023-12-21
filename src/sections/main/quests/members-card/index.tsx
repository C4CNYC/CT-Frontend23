import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { LoadingButton } from "@mui/lab";
import {
  Card,
  Divider,
  IconButton,
  Skeleton,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
  Tooltip,
} from "@mui/material";

import {
  ConfirmDialog,
  Iconify,
  Label,
  Scrollbar,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  emptyRows,
  getComparator,
  useSnackbar,
  useTable,
} from "@components";
import { useFilters } from "@hooks";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { UserTableToolbar } from "@sections/dashboard/user/list";
import { useAuthContext } from "src/auth/useAuthContext";
import { Role } from "src/redux/services/enums/role.enum";
import { IStudent } from "src/redux/services/interfaces/user.interface";
import { useGetClassStudentsQuery } from "src/redux/services/manager/classes-student";
import {
  useGetClassPendingQuery,
  useStudentLeftClassMutation,
} from "src/redux/services/manager/students-manager";
import { useSelector } from "src/redux/store";
import { useTranslate } from "src/utils/translateHelper";

import MemberRow from "./MemberRow";

const TABLE_HEAD = [
  { id: "avatar", label: "avatar", align: "left" },
  { id: "firstName", label: "first_name", align: "left" },
  { id: "lastName", label: "last_name", align: "left" },
  { id: "username", label: "username", align: "left" },
  { id: "city", label: "city", align: "left" },
  { id: "", label: "", align: "left" },
];
const TABLE_HEAD_PENDINGS = [
  { id: "avatar", label: "avatar", align: "left" },
  { id: "firstName", label: "first_name", align: "left" },
  { id: "lastName", label: "last_name", align: "left" },
  { id: "username", label: "username", align: "left" },
  { id: "approve", label: "action", align: "left" },
  { id: "", label: "", align: "left" },
];

interface IMemberCardProps {
  activeTab: boolean;
}

export default function MemberCard({ activeTab }: IMemberCardProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const { query, push } = useRouter();
  const translate = useTranslate();
  const role = useSelector((state) => state.global.user?.role);
  const { filters, setFilter } = useFilters({});

  const { data, isLoading, isFetching } = useGetClassStudentsQuery(
    { id: query.id as string, ...filters },
    { skip: !query.id || !activeTab, refetchOnMountOrArgChange: true }
  );

  const {
    data: pending,
    isLoading: isLoadingPending,
    isFetching: isFetchingPending,
  } = useGetClassPendingQuery(
    { classId: query.id as string, ...filters },
    {
      skip: !query.id || !activeTab || Role.Student === role,
      refetchOnMountOrArgChange: true,
    }
  );

  const [deleteFromClass, { isLoading: isDeleting }] =
    useStudentLeftClassMutation();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
  } = useTable();

  const [tableData, setTableData] = useState<IStudent[]>([]);

  const [filterName, setFilterName] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterStatus, setFilterStatus] = useState("all");

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const dataInPage = dataFiltered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus);

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ): void => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteStudent = async (studentId: string): Promise<void> => {
    try {
      await deleteFromClass({
        classId: query.id as string,
        student_id: studentId,
      }).unwrap();
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: "error" });
    }
  };

  const handleDeleteRow = (id: string): void => {
    handleDeleteStudent(id);
    enqueueSnackbar(translate("members_student_removed_msg"));
    setSelected([]);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows: string[]): void => {
    for (let i = 0; i < selected.length; i++) {
      handleDeleteStudent(selected[i]);
    }
    enqueueSnackbar(translate("members_students_removed_msg"));
    setSelected([]);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage =
          Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleEditRow = (id: string): void => {
    push(
      `${STUDENT_PATH_DASHBOARD.class.editStudent(id)}` +
        `?${new URLSearchParams({ schoolId: query.schoolId as string })}`
    );
  };

  const handleResetFilter = (): void => {
    setFilterName("");
    setFilterStatus("all");
  };

  useEffect(() => {
    if (filterStatus === "all" && data) {
      setTableData(data.data ?? []);
    }
    if (filterStatus === "pending" && pending) {
      setTableData(pending.data ?? []);
    }
  }, [
    isLoading,
    isFetching,
    filterStatus,
    isLoadingPending,
    isFetchingPending,
  ]);

  if (isLoading || isFetching || isLoadingPending || isFetchingPending) {
    return <Skeleton variant="rounded" height="635px" />;
  }

  const TABS_LIST = [
    {
      label: "all",
      value: "all",
      icon: <Label>{data?.meta.itemCount ?? 0}</Label>,
    },
  ];
  if (user?.role !== Role.Student) {
    TABS_LIST.push({
      label: "pending",
      value: "pending",
      icon: <Label>{pending?.meta.itemCount ?? 0}</Label>,
    });
  }

  return (
    <>
      <Card>
        <Tabs
          value={filterStatus}
          onChange={handleFilterStatus}
          sx={{
            px: 2,
            bgcolor: "background.neutral",
          }}
        >
          {TABS_LIST.map((el, index) => (
            <Tab
              key={index}
              label={translate(el.label)}
              value={el.value}
              icon={el.icon}
              iconPosition="end"
            />
          ))}
        </Tabs>

        <Divider />

        <UserTableToolbar
          filterName={filterName}
          onFilterName={handleFilterName}
          onResetFilter={handleResetFilter}
        />

        <TableContainer sx={{ position: "relative", overflow: "unset" }}>
          <TableSelectedAction
            dense={dense}
            numSelected={selected.length}
            rowCount={tableData.length}
            onSelectAllRows={(checked) => {
              onSelectAllRows(
                checked,
                tableData.map((row) => row.id as string)
              );
            }}
            action={
              <Tooltip title={translate("actions_delete")}>
                <IconButton color="primary" onClick={handleOpenConfirm}>
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
                headLabel={
                  filterStatus === "all" ? TABLE_HEAD : TABLE_HEAD_PENDINGS
                }
                rowCount={tableData?.length}
                numSelected={selected.length}
                onSort={onSort}
                onSelectAllRows={(checked) => {
                  onSelectAllRows(
                    checked,
                    tableData?.map((row) => row.id as string)
                  );
                }}
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <MemberRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id as string)}
                      onSelectRow={() => {
                        onSelectRow(row.id as string);
                      }}
                      onDeleteRow={() => {
                        handleDeleteRow(row.id as string);
                      }}
                      onEditRow={() => {
                        handleEditRow(row.id as string);
                      }}
                      pending={filterStatus === "pending"}
                      loading={isDeleting}
                    />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, tableData?.length)}
                />

                <TableNoData isNotFound={isNotFound} />
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
      </Card>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate("actions_delete")}
        content={
          <>
            {translate("messages_delete_dialog_content", {
              items: selected.length,
            })}
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={isDeleting}
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            {translate("actions_delete")}
          </LoadingButton>
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
}: {
  inputData: IStudent[];
  comparator: (a: any, b: any) => number;
  filterName: string;
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
      (user) =>
        user.first_name.toLowerCase().includes(filterName.toLowerCase()) ||
        user.last_name.toLowerCase().includes(filterName.toLowerCase())
    );
  }
  return inputData;
}
