import { Button, IconButton, Stack, Typography } from '@mui/material'

import { Iconify, RHFTextField } from '@root/src/components'
import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'

import {
  LANGUAGE,
  NEXT_BUTTON_STYLES,
  SKIP_BUTTON_STYLES,
  styledAIRoadInput,
  TOGGLE_BUTTON_GROUP_STYLES,
  TOGGLE_BUTTON_STYLES,
  TRACK,
} from './constants'

type ILessonPromptProps = {
  nextStep: () => void
  prevStep: () => void
  closeModal?: () => void
}

export default function LessonPrompt({ nextStep, prevStep, closeModal }: ILessonPromptProps) {
  return (
    <Stack gap={2}>
      <Stack
        direction='row'
        gap={2}
      >
        <IconButton onClick={prevStep}>
          <Iconify
            icon='ion:chevron-back'
            width='30px'
          />
        </IconButton>
        <Typography variant='h3'>My Lesson Prompt 💬 😍‍</Typography>
        {closeModal ? (
          <IconButton
            onClick={closeModal}
            sx={{ margin: '0px 0px 0px auto' }}
          >
            <Iconify
              icon='ion:close'
              width='30px'
            />
          </IconButton>
        ) : null}
      </Stack>
      <RHFTextField
        name='lessonPrompt'
        label={'If/else statements within functions'}
        multiline
        rows={3}
        sx={(theme) => ({ ...styledAIRoadInput(theme) })}
      />
      <Stack>
        <Typography
          variant='h4'
          color='#A6A6A6'
          pl={2}
          gutterBottom
        >
          Language (Optional)
        </Typography>
        <RHFToggleButtonGroup
          name='lessonLanguage'
          options={LANGUAGE}
          sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
          sxButton={TOGGLE_BUTTON_STYLES}
        />
      </Stack>
      <Stack>
        <Typography
          variant='h4'
          color='#A6A6A6'
          pl={2}
          gutterBottom
        >
          Lesson Duration (Optional)
        </Typography>
        <RHFToggleButtonGroup
          name='track'
          options={TRACK}
          sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
          sxButton={TOGGLE_BUTTON_STYLES}
        />
      </Stack>
      <RHFTextField
        name='honeypotField'
        label={'Add invisible honeypot field'}
        multiline
        rows={1}
        sx={(theme) => ({ ...styledAIRoadInput(theme) })}
      />
      <Stack
        direction='row'
        justifyContent='flex-end'
        pt={3}
        pr={3}
        gap={3}
      >
        <Button
          variant='text'
          sx={SKIP_BUTTON_STYLES}
          onClick={nextStep}
        >
          Surprise Me
        </Button>
        <Button
          variant='contained'
          sx={NEXT_BUTTON_STYLES}
          onClick={nextStep}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  )
}
