import { useState } from 'react'

import { Button, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

import { RHFTextField } from '@root/src/components'

import {
  LANGUAGE,
  LESSON_DURARION,
  NEXT_BUTTON_STYLES,
  SKIP_BUTTON_STYLES,
  styledAIRoadInput,
  TOGGLE_BUTTON_GROUP_STYLES,
  TOGGLE_BUTTON_STYLES,
  TRACK,
} from './constants'

type ILessonPromptProps = {
  nextStep: () => void
}

export default function LessonPrompt({ nextStep }: ILessonPromptProps) {
  const [language, setLanguage] = useState(LANGUAGE[0].key)
  const [track, setTrack] = useState(TRACK[0].key)
  const [duration, setDuration] = useState(LESSON_DURARION[0].key)

  const handleChangeLanguage = (event: React.MouseEvent<HTMLElement>, newLanguage: string) => {
    setLanguage(newLanguage)
  }
  const handleChangeTrack = (event: React.MouseEvent<HTMLElement>, newTrack: string) => {
    setTrack(newTrack)
  }
  const handleChangeDuration = (event: React.MouseEvent<HTMLElement>, newDuration: string) => {
    setDuration(newDuration)
  }
  return (
    <Stack gap={2}>
      <Typography variant='h3'>My Lesson Prompt 💬 😍‍</Typography>
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
      <Stack>
        <Typography
          variant='h4'
          color='#A6A6A6'
          pl={2}
          gutterBottom
        >
          Track (Optional)
        </Typography>
        <ToggleButtonGroup
          value={duration}
          exclusive
          onChange={handleChangeDuration}
          aria-label='course_duration'
          sx={TOGGLE_BUTTON_GROUP_STYLES}
        >
          {LESSON_DURARION.map((el) => (
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
          Skip
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
