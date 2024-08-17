import { useEffect, useMemo, useState } from 'react'

import { Container, Skeleton, Stack, useMediaQuery, useTheme } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { CustomBreadcrumbs, useSettingsContext } from '@/components'
import { StudentDashboardLayout } from '@/layouts/dashboard'
import { IModuleContent } from '@/redux/interfaces/content.interface'
import {
  useGetCoursContentQuery,
  useGetStudentCourseModulesQuery,
} from '@/redux/services/manager/courses-student'
import {
  useGetModuleWithLessonsQuery,
  useGetPublicModuleWithLessonsQuery,
} from '@/redux/services/manager/modules-student'
import { useSelector } from '@/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import {
  CONTAINER_SX,
  getBreadcrumbsSx,
  getLessonListSx,
  getPageContainerSx,
} from '@/sections/module/constants'
import LessonsList from '@/sections/module/LessonsList'
import ModuleSidebar from '@/sections/module/module-sidebar'
import ModuleHeader from '@/sections/module/ModuleHeader'
import { useTranslate } from '@/utils/translateHelper'
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

  const { data: modules, isLoading: isLoadingModules } = useGetStudentCourseModulesQuery(
    { id: query?.id as string },
    { skip: !query?.id || !profile }
  )
  const { data: studentCourse } = useGetCoursContentQuery(
    {
      id: query.id as string,
    },
    { skip: !query.id || !profile }
  )

  const { data: publicCourse } = useGetPublicCourseContentQuery(
    { id: query.id as string },
    { skip: !query.id || !!profile }
  )

  const course = studentCourse ?? publicCourse

  const {
    data: lessonsModule,
    isLoading: isLoadingLessonsModule,
    refetch: refetchModule,
  } = useGetModuleWithLessonsQuery({ id: query.unit as string }, { skip: !query.unit || !profile })

  const {
    data: publicModule,
    isLoading: isLoadingPublicModule,
    refetch: refetchPublic,
  } = useGetPublicModuleWithLessonsQuery(
    { id: query.unit as string },
    { skip: !query.unit || !!profile }
  )

  const unitModule = lessonsModule ?? publicModule
  const isLoadingModule = isLoadingLessonsModule ?? isLoadingPublicModule
  const refetch = refetchModule ?? refetchPublic

  const moduleDuration = useMemo(
    () =>
      unitModule?.duration
        ? Object.entries(unitModule.duration)
            .map(([dataType, count]) => `${count} ${dataType}`)
            .join(' ')
        : '20 min',
    [unitModule]
  )

  useEffect(() => {
    if (modules) {
      setCurrentModule(modules.filter((m) => m.id === query.unit)[0])
    }
  }, [isLoadingModules])

  useEffect(() => {
    if (profile) {
      refetch()
    }
  }, [query?.id, refetch, profile])

  return (
    <>
      <Head>
        <title>{unitModule?.name ?? translate('module')} | CodeTribe</title>
      </Head>
      <Container
        maxWidth={themeStretch ? false : 'xl'}
        disableGutters
        sx={getPageContainerSx(isMobile, theme.palette.mode === 'light', currentModule?.avatar)}
      >
        <CustomBreadcrumbs
          sx={getBreadcrumbsSx(isMobile, theme)}
          links={[
            {
              name: translate('home'),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
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
        <Stack
          sx={{
            gap: 3,
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'column',
              lg: 'row',
            },
          }}
        >
          <Stack sx={CONTAINER_SX}>
            {!isLoadingModules && !isLoadingModule && unitModule ? (
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
            {!isLoadingModule ? (
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
          </Stack>
          <ModuleSidebar
            level='Beginner'
            grade='6th-10th Grade'
            duration={moduleDuration}
            lessonCount={`${unitModule?.lessons?.length} ${translate('lessons')}`}
            description={
              unitModule?.description ? unitModule.description : translate('description')
            }
            certificate={unitModule?.initial_enrolled ?? 0}
            likes={unitModule?.initial_likes ?? 0}
            rated={unitModule?.initial_stars ?? 0}
            teacherForum={currentModule?.teacher_forum ?? ''}
            teacherSlides={currentModule?.teacher_slides}
            lessonPlans={currentModule?.lesson_plans}
            lessons={unitModule?.lessons}
          />
        </Stack>
      </Container>
    </>
  )
}
