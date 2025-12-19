import { Box, Stack, Tooltip, Typography, InputAdornment } from '@mui/material'

import { languages } from '@root/src/assets/data/languages'
import { RHFSelect, RHFSwitch, RHFTextField } from '@root/src/components'
import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'
import { LessonMachineLang } from '@root/src/redux/services/enums/lesson-language.enum'
import { useTranslate } from '@root/src/utils/translateHelper'

import { _mochGradingMethods, TYPO_TOGGLE_BTN_SX, GRADING_METHODS_BTN_SX } from './constants'

type SettingsTabProps = {
  handleAutoRunSet: (value: string) => Promise<void>
}

export function SettingsTab({ handleAutoRunSet }: SettingsTabProps) {
  const translate = useTranslate()

  return (
    <>
      <Stack
        gap={2}
        mb={2}
      >
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

        <RHFTextField
          name='slug'
          label={translate('lessons_slug')}
          size='small'
        />

        <RHFTextField
          name='duration'
          label={translate('lessons_duration')}
          size='small'
          type='number'
          InputProps={{
            startAdornment: <InputAdornment position='start'>min</InputAdornment>,
          }}
        />
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

      <Stack
        direction='row'
        flexWrap='wrap'
        justifyContent='space-between'
        sx={{ '& > *': { width: '45%' } }}
      >
        <Tooltip
          slotProps={{ popper: { disablePortal: true } }}
          title={translate('One file per type enabled by default for all lessons')}
        >
          <Box>
            <RHFSwitch
              name='meta.is_allow_multiple_same_type'
              label={translate('Allow multiple files of the same type')}
            />
          </Box>
        </Tooltip>
      </Stack>
    </>
  )
}
