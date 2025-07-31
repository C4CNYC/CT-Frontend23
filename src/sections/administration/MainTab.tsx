import { Stack } from '@mui/material'

import { RHFSelect, RHFTextField } from '@/components'
import { HomePageType } from '@root/src/redux/services/enums/administration.enum'
import { useTranslate } from '@root/src/utils/translateHelper'

import { DomainFields } from './DomainFields'

const MainTab = (): React.ReactElement => {
  const translate = useTranslate()

  return (
    <Stack
      justifyContent='space-between'
      height='100%'
    >
      <Stack gap={2}>
        <RHFTextField
          name='name'
          label={translate('create_new_name_label')}
          required
        />
        <RHFTextField
          name='slug'
          label={translate('create_new_slug_label')}
          required
        />
        <DomainFields />
        <RHFSelect
          name='home_page_type'
          native
          label={translate('home_page_type')}
        >
          {Object.keys(HomePageType).map((c) => (
            <option
              key={HomePageType[c as keyof typeof HomePageType]}
              value={HomePageType[c as keyof typeof HomePageType]}
            >
              {c}
            </option>
          ))}
        </RHFSelect>
      </Stack>
    </Stack>
  )
}

export default MainTab
