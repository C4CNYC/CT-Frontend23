import GuestGuard from '@/auth/GuestGuard'
import LoginLayout from '@/layouts/login/LoginLayout'
import { useTranslate } from '@/utils/translateHelper'
import AIGenerateStepper from '@root/src/sections/on-boarding-register/teacher/ai-generete-stepper'
import { StyledContentTeacher } from '@root/src/sections/on-boarding-register/teacher/constants'

export default function TeacherOnBoarding(): React.ReactElement {
  const translate = useTranslate()

  return (
    <GuestGuard>
      <LoginLayout
        title={translate('login_mumu', { name: 'Mumu' })}
        subtitle={translate('login_mumu_glad')}
      >
        <StyledContentTeacher isAigenerated={true}>
          <AIGenerateStepper />
        </StyledContentTeacher>
      </LoginLayout>
    </GuestGuard>
  )
}
