import { useMemo } from 'react'

import { Box, InputAdornment, Stack, Tooltip, Typography, useTheme } from '@mui/material'

import { RHFSwitch, RHFTextField } from '@root/src/components'
import { RHFToggleButtonGroup } from '@root/src/components/hook-form/RHFToggleButtonGroup'
import {
  getToggleBtnGroupSx,
  TOGGLE_BUTTON_GROUP_STYLES,
} from '@root/src/sections/on-boarding-register/teacher/ai-generete-stepper/constants'
import { useTranslate } from '@root/src/utils/translateHelper'

import { _mochLessonTypes } from './constants'

export function MainTab() {
  const translate = useTranslate()
  const theme = useTheme()

  const toggleButtonStyles = useMemo(
    () => getToggleBtnGroupSx(theme.palette.mode === 'dark'),
    [theme.palette.mode]
  )

  return (
    <Stack gap={2}>
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
      <Stack
        direction='row'
        gap={1}
        mb={-1}
        ml={1}
      >
        <Typography
          variant='h6'
          color='#5C5C5C'
        >
          {translate('lessons_type')}
        </Typography>
        <Typography
          variant='body2'
          color='#5C5C5C'
        >
          {translate('lessons_type_select_one')}
          <sup>{translate('lessons_type_select_one_star')}</sup>
        </Typography>
      </Stack>
      <RHFToggleButtonGroup
        name='pseudoType'
        options={_mochLessonTypes}
        sxGroup={TOGGLE_BUTTON_GROUP_STYLES}
        sxButton={toggleButtonStyles}
        tooltip
      />

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
        {/* <RHFSwitch
        name='independent'
        label={translate('lessons_independent_lesson')}
      /> */}
        {/* <Tooltip
        slotProps={{ popper: { disablePortal: true } }}
        title={translate('lessons_autoRun_tooltip')}
      >
        <Box>
          <RHFSwitch
            name='autoRun'
            label={translate('lessons_autoRun')}
          />
        </Box>
      </Tooltip> */}
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
