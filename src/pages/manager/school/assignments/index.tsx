import Head from "next/head";
import { useState } from "react";

import { add, subDays } from "date-fns";

import {
  Button,
  Card,
  Container,
  Divider,
  IconButton,
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
  useTable,
} from "@components";
import { SchoolDashboardLayout } from "@layouts/dashboard";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import AssignmentsTableRow from "@sections/dashboard/assignments/assignments-table/AssignmentsTableRow";
import AssignmentsTableToolbar from "@sections/dashboard/assignments/assignments-table/AssignmentsTableToolbar";
import { fTimestamp } from "@utils";
import { randomInArray } from "src/_mock";
import _mock from "src/_mock/_mock";
import { _invoices } from "src/_mock/arrays";
import { Publish, Status } from "src/redux/enums/assignments.enum";
import { IAssignment } from "src/redux/interfaces/assignment.interface";

const TYPE_OPTIONS = ["all", "course"];

const _tableData: IAssignment[] = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  name: randomInArray(["Wild", "Web-Dev"]),
  description: "It`s important that this is a new",
  type: randomInArray(["course", " "]),
  status: randomInArray(Object.values(Status)),
  start: subDays(new Date(), index),
  dueDate: add(new Date(), { days: index + 15, hours: index }),
  assigned: "WildGraffes67",
  publish: randomInArray(Object.values(Publish)),
}));

const TABLE_HEAD = [
  { id: "name", label: "Name & Notes", align: "left" },
  { id: "type", label: "Type", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "starts", label: "Starts at", align: "left", width: 140 },
  { id: "due", label: "Due", align: "left", width: 140 },
  { id: "assigned", label: "Tribes Assigned", align: "left", width: 140 },
  { id: "publish", label: "Publist", align: "right" },
  { id: "" },
];

AsssignmentsListPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

export default function AsssignmentsListPage() {
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

  const [tableData, setTableData] = useState(_tableData);

  const [filterName, setFilterName] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterStatus, setFilterStatus] = useState("all");

  const [filterType, setFilterType] = useState("all");

  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);

  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);

  const dataFiltered = applyFilter({
    inputData: tableData,
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
      return tableData.filter((item) => item.status === status).length;
    } else {
      return tableData.filter((item) => item.publish === status).length;
    }
  };
  const TABS = [
    { value: "all", label: "All", color: "info", count: tableData.length },
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

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    const deleteRows = tableData.filter(
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
        const newPage =
          Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleEditRow = (id: string) => {};

  const handleViewRow = (id: string) => {};

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
        <title> Assignments| CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Assignments List"
          links={[
            {
              name: "Dashboard",
              href: MANAGER_PATH_DASHBOARD.home,
            },
            {
              name: "Assignments",
              href: MANAGER_PATH_DASHBOARD.school.assignments,
            },
            {
              name: "List",
            },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Assignments
            </Button>
          }
        />

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
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
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
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <AssignmentsTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

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
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
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

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus,
  filterType,
  filterStartDate,
  filterEndDate,
}: {
  inputData: IAssignment[];
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
    inputData = inputData.filter((assignment) => assignment.type === "course");
  }

  if (filterStatus !== "all") {
    inputData = inputData.filter((assignment) => {
      if (Object.values(Status).includes(filterStatus as unknown as Status)) {
        return assignment.status === filterStatus;
      } else {
        return assignment.publish === filterStatus;
      }
    });
  }

  if (filterStartDate && filterEndDate) {
    inputData = inputData.filter(
      (assignment) =>
        fTimestamp(assignment.start) >= fTimestamp(filterStartDate) &&
        fTimestamp(assignment.dueDate) <= fTimestamp(filterEndDate)
    );
  }

  return inputData;
}
