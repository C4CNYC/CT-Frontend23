import { useMemo } from 'react'

import { Button, IconButton, Stack, Typography, useTheme } from '@mui/material'

import { Iconify } from '@root/src/components'
import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'
import { useTranslate } from '@root/src/utils/translateHelper'

import {
  BTN_CONTAINER_STYLES,
  GRADES,
  LESSON_DURARION,
  LEVELS,
  OPTIONAL_TYPO_STYLES,
  getSkipBtnSx,
  STEP_CONTAINER_STYLES,
  STEP_TYTLE_STYLES,
  TOGGLE_BUTTON_GROUP_STYLES,
  getToggleBtnGroupSx,
  getNextBtnSx,
} from './constants'

type ILessonPromptProps = {
  nextStep: () => void
  prevStep: () => void
  closeModal?: () => void
}

export default function LessonPrompt({ nextStep, prevStep, closeModal }: ILessonPromptProps) {
  const theme = useTheme()
  const translate = useTranslate()

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
          {translate('ai_gen_step_2_title')}
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
          {translate('ai_gen_level_title')}
        </Typography>
        <RHFToggleButtonGroup
          name='RlevelR'
          options={LEVELS}
          sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
          sxButton={toggleButtonStyles}
        />
      </Stack>
      <Stack>
        <Typography
          variant='h6'
          color=''
          gutterBottom
          sx={OPTIONAL_TYPO_STYLES}
        >
          {translate('ai_gen_grade_title')}
          <Typography variant='caption'>{translate('ai_gen_optional_subtitle')}</Typography>
        </Typography>
        <RHFToggleButtonGroup
          name='RgradesR'
          options={GRADES}
          sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
          sxButton={toggleButtonStyles}
        />
      </Stack>
      <Stack>
        <Typography
          variant='h6'
          gutterBottom
          sx={OPTIONAL_TYPO_STYLES}
        >
          {translate('ai_gen_duration_title')}
          <Typography variant='caption'>{translate('ai_gen_optional_subtitle')}</Typography>
        </Typography>
        <RHFToggleButtonGroup
          name='RlessonDurationR'
          options={LESSON_DURARION}
          sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
          sxButton={toggleButtonStyles}
        />
      </Stack>
      <Stack sx={BTN_CONTAINER_STYLES}>
        <Button
          variant='text'
          sx={skipBtnStyles}
          onClick={nextStep}
        >
          {translate('ai_gen_surprise_btn')}
        </Button>
        <Button
          variant='contained'
          sx={nextBtnStyles}
          onClick={nextStep}
        >
          {translate('ai_gen_next_btn')}
        </Button>
      </Stack>
    </Stack>
  )
}
