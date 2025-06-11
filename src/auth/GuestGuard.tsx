import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { Role } from '@/redux/services/enums/role.enum'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { STUDENT_PATH_PAGE } from '@/routes/student.paths'

import { useAuthContext } from './useAuthContext'

interface GuestGuardProps {
  children: React.ReactNode
}

export default function GuestGuard({ children }: GuestGuardProps): React.ReactElement | null {
  const { push, route } = useRouter()

  const { isAuthenticated, user } = useAuthContext()
  useEffect(() => {
    const isAuthRoute = route.includes('auth')
    const isOnboardingRoute = route.includes('on-boarding')
    const isOrgRoute = route.includes('org')

    if (!isAuthenticated || !user || !isAuthRoute || isOnboardingRoute || isOrgRoute) return

    const isAdmin = user.role === Role.Admin || user.role === Role.SuperAdmin

    if (isAdmin) {
      push(MANAGER_PATH_DASHBOARD.administration.root)
    } else {
      push(STUDENT_PATH_PAGE.home)
    }
  }, [isAuthenticated])

  return <> {children} </>
}
