import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { LoadingScreen } from '@/components'
import { STUDENT_PATH_PAGE } from '@/routes/student.paths'

import { useAuthContext } from './useAuthContext'

interface GuestGuardProps {
  children: React.ReactNode
}

export default function GuestGuard({ children }: GuestGuardProps): React.ReactElement | null {
  const { push, route, asPath } = useRouter()

  const { isAuthenticated, isInitialized } = useAuthContext()

  useEffect(() => {
    if (isAuthenticated) {
      if (route.includes('public')) {
        push(asPath)
      } else {
        push(STUDENT_PATH_PAGE.home)
      }
    }
  }, [isAuthenticated])

  if (isInitialized === isAuthenticated) {
    return <LoadingScreen />
  }

  return <> {children} </>
}
