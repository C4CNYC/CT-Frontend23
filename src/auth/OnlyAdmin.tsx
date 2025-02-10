import { Role } from '../redux/services/enums/role.enum'

import { useAuthContext } from './useAuthContext'

interface Prop {
  children: React.ReactNode
}

export default function OnlyAdmin({ children }: Prop): React.ReactNode | null {
  const { user } = useAuthContext()
  const currentRole = user?.role
  return [Role.SuperAdmin, Role.Admin].includes(currentRole) ? children : null
}
