import { Button, IconButton, Stack, Typography } from '@mui/material'

import { Iconify } from '@root/src/components'
import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'

import {
  GRADES,
  LESSON_DURARION,
  LEVELS,
  NEXT_BUTTON_STYLES,
  SKIP_BUTTON_STYLES,
  TOGGLE_BUTTON_GROUP_STYLES,
  TOGGLE_BUTTON_STYLES,
} from './constants'

type IGeneralInfoProps = {
  nextStep: () => void
  resetRoad: () => void
  isModal: boolean
  closeModal?: () => void
}

export function GeneralInfo({ nextStep, resetRoad, isModal, closeModal }: IGeneralInfoProps) {
  return (
    <Stack gap={2}>
      <Stack
        direction='row'
        gap={2}
        pl={isModal ? 1 : 0}
      >
        {!isModal ? (
          <IconButton onClick={resetRoad}>
            <Iconify
              icon='ion:chevron-back'
              width='30px'
            />
          </IconButton>
        ) : null}
        <Typography variant='h3'>Who’s it for? 🤷🏽‍</Typography>
        {isModal ? (
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
      <Stack>
        <Typography
          variant='h4'
          color='#A6A6A6'
          pl={2}
          gutterBottom
        >
          Level
        </Typography>
        <RHFToggleButtonGroup
          name='level'
          options={LEVELS}
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
          Grade/Age
        </Typography>
        <RHFToggleButtonGroup
          name='grades'
          options={GRADES}
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
          Lesson Duration
        </Typography>
        <RHFToggleButtonGroup
          name='lessonDuration'
          options={LESSON_DURARION}
          sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
          sxButton={TOGGLE_BUTTON_STYLES}
        />
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
          type='submit'
        >
          Next
        </Button>
      </Stack>
    </Stack>
  )
}
