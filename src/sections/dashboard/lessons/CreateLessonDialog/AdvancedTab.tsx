import { Box, Stack, Tooltip, Typography } from '@mui/material'

import { languages } from '@root/src/assets/data/languages'
import { RHFSelect, RHFSwitch } from '@root/src/components'
import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'
import { LessonMachineLang } from '@root/src/redux/services/enums/lesson-language.enum'
import { useTranslate } from '@root/src/utils/translateHelper'

import { _mochGradingMethods, TYPO_TOGGLE_BTN_SX, GRADING_METHODS_BTN_SX } from './constants'

export function CreateLessonAdvancedTab() {
  const translate = useTranslate()

  return (
    <>
      <Stack gap={2}>
        <RHFSelect
          native
          name='meta.machineLang'
          label={translate('lessons_language_select')}
        >
          {Object.entries(LessonMachineLang).map(([key, value]) => (
            <option
              key={key}
              value={value}
            >
              {key}
            </option>
          ))}
        </RHFSelect>
        <RHFSelect
          name='meta.humanLang'
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
        <Stack display='none'>
          <Stack gap={1}>
            <Tooltip
              slotProps={{ popper: { disablePortal: true } }}
              title={translate('allows_students_to_create_multiple_files')}
            >
              <Box>
                <RHFSwitch
                  name='meta.createMultipleFiles'
                  label={translate('lesson_create_multiple_files')}
                />
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={TYPO_TOGGLE_BTN_SX}>
        <Typography
          variant='h6'
          color='#5C5C5C'
        >
          {translate('lessons_grading_method')}
        </Typography>
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
          margin: '0.8rem 0',
        }}
        sxButton={GRADING_METHODS_BTN_SX}
        tooltip
        size='small'
      />
    </>
  )
}
