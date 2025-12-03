import React from 'react'

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
import { Stack } from '@mui/system'
import Container from '@mui/system/Container'
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
import { useFilters } from '@/hooks'
import DashboardLayout from '@/layouts/dashboard/DashboardLayout'
import { useGetSkillQuery, useRemoveSkillMutation } from '@/redux/services/manager/skills-manager'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { SkeletonBreadcrumbs } from '@/sections/dashboard/skeleton/skeletonBreadcrumbs'
import SkeletonTable from '@/sections/dashboard/skeleton/SkeletonTable'
import UpdateModalSkills from '@/sections/dashboard/skills/update-modal'
import { useTranslate } from '@/utils/translateHelper'

Skills.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function Skills(): React.ReactElement {
  const { dense, onChangeDense } = useTable()
  const { enqueueSnackbar } = useSnackbar()
  const { themeStretch } = useSettingsContext()
  const translate = useTranslate()

  const { filters, setFilter } = useFilters({ name: '' })

  const { data, isLoading } = useGetSkillQuery({ ...filters })
  const [removeSkill] = useRemoveSkillMutation()

  const onDelete = async (id: string): Promise<void> => {
    try {
      await removeSkill({ id }).unwrap()
      enqueueSnackbar(translate('skills_removed'))
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  return (
    <>
      <Head>
        <title> {translate('skills') + ` | CodeTribe`}</title>
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
                name: translate('skills'),
                href: MANAGER_PATH_DASHBOARD.skills.root,
              },
            ]}
            action={
              <UpdateModalSkills>
                <Button
                  variant='contained'
                  startIcon={<FaPlus />}
                >
                  {translate('skills')}
                </Button>
              </UpdateModalSkills>
            }
          />
        ) : (
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <SkeletonBreadcrumbs />
            <Skeleton
              variant='rectangular'
              animation='wave'
              sx={{
                width: '94px',
                height: '36px',
                borderRadius: '8px',
                mb: '50px',
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
                <Table sx={{ minWidth: 800 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>{translate('name')}</TableCell>
                      <TableCell>{translate('description')}</TableCell>
                      <TableCell>{translate('created')}</TableCell>
                      <TableCell>{translate('updated')}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.data.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell align='left'>{row.name}</TableCell>
                        <TableCell align='left'>{row.description}</TableCell>
                        <TableCell align='left'>
                          {format(new Date(row.createdAt), 'MM/dd/yyyy')}
                        </TableCell>
                        <TableCell align='left'>
                          {format(new Date(row.updatedAt), 'MM/dd/yyyy')}
                        </TableCell>
                        <TableCell align='left'>
                          <Stack
                            direction='row'
                            gap={2}
                          >
                            <UpdateModalSkills
                              id={row.id}
                              defaultValues={omit(row, ['updatedAt', 'createdAt', 'id'])}
                            >
                              <IconButton>
                                <MdOutlineModeEdit />
                              </IconButton>
                            </UpdateModalSkills>
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
