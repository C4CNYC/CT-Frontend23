import { useEffect, useState } from 'react'

import { Container, Grid, Link } from '@mui/material'
import NextLink from 'next/link'

import { StudentDashboardLayout } from '@/layouts/dashboard/StudentDashboardLayout'
import { useGetProjectsQuery } from '@/redux/services/manager/gallery-student'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import FolderElement from '@/sections/dashboard/gallery/FolderElement'
import { CustomBreadcrumbs } from '@root/src/components/custom-breadcrumbs/CustomBreadcrumbs'
import { useSettingsContext } from '@root/src/components/settings/SettingsContext'
import { FilterMode, useFilters } from '@root/src/hooks'
import { IGallery, IGallerySearchParams } from '@root/src/redux/interfaces/gallery.interface'
import { useTranslate } from '@root/src/utils/translateHelper'

Gallery.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)
interface IProjectCount {
  publicPr: number
  privatePr: number
}
export default function Gallery(): React.ReactElement {
  const translate = useTranslate()
  const [projectsCount, setProjectsCount] = useState<IProjectCount>({
    publicPr: 0,
    privatePr: 0,
  })
  const { themeStretch } = useSettingsContext()

  const { filters, setFilter } = useFilters<IGallerySearchParams>(
    {
      title: '',
    },
    FilterMode.global
  )

  const { data } = useGetProjectsQuery(filters)

  useEffect(() => {
    if (data) setFilter('take', data.meta.itemCount)
  }, [])

  useEffect(() => {
    if (data) {
      const publicCount = data.data.filter((el: IGallery) => el.public === true).length
      setProjectsCount({
        publicPr: publicCount,
        privatePr: data.data.length - publicCount,
      })
    }
  }, [data])

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading=''
        links={[
          { name: 'Home', href: STUDENT_PATH_DASHBOARD.class.root },
          { name: 'Gallery', href: STUDENT_PATH_DASHBOARD.gallery.root },
        ]}
      />

      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        mt={2}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <Link
            component={NextLink}
            href={STUDENT_PATH_DASHBOARD.gallery.publicProject}
            underline='none'
          >
            <FolderElement
              title={translate('gallery_folder_public_title')}
              subtitle={translate('gallery_folder_public_subtitle')}
              projectCount={projectsCount.publicPr}
            />
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <Link
            component={NextLink}
            href={STUDENT_PATH_DASHBOARD.gallery.privateProject}
            underline='none'
          >
            <FolderElement
              title={translate('gallery_folder_private_title')}
              subtitle={translate('gallery_folder_private_subtitle')}
              projectCount={projectsCount.privatePr}
            />
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}
