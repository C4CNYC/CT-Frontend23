import { useAuthContext } from '@/auth/useAuthContext'
import { Role } from '@/redux/services/enums/role.enum'

export const useIsSuperAdmin = (): boolean => {
  const { user } = useAuthContext()
  return user?.role === Role.SuperAdmin
}
