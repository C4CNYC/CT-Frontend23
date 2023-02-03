import { useState } from "react";
// next
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
} from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../../routes/paths";

// _mock_
import { _userList } from "../../../../_mock/arrays";
// layouts
import DashboardLayout from "../../../../layouts/dashboard";
// components
import Iconify from "../../../../components/iconify";
import Scrollbar from "../../../../components/scrollbar";
import ConfirmDialog from "../../../../components/confirm-dialog";
import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
import { useSettingsContext } from "../../../../components/settings";
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from "../../../../components/table";
// sections
import {
  UserTableToolbar,
  UserTableRow,
} from "../../../../sections/@dashboard/user/list";
import { useGetOrgMembersQuery } from "src/redux/services/admin";
import { useFilters } from "src/hooks/useFilters";
import { Role } from "src/redux/services/enums/role.enum";
import {useLocales} from "../../../../locales";

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ["all"];

// ----------------------------------------------------------------------

UserListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function UserListPage() {
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
  const { translate } = useLocales();

  const TABLE_HEAD = [
    { id: "" },
    { id: "email", label: `${translate('organizations.members_page.table.email')}`, align: "left" },
    { id: "first_name", label: `${translate('organizations.members_page.table.email')}`, align: "left" },
    { id: "last_name", label: `${translate('organizations.members_page.table.email')}`, align: "left" },
    { id: "role", label: `${translate('organizations.members_page.table.role')}`, align: "left" },
    { id: "isVerified", label: `${translate('organizations.members_page.table.verified')}`, align: "center" },
    { id: "status", label: `${translate('organizations.members_page.table.status')}`, align: "left" },
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

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDeleteRow = (id: string) => {};

  const handleDeleteRows = (selectedRows: string[]) => {};

  const handleEditRow = (id: string) => {
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
            { name: `${translate('organizations.dashboard_title')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('organizations.members_page.title')}`, href: PATH_DASHBOARD.organization.root },
            { name: `${translate('organizations.members_page.list_title')}` },
          ]}
          action={
            <Button
              component={NextLink}
              href={PATH_DASHBOARD.organization.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {`${translate('organizations.members_page.new_user_btn')}`}
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
            filterName={filters.name as string}
            filterRole={filters.role as string}
            optionsRole={Object.values(Role)}
            onFilterName={(e) => {
              setFilter("name", e.target.value);
            }}
            onFilterRole={(e) => {
              setFilter("role", e.target.value);
            }}
            onResetFilter={resetFilters}
          />
          <>
            <TableContainer sx={{ position: "relative", overflow: "unset" }}>
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
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        data?.data.map((row) => row.id) as string[]
                      )
                    }
                  />

                  <TableBody>
                    {data?.data.map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
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
            {`${translate('organizations.members_page.delete_dialog.content', 
              {items: selected.length }
            )}
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
            {`${translate('actions_delete')}`}
          </Button>
        }
      />
    </>
  );
}
