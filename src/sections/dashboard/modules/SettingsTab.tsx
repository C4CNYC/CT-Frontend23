import { Box } from '@mui/material'

import { RHFTextField, RHFSelect } from '@/components'
import { LessonMachineLang } from '@root/src/redux/services/enums/lesson-language.enum'
import { useTranslate } from '@root/src/utils/translateHelper'

const SettingsTab = (): React.ReactElement => {
  const translate = useTranslate()
  return (
    <Box
      rowGap={3}
      display='grid'
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
      <RHFTextField
        name='duration'
        label={translate('modules_module_duration')}
      />
      <RHFTextField
        name='initial_likes'
        label={translate('modules_module_likes')}
        type='number'
      />
      <RHFTextField
        name='initial_stars'
        label={translate('modules_module_stars')}
        type='number'
      />
      <RHFTextField
        name='initial_enrolled'
        label={translate('modules_module_enrolled')}
        type='number'
      />
      <RHFTextField
        name='teacher_slides'
        label={translate('modules_module_teacher_link')}
      />
      <RHFTextField
        name='teacher_forum'
        label={translate('modules_module_teacher_forum_link')}
      />
      <RHFTextField
        name='lesson_plans'
        label={translate('modules_module_lesson_plan_link')}
      />
    </Box>
  )
}
export default SettingsTab
