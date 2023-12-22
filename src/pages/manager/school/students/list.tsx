import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import SkeletonMembers from "@pages/manager/organization/members/SkeletonMembers";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

import {
  Box,
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

import {
  ConfirmDialog,
  CustomAutocomplete,
  CustomBreadcrumbs,
  Iconify,
  Scrollbar,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  emptyRows,
  useSettingsContext,
  useTable,
} from "@components";
import { useFilters } from "@hooks";
import { SchoolDashboardLayout } from "@layouts/dashboard/SchoolDashboardLayout";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import InviteStudentDialog from "@sections/dashboard/student/InviteStudentDialog";
import PendingInvitesTab from "@sections/dashboard/student/PendingInvitesTab";
import { UserTableRow } from "@sections/dashboard/user/list";
import {
  useDeleteStudentMutation,
  useGetStudentsQuery,
} from "src/redux/services/manager/students-manager";
import { RootState } from "src/redux/store";
import { useTranslate } from "src/utils/translateHelper";

const STATUS_OPTIONS = ["all", "invites"];

const TABLE_HEAD = [
  { id: "", label: "avatar" },
  { id: "email", label: "email", align: "left" },
  { id: "first_name", label: "first_name", align: "left" },
  { id: "last_name", label: "last_name", align: "left" },
  { id: "socials", label: "socials", align: "left" },
  { id: "isVerified", label: "verified", align: "center" },
  { id: "status", label: "status", align: "left" },
  { id: "" },
];

UserListPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

export default function UserListPage(): React.ReactElement {
  const {
    dense,
    page,
    order,
    orderBy,
    selected,
    rowsPerPage,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
  } = useTable();

  const translate = useTranslate();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [value, setValue] = useState(0);
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const { filters, setFilter, resetFilters } = useFilters({
    name: "",
    class_id: "",
  });
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();

  const { data, isLoading } = useGetStudentsQuery(
    { schoolId, ...filters },
    { skip: !schoolId }
  );
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValue(newValue);
  };

  const handleDeleteMember = async (studentId: string): Promise<void> => {
    try {
      await deleteStudent({ studentId, schoolId }).unwrap();
    } catch (e: any) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };

  const handleDeleteRow = (userId: string): void => {
    handleDeleteMember(userId);
    enqueueSnackbar(translate("member_actions_deleted"));
    setSelected([]);
  };

  const handleDeleteRows = (selected: string[]): void => {
    for (let i = 0; i < selected.length; i++) {
      handleDeleteMember(selected[i]);
    }
    enqueueSnackbar(translate("members_actions_deleted"));
    setSelected([]);
  };

  const handleEditRow = (id: string): void => {
    push(MANAGER_PATH_DASHBOARD.school.edit(id));
  };

  return (
    <>
      <Head>
        <title>{translate("students")} | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading=""
          links={[
            {
              name: translate("home"),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            {
              name: translate("students"),
              href: MANAGER_PATH_DASHBOARD.organization.root,
            },
          ]}
          action={
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <InviteStudentDialog schoolId={schoolId}>
                <Button
                  variant="soft"
                  startIcon={
                    <Iconify icon="mdi:email-fast-outline" width="23px" />
                  }
                >
                  {translate("members_invate_student")}
                </Button>
              </InviteStudentDialog>
              <Button
                component={NextLink}
                href={MANAGER_PATH_DASHBOARD.school.new}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                {translate("members_add_student")}
              </Button>
            </Box>
          }
        />

        <Card>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              px: 2,
              bgcolor: "background.neutral",
            }}
          >
            {STATUS_OPTIONS.map((tab, index) => (
              <Tab key={index} label={translate(tab)} {...a11yProps(index)} />
            ))}
          </Tabs>

          <Divider />
          <>
            <CustomAutocomplete
              filterName={filters.name}
              onFilterName={(name: string) => {
                setFilter("name", name);
              }}
              onFilterClass={(classId: string) => {
                setFilter("class_id", classId);
              }}
              onResetFilter={resetFilters}
              disableClassFilter={value === 1}
            />

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
                  <Tooltip title={translate("actions_delete")}>
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
                <TabPanel value={value} index={0}>
                  <Table
                    size={dense ? "small" : "medium"}
                    sx={{ minWidth: 800 }}
                  >
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
                        ? Array(5)
                            .fill(null)
                            .map((item, i) => (
                              <SkeletonMembers key={item + i} />
                            ))
                        : data?.data.map((row) => (
                            <UserTableRow
                              loading={isDeleting}
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
                      {!isLoading && (
                        <TableEmptyRows
                          height={dense ? 52 : 72}
                          emptyRows={emptyRows(
                            page,
                            rowsPerPage,
                            data?.data.length ?? 0
                          )}
                        />
                      )}
                      <TableNoData
                        isNotFound={!data?.data.length && !isLoading}
                      />
                    </TableBody>
                  </Table>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <PendingInvitesTab
                    onSort={onSort}
                    order={order}
                    page={page}
                    selected={selected}
                    dense={dense}
                    rowsPerPage={rowsPerPage}
                  />
                </TabPanel>
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
        title={translate("actions_delete")}
        content={
          <>
            {translate("members_delete_dialog_content", {
              items: selected.length,
            })}
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
            {translate("actions_delete")}
          </Button>
        }
      />
    </>
  );
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps): React.ReactElement {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
function a11yProps(index: number): Record<string, string> {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
