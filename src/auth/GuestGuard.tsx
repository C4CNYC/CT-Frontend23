import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { STUDENT_PATH_PAGE } from '@/routes/student.paths'

import { useAuthContext } from './useAuthContext'

interface GuestGuardProps {
  children: React.ReactNode
}

export default function GuestGuard({ children }: GuestGuardProps): React.ReactElement | null {
  const { push, route } = useRouter()

  const { isAuthenticated, user } = useAuthContext()
  useEffect(() => {
    if (isAuthenticated && user && route.includes('auth')) {
      push(STUDENT_PATH_PAGE.home)
    }
  }, [isAuthenticated])

  return <> {children} </>
}
