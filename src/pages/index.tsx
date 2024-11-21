import { useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useAuthContext } from '@/auth/useAuthContext'
import { PATH_PAGE } from '@/routes/paths'

export default function HomePage(): React.ReactElement {
  const { isAuthenticated } = useAuthContext()
  const { push } = useRouter()
  useEffect(() => {
    void push(PATH_PAGE.create)
  }, [push])
  return (
    <>
      <Head>
        <title>CodeTribe</title>
      </Head>
    </>
  )
}
