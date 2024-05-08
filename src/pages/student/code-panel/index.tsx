import { ReactElement, useEffect, useState } from 'react'

import { GetServerSideProps } from 'next'
import { enqueueSnackbar } from 'notistack'

import { useAuthContext } from '@/auth/useAuthContext'
import { isValidToken } from '@root/src/auth/utils'
import CodePanelLayout from '@root/src/sections/code-panel'
import { generateAnonymousUser } from '@root/src/utils/generateAnonymousUser'

export default function CodePanelContainer({ query }: any): ReactElement | null {
  const { register, login } = useAuthContext()
  const [render, setRender] = useState(false)

  const onSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const isUserLoggedIn = accessToken && isValidToken(accessToken)

    try {
      if (isUserLoggedIn) return null
      const generatedUser = generateAnonymousUser()
      await register(generatedUser)
      await login(generatedUser.email, generatedUser.password, 'codetribe')
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 })
    } finally {
      setRender(true)
    }
  }

  useEffect(() => {
    onSubmit()
  }, [query])

  if (render) return <CodePanelLayout />
  else return null
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context

  return {
    props: { query },
  }
}
