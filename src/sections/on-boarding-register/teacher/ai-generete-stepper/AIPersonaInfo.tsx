import { useMemo } from 'react'

import { Button, IconButton, Stack, Typography, useTheme } from '@mui/material'

import { Iconify, RHFTextField } from '@root/src/components'
import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'

import {
  BTN_CONTAINER_STYLES,
  getToggleBtnGroupSx,
  OPTIONAL_TYPO_STYLES,
  PERSONA,
  getSkipBtnSx,
  STEP_CONTAINER_STYLES,
  STEP_TYTLE_STYLES,
  TOGGLE_BUTTON_GROUP_STYLES,
  TONE,
  getNextBtnSx,
} from './constants'

type IAIPersonaInfoProps = {
  prevStep: () => void
  closeModal?: () => void
  customPersona: boolean
  customTone: boolean
}

export function AIPersonaInfo({
  prevStep,
  closeModal,
  customPersona,
  customTone,
}: IAIPersonaInfoProps) {
  const theme = useTheme()
  const toggleButtonStyles = useMemo(
    () => getToggleBtnGroupSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )
  const skipBtnStyles = useMemo(
    () => getSkipBtnSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )
  const nextBtnStyles = useMemo(
    () => getNextBtnSx(theme.palette.mode === 'dark'),
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
      <Stack sx={STEP_CONTAINER_STYLES}>
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
            variant='h6'
            sx={OPTIONAL_TYPO_STYLES}
            gutterBottom
          >
            Persona <Typography variant='caption'>Optional</Typography>
          </Typography>
          <RHFToggleButtonGroup
            name='RpersonaR'
            options={PERSONA}
            sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
            sxButton={toggleButtonStyles}
            disabled={customPersona}
          />
          <RHFTextField
            sx={{ maxWidth: '400px', mt: 2 }}
            name='RcustomPersonaR'
            placeholder='Other'
          />
        </Stack>
        <Stack>
          <Typography
            variant='h6'
            sx={OPTIONAL_TYPO_STYLES}
            gutterBottom
          >
            Tone <Typography variant='caption'>Optional</Typography>
          </Typography>
          <RHFToggleButtonGroup
            name='RtoneR'
            options={TONE}
            sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
            sxButton={toggleButtonStyles}
            disabled={customTone}
          />
          <RHFTextField
            sx={{ maxWidth: '400px', mt: 2 }}
            name='RcustomToneR'
            placeholder='Other'
          />
        </Stack>
        <Stack>
          <Typography
            variant='h6'
            sx={OPTIONAL_TYPO_STYLES}
            gutterBottom
          >
            Context <Typography variant='caption'>Optional</Typography>
          </Typography>
          <RHFTextField
            name='RcontextR'
            placeholder='Any additional context or preferences within the prompt.'
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
        <label
          className='ohnohoney'
          htmlFor='state'
        />
        <input
          className='ohnohoney'
          autoComplete='off'
          type='state'
          id='state'
          name='state'
          placeholder='Your State here'
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
            sx={nextBtnStyles}
          >
            Generate ✨
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
