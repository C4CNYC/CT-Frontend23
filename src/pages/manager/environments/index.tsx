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
import { MdDownload } from '@react-icons/all-files/md/MdDownload'
import { MdOutlineModeEdit } from '@react-icons/all-files/md/MdOutlineModeEdit'
import { format } from 'date-fns'
import omit from 'lodash-es/omit'
import Head from 'next/head'
import { useSnackbar } from 'notistack'

import {
  CustomBreadcrumbs,
  Scrollbar,
  TableNoData,
  useSettingsContext,
  useTable,
} from '@/components'
import { useFilters } from '@/hooks'
import DashboardLayout from '@/layouts/dashboard/DashboardLayout'
import {
  useDeleteEnvironmentMutation,
  useGetEnvironmentsQuery,
} from '@/redux/services/manager/environments-manager'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { SkeletonBreadcrumbs } from '@/sections/dashboard/skeleton/skeletonBreadcrumbs'
import SkeletonTable from '@/sections/dashboard/skeleton/SkeletonTable'
import { useTranslate } from '@/utils/translateHelper'

import { EnvironmentModal } from './EnvironmentModal'

EnvironmentsPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function EnvironmentsPage(): React.ReactElement {
  const translate = useTranslate()
  const { dense, onChangeDense } = useTable()
  const { enqueueSnackbar } = useSnackbar()
  const { themeStretch } = useSettingsContext()
  const { filters, setFilter } = useFilters({ name: '' })

  const { data, isLoading } = useGetEnvironmentsQuery({ ...filters })
  const [deleteEnvironment] = useDeleteEnvironmentMutation()

  const onDelete = async (id: string): Promise<void> => {
    try {
      await deleteEnvironment({ id }).unwrap()
      enqueueSnackbar(translate('environment_removed_msg'))
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  return (
    <>
      <Head>
        <title>{translate('environments')} | CodeTribe</title>
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
                href: MANAGER_PATH_DASHBOARD.environments?.root || '/manager/environments',
              },
            ]}
            action={
              <EnvironmentModal>
                <Button
                  variant='contained'
                  startIcon={<FaPlus />}
                >
                  {translate('environments_add')}
                </Button>
              </EnvironmentModal>
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
        {isLoading || !data ? (
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
                      <TableCell align='left'>{translate('name')}</TableCell>
                      <TableCell align='left'>{translate('description')}</TableCell>
                      <TableCell align='left'>{translate('status')}</TableCell>
                      <TableCell align='left'>{translate('actions_create')}</TableCell>
                      <TableCell align='left'>{translate('actions_update')}</TableCell>
                      <TableCell align='right'></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align='left'>{row.name}</TableCell>
                        <TableCell align='left'>{row.description}</TableCell>
                        <TableCell align='left'>
                          {row.active ? translate('active') : translate('inactive')}
                        </TableCell>
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
                            {row.zipFile && (
                              <IconButton
                                component='a'
                                href={row.zipFile}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <MdDownload />
                              </IconButton>
                            )}
                            <EnvironmentModal
                              isEdit
                              id={row.id}
                              defaultValues={omit(row, ['updatedAt', 'createdAt', 'id'])}
                            >
                              <IconButton>
                                <MdOutlineModeEdit />
                              </IconButton>
                            </EnvironmentModal>
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
                    <TableNoData isNotFound={!data.length} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
          </Card>
        )}
      </Container>
    </>
  )
}
