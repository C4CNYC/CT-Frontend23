import {
  Button,
  Card,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Container, Stack } from '@mui/system'
import { FaPlus } from '@react-icons/all-files/fa6/FaPlus'
import { MdOutlineModeEdit } from '@react-icons/all-files/md/MdOutlineModeEdit'
import { format } from 'date-fns'
import omit from 'lodash-es/omit'
import Head from 'next/head'
import { useSnackbar } from 'notistack'

import {
  CustomBreadcrumbs,
  Iconify,
  Scrollbar,
  TableNoData,
  TablePaginationCustom,
  useSettingsContext,
  useTable,
} from '@/components'
import { ModalIntegration } from '@/components/modal-integration'
import { useFilters } from '@/hooks'
import DashboardLayout from '@/layouts/dashboard/DashboardLayout'
import {
  useDeleteIntegrationMutation,
  useGetIntegrationsListQuery,
} from '@/redux/services/manager/integration-manager'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { SkeletonBreadcrumbs } from '@/sections/dashboard/skeleton/skeletonBreadcrumbs'
import SkeletonTable from '@/sections/dashboard/skeleton/SkeletonTable'
import { useTranslate } from '@/utils/translateHelper'
AppsPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function AppsPage(): React.ReactElement {
  const translate = useTranslate()
  const { dense, onChangeDense } = useTable()
  const { enqueueSnackbar } = useSnackbar()
  const { themeStretch } = useSettingsContext()
  const { filters, setFilter } = useFilters({ name: '' })

  const { data, isLoading } = useGetIntegrationsListQuery({ ...filters })
  const [removeIntegration] = useDeleteIntegrationMutation()

  const onDelete = async (id: string): Promise<void> => {
    try {
      await removeIntegration({ integrationId: id }).unwrap()
      enqueueSnackbar(translate('integrations_removed_msg'))
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  return (
    <>
      <Head>
        <title>{translate('integrations')} | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {!isLoading ? (
          <CustomBreadcrumbs
            heading=''
            links={[
              {
                name: translate('home'),
                href: STUDENT_PATH_DASHBOARD.class.root,
              },
              {
                name: translate('integrations'),
                href: MANAGER_PATH_DASHBOARD.apps.root,
              },
            ]}
            action={
              <ModalIntegration>
                <Button
                  variant='contained'
                  startIcon={<FaPlus />}
                >
                  {translate('integrations_add_int')}
                </Button>
              </ModalIntegration>
            }
          />
        ) : (
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            mb={2}
          >
            <SkeletonBreadcrumbs />
            <Skeleton
              variant='rectangular'
              animation='wave'
              sx={{
                width: '160px',
                height: '36px',
                borderRadius: '8px',
              }}
            />
          </Stack>
        )}
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <Card>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Scrollbar>
                <Table
                  size={dense ? 'small' : 'medium'}
                  sx={{ minWidth: 800 }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align='left'>{translate('title')}</TableCell>
                      <TableCell align='left'>{translate('actions_create')}</TableCell>
                      <TableCell align='left'>{translate('actions_update')}</TableCell>
                      <TableCell align='right'></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.data.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell align='left'>{row.name}</TableCell>
                        <TableCell align='left'>
                          {format(new Date(row.createdAt), 'MM/dd/yyyy')}
                        </TableCell>
                        <TableCell align='left'>
                          {format(new Date(row.updatedAt), 'MM/dd/yyyy')}
                        </TableCell>
                        <TableCell align='right'>
                          <Stack
                            direction='row'
                            justifyContent='flex-end'
                            gap={2}
                          >
                            <ModalIntegration
                              isEdit
                              id={row.id}
                              defaultValues={omit(row, ['updatedAt', 'createdAt', 'id'])}
                            >
                              <IconButton>
                                <MdOutlineModeEdit />
                              </IconButton>
                            </ModalIntegration>
                            <IconButton
                              onClick={async () => {
                                await onDelete(row.id)
                              }}
                            >
                              <Iconify
                                color='red'
                                icon='material-symbols:delete'
                              />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableNoData isNotFound={!data?.data.length} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
            <TablePaginationCustom
              count={data?.meta.itemCount ? data?.meta.itemCount : 0}
              page={data?.meta.page ? data?.meta.page - 1 : 0}
              rowsPerPage={data?.meta.take ?? 0}
              onPageChange={(e: any, page: number) => {
                setFilter('page', page + 1)
              }}
              onRowsPerPageChange={(e: any) => {
                setFilter('take', e.target.value)
              }}
              dense={dense}
              onChangeDense={onChangeDense}
            />
          </Card>
        )}
      </Container>
    </>
  )
}
