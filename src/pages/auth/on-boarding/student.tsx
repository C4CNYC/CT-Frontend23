import GuestGuard from '@/auth/GuestGuard'
import LoginLayout from '@/layouts/login/LoginLayout'
import { useTranslate } from '@/lib/utils/translateHelper'
import StudentStepper from '@/sections/on-boarding-register/student/StudentStepper'

export default function StudentOnBoarding(): React.ReactElement {
  const translate = useTranslate()
  return (
    <GuestGuard>
      <LoginLayout
        title={translate('login_mumu', { name: 'Mumu' })}
        subtitle={translate('login_mumu_glad')}
      >
        <StudentStepper />
      </LoginLayout>
    </GuestGuard>
  )
}
