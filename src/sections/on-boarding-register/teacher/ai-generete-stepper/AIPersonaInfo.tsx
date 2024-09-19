import { Button, IconButton, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { Iconify } from '@root/src/components'
import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'

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
  prevStep: () => void
  closeModal?: () => void
}

export function AIPersonaInfo({ nextStep, prevStep, closeModal }: IAIPersonaInfoProps) {
  const { push } = useRouter()

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
        <Typography variant='h3'>Let’s have some fun ! 😂‍ 🥳</Typography>
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
      <Stack>
        <Typography
          variant='h4'
          color='#A6A6A6'
          pl={2}
          gutterBottom
        >
          Persona (Optional)
        </Typography>
        <RHFToggleButtonGroup
          name='persona'
          options={PERSONA}
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
          Tone (Optional)
        </Typography>
        <RHFToggleButtonGroup
          name='tone'
          options={TONE}
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
          Type (Optional)
        </Typography>
        <RHFToggleButtonGroup
          name='projectType'
          options={TYPE_PROJECT}
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
          onClick={() => {}}
        >
          Surprise Me
        </Button>
        <Button
          type='submit'
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
