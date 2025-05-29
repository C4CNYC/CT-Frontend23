import { Box, Stack, Tooltip } from '@mui/material'

import { languages } from '@root/src/assets/data/languages'
import { RHFSelect, RHFSwitch } from '@root/src/components'
import { LessonMachineLang } from '@root/src/redux/services/enums/lesson-language.enum'
import { useTranslate } from '@root/src/utils/translateHelper'

export function CreateLessonAdvancedTab() {
  const translate = useTranslate()

  return (
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
  )
}
