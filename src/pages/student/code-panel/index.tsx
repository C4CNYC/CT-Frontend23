import { ReactElement, useEffect, useState } from 'react'

import { GetServerSideProps } from 'next'
import { enqueueSnackbar } from 'notistack'

import { useAuthContext } from '@/auth/useAuthContext'
import { generateRandomEmoji } from '@/utils'
import { isValidToken } from '@root/src/auth/utils'
import { Role } from '@root/src/redux/services/enums/role.enum'
import CodePanelLayout from '@root/src/sections/code-panel'

export default function CodePanelContainer({ query }: any): ReactElement | null {
  const { register, login } = useAuthContext()
  const [render, setRender] = useState(false)

  const onSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const isUserLoggedIn = accessToken && isValidToken(accessToken)

    const randomEmoji = generateRandomEmoji(true)
    const payload = {
      email: `${Math.random() * 100}@random.com`,
      password: Math.random().toString(),
      firstName: `Anonymous`,
      lastName: `User ${Math.random() * 100}`,
      role: Role.Student,
      emojiAvatar: randomEmoji,
    }

    try {
      if (isUserLoggedIn) return null
      await register(payload)
      await login(payload.email, payload.password, 'codetribe')
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
