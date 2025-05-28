import { Stack } from '@mui/material'

import { countries } from '@root/src/assets/data'
import { RHFSelect, RHFTextField } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

import CustomLabel from './_components/CustomLabel'
import NextBtn from './_components/NextBtn'
import { styledRegisterInput } from './constants'
import { useStepperContext } from './stepper-context'

function OwnerStep() {
  const { handleValidation, isError } = useStepperContext()
  const translate = useTranslate()

  const defaultCountry = countries.find((ct) => ct.code === 'US') ?? countries[0]
  return (
    <Stack sx={{ gap: 3 }}>
      <CustomLabel
        variant='h4'
        translationKey='Add your info'
      />
      <Stack
        direction={'row'}
        gap={2}
      >
        <RHFTextField
          name='name'
          label={translate('name')}
          defaultValue=''
          sx={(theme) => ({ ...styledRegisterInput(theme) })}
        />
        <RHFTextField
          name='surname'
          label={translate('surname')}
          defaultValue=''
          sx={(theme) => ({ ...styledRegisterInput(theme) })}
        />
      </Stack>
      <RHFTextField
        name='city'
        label={translate('city')}
        defaultValue=''
        sx={(theme) => ({ ...styledRegisterInput(theme) })}
      />
      <RHFSelect
        native
        name='country'
        label={translate('country')}
        sx={(theme) => ({ ...styledRegisterInput(theme) })}
      >
        <option
          key={defaultCountry.code}
          value={defaultCountry.code.toLowerCase()}
        >
          {defaultCountry.label}
        </option>
        <option disabled>─────────────────────────</option>
        {countries
          .filter((el) => el.code !== 'US')
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((country) => (
            <option
              key={country.code}
              value={country.code.toLowerCase()}
            >
              {country.label}
            </option>
          ))}
      </RHFSelect>
      <NextBtn
        onClick={handleValidation}
        disabled={isError}
      />
    </Stack>
  )
}

export default OwnerStep
