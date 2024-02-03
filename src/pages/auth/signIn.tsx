import GuestGuard from '@/auth/GuestGuard'
import LoginLayout from '@/layouts/login/LoginLayout'
import SignInMain from '@/sections/auth/sign-in'

export default function SignIn(): React.ReactElement {
  return (
    <GuestGuard>
      <LoginLayout>
        <SignInMain />
      </LoginLayout>
    </GuestGuard>
  )
}
