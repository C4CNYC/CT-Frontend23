import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'

import { FormProvider } from '@root/src/components'
import { StyledContent } from '@root/src/layouts/login/styles'
import { useTranslate } from '@root/src/utils/translateHelper'

import { SingLink } from '../../on-boarding-register/links'

import BackBtn from './_components/BackBtn'
import BrandInfoStep from './brand-info-step'
import { createLoginSchema, TenantFormValuesProps } from './constants'
import EmailPassStep from './email-pass-step'
import LogosStep from './logos-step'
import OrgInfoStep from './org-info-step'
import OwnerStep from './owner-step'
import { StepperProvider, useStepperContext } from './stepper-context'

export default function TenantCreation() {
  const translate = useTranslate()

  const methods = useForm<TenantFormValuesProps>({
    resolver: yupResolver(createLoginSchema(translate)),
    mode: 'all',
    defaultValues: {
      country: 'us',
    },
  })

  const onSubmit = async (data: TenantFormValuesProps) => {
    try {
    } catch (e: any) {}
  }
  return (
    <StyledContent>
      <StepperProvider
        errors={methods.formState.errors}
        trigger={methods.trigger}
      >
        <BackBtn />
        <Stack
          sx={{
            width: '100%',
            minHeight: '400px',
            justifyContent: 'center',
            position: 'relative',
            mb: 0.5,
          }}
        >
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <RenderStep />
          </FormProvider>
        </Stack>
        <Box sx={{ position: 'absolute', bottom: 14, left: 0, right: 0 }}>
          <SingLink />
        </Box>
      </StepperProvider>
    </StyledContent>
  )
}

function RenderStep() {
  const { activeStep } = useStepperContext()
  switch (activeStep) {
    case 0:
      return <EmailPassStep />
    case 1:
      return <OwnerStep />
    case 2:
      return <OrgInfoStep />
    case 3:
      return <BrandInfoStep />
    case 4:
      return <LogosStep />
    default:
      return <EmailPassStep />
  }
}
