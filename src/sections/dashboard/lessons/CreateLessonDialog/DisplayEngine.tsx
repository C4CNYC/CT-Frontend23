import { Stack } from '@mui/material'

import { useFilters } from '@/hooks'
import { useGetEnvironmentsListQuery } from '@/redux/services/manager/environments-manager'
import { RHFSelect } from '@root/src/components'
import { LessonDisplayEngine } from '@root/src/redux/services/interfaces/lesson.interface'
import { useTranslate } from '@root/src/utils/translateHelper'

import { TabPanel } from './TabPanel'

export function DisplayEngine({
  open,
  displayEngineWatcher,
}: {
  open: boolean
  displayEngineWatcher?: string
}) {
  const translate = useTranslate()
  const { filters, setFilter } = useFilters({ name: '' })
  const { data, isLoading } = useGetEnvironmentsListQuery({ ...filters })

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
        {displayEngineWatcher === LessonDisplayEngine.Slides && (
          <RHFSelect
            native
            name='meta.environment'
            label={translate('Environment')}
          >
            {data &&
              data.data?.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
          </RHFSelect>
        )}
      </Stack>
    </TabPanel>
  )
}
