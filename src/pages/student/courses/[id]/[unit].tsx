import { useEffect, useMemo, useState } from 'react'

import { Box, Container, Skeleton, Stack, useMediaQuery, useTheme } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { CustomBreadcrumbs, useSettingsContext } from '@/components'
import { StudentDashboardLayout } from '@/layouts/dashboard'
import { useSelector } from '@/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { getBreadcrumbsSx, getLessonListSx, getPageContainerSx } from '@/sections/module/constants'
import LessonsList from '@/sections/module/LessonsList'
import ModuleSidebar from '@/sections/module/module-sidebar'
import ModuleHeader from '@/sections/module/ModuleHeader'
import { useTranslate } from '@/utils/translateHelper'
import { IModuleContent } from '@root/src/redux/interfaces/content.interface'
import { useGetStudentProgressQuery } from '@root/src/redux/services/manager/lesson-student'
import { useGetPublicCourseContentQuery } from '@root/src/redux/services/public-student'

ModulePage.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)

export default function ModulePage(): React.ReactElement {
  const { themeStretch } = useSettingsContext()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(660))
  const { query } = useRouter()
  const [currentModule, setCurrentModule] = useState<IModuleContent>()
  const translate = useTranslate()
  const profile = useSelector((state) => state.global.user)

  const { data: publicCourse } = useGetPublicCourseContentQuery(
    { id: query.id as string },
    { skip: !query.id }
  )
  const { data: studentProgress } = useGetStudentProgressQuery(undefined, { skip: !profile })

  const course = publicCourse

  const unitModule = useMemo(() => {
    let data = publicCourse
    if (!data || !data?.units) return null
    if (!studentProgress) return data.units.find((m) => m.id === query.unit)
    const updatedUnits = data.units.map((unit) => {
      const updatedLessons = unit.lessons.map((lesson) => {
        const progress = studentProgress.find((p) => p.lessonId === lesson.id)
        return progress
          ? {
              ...lesson,
              progress:
                (+progress?.numberOfCompletedChallenges /
                  ((lesson.meta.challenges as number) || 10)) *
                100,
            }
          : lesson
      })

      // Sum up all lesson.progress values (default to 0 if not set)
      const totalProgress = updatedLessons.reduce((sum, lesson) => sum + (lesson.progress || 0), 0)

      return {
        ...unit,
        lessons: updatedLessons,
        progress: totalProgress,
      }
    })
    return updatedUnits.filter((m) => m.id === query.unit)[0]
  }, [studentProgress, publicCourse])

  useEffect(() => {
    if (publicCourse?.units) {
      let foundunit = publicCourse?.units.find((m) => m.id === query.unit)
      // @ts-ignore since IModuleContent and Unit has inconsistencies
      setCurrentModule(foundunit)
    }
  }, [publicCourse])

  return (
    <>
      <Head>
        <title>{unitModule?.name ?? translate('module')} | CodeTribe</title>
      </Head>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={getPageContainerSx(
          isMobile,
          theme.palette.mode === 'light',
          theme,
          currentModule?.background
        )}
      >
        <CustomBreadcrumbs
          sx={getBreadcrumbsSx(theme, isMobile)}
          links={[
            {
              name: translate('courses'),
              href: STUDENT_PATH_DASHBOARD.courses.root,
            },
            {
              name: course?.name ?? translate('course'),
              href: STUDENT_PATH_DASHBOARD.courses.course(course?.id as string),
            },
            {
              name: unitModule?.name ?? translate('module'),
            },
          ]}
        />
        <Box
          sx={{
            gap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'auto', md: 'auto 300px' },
          }}
        >
          <Box overflow={'hidden'}>
            {unitModule ? (
              <ModuleHeader
                name={unitModule.name}
                lessons={unitModule?.lessons ?? []}
                description={
                  unitModule?.description ? unitModule.description : translate('description')
                }
                avatar={unitModule.avatar}
              />
            ) : (
              <Skeleton
                variant='rounded'
                sx={{ width: '100%', height: '280px', minWidth: '410px' }}
              />
            )}
            {unitModule ? (
              <LessonsList
                lessons={unitModule?.lessons ?? []}
                unitId={query?.unit as string}
              />
            ) : (
              <Stack sx={getLessonListSx(isMobile, theme)}>
                <Skeleton
                  variant='rounded'
                  sx={{
                    width: '84px',
                    height: '37px',
                    alignSelf: 'flex-end',
                    mr: -3,
                  }}
                />
                {Array.from('12345').map((el) => (
                  <Skeleton
                    key={el + 32}
                    variant='rounded'
                    width='100%'
                    height='158px'
                  />
                ))}
              </Stack>
            )}
          </Box>
          {unitModule ? (
            <ModuleSidebar
              module={unitModule}
              moduleContent={currentModule}
            />
          ) : null}
        </Box>
      </Container>
    </>
  )
}
