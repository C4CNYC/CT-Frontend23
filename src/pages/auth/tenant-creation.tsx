import GuestGuard from '@/auth/GuestGuard'
import LoginLayout from '@/layouts/login/LoginLayout'
import TenantCreation from '@root/src/sections/auth/tenant-creation'

export default function SignIn(): React.ReactElement {
  return (
    <GuestGuard>
      <LoginLayout>
        <TenantCreation />
      </LoginLayout>
    </GuestGuard>
  )
}
