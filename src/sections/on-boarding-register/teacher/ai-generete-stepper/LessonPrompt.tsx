import { useState } from 'react'

import {
  Button,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'

import { Iconify, RHFTextField } from '@root/src/components'

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
}

export default function LessonPrompt({ nextStep, prevStep }: ILessonPromptProps) {
  const [language, setLanguage] = useState<null | string>(null)
  const [track, setTrack] = useState<null | string>(null)

  const handleChangeLanguage = (event: React.MouseEvent<HTMLElement>, newLanguage: string) => {
    setLanguage(newLanguage)
  }
  const handleChangeTrack = (event: React.MouseEvent<HTMLElement>, newTrack: string) => {
    setTrack(newTrack)
  }

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
        <ToggleButtonGroup
          value={language}
          exclusive
          onChange={handleChangeLanguage}
          aria-label='level'
          sx={TOGGLE_BUTTON_GROUP_STYLES}
        >
          {LANGUAGE.map((el) => (
            <ToggleButton
              sx={TOGGLE_BUTTON_STYLES}
              value={el.key}
              key={el.key}
            >
              {el.value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
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
        <ToggleButtonGroup
          value={track}
          exclusive
          onChange={handleChangeTrack}
          aria-label='grades'
          sx={TOGGLE_BUTTON_GROUP_STYLES}
        >
          {TRACK.map((el) => (
            <ToggleButton
              sx={TOGGLE_BUTTON_STYLES}
              value={el.key}
              key={el.key}
            >
              {el.value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
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
