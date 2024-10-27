import { ReactElement, useEffect, useState } from 'react'

import { enqueueSnackbar } from 'notistack'

import { isUserLoggedIn } from '@root/src/auth/utils'
import CodePanelLayout from '@root/src/sections/code-panel'

export default function CodePanelContainer(): ReactElement | null {
  const [render, setRender] = useState(false)
  const verifyUserAuthenticationStatus = async () => {
    try {
      if (isUserLoggedIn()) return null
    } catch (error: any) {
      enqueueSnackbar(`${error?.message}`, { variant: 'error', autoHideDuration: 1000 })
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
