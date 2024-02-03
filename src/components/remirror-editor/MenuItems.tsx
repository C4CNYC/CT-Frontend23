import { Stack, SxProps } from '@mui/material'
import { Theme } from '@mui/system'

import { BaseResponseInterface } from '@/lib/utils/baseResponse.interface'
import Preferences from '@/sections/dashboard/lessons/LessonStep/Modals/Preferences'
import Validation from '@/sections/dashboard/lessons/LessonStep/Modals/Validation'

import { ILessonContent } from '../../redux/services/interfaces/courseUnits.interface'

import { ChallengeBtn, MediaBtn, SettingsBtn, TipsBtn } from './controls-btn'

const MenuItems = ({
  data,
  lessonId,
  style = {},
}: {
  data: ILessonContent & BaseResponseInterface
  lessonId: string
  style?: SxProps<Theme>
}) => {
  return (
    <Stack
      direction='row'
      sx={{
        maxWidth: '450px',
        gap: 1,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        ...style,
      }}
    >
      <Preferences
        defaultValues={{ ...data }}
        contentId={data.id}
        lessonId={lessonId}
        defaultTab={3}
      >
        <TipsBtn />
      </Preferences>
      <Validation
        stepId={data.id}
        stepTitle={data.title}
        setHasValidation={() => {}}
      >
        <ChallengeBtn />
      </Validation>
      <Preferences
        defaultValues={{ ...data }}
        contentId={data.id}
        lessonId={lessonId}
        defaultTab={0}
      >
        <SettingsBtn />
      </Preferences>
      <MediaBtn />
    </Stack>
  )
}

export default MenuItems
