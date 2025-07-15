import { Stack, Typography } from '@mui/material'

import { RHFSelect, RHFTextField } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

import CustomLabel from './_components/CustomLabel'
import NextBtn from './_components/NextBtn'
import SkipBtn from './_components/SkipBtn'
import { OrgType, styledRegisterInput } from './constants'
import { useStepperContext } from './stepper-context'

const OrgInfoStep = () => {
  const { handleValidation, isError } = useStepperContext()
  const translate = useTranslate()

  return (
    <Stack sx={{ gap: 3 }}>
      <CustomLabel translationKey='Add org info' />
      <RHFSelect
        native
        name='org_type'
        size='small'
        sx={(theme) => ({ ...styledRegisterInput(theme) })}
        label={translate('Org type')}
      >
        <option
          key='empty'
          value='empty'
        ></option>
        {Object.keys(OrgType).map((t) => (
          <option
            key={OrgType[t as keyof typeof OrgType]}
            value={OrgType[t as keyof typeof OrgType]}
          >
            {t.split('_').join(' ').charAt(0).toUpperCase() +
              t.split('_').join(' ').slice(1).toLowerCase()}
          </option>
        ))}
      </RHFSelect>
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 2,
        }}
      >
        <Typography>Current student count:</Typography>
        <RHFTextField
          type='number'
          placeholder='2300'
          name='student_count_current'
          sx={(theme) => ({ ...styledRegisterInput(theme, { maxWidth: '150px' }) })}
        />
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 2,
        }}
      >
        <Typography>Target number of students:</Typography>
        <RHFTextField
          type='number'
          placeholder='10000'
          name='student_count_expected'
          sx={(theme) => ({ ...styledRegisterInput(theme, { maxWidth: '150px' }) })}
        />
      </Stack>
      <NextBtn
        onClick={handleValidation}
        disabled={isError}
      />
      <SkipBtn
        onClick={handleValidation}
        disabled={isError}
      />
    </Stack>
  )
}

export default OrgInfoStep
