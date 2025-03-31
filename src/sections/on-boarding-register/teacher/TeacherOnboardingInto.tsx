import { Stack } from '@mui/material'
import { useRouter } from 'next/router'

import { PATH_AUTH } from '@root/src/routes/paths'

import { RegisterStudentTeacher, SingLink } from '../links'

import { StyledContentTeacher } from './constants'
import WelcomeStep from './WelcomeStep'

export default function TeacherOnboardingIntro(): React.ReactElement {
  const { push, asPath } = useRouter()

  return (
    <StyledContentTeacher>
      <Stack
        sx={{
          width: '100%',
          minHeight: '460px',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {asPath === PATH_AUTH.onBoardingTeacher.root && <RegisterStudentTeacher isTeacher />}
        <WelcomeStep selectLaunchCourse={() => push(PATH_AUTH.onBoardingTeacher.launchCourse)} />
        <SingLink />
      </Stack>
    </StyledContentTeacher>
  )
}
