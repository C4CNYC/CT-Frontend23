import { Box, Button, Container } from '@mui/material'
import { FaPlus } from '@react-icons/all-files/fa6/FaPlus'
import Head from 'next/head'

import { DEFAULT_TAKE_PER_PAGE, FilterMode, useFilters } from '@/hooks'
import DashboardLayout from '@/layouts/dashboard'
import { useIsAdmin } from '@/lib/use-is-admin'
import { useGetAdminModulesQuery } from '@/redux/services/admin/modules-admin'
import { IModulesSearchParams } from '@/redux/services/interfaces/courseUnits.interface'
import { useGetOwnModulesQuery } from '@/redux/services/manager/modules-manager'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import CreateModuleDialog from '@/sections/dashboard/modules/CreateModuleDialog'
import ModuleCard from '@/sections/dashboard/modules/ModuleCard'
import ModuleOrganizing from '@/sections/dashboard/modules/ModuleOrganizing/ModuleOrganizing'
import SkeletonList, { DefaultSkeletonItem } from '@/sections/dashboard/skeleton/skeletonList'
import { useTranslate } from '@/utils/translateHelper'
import { CustomBreadcrumbs, SimpleInfiniteList, useSettingsContext } from '@root/src/components'

import FilterModules from './filter'

ModulesListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function ModulesListPage(): React.ReactElement | string {
  const translate = useTranslate()
  const { themeStretch } = useSettingsContext()
  const { isAdmin } = useIsAdmin()

  const { filters, setFilter } = useFilters<IModulesSearchParams>(
    {
      name: '',
      course_id: '',
    },
    FilterMode.global
  )
  const {
    data: ownData,
    isLoading: isOwnLoading,
    isFetching: isOwnFetching,
    refetch: ownRefetch,
  } = useGetOwnModulesQuery({ ...filters, catalog: false }, { skip: isAdmin })

  const {
    data: adminData,
    isLoading: adminIsLoading,
    isFetching: adminFetching,
    refetch: adminRefetch,
  } = useGetAdminModulesQuery(filters, { skip: !isAdmin })

  const data = isAdmin ? adminData : ownData
  const isLoading = isAdmin ? adminIsLoading : isOwnLoading
  const isFetching = isAdmin ? adminFetching : isOwnFetching

  const refetch = () => {
    if (isAdmin) {
      adminRefetch()
    } else {
      ownRefetch()
    }
  }

  if (isLoading) {
    return (
      <SkeletonList
        filter={2}
        count={DEFAULT_TAKE_PER_PAGE}
      />
    )
  }

  return (
    <>
      <Head>
        <title> {translate('modules')} | CodeTribe</title>
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
              name: translate('modules'),
              href: MANAGER_PATH_DASHBOARD.modules.root,
            },
          ]}
          action={
            <CreateModuleDialog refetch={refetch}>
              <Button
                variant='contained'
                startIcon={<FaPlus />}
              >
                {translate('modules_create_module')}
              </Button>
            </CreateModuleDialog>
          }
        />
        <FilterModules
          filters={filters}
          setFilter={setFilter}
        />
        <Box
          gap={2}
          display='grid'
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {filters?.course_id?.length || isAdmin ? (
            <SimpleInfiniteList
              hasNextPage={data?.meta.hasNextPage ?? false}
              onLoadMore={() => {
                if (data?.meta.take !== Number(filters?.take)) return
                setFilter('take', Number(filters.take) + DEFAULT_TAKE_PER_PAGE)
              }}
              loading={isLoading ?? isFetching}
            >
              {data?.data.map((module, index) => (
                <ModuleCard
                  key={index}
                  module={module}
                  refetch={refetch}
                />
              ))}
              {isFetching
                ? Array(3)
                    .fill(null)
                    .map((v, i) => <DefaultSkeletonItem key={i} />)
                : null}
            </SimpleInfiniteList>
          ) : (
            <SimpleInfiniteList
              hasNextPage={ownData?.meta.hasNextPage ?? false}
              onLoadMore={() => {
                if (ownData?.meta.take !== Number(filters?.take)) return
                setFilter('take', Number(filters.take) + DEFAULT_TAKE_PER_PAGE)
              }}
              loading={isLoading ?? isFetching}
            >
              {ownData?.data?.map((module, index) => (
                <ModuleCard
                  key={index}
                  module={module}
                  refetch={refetch}
                />
              ))}
              {isFetching
                ? Array(3)
                    .fill(null)
                    .map((v, i) => <DefaultSkeletonItem key={i} />)
                : null}
            </SimpleInfiniteList>
          )}
        </Box>
        <ModuleOrganizing />
      </Container>
    </>
  )
}
