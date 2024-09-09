import { useState } from 'react'

import { Button, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

import {
  COURSE_DURARION,
  GRADES,
  LEVELS,
  NEXT_BUTTON_STYLES,
  SKIP_BUTTON_STYLES,
  TOGGLE_BUTTON_GROUP_STYLES,
  TOGGLE_BUTTON_STYLES,
} from './constants'

type IGeneralInfoProps = {
  nextStep: () => void
}

export function GeneralInfo({ nextStep }: IGeneralInfoProps) {
  const [level, setLevel] = useState(LEVELS[0].key)
  const [grade, setGrade] = useState(GRADES[0].key)
  const [duration, setDuration] = useState(COURSE_DURARION[0].key)

  const handleChangeLevel = (event: React.MouseEvent<HTMLElement>, newLevel: string) => {
    setLevel(newLevel)
  }
  const handleChangeGrade = (event: React.MouseEvent<HTMLElement>, newGrade: string) => {
    setGrade(newGrade)
  }
  const handleChangeDuration = (event: React.MouseEvent<HTMLElement>, newDuration: string) => {
    setDuration(newDuration)
  }

  return (
    <Stack gap={2}>
      <Typography variant='h3'>Who’s it for? 🤷🏽‍</Typography>
      <Stack>
        <Typography
          variant='h4'
          color='#A6A6A6'
          pl={2}
          gutterBottom
        >
          Level
        </Typography>
        <ToggleButtonGroup
          value={level}
          exclusive
          onChange={handleChangeLevel}
          aria-label='level'
          sx={TOGGLE_BUTTON_GROUP_STYLES}
        >
          {LEVELS.map((el) => (
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
          Grade/Age
        </Typography>
        <ToggleButtonGroup
          value={grade}
          exclusive
          onChange={handleChangeGrade}
          aria-label='grades'
          sx={TOGGLE_BUTTON_GROUP_STYLES}
        >
          {GRADES.map((el) => (
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
          Lesson Duration
        </Typography>
        <ToggleButtonGroup
          value={duration}
          exclusive
          onChange={handleChangeDuration}
          aria-label='course_duration'
          sx={TOGGLE_BUTTON_GROUP_STYLES}
        >
          {COURSE_DURARION.map((el) => (
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
