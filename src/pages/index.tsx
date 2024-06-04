import { useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useAuthContext } from '@/auth/useAuthContext'
import { PATH_AUTH } from '@/routes/paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'

export default function HomePage(): React.ReactElement {
  const { isAuthenticated } = useAuthContext()
  const { push } = useRouter()
  useEffect(() => {
      void push(STUDENT_PATH_DASHBOARD.class.root)
  }, [push])

  return (
    <>
      <Head>
        <title>CodeTribe</title>
      </Head>
    </>
  )
}
