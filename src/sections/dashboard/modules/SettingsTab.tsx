import { RHFTextField } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

import { INPUT_SX } from './constants'

const SettingsTab = (): React.ReactElement => {
  const translate = useTranslate()
  return (
    <>
      <RHFTextField
        sx={INPUT_SX}
        name='duration'
        label={translate('modules_module_duration')}
      />
      <RHFTextField
        sx={INPUT_SX}
        name='initial_likes'
        label={translate('modules_module_likes')}
        type='number'
      />
      <RHFTextField
        sx={INPUT_SX}
        name='initial_stars'
        label={translate('modules_module_stars')}
        type='number'
      />
      <RHFTextField
        sx={INPUT_SX}
        name='initial_enrolled'
        label={translate('modules_module_enrolled')}
        type='number'
      />
      <RHFTextField
        sx={INPUT_SX}
        name='teacher_slides'
        label={translate('modules_module_teacher_link')}
      />
      <RHFTextField
        sx={INPUT_SX}
        name='teacher_forum'
        label={translate('modules_module_teacher_forum_link')}
      />
      <RHFTextField
        sx={INPUT_SX}
        name='lesson_plans'
        label={translate('modules_module_lesson_plan_link')}
      />
    </>
  )
}
export default SettingsTab
