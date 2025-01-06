import { Button, Stack, Typography } from '@mui/material'

import { useTranslate } from '@/utils/translateHelper'

import {
  LAUNCH_SESSION_BTN_SX,
  POPUP_SESSION_BTN_SX,
  WELCOME_STEP_SUBTITLE_SX,
  WELCOME_STEP_WRAPPER_SX,
} from './constants'
import { SessionType } from './SessionType'

type IWelcomeStepProps = {
  selectLaunchCourse: () => void
  // selectAIGenerate: () => void
}

export default function WelcomeStep({
  selectLaunchCourse,
  // selectAIGenerate,
}: IWelcomeStepProps): React.ReactElement {
  const translate = useTranslate()

  return (
    <>
      <Stack
        direction='row'
        sx={WELCOME_STEP_WRAPPER_SX}
      >
        <Typography variant='h3'>{translate('login_hey_teachers')}</Typography>
        <Typography
          variant='h3'
          sx={{ ml: 1 }}
        >
          👋
        </Typography>
      </Stack>
      <Typography
        variant='body1'
        sx={WELCOME_STEP_SUBTITLE_SX}
      >
        {translate('login_lets_start_learning')}
      </Typography>
      <Button
        onClick={() => {
          selectLaunchCourse()
        }}
        sx={LAUNCH_SESSION_BTN_SX}
      >
        <SessionType {...LAUNCH_SESSION} />
      </Button>
      {/* <Button
        onClick={() => {
          selectAIGenerate()
        }}
        sx={LAUNCH_SESSION_BTN_SX}
      >
        <SessionType
          {...AI_GENERATE_SESSION}
          isNew
        />
      </Button> */}
      <Button
        disabled={true}
        onClick={() => {}}
        sx={POPUP_SESSION_BTN_SX}
      >
        <SessionType
          {...POPUP_SESSION}
          disabled={true}
        />
      </Button>
    </>
  )
}

const POPUP_SESSION = {
  title: 'login_popup_session_title',
  subtitle: 'login_popup_session_subtitle',
  info: 'login_popup_session_info',
  img: '/assets/on-boarding/live.svg',
  color: '#43D4DD33',
}
const AI_GENERATE_SESSION = {
  title: 'login_ai_generate_session_title',
  subtitle: 'login_ai_generate_session_subtitle',
  info: 'login_ai_generate_session_info',
  img: '/assets/on-boarding/ai.svg',
  color: '#43D4DD',
}
const LAUNCH_SESSION = {
  title: 'login_launch_session_title',
  subtitle: 'login_launch_session_subtitle',
  info: 'login_launch_session_info',
  img: '/assets/on-boarding/course.png',
  color: '#EE467A33',
}
