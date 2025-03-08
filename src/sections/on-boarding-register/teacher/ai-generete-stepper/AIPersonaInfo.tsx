import { useMemo, useState } from 'react'

import { Button, IconButton, Stack, Typography, useTheme } from '@mui/material'

import { RHFTextField } from '@root/src/components/hook-form/RHFTextField'
import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'
import { Iconify } from '@root/src/components/iconify/Iconify'
import { useTranslate } from '@root/src/utils/translateHelper'

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
  RHFTextFieldInRHFToggleButtonGroup,
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
  const translate = useTranslate()

  const [disableSubmit, setDisableSubmit] = useState(false)

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
  let PersonaWithTool = PERSONA.map((persona) => ({ ...persona, tooltip: persona.key }))
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
            {translate('ai_gen_step_3_title')}
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
            {translate('ai_gen_persona_title')}
            <Typography variant='caption'>{translate('ai_gen_optional_subtitle')}</Typography>
          </Typography>
          <RHFToggleButtonGroup
            name='RpersonaR'
            options={PersonaWithTool}
            sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
            sxButton={toggleButtonStyles}
            disabled={customPersona}
            tooltip={true}
          >
            <RHFTextField
              sx={RHFTextFieldInRHFToggleButtonGroup}
              name='RcustomPersonaR'
              placeholder={translate('ai_gen_other_placeholder')}
            />
          </RHFToggleButtonGroup>
        </Stack>
        <Stack>
          <Typography
            variant='h6'
            sx={OPTIONAL_TYPO_STYLES}
            gutterBottom
          >
            {translate('ai_gen_persona_tone_title')}
            <Typography variant='caption'>{translate('ai_gen_optional_subtitle')}</Typography>
          </Typography>
          <RHFToggleButtonGroup
            name='RtoneR'
            options={TONE}
            sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
            sxButton={toggleButtonStyles}
            disabled={customTone}
          >
            <RHFTextField
              sx={RHFTextFieldInRHFToggleButtonGroup}
              name='RcustomToneR'
              placeholder={translate('ai_gen_other_placeholder')}
            />
          </RHFToggleButtonGroup>
        </Stack>
        <Stack>
          <Typography
            variant='h6'
            sx={OPTIONAL_TYPO_STYLES}
            gutterBottom
          >
            {translate('ai_gen_persona_context_title')}

            <Typography variant='caption'>{translate('ai_gen_optional_subtitle')}</Typography>
          </Typography>
          <RHFTextField
            name='RcontextR'
            rows={2}
            placeholder={translate('ai_gen_persona_context_placeholder')}
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
          onChange={() => setDisableSubmit(true)}
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
          onChange={() => setDisableSubmit(true)}
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
          onChange={() => setDisableSubmit(true)}
        />
        <Stack sx={BTN_CONTAINER_STYLES}>
          <Button
            type='submit'
            variant='text'
            sx={skipBtnStyles}
            disabled={disableSubmit}
          >
            {translate('ai_gen_surprise_btn')}
          </Button>
          <Button
            type='submit'
            variant='contained'
            sx={nextBtnStyles}
            disabled={disableSubmit}
          >
            {translate('ai_gen_generate_btn')}
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
