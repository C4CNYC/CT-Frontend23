import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { LoadingButton } from "@mui/lab";
import {
  Card,
  Container,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
  Tooltip,
} from "@mui/material";

import {
  ConfirmDialog,
  CustomBreadcrumbs,
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
  useSettingsContext,
  useSnackbar,
  useTable,
} from "@components";
import { SchoolDashboardLayout } from "@layouts/dashboard";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import AssignmentsTableRow from "@sections/dashboard/assigments/AssignmentsTableRow";
import AssignmentsTableToolbar from "@sections/dashboard/assigments/AssignmentsTableToolbar";
import { fTimestamp } from "@utils";
import _mock from "src/_mock/_mock";
import { _invoices } from "src/_mock/arrays";
import { AssignmentTypes } from "src/redux/enums/assignment-types.enum";
import { Publish, Status } from "src/redux/enums/assignments.enum";
import { IAssignmentFull } from "src/redux/interfaces/assignment.interface";
import {
  useDeleteAssignmentMutation,
  useGetAssignmentListQuery,
} from "src/redux/services/manager/assignments-manager";

import FilterAssignments from "./filter";

const TYPE_OPTIONS = ["all", ...Object.values(AssignmentTypes)];

const TABLE_HEAD = [
  { id: "name", label: "Name & Notes", align: "left" },
  { id: "type", label: "Type", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "starts", label: "Starts at", align: "left", width: 140 },
  { id: "due", label: "Due", align: "left", width: 140 },
  { id: "publish", label: "Publist", align: "left" },
  { id: "" },
];

AsssignmentsListPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

