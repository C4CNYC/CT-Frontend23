import { ReactElement, useEffect, useState } from 'react'

import { enqueueSnackbar } from 'notistack'

import { useAuthContext } from '@/auth/useAuthContext'
import { isUserLoggedIn } from '@root/src/auth/utils'
import CodePanelLayout from '@root/src/sections/code-panel'
import { generateAnonymousUser } from '@root/src/utils/generateAnonymousUser'

export default function CodePanelContainer(): ReactElement | null {
  const { register, login } = useAuthContext()
  const [render, setRender] = useState(false)

  const registerAndLoginAnonymousUser = async () => {
    const generatedUser = generateAnonymousUser()
    await register(generatedUser)
    await login(generatedUser.email, generatedUser.password, 'codetribe')
  }

  const verifyUserAuthenticationStatus = async () => {
    try {
      if (isUserLoggedIn()) return null
      // await registerAndLoginAnonymousUser()
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 })
    } finally {
      setRender(true)
    }
  }

  useEffect(() => {
    verifyUserAuthenticationStatus()
  }, [])

  if (render) return <CodePanelLayout />
  else return null
}
