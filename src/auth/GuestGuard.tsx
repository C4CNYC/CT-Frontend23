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

  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    if (isAuthenticated) {
      if (route.includes('public') || route.includes('auth')) {
        push(asPath)
      } else {
        push(STUDENT_PATH_PAGE.home)
      }
    } else {
      console.log('not authenticated')
    }
  }, [isAuthenticated])

// This is breaking, We need a better way to set this loading state
//   if (!isAuthenticated && isInitialized) {
//     return <LoadingScreen />
//   }

  return <> {children} </>
}
