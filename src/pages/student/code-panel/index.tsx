import { ReactElement, useEffect, useState } from 'react'

import { enqueueSnackbar } from 'notistack'

import { useAuthContext } from '@/auth/useAuthContext'
import { isUserLoggedIn } from '@root/src/auth/utils'
import CodePanelLayout from '@root/src/sections/code-panel'
import { generateAnonymousUser } from '@root/src/utils/generateAnonymousUser'
import { useRouter } from 'next/router'

export default function CodePanelContainer(): ReactElement | null {
  const router = useRouter()
  const { register, login, loginAsAnon } = useAuthContext()
  const [render, setRender] = useState(false)

  const verifyUserAuthenticationStatus = async () => {
    try {
      if (isUserLoggedIn()) return null
      if (router.query.anonUserId) {
        await loginAsAnon(router.query.anonUserId as string)
      }
      // await registerAndLoginAnonymousUser()
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 })
    } finally {
      setRender(true)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      verifyUserAuthenticationStatus()
    }
  }, [router.isReady])

  if (render) return <CodePanelLayout />
  else return null
}
