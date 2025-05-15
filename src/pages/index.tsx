import { useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useAuthContext } from '@/auth/useAuthContext'
import { useSelector } from '@/redux/store'
import { PATH_PAGE } from '@/routes/paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'

export default function HomePage(): React.ReactElement {
  const profile = useSelector((state) => state.global.user)
  const { isAuthenticated, isInitialized } = useAuthContext()
  const { push } = useRouter()
  useEffect(() => {
    if (!isInitialized) return
    if (isAuthenticated) {
      void push(STUDENT_PATH_DASHBOARD.class.root)
    } else {
      void push(PATH_PAGE.create)
    }
  }, [push, isAuthenticated, isInitialized])
  return (
    <>
      <Head>
        <title>CodeTribe</title>
      </Head>
    </>
  )
}
