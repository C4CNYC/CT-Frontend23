import { useEffect } from 'react'

import { Skeleton } from '@mui/material'
import { Container } from '@mui/system'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useSettingsContext } from '@/components'
import { StudentDashboardLayout } from '@/layouts/dashboard'
import { useTranslate } from '@/lib/utils/translateHelper'
import { useGetClassQuery } from '@/redux/services/manager/classes-student'
import { useGetPublicTribeQuery } from '@/redux/services/public/tribe-public'
import { setClass } from '@/redux/slices/code-panel'
import { useDispatch } from '@/redux/store'
import JoinTribeModal from '@/sections/join-tribe/JoinTribeModal'
import DefaultClassInfo from '@/sections/main/class-info/DefaultClassInfo'
import ClassInfoTable from '@/sections/main/quests/ClassInfoTable'

HomeOverview.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)

export default function HomeOverview(): React.ReactElement {
  const dispatch = useDispatch()
  const { themeStretch } = useSettingsContext()
  const { query } = useRouter()

  localStorage.setItem('classId', query.id as string)
  localStorage.setItem('joinCode', query.joinCode as string)

  const { data, isLoading } = useGetClassQuery(
    { id: query.id as string },
    { skip: !query.id || !!query.joinCode }
  )
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
  }, [isLoading])

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
          <DefaultClassInfo classData={data} />
          <Container
            maxWidth={themeStretch ? false : 'lg'}
            disableGutters
          >
            <ClassInfoTable classData={data} />
          </Container>
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
