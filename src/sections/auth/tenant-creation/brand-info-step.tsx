import { InputAdornment, Stack, Typography } from '@mui/material'

import { RHFTextField } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

import CustomLabel from './_components/CustomLabel'
import NextBtn from './_components/NextBtn'
import { styledRegisterInput } from './constants'
import { useStepperContext } from './stepper-context'

const BrandInfoStep = () => {
  const { isError, isLoading, handleCheckBrandInfoStep } = useStepperContext()
  const translate = useTranslate()

  return (
    <Stack sx={{ gap: 3 }}>
      <CustomLabel translationKey='Create a brand' />
      <RHFTextField
        name='brandName'
        label={translate('Name of the brand')}
        sx={(theme) => ({ ...styledRegisterInput(theme) })}
      />
      <RHFTextField
        name='subdomain'
        label={<Typography> {translate('subdomain')}</Typography>}
        sx={(theme) => ({
          ...styledRegisterInput(theme),
        })}
        InputProps={{
          inputProps: {
            sx: { textAlign: 'right', mt: '3px' },
          },
          endAdornment: (
            <InputAdornment
              position='end'
              sx={{
                alignSelf: 'flex-end',
                margin: 0,
                marginBottom: '24px',
                opacity: 1,
                pointerEvents: 'none',
              }}
            >
              .codetribe.com
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          sx: {
            left: 'unset',
            right: '139px',
            transformOrigin: 'right',
            fontSize: '0.8rem',
            opacity: 1,
            transition: 'all 0s',
            '&.MuiInputLabel-shrink': {
              opacity: 0,
            },
          },
        }}
      />

      <NextBtn
        onClick={handleCheckBrandInfoStep}
        disabled={isError}
        loading={isLoading}
      />
    </Stack>
  )
}

export default BrandInfoStep
