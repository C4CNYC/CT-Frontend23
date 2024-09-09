import { useState } from 'react'

import { Button, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

import {
  NEXT_BUTTON_STYLES,
  PERSONA,
  SKIP_BUTTON_STYLES,
  TOGGLE_BUTTON_GROUP_STYLES,
  TOGGLE_BUTTON_STYLES,
  TONE,
  TYPE_PROJECT,
} from './constants'

type IAIPersonaInfoProps = {
  nextStep: () => void
}

export function AIPersonaInfo({ nextStep }: IAIPersonaInfoProps) {
  const [persona, setPersona] = useState(PERSONA[0].key)
  const [tone, setTone] = useState(TONE[0].key)
  const [typeProject, setTypeProject] = useState(TYPE_PROJECT[0].key)

  const handleChangePersona = (event: React.MouseEvent<HTMLElement>, newPersona: string) => {
    setPersona(newPersona)
  }
  const handleChangeTone = (event: React.MouseEvent<HTMLElement>, newTone: string) => {
    setTone(newTone)
  }
  const handleChangeTypeProject = (event: React.MouseEvent<HTMLElement>, newType: string) => {
    setTypeProject(newType)
  }

  return (
    <Stack gap={2}>
      <Typography variant='h3'>Let’s have some fun ! 😂‍ 🥳</Typography>
      <Stack>
        <Typography
          variant='h4'
          color='#A6A6A6'
          pl={2}
          gutterBottom
        >
          Persona (Optional)
        </Typography>
        <ToggleButtonGroup
          value={persona}
          exclusive
          onChange={handleChangePersona}
          aria-label='level'
          sx={TOGGLE_BUTTON_GROUP_STYLES}
        >
          {PERSONA.map((el) => (
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
          Tone (Optional)
        </Typography>
        <ToggleButtonGroup
          value={tone}
          exclusive
          onChange={handleChangeTone}
          aria-label='grades'
          sx={TOGGLE_BUTTON_GROUP_STYLES}
        >
          {TONE.map((el) => (
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
          Type (Optional)
        </Typography>
        <ToggleButtonGroup
          value={typeProject}
          exclusive
          onChange={handleChangeTypeProject}
          aria-label='course_duration'
          sx={TOGGLE_BUTTON_GROUP_STYLES}
        >
          {TYPE_PROJECT.map((el) => (
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
      <Stack
        direction='row'
        justifyContent='flex-end'
        pt={8}
        pr={3}
        gap={3}
      >
        <Button
          variant='text'
          sx={SKIP_BUTTON_STYLES}
          onClick={() => {}}
        >
          Surprise Me
        </Button>
        <Button
          variant='contained'
          sx={NEXT_BUTTON_STYLES}
          onClick={() => {}}
        >
          Generate ✨
        </Button>
      </Stack>
    </Stack>
  )
}
