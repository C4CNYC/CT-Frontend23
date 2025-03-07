import { useState } from 'react'

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
} from '@mui/material'
import { FaPlus } from '@react-icons/all-files/fa6/FaPlus'
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2'
import Head from 'next/head'
import { useSnackbar } from 'notistack'

import { useFilters } from '@/hooks'
import DashboardLayout from '@/layouts/dashboard'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { UserTableToolbar } from '@/sections/dashboard/user/list'
import SkeletonMembers from '@/sections/schools/SkeletonMembers'
import { useTranslate } from '@/utils/translateHelper'
import {
  ConfirmDialog,
  CustomBreadcrumbs,
  Scrollbar,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  emptyRows,
  useSettingsContext,
  useTable,
} from '@root/src/components'
import {
  useDeleteOrgMutation,
  useGetOrgListQuery,
} from '@root/src/redux/services/manager/super-admin'
import AddEditOrgModal from '@root/src/sections/administration/AddEditOrgModal'
import OrgTableRow from '@root/src/sections/administration/OrgTableRow'
const STATUS_OPTIONS = ['all']

const TABLE_HEAD = [
  {
    id: 'Logo',
    label: 'Logo',
    align: 'center',
  },
  {
    id: 'Logo-mini',
    label: 'Logo-mini',
    align: 'center',
  },

  {
    id: 'Favicon',
    label: 'Favicon',
    align: 'center',
  },
  {
    id: 'name',
    label: 'name',
    align: 'center',
  },
  {
    id: 'slug',
    label: 'slug',
    align: 'center',
  },
  {
    id: 'type',
    label: 'home_page_type',
    align: 'center',
  },
  { id: '' },
]

AdministrationPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
)

export default function AdministrationPage(): React.ReactElement {
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
  } = useTable()
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()
  const { themeStretch } = useSettingsContext()
  const { filters, setFilter, resetFilters } = useFilters({
    name: '',
  })
  const [openConfirm, setOpenConfirm] = useState(false)

  const [deleteOrg, { isLoading: loading }] = useDeleteOrgMutation()
  const { data, isLoading } = useGetOrgListQuery(filters)

  const deleteOrgCb = async (id: string): Promise<void> => {
    try {
      await deleteOrg({
        id,
      }).unwrap()
    } catch (e: any) {
      enqueueSnackbar(e.data.message, {
        variant: 'error',
      })
    }
  }

  const handleDeleteRow = (id: string): void => {
    deleteOrgCb(id)
    enqueueSnackbar(translate('members_delete_success_msg'))
    setSelected([])
  }

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true)
  }

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false)
  }

  const handleDeleteRows = (selected: string[]): void => {
    for (let i = 0; i < selected.length; i++) {
      deleteOrgCb(selected[i])
    }
    enqueueSnackbar(translate('members_delete_success_msg'))

    setSelected([])
  }

  return (
    <>
      <Head>
        <title> {translate('Administration')} | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading=''
          links={[
            {
              name: translate('home'),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            {
              name: translate('administration_title'),
              href: MANAGER_PATH_DASHBOARD.administration.root,
            },
          ]}
          action={
            <AddEditOrgModal>
              <Button
                sx={{ gap: 0.5 }}
                variant='contained'
                startIcon={<FaPlus />}
              >
                {translate('create_new_org')}
              </Button>
            </AddEditOrgModal>
          }
        />

        <Card>
          <Tabs
            value={translate('all')}
            onChange={() => ''}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab}
                label={translate(tab)}
                value={tab}
              />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            filterName={filters.name}
            onFilterName={(e: any) => {
              setFilter('name', e.target.value)
            }}
            onResetFilter={resetFilters}
          />
          <>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <TableSelectedAction
                dense={dense}
                numSelected={selected.length}
                rowCount={data?.data.length ?? 0}
                onSelectAllRows={(checked: any) => {
                  onSelectAllRows(checked, data?.data.map((row) => row.id) as string[])
                }}
                action={
                  <Tooltip title={translate('actions_delete')}>
                    <IconButton
                      color='primary'
                      onClick={handleOpenConfirm}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </Tooltip>
                }
              />

              <Scrollbar>
                <Table
                  size={dense ? 'small' : 'medium'}
                  sx={{ minWidth: 800 }}
                >
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={data?.data.length}
                    numSelected={selected.length}
                    onSelectAllRows={(checked) => {
                      onSelectAllRows(checked, data?.data.map((row) => row.id) as string[])
                    }}
                  />

                  <TableBody>
                    {isLoading
                      ? [...Array(5)].map((item, i) => <SkeletonMembers key={i} />)
                      : data?.data.map((row) => (
                          <OrgTableRow
                            key={row.id}
                            row={row}
                            loading={loading}
                            selected={selected.includes(row.id)}
                            onSelectRow={() => {
                              onSelectRow(row.id)
                            }}
                            onDeleteRow={() => {
                              handleDeleteRow(row.id)
                            }}
                          />
                        ))}

                    <TableEmptyRows
                      height={dense ? 52 : 72}
                      emptyRows={emptyRows(page, rowsPerPage, data?.data.length ?? 0)}
                    />

                    <TableNoData isNotFound={!data?.data.length && !isLoading} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
            <TablePaginationCustom
              count={data?.meta.itemCount ? data?.meta.itemCount : 0}
              page={data?.meta.page ? data?.meta.page - 1 : 0}
              rowsPerPage={data?.meta.take ?? 0}
              onPageChange={(e, page) => {
                setFilter('page', page + 1)
              }}
              onRowsPerPageChange={(e: any) => {
                setFilter('take', e.target.value)
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
        title={translate('actions_delete')}
        content={
          <>
            {translate('members_delete_dialog_content', {
              items: selected.length,
            })}
          </>
        }
        action={
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              handleDeleteRows(selected)
              handleCloseConfirm()
            }}
          >
            {translate('actions_delete')}
          </Button>
        }
      />
    </>
  )
}
