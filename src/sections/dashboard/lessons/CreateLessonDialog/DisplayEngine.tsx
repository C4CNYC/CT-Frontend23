import { Stack } from '@mui/material'

import { RHFSelect } from '@root/src/components'
import { LessonDisplayEngine } from '@root/src/redux/services/interfaces/lesson.interface'
import { useTranslate } from '@root/src/utils/translateHelper'

import { TabPanel } from './TabPanel'

export function DisplayEngine({ open }: { open: boolean }) {
  const translate = useTranslate()

  return (
    <TabPanel
      value={4}
      index={open ? 4 : 0}
    >
      <Stack
        gap={2}
        mb={2}
      >
        <span>{translate('lessons_displayEngine_helper')}</span>
        <RHFSelect
          native
          name='meta.displayEngine'
          label={translate('lessons_displayEngine')}
        >
          {Object.entries(LessonDisplayEngine).map(([key, value]) => (
            <option
              key={key}
              value={value}
            >
              {key}
            </option>
          ))}
        </RHFSelect>
      </Stack>
    </TabPanel>
  )
}
