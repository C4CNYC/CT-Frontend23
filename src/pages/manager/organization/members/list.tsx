/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { useSnackbar } from "notistack";

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

import {
  ConfirmDialog,
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
import DashboardLayout from "@layouts/dashboard";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { UserTableRow, UserTableToolbar } from "@sections/dashboard/user/list";
import {
  useDeleteOrgMemberMutation,
  useGetOrgMembersQuery,
} from "src/redux/services/admin/members-admin";
import { Role } from "src/redux/services/enums/role.enum";
import { useTranslate } from "src/utils/translateHelper";

import SkeletonMembers from "./SkeletonMembers";

const STATUS_OPTIONS = ["all"];

const TABLE_HEAD = [
  { id: "" },
  {
    id: "email",
    label: "email",
    align: "left",
  },
  {
    id: "first_name",
    label: "first_name",
    align: "left",
  },
  {
    id: "last_name",
    label: "last_name",
    align: "left",
  },
  {
    id: "role",
    label: "role",
    align: "left",
  },
  {
    id: "isVerified",
    label: "verified",
    align: "center",
  },
  {
    id: "status",
    label: "status",
    align: "left",
  },
  { id: "" },
];

UserListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function UserListPage(): React.ReactElement {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
  } = useTable();

  const { enqueueSnackbar } = useSnackbar();
  const [deleteMember, { isLoading: loading }] = useDeleteOrgMemberMutation();
  const translate = useTranslate();
  const useDeleteMember = async (userId: string): Promise<void> => {
    try {
      await deleteMember({
        user_id: userId,
      }).unwrap();
    } catch (e: any) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };

  const handleDeleteRow = (userId: string): void => {
    useDeleteMember(userId);
    enqueueSnackbar(translate("members_delete_success_msg"));
    setSelected([]);
  };

  const { themeStretch } = useSettingsContext();
  const { filters, setFilter, resetFilters } = useFilters({
    name: "",
    role: "",
  });
  const { data, isLoading } = useGetOrgMembersQuery(filters);

  const { push } = useRouter();

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };

  const handleDeleteRows = (selected: string[]): void => {
    for (let i = 0; i < selected.length; i++) {
      useDeleteMember(selected[i]);
    }
    enqueueSnackbar(translate("members_delete_success_msg"));

    setSelected([]);
  };

  const handleEditRow = (id: string): void => {
    push(MANAGER_PATH_DASHBOARD.organization.edit(id));
  };

  return (
    <>
      <Head>
        <title> {translate("members")} | CodeTribe</title>
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
              name: translate("members"),
              href: MANAGER_PATH_DASHBOARD.organization.root,
            },
            { name: translate("list") },
          ]}
          action={
            <Button
              component={NextLink}
              href={MANAGER_PATH_DASHBOARD.organization.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {translate("members_btn_new_user")}
            </Button>
          }
        />

        <Card>
          <Tabs
            value={translate("all")}
            onChange={() => ""}
            sx={{
              px: 2,
              bgcolor: "background.neutral",
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab key={tab} label={translate(tab)} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            filterName={filters.name}
            filterRole={filters.role}
            optionsRole={Object.values(Role).filter((r) => r !== Role.Owner)}
            onFilterName={(e: any) => {
              setFilter("name", e.target.value);
            }}
            onFilterRole={(e: any) => {
              setFilter("role", e.target.value);
            }}
            onResetFilter={resetFilters}
          />
          <>
            <TableContainer sx={{ position: "relative", overflow: "unset" }}>
              <TableSelectedAction
                dense={dense}
                numSelected={selected.length}
                rowCount={data?.data.length ?? 0}
                onSelectAllRows={(checked: any) => {
                  onSelectAllRows(
                    checked,
                    data?.data.map((row) => row.id) as string[]
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
                          <UserTableRow
                            key={row.id}
                            row={row}
                            loading={loading}
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
        onClose={handleCloseConfirm}
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
              handleCloseConfirm();
            }}
          >
            {translate("actions_delete")}
          </Button>
        }
      />
    </>
  );
}
