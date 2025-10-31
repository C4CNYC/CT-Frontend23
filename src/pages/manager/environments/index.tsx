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
import { IoTrashOutline } from '@react-icons/all-files/io5/IoTrashOutline'
import { MdOutlineModeEdit } from '@react-icons/all-files/md/MdOutlineModeEdit'
import { format } from 'date-fns'
import omit from 'lodash-es/omit'
import Head from 'next/head'
import { useSnackbar } from 'notistack'

import {
  CustomBreadcrumbs,
  Scrollbar,
  TableNoData,
  TablePaginationCustom,
  useSettingsContext,
  useTable,
} from '@/components'
import { ModalEnvironments } from '@/components/modal-environments'
import { useFilters } from '@/hooks'
import DashboardLayout from '@/layouts/dashboard/DashboardLayout'
import {
  useDeleteEnvironmentMutation,
  useGetEnvironmentsListQuery,
} from '@/redux/services/manager/environments-manager'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { SkeletonBreadcrumbs } from '@/sections/dashboard/skeleton/skeletonBreadcrumbs'
import SkeletonTable from '@/sections/dashboard/skeleton/SkeletonTable'
import { useTranslate } from '@/utils/translateHelper'
EnvironmentsPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function EnvironmentsPage(): React.ReactElement {
  const translate = useTranslate()
  const { dense, onChangeDense } = useTable()
  const { enqueueSnackbar } = useSnackbar()
  const { themeStretch } = useSettingsContext()
  const { filters, setFilter } = useFilters({ name: '' })

  const { data, isLoading } = useGetEnvironmentsListQuery({ ...filters })
  const [removeEnvironment] = useDeleteEnvironmentMutation()

  const onDelete = async (id: string): Promise<void> => {
    try {
      await removeEnvironment({ environmentId: id }).unwrap()
      enqueueSnackbar(translate('Environments removed'))
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  return (
    <>
      <Head>
        <title>{translate('Environments')} | CodeTribe</title>
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
                name: translate('environments'),
                href: MANAGER_PATH_DASHBOARD.environments.root,
              },
            ]}
            action={
              <ModalEnvironments>
                <Button
                  variant='contained'
                  startIcon={<FaPlus />}
                >
                  {translate('Add Environment')}
                </Button>
              </ModalEnvironments>
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
                            <ModalEnvironments
                              isEdit
                              id={row.id}
                              defaultValues={omit(row, ['updatedAt', 'createdAt', 'id'])}
                            >
                              <IconButton>
                                <MdOutlineModeEdit />
                              </IconButton>
                            </ModalEnvironments>
                            <IconButton
                              onClick={async () => {
                                await onDelete(row.id)
                              }}
                            >
                              <IoTrashOutline />
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
