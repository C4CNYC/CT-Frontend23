import { useMemo } from 'react'

import { Button, IconButton, Stack, Typography, useTheme } from '@mui/material'

import { languages } from '@root/src/assets/data/languages'
import { Iconify, RHFSelect, RHFTextField } from '@root/src/components'
import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'

import {
  BTN_CONTAINER_STYLES,
  getToggleBtnGroupSx,
  OPTIONAL_TYPO_STYLES,
  PROGRAMMING_LANGUAGE,
  getSkipBtnSx,
  STEP_CONTAINER_STYLES,
  STEP_TYTLE_STYLES,
  TOGGLE_BUTTON_GROUP_STYLES,
  TRACK,
  TYPE_LESSON,
  LANG_CONT_SX,
  getNextBtnSx,
} from './constants'

type IGeneralInfoProps = {
  nextStep: () => void
  isModal: boolean
  closeModal?: () => void
  prevStep: () => void
  isCustomLang: boolean
}

export function GeneralInfo({
  nextStep,
  prevStep,
  isModal,
  closeModal,
  isCustomLang,
}: IGeneralInfoProps) {
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
    <Stack sx={STEP_CONTAINER_STYLES}>
      <Stack
        direction='row'
        sx={{ gap: 2, pl: isModal ? 1 : 0, alignItems: 'center' }}
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
          Lesson Basics 💬 😍‍
        </Typography>
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
          variant='h6'
          sx={OPTIONAL_TYPO_STYLES}
          gutterBottom
        >
          Type <Typography variant='caption'>Select one or more</Typography>
        </Typography>
        <RHFToggleButtonGroup
          name='RtypeLessonR'
          options={TYPE_LESSON}
          sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
          sxButton={toggleButtonStyles}
          tooltip
        />
      </Stack>

      <Stack>
        <Typography
          variant='h6'
          sx={OPTIONAL_TYPO_STYLES}
          gutterBottom
        >
          Programming Language <Typography variant='caption'>Optional</Typography>
        </Typography>
        <RHFToggleButtonGroup
          name='RprogrammingLanguageR'
          options={PROGRAMMING_LANGUAGE}
          sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
          sxButton={toggleButtonStyles}
        />
      </Stack>
      <Stack>
        <Typography
          variant='h6'
          sx={OPTIONAL_TYPO_STYLES}
          gutterBottom
        >
          Track <Typography variant='caption'>Optional</Typography>
        </Typography>
        <RHFToggleButtonGroup
          name='RtrackR'
          options={TRACK}
          sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
          sxButton={toggleButtonStyles}
        />
      </Stack>
      <Stack>
        <Typography
          variant='body2'
          sx={OPTIONAL_TYPO_STYLES}
          gutterBottom
        >
          Select from list or type the name of any language
        </Typography>
        <Stack sx={LANG_CONT_SX}>
          <RHFSelect
            name='RlessonLanguageR'
            native
            disabled={isCustomLang}
            sx={{ maxWidth: '300px' }}
          >
            {languages.map((el) => (
              <option
                key={el.code}
                value={el.language}
              >
                {el.language}
              </option>
            ))}
          </RHFSelect>
          <RHFTextField
            sx={{ maxWidth: '300px' }}
            name='RcustomLanguageR'
            placeholder='Other'
          />
        </Stack>
      </Stack>
      <Stack sx={BTN_CONTAINER_STYLES}>
        <Button
          variant='text'
          sx={skipBtnStyles}
          onClick={nextStep}
        >
          Skip
        </Button>
        <Button
          variant='contained'
          sx={nextBtnStyles}
          onClick={nextStep}
          type='submit'
        >
          Next
        </Button>
      </Stack>
    </Stack>
  )
}
