import { useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useAuthContext } from '@/auth/useAuthContext'
import { PATH_PAGE } from '@/routes/paths'
import { useTenants } from '@root/src/hooks/useTenants'
import { HomePageType } from '@root/src/redux/services/enums/administration.enum'
import { useGetOrgHomePageQuery } from '@root/src/redux/services/public/tribe-public'
import { PATH_AUTH } from '@root/src/routes/paths'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

export default function HomePage(): React.ReactElement {
  const { user, isInitialized } = useAuthContext()
  const router = useRouter()
  const tenant = useTenants()
  const { data, isLoading } = useGetOrgHomePageQuery(
    { tenantName: tenant?.name || '' },
    { skip: !tenant }
  )

  useEffect(() => {
    if (isLoading) return
    if (!tenant) return
    if (!isInitialized) return
    if (user?.id) {
      router.push(STUDENT_PATH_DASHBOARD.courses.root)
      return
    }
    if (!data?.home_page_type) return

    switch (data.home_page_type) {
      case HomePageType.Authorization: {
        router.push(PATH_AUTH.onBoardingStudent)
        break
      }
      case HomePageType.Default: {
        router.push(PATH_AUTH.onBoardingStudent)
        break
      }
      case HomePageType.Custom: {
        router.push(PATH_PAGE.create)
        break
      }
      case HomePageType.Catalog: {
        router.push(STUDENT_PATH_DASHBOARD.courses.root)
        break
      }
      default:
        router.push(PATH_AUTH.onBoardingStudent)
    }
  }, [data, tenant, isLoading, user, isInitialized])

  return (
    <>
      <Head>
        <title>CodeTribe</title>
        <meta
          name='description'
          content='CodeTribe is a platform for learning, coding, and collaboration.'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <meta
          name='author'
          content='CodeTribe Team'
        />
        <meta
          name='keywords'
          content='CodeTribe, Learning, Collaboration, Education, Development'
        />
        <meta charSet='UTF-8' />
      </Head>
    </>
  )
}
