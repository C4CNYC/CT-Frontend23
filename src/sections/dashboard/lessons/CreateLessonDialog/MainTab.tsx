import { useMemo } from 'react'

import { Box, InputAdornment, Stack, Tooltip, Typography, useTheme } from '@mui/material'

import { languages } from '@root/src/assets/data/languages'
import { RHFSelect, RHFSwitch, RHFTextField } from '@root/src/components'
import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'
import { LessonLanguage } from '@root/src/redux/services/enums/lesson-language.enum'
import {
  getToggleBtnGroupSx,
  TOGGLE_BUTTON_GROUP_STYLES,
} from '@root/src/sections/on-boarding-register/teacher/ai-generete-stepper/constants'
import { useTranslate } from '@root/src/utils/translateHelper'

import {
  _mochGradingMethods,
  _mochLessonTypes,
  GRADING_METHODS_BTN_SX,
  languageOptionsParser,
  TYPO_TOGGLE_BTN_SX,
} from './constants'

export const MainTab = () => {
  const translate = useTranslate()
  const theme = useTheme()

  const toggleButtonStyles = useMemo(
    () => getToggleBtnGroupSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )

  return (
    <Stack gap={3}>
      <RHFTextField
        name='name'
        label={translate('lessons_name')}
        required
      />

      <RHFTextField
        name='description'
        label={translate('lessons_description')}
        required
        multiline
        rows={3}
      />
      <RHFSelect
        native
        name='codeLanguage'
        label={translate('lessons_language_select')}
      >
        {(Object.keys(LessonLanguage) as Array<keyof typeof LessonLanguage>).map((l) => {
          return (
            <option
              key={LessonLanguage[l as keyof typeof LessonLanguage]}
              value={LessonLanguage[l as keyof typeof LessonLanguage]}
            >
              {languageOptionsParser(LessonLanguage[l])}
            </option>
          )
        })}
      </RHFSelect>
      <RHFSelect
        name='lessonLanguage'
        label={translate('ai_gen_lng_select_title')}
        native
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
      <Stack sx={TYPO_TOGGLE_BTN_SX}>
        <Typography variant='body1'>{translate('lessons_type')}</Typography>
        <Typography variant='body2'>
          {translate('lessons_type_select_one')}
          <sup>{translate('lessons_type_select_one_star')}</sup>
        </Typography>
      </Stack>

      <RHFToggleButtonGroup
        name='type'
        options={_mochLessonTypes}
        sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
        sxButton={toggleButtonStyles}
        tooltip
      />

      <Stack sx={TYPO_TOGGLE_BTN_SX}>
        <Typography variant='body1'>{translate('lessons_grading_method')}</Typography>
        <Typography variant='body2'>
          {translate('lessons_type_select_one')}
          <sup>{translate('lessons_type_select_one_star')}</sup>
        </Typography>
      </Stack>

      <RHFToggleButtonGroup
        name='grading_method'
        options={_mochGradingMethods}
        sxGroup={{
          width: { xs: 'auto', md: 'max-content' },
          border: { xs: 'none', md: '1px solid rgba(145, 158, 171, 0.24)' },
        }}
        sxButton={GRADING_METHODS_BTN_SX}
        tooltip
        size='small'
      />

      <RHFTextField
        name='slug'
        label={translate('lessons_slug')}
      />

      <RHFTextField
        name='duration'
        label={translate('lessons_duration')}
        type='number'
        InputProps={{
          startAdornment: <InputAdornment position='start'>min</InputAdornment>,
        }}
      />

      <Stack
        direction='row'
        flexWrap='wrap'
        justifyContent='space-between'
        sx={{ '& > *': { width: '45%' } }}
      >
        <Tooltip
          slotProps={{ popper: { disablePortal: true } }}
          title={translate('lessons_active_tooltip')}
        >
          <Box>
            <RHFSwitch
              name='active'
              label={translate('lessons_active')}
            />
          </Box>
        </Tooltip>

        <Tooltip
          slotProps={{ popper: { disablePortal: true } }}
          title={translate('lesson_lock_tooltip')}
        >
          <Box>
            <RHFSwitch
              name='lock'
              label={translate('lessons_lock')}
            />
          </Box>
        </Tooltip>
      </Stack>
    </Stack>
  )
}
