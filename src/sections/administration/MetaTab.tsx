import { Stack } from '@mui/material'

import { RHFTextField } from '@/components'
import { useTranslate } from '@root/src/utils/translateHelper'

const MetaTab = (): React.ReactElement => {
  const translate = useTranslate()

  return (
    <Stack
      justifyContent='space-between'
      height='100%'
    >
      <Stack gap={2}>
        <RHFTextField
          name='meta.meta_title'
          label={translate('org_meta_title')}
        />
        <RHFTextField
          name='meta.meta_description'
          label={translate('org_meta_description')}
        />
      </Stack>
    </Stack>
  )
}

export default MetaTab
