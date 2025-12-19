import { Stack, Typography, Box } from '@mui/material'

import { useTranslate } from '@root/src/utils/translateHelper'

import CustomLabel from './_components/CustomLabel'
import GoToLoginBtn from './_components/GoToLoginBtn'
import { useStepperContext } from './stepper-context'

const SuccessRegStep = () => {
  const { subdomain } = useStepperContext()
  const translate = useTranslate()

  return (
    <Stack sx={{ gap: 3 }}>
      <CustomLabel translationKey={translate('tenant_create_success_title')} />
      <Typography
        variant='body2'
        color='text.secondary'
      >
        {translate('tenant_create_success_subtitle')}
      </Typography>

      <Box sx={{ mt: 2, background: '#F0EEEE80', borderRadius: '8px', p: 2 }}>
        {translate('tenant_create_success_desc_part_1')}{' '}
        <a
          href={`https://${subdomain}.codetribe.ai`}
          target='_blank'
          rel='noopener noreferrer'
        >
          {subdomain ? subdomain : '[subdomain]'}.codetribe.ai
        </a>
        <br />
        <br />
        {translate('tenant_create_success_desc_part_2')} <br />
        {translate('tenant_create_success_desc_part_3')} <br />
        <br />
        {translate('tenant_create_success_desc_part_4')} <br />
      </Box>
      <GoToLoginBtn link={`https://${subdomain}.codetribe.ai/auth/signIn`} />
    </Stack>
  )
}

export default SuccessRegStep