export default function AsssignmentsListPage() {
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
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
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: "createDate" });
  const [filterName, setFilterName] = useState("");
  const [tableData, setTableData] = useState<IAssignmentFull[] | undefined>();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const { data, isLoading, isFetching } = useGetAssignmentListQuery(
    { schoolId: query.schoolId as string },
    { skip: !query.schoolId, refetchOnMountOrArgChange: true }
  );
  const [deleteAssignmet, { isLoading: isDeleting }] =
    useDeleteAssignmentMutation();

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [isLoading, isFetching]);

  const dataFiltered = applyFilter({
    inputData: tableData ?? [],
    comparator: getComparator(order, orderBy),
    filterName,
    filterType,
    filterStatus,
    filterStartDate,
    filterEndDate,
  });

  const dataInPage = dataFiltered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const denseHeight = dense ? 56 : 76;

  const isFiltered =
    filterStatus !== "all" ||
    filterName !== "" ||
    filterType !== "all" ||
    (!!filterStartDate && !!filterEndDate);

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterType) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

  const getLengthByStatus = (status: Status | Publish) => {
    if (Object.values(Status).includes(status as unknown as Status)) {
      return tableData?.filter((item) => item.status === status)?.length;
    } else {
      return tableData?.filter((item) => item.active)?.length;
    }
  };
  const TABS = [
    { value: "all", label: "All", color: "info", count: tableData?.length },
    {
      value: Status.open,
      label: "Open",
      color: "success",
      count: getLengthByStatus(Status.open),
    },
    {
      value: Status.ending,
      label: "Ending Soon",
      color: "warning",
      count: getLengthByStatus(Status.ending),
    },
    {
      value: Status.overdue,
      label: "Overdue",
      color: "error",
      count: getLengthByStatus(Status.overdue),
    },
    {
      value: Status.closed,
      label: "Closed",
      color: "default",
      count: getLengthByStatus(Status.closed),
    },
    {
      value: Publish.published,
      label: "Published",
      color: "info",
      count: getLengthByStatus(Publish.published),
    },
    {
      value: Publish.draft,
      label: "Draft",
      color: "default",
      count: getLengthByStatus(Publish.draft),
    },
  ] as const;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterService = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterType(event.target.value);
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      await deleteAssignmet({
        schoolId: query.schoolId as string,
        assignmentId,
      }).unwrap();
      enqueueSnackbar("Assignment deleted!");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData?.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
    handleDeleteAssignment(id);
    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    for (let i = 0; i < selected.length; i++) {
      handleDeleteAssignment(selected[i]);
    }
    const deleteRows = tableData?.filter(
      (row) => !selectedRows.includes(row.id)
    );
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        if (tableData?.length) {
          const newPage =
            Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) -
            1;
          setPage(newPage);
        }
      }
    }
  };

  const handleResetFilter = () => {
    setFilterName("");
    setFilterStatus("all");
    setFilterType("all");
    setFilterEndDate(null);
    setFilterStartDate(null);
  };

  return (
    <>
      <Head>
        <title> Assignments | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading=""
          links={[
            { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
            {
              name: "Assignments",
              href: MANAGER_PATH_DASHBOARD.school.assignments,
            },
          ]}
        />
        <FilterAssignments />
        {isLoading ? (
          <Skeleton variant="rounded" width="100%" height="647px" />
        ) : (
          <Card>
            <Tabs
              value={filterStatus}
              onChange={handleFilterStatus}
              sx={{
                px: 2,
                bgcolor: "background.neutral",
              }}
            >
              {TABS.map((tab) => (
                <Tab
                  iconPosition="end"
                  key={tab.value}
                  value={tab.value}
                  label={tab.label}
                  icon={
                    <Label color={tab.color} sx={{ mr: 1 }}>
                      {tab.count}
                    </Label>
                  }
                />
              ))}
            </Tabs>

            <Divider />

            <AssignmentsTableToolbar
              isFiltered={isFiltered}
              filterName={filterName}
              filterType={filterType}
              filterEndDate={filterEndDate}
              onFilterName={handleFilterName}
              optionsType={TYPE_OPTIONS}
              onResetFilter={handleResetFilter}
              filterStartDate={filterStartDate}
              onFilterService={handleFilterService}
              onFilterStartDate={(newValue) => {
                setFilterStartDate(newValue);
              }}
              onFilterEndDate={(newValue) => {
                setFilterEndDate(newValue);
              }}
            />

            <TableContainer sx={{ position: "relative", overflow: "unset" }}>
              <TableSelectedAction
                dense={dense}
                numSelected={selected.length}
                rowCount={tableData?.length ?? 0}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData ? tableData.map((row) => row.id) : []
                  )
                }
                action={
                  <Stack direction="row">
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={handleOpenConfirm}>
                        <Iconify icon="eva:trash-2-outline" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                }
              />

              <Scrollbar>
                <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={tableData?.length ?? 0}
                    numSelected={selected.length}
                    onSort={onSort}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        tableData ? tableData.map((row) => row.id) : []
                      )
                    }
                  />

                  <TableBody>
                    {dataFiltered
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <AssignmentsTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                        />
                      ))}

                    {!isNotFound ? (
                      <TableEmptyRows
                        height={denseHeight}
                        emptyRows={emptyRows(
                          page,
                          rowsPerPage,
                          tableData?.length ?? 0
                        )}
                      />
                    ) : null}

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>

            <TablePaginationCustom
              count={dataFiltered.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
              dense={dense}
              onChangeDense={onChangeDense}
            />
          </Card>
        )}
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong>{" "}
            items?
          </>
        }
        action={
          <LoadingButton
            loading={isDeleting}
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus,
  filterType,
  filterStartDate,
  filterEndDate,
}: {
  inputData: IAssignmentFull[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  filterType: string;
  filterStartDate: Date | null;
  filterEndDate: Date | null;
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
      (assignment) =>
        assignment.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }
  if (filterType !== "all") {
    inputData = inputData.filter((assignment) => assignment?.course);
  }

  if (filterStatus !== "all") {
    inputData = inputData.filter((assignment) => {
      if (Object.values(Status).includes(filterStatus as unknown as Status)) {
        return assignment.status === filterStatus;
      } else {
        return assignment.active;
      }
    });
  }

  if (filterStartDate && filterEndDate) {
    inputData = inputData.filter(
      (assignment) =>
        fTimestamp(assignment.start_date) >= fTimestamp(filterStartDate) &&
        fTimestamp(assignment.end_date) <= fTimestamp(filterEndDate)
    );
  }

  return inputData;
}
