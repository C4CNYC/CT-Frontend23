import GuestGuard from '@/auth/GuestGuard'
import LoginLayout from '@/layouts/login/LoginLayout'
import { useTranslate } from '@/lib/utils/translateHelper'
import TeacherStepper from '@/sections/on-boarding-register/teacher/TeacherStepper'

export default function TeacherOnBoarding(): React.ReactElement {
  const translate = useTranslate()

  return (
    <GuestGuard>
      <LoginLayout
        title={translate('login_mumu', { name: 'Mumu' })}
        subtitle={translate('login_mumu_glad')}
      >
        <TeacherStepper />
      </LoginLayout>
    </GuestGuard>
  )
}
