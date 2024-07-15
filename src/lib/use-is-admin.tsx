import { useAuthContext } from '@/auth/useAuthContext'
import { Role } from '@/redux/services/enums/role.enum'

export const useIsAdmin = () => {
  const { user } = useAuthContext()

  const isAdmin = user?.role === Role.Admin

  return {
    isAdmin,
  }
}
