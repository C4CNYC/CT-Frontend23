import { useEffect } from 'react'

import { Skeleton } from '@mui/material'
import { Container } from '@mui/system'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useSettingsContext } from '@/components'
import { StudentDashboardLayout } from '@/layouts/dashboard'
import { useGetClassQuery } from '@/redux/services/manager/classes-student'
import { useGetPublicTribeQuery } from '@/redux/services/public/tribe-public'
import { useGetPublicClassQuery } from '@/redux/services/public-student'
import { setClass } from '@/redux/slices/code-panel'
import { useDispatch, useSelector } from '@/redux/store'
import JoinTribeModal from '@/sections/join-tribe/JoinTribeModal'
import DefaultClassInfo from '@/sections/main/class-info/DefaultClassInfo'
import ClassInfoTable from '@/sections/main/quests/ClassInfoTable'
import { useTranslate } from '@/utils/translateHelper'
import RoleBasedGuard from '@root/src/auth/RoleBasedGuard'
import { Role } from '@root/src/redux/services/enums/role.enum'
import MainPageTour from '@root/src/sections/intro-tours/teacher-intro-main'

HomeOverview.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)

export default function HomeOverview(): React.ReactElement {
  const dispatch = useDispatch()
  const { themeStretch } = useSettingsContext()
  const { query } = useRouter()
  const profile = useSelector((state) => state.global.user)

  localStorage.setItem('classId', query.id as string)
  localStorage.setItem('joinCode', query.joinCode as string)

  const { data: classData, isLoading: isClassLoading } = useGetClassQuery(
    { id: query.id as string },
    { skip: !query.id || !!query.joinCode || !profile }
  )
  const { data: publicClass, isLoading: isPublicLoading } = useGetPublicClassQuery(
    { id: query.id as string },
    { skip: !query.id || !!query.joinCode || !!profile }
  )

  const data = classData ?? publicClass
  const isLoading = isClassLoading ?? isPublicLoading

  const translate = useTranslate()

  const { data: classInfo } = useGetPublicTribeQuery(
    {
      joinCode: query.joinCode as string,
    },
    { skip: !query.joinCode }
  )

  useEffect(() => {
    if (data) {
      dispatch(setClass(data))
    }
  }, [isLoading, data])

  return (
    <>
      <Head>
        <title> {translate('home_overview')} | Code Tribe</title>
      </Head>
      {classInfo ? (
        <JoinTribeModal
          classInfo={classInfo}
          isSignIn={true}
        />
      ) : null}
      {!(isLoading || !data) ? (
        <>
          <RoleBasedGuard
            roles={[Role.Owner, Role.SuperAdmin, Role.SuperAdmin, Role.Admin, Role.Manager]}
          >
            <MainPageTour />
          </RoleBasedGuard>
          <div>
            <DefaultClassInfo classData={data} />
            <Container
              maxWidth={themeStretch ? false : 'lg'}
              disableGutters
            >
              <ClassInfoTable classData={data} />
            </Container>
          </div>
        </>
      ) : (
        <Skeleton
          sx={{ width: '100%', height: '188px' }}
          variant='rectangular'
          animation='wave'
        />
      )}
    </>
  )
}
