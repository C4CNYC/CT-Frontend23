import { Stack } from '@mui/material'

import { RHFSwitch } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

const SettingsTab = (): React.ReactElement => {
  const translate = useTranslate()

  return (
    <Stack
      justifyContent='space-between'
      height='100%'
    >
      <Stack
        direction='row'
        flexWrap='wrap'
        justifyContent='space-between'
        sx={{ '& > *': { width: '45%' } }}
      >
        <RHFSwitch
          name='meta.is_enabled_google_auth'
          label={translate('Google Auth')}
        />
        <RHFSwitch
          name='meta.is_enabled_powered_by_code_tribe'
          label={translate('"Powered by CodeTribe" message')}
        />
        <RHFSwitch
          name='meta.is_enabled_monetization'
          label={translate('Monetization')}
        />
      </Stack>
    </Stack>
  )
}

export default SettingsTab
