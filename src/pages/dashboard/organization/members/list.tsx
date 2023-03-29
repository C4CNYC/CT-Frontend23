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
import DashboardLayout from "@layouts/dashboard";
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
import { PATH_DASHBOARD } from "@routes/paths";
import { UserTableRow, UserTableToolbar } from "@sections/dashboard/user/list";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useFilters } from "src/hooks/useFilters";
import { useDeleteOrgMemberMutation, useGetOrgMembersQuery } from "src/redux/services/admin/members-admin";
import { Role } from "src/redux/services/enums/role.enum";
import { useLocales } from "../../../../locales";
import SkeletonMembers from "./SkeletonMembers";

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ["all"];

// ----------------------------------------------------------------------

UserListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
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
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
  } = useTable();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [deleteMember, { isLoading: loading }] = useDeleteOrgMemberMutation();

  const useDeleteMember = async (user_id: string): Promise<void> => {
    try {
      await deleteMember({
        user_id,
      }).unwrap();
    } catch (e) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };

  const handleDeleteRow = (user_id: string): void => {
    useDeleteMember(user_id);
    enqueueSnackbar("Member deleted");
    setSelected([]);
  };

  const TABLE_HEAD = [
    { id: "" },
    {
      id: "email",
      label: `${translate("organizations.members_page.table.email")}`,
      align: "left",
    },
    {
      id: "first_name",
      label: `${translate("organizations.members_page.table.first_name")}`,
      align: "left",
    },
    {
      id: "last_name",
      label: `${translate("organizations.members_page.table.last_name")}`,
      align: "left",
    },
    {
      id: "role",
      label: `${translate("organizations.members_page.table.role")}`,
      align: "left",
    },
    {
      id: "isVerified",
      label: `${translate("organizations.members_page.table.verified")}`,
      align: "center",
    },
    {
      id: "status",
      label: `${translate("organizations.members_page.table.status")}`,
      align: "left",
    },
    { id: "" },
  ];
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
    enqueueSnackbar("Members deleted");

    setSelected([]);
  };

  const handleEditRow = (id: string): void => {
    push(PATH_DASHBOARD.organization.edit(id));
  };

  return (
    <>
      <Head>
        <title> Members | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="User List"
          links={[
            {
              name: `${translate("organizations.dashboard_title")}`,
              href: PATH_DASHBOARD.root,
            },
            {
              name: `${translate("organizations.members_page.title")}`,
              href: PATH_DASHBOARD.organization.root,
            },
            { name: `${translate("organizations.members_page.list_title")}` },
          ]}
          action={
            <Button
              component={NextLink}
              href={PATH_DASHBOARD.organization.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {`${translate("organizations.members_page.new_user_btn")}`}
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

          <UserTableToolbar
            filterName={filters.name}
            filterRole={filters.role}
            optionsRole={Object.values(Role)}
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
                  <Tooltip title="Delete">
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
        title="Delete"
        content={
          <>
            {`${translate("organizations.members_page.delete_dialog.content", {
              items: selected.length,
            })}
           `}
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
            {`${translate("actions_delete")}`}
          </Button>
        }
      />
    </>
  );
}
