import { useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from '@/redux/store'

import { useAuthContext } from '@/auth/useAuthContext'
import { PATH_PAGE } from '@/routes/paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { Role } from '@root/src/redux/services/enums/role.enum'

export default function HomePage(): React.ReactElement {
  const profile = useSelector((state) => state.global.user)
  const { isAuthenticated } = useAuthContext()
  const { push } = useRouter()
  useEffect(() => {
    if (profile?.role === Role.Student) {
      void push(STUDENT_PATH_DASHBOARD.class.root)
    } else {
      void push(PATH_PAGE.create)
    }
  }, [push, profile])
  return (
    <>
      <Head>
        <title>CodeTribe</title>
      </Head>
    </>
  )
}
