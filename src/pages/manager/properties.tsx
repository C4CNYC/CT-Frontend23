import { ChangeEventHandler } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
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
import Link from 'next/link'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'

import {
  CustomBreadcrumbs,
  FormProvider,
  RHFSelect,
  RHFTextField,
  Scrollbar,
  TableNoData,
  TablePaginationCustom,
  useSettingsContext,
  useTable,
} from '@/components'
import { useFilters } from '@/hooks'
import DashboardLayout from '@/layouts/dashboard/DashboardLayout'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { SkeletonBreadcrumbs } from '@/sections/dashboard/skeleton/skeletonBreadcrumbs'
import SkeletonTable from '@/sections/dashboard/skeleton/SkeletonTable'
import { useTranslate } from '@/utils/translateHelper'
import {
  PropertiesCreateEdit,
  propertiesSchema,
} from '@root/src/components/properties/create-edit-properties'
import {
  IProperty,
  IPropertySearchParams,
  PropertyEntityTypes,
} from '@root/src/redux/services/interfaces/properties.interface'
import {
  useGetPropertiesQuery,
  useDeletePropertyMutation,
} from '@root/src/redux/services/manager/properties-manager'
ManagerProperties.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
)

export default function ManagerProperties(): React.ReactElement {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()
  const { dense, onChangeDense } = useTable()
  const { themeStretch } = useSettingsContext()

  const { filters, setFilter } = useFilters<IPropertySearchParams>({ entityType: 'lesson' })

  const [deleteProperty] = useDeletePropertyMutation()

  const { data: properties, isLoading: propertiesLoading } = useGetPropertiesQuery(filters)

  const methods = useForm<IPropertySearchParams>({
    resolver: yupResolver(propertiesSchema),
    defaultValues: { entityType: 'lesson' },
  })

  const onDelete = async (id: string): Promise<void> => {
    try {
      await deleteProperty({ id }).unwrap()
      enqueueSnackbar(translate('properties_removed'))
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  const onChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setFilter(e.target.name, e.target.value)
    methods.setValue(e.target.name as keyof IPropertySearchParams, e.target.value)
  }

  const LinkEntity = (row: IProperty) => {
    switch (row.entityType) {
      case 'lesson':
        return (
          <Link
            href={`${STUDENT_PATH_DASHBOARD.myLessons}?${new URLSearchParams({ lessonId: row.entityId })}`}
            target={row.entityId}
          >
            {row.entityType}
          </Link>
        )
      default:
        return row.entityType
    }
  }
  return (
    <>
      <Head>
        <title>{translate('properties')} | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {!propertiesLoading ? (
          <CustomBreadcrumbs
            heading=''
            links={[
              {
                name: translate('home'),
                href: STUDENT_PATH_DASHBOARD.class.root,
              },
              {
                name: translate('properties'),
                href: MANAGER_PATH_DASHBOARD.apps.root,
              },
            ]}
            action={
              <PropertiesCreateEdit>
                <Button
                  variant='contained'
                  startIcon={<FaPlus />}
                >
                  {translate('properties')}
                </Button>
              </PropertiesCreateEdit>
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
        {propertiesLoading ? (
          <SkeletonTable />
        ) : (
          <>
            <FormProvider methods={methods}>
              <Stack
                direction='row'
                gap={2}
              >
                <RHFSelect
                  native
                  name='entityType'
                  onChange={onChangeHandler}
                >
                  {PropertyEntityTypes.map((pet) => (
                    <option
                      key={pet}
                      value={pet}
                    >
                      {pet}
                    </option>
                  ))}
                </RHFSelect>
                <RHFTextField
                  name='propertyName'
                  placeholder={translate('property_name')}
                  onChange={onChangeHandler}
                />
                <RHFTextField
                  name='entityId'
                  placeholder={translate('entry_id')}
                  onChange={onChangeHandler}
                />
                <RHFTextField
                  name='propertyValue'
                  placeholder={translate('property_value')}
                  onChange={onChangeHandler}
                />
              </Stack>
            </FormProvider>
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
                        <TableCell align='left'>{translate('propertyValue')}</TableCell>
                        <TableCell align='left'>{translate('entityId')}</TableCell>
                        <TableCell align='left'> </TableCell>
                        <TableCell align='right'></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {properties?.data.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell align='left'>{row.propertyName}</TableCell>
                          <TableCell
                            align='left'
                            className='hoverShowChild'
                          >
                            {format(new Date(row.updatedAt), 'MM/dd/yyyy')}
                          </TableCell>
                          <TableCell>{row.propertyValue}</TableCell>
                          <TableCell>{LinkEntity(row)}</TableCell>
                          <TableCell align='right'>
                            <Stack
                              direction='row'
                              justifyContent='flex-end'
                              gap={2}
                            >
                              <PropertiesCreateEdit
                                isEdit
                                id={row.id}
                                defaultValues={omit(row, ['updatedAt', 'createdAt', 'id'])}
                              >
                                <IconButton>
                                  <MdOutlineModeEdit />
                                </IconButton>
                              </PropertiesCreateEdit>
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
                      <TableNoData isNotFound={!properties?.data.length} />
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
              <TablePaginationCustom
                count={properties?.meta.itemCount ? properties?.meta.itemCount : 0}
                page={properties?.meta.page ? properties?.meta.page - 1 : 0}
                rowsPerPage={properties?.meta.take ?? 0}
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
          </>
        )}
      </Container>
    </>
  )
}
