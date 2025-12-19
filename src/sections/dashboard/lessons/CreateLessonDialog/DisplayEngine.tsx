import { Stack, Typography, Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { RHFSelect } from '@root/src/components'
import { LessonDisplayEngine } from '@root/src/redux/services/interfaces/lesson.interface'
import { useTranslate } from '@root/src/utils/translateHelper'

import { TabPanel } from './TabPanel'

export function DisplayEngine({ open }: { open: boolean }) {
  const translate = useTranslate()
  const { watch } = useFormContext()

  return (
    <TabPanel
      value={4}
      index={open ? 4 : 0}
    >
      <Stack
        gap={2}
        mb={2}
      >
        <span>{translate('lessons_displayEngine.helper')}</span>
        <RHFSelect
          native
          name='meta.displayEngine'
          label={translate('lessons_displayEngine.displayEngine')}
          InputLabelProps={{ shrink: true }}
        >
          <option value=''>{translate('lessons_type_select_one')}</option>
          {Object.entries(LessonDisplayEngine).map(([key, value]) => (
            <option
              key={key}
              value={value}
            >
              {key}
            </option>
          ))}
        </RHFSelect>

        <Box
          sx={{
            p: 2,
            bgcolor: 'background.neutral',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant='body2'
            color='text.secondary'
          >
            {translate(`lessons_displayEngine.` + (watch('meta.displayEngine') || 'helper'))}
          </Typography>
        </Box>
      </Stack>
    </TabPanel>
  )
}
