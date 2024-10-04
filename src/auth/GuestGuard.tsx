/* eslint-disable no-console */
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

  console.log('GuestGuard')
  useEffect(() => {
    if (isAuthenticated) {
      console.log(isAuthenticated, 'isAuthenticated')
      console.log(route, 'is route')
      console.log(asPath, ' asPath')
      if (route.includes('public') || route.includes('auth')) {
        push(asPath)
      } else {
        push(STUDENT_PATH_PAGE.home)
      }
    } else {
      console.log('not authenticated')
    }
  }, [isAuthenticated])

  if (isInitialized === isAuthenticated) {
    return <LoadingScreen />
  }

  return <> {children} </>
}
