import { useMemo } from 'react'

import { Button, IconButton, Stack, Typography, useTheme } from '@mui/material'

import { Iconify } from '@root/src/components'
import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'

import {
  BTN_CONTAINER_STYLES,
  getToggleBtnGroupSx,
  NEXT_BUTTON_STYLES,
  OPTIONAL_TYPO_STYLES,
  PERSONA,
  getSkipBtnSx,
  STEP_CONTAINER_STYLES,
  STEP_TYTLE_STYLES,
  TOGGLE_BUTTON_GROUP_STYLES,
  TONE,
} from './constants'

type IAIPersonaInfoProps = {
  prevStep: () => void
  closeModal?: () => void
}

export function AIPersonaInfo({ prevStep, closeModal }: IAIPersonaInfoProps) {
  const theme = useTheme()

  const toggleButtonStyles = useMemo(
    () => getToggleBtnGroupSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )
  const skipBtnStyles = useMemo(
    () => getSkipBtnSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )

  return (
    <>
      <style>
        {` 
        .ohnohoney {
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          height: 0;
          width: 0;
          z-index: -1;
          }
        `}
      </style>
      <Stack
        gap={2}
        sx={STEP_CONTAINER_STYLES}
      >
        <Stack
          direction='row'
          gap={2}
          alignItems='center'
        >
          <IconButton onClick={prevStep}>
            <Iconify
              icon='ion:chevron-back'
              width='30px'
            />
          </IconButton>
          <Typography
            variant='h3'
            sx={STEP_TYTLE_STYLES}
          >
            Let’s have some fun ! 😂‍ 🥳
          </Typography>
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
            sx={OPTIONAL_TYPO_STYLES}
            gutterBottom
          >
            Persona <Typography variant='body2'>Optional</Typography>
          </Typography>
          <RHFToggleButtonGroup
            name='RpersonaR'
            options={PERSONA}
            sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
            sxButton={toggleButtonStyles}
          />
        </Stack>
        <Stack>
          <Typography
            variant='h4'
            sx={OPTIONAL_TYPO_STYLES}
            gutterBottom
          >
            Tone <Typography variant='body2'>Optional</Typography>
          </Typography>
          <RHFToggleButtonGroup
            name='RtoneR'
            options={TONE}
            sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
            sxButton={toggleButtonStyles}
          />
        </Stack>

        <label
          className='ohnohoney'
          htmlFor='name'
        />
        <input
          className='ohnohoney'
          autoComplete='off'
          type='text'
          id='name'
          name='name'
          placeholder='Your name here'
        />
        <label
          className='ohnohoney'
          htmlFor='email'
        />
        <input
          className='ohnohoney'
          autoComplete='off'
          type='email'
          id='email'
          name='email'
          placeholder='Your e-mail here'
        />
        <Stack sx={BTN_CONTAINER_STYLES}>
          <Button
            type='submit'
            variant='text'
            sx={skipBtnStyles}
          >
            Surprise Me
          </Button>
          <Button
            type='submit'
            variant='contained'
            sx={NEXT_BUTTON_STYLES}
          >
            Generate ✨
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
