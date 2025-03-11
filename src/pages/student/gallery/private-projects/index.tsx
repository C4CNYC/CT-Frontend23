import { useEffect, useState } from 'react'

import { Box, Container } from '@mui/material'

import { DEFAULT_TAKE_PER_PAGE, FilterMode, useFilters } from '@/hooks'
import { StudentDashboardLayout } from '@/layouts/dashboard/StudentDashboardLayout'
import { useGetProjectsQuery } from '@/redux/services/manager/gallery-student'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import FilterGallery from '@/sections/dashboard/gallery/filter'
import { getCountTakingElment } from '@/utils'
import { CustomBreadcrumbs } from '@root/src/components/custom-breadcrumbs/CustomBreadcrumbs'
import { EmptyContent } from '@root/src/components/empty-content/EmptyContent'
import { SimpleInfiniteList } from '@root/src/components/infinity-pagination/SimpleInfiniteList'
import { useSettingsContext } from '@root/src/components/settings/SettingsContext'
import { IGallery, IGallerySearchParams } from '@root/src/redux/interfaces/gallery.interface'
import ProjectsList from '@root/src/sections/dashboard/gallery'
import {
  SkeletonGalleryBreadcrumbs,
  SkeletonGalleryFilter,
  SkeletonGalleryItem,
} from '@root/src/sections/dashboard/gallery/skeletons'
import { useTranslate } from '@root/src/utils/translateHelper'

PrivateProjects.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)
export default function PrivateProjects(): React.ReactElement {
  const translate = useTranslate()
  const { themeStretch } = useSettingsContext()

  const [projects, setProjects] = useState<IGallery[] | []>([])

  const { filters, setFilter } = useFilters<IGallerySearchParams>(
    {
      title: '',
    },
    FilterMode.global
  )

  const { data, isLoading, isFetching } = useGetProjectsQuery(filters)

  useEffect(() => {
    if (data) {
      setProjects(data.data.filter((el: IGallery) => el.public === false))
    }
  }, [data])

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {isLoading ? (
          <>
            <SkeletonGalleryBreadcrumbs />
            <SkeletonGalleryFilter />
          </>
        ) : (
          <>
            <CustomBreadcrumbs
              heading=''
              links={[
                { name: 'Home', href: STUDENT_PATH_DASHBOARD.class.root },
                { name: 'Gallery', href: STUDENT_PATH_DASHBOARD.gallery.root },
                {
                  name: 'Private',
                  href: STUDENT_PATH_DASHBOARD.gallery.privateProject,
                },
              ]}
            />
            <FilterGallery
              filters={filters}
              setFilter={setFilter}
            />
          </>
        )}
        <SimpleInfiniteList
          hasNextPage={data?.meta.hasNextPage ?? false}
          onLoadMore={() => {
            if (data?.meta.take !== Number(filters?.take)) return
            setFilter('take', Number(filters.take) + DEFAULT_TAKE_PER_PAGE)
          }}
          loading={isLoading ?? isFetching}
        >
          <Box
            gap={3}
            display='grid'
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
          >
            <ProjectsList projects={projects} />
            {isFetching
              ? Array(getCountTakingElment(Number(data?.meta.itemCount), Number(filters.take)))
                  .fill(null)
                  .map((v, i) => <SkeletonGalleryItem key={i + 22} />)
              : null}
          </Box>
        </SimpleInfiniteList>

        {!isLoading && !isFetching && !data?.data.length ? (
          <EmptyContent title={translate('gallery_projects_empty')} />
        ) : null}
      </Container>
    </>
  )
}
