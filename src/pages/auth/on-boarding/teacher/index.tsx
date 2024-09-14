import GuestGuard from '@/auth/GuestGuard'
import LoginLayout from '@/layouts/login/LoginLayout'
import { useTranslate } from '@/utils/translateHelper'
import TeacherOnboardingIntro from '@root/src/sections/on-boarding-register/teacher/TeacherOnboardingInto'

export default function TeacherOnBoarding(): React.ReactElement {
  const translate = useTranslate()

  return (
    <GuestGuard>
      <LoginLayout
        title={translate('login_mumu', { name: 'Mumu' })}
        subtitle={translate('login_mumu_glad')}
      >
        <TeacherOnboardingIntro />
      </LoginLayout>
    </GuestGuard>
  )
}
