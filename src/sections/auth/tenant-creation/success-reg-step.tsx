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
      <CustomLabel translationKey='Congratulations!' />
      <Typography
        variant='body2'
        color='text.secondary'
      >
        You have registered a new organization.
      </Typography>

      <Box sx={{ mt: 2, background: '#F0EEEE80', borderRadius: '8px', p: 2 }}>
        You can now login here:{' '}
        <a href={`https://${subdomain}.codetribe.ai`}>{subdomain}.codetribe.ai</a>
        <br />
        <br />
        Using the exact same login details you just created here. <br />
        In order to have Admin permissions you must use ONLY the sub-domain you created. <br />
        <br />
        Click here to login now: <br />
      </Box>
      <GoToLoginBtn link={`https://${subdomain}.codetribe.ai/auth/signIn`} />
    </Stack>
  )
}

export default SuccessRegStep
