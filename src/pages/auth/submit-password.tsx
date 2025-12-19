import { Stack } from '@mui/material'

import LoginLayout from '@/layouts/login/LoginLayout'
import SubmitPasswordForm from '@/sections/auth/SubmitPasswordForm'
import { StyledContent } from '@root/src/layouts/login/styles'

export default function SubmitPassword(): React.ReactElement {
  return (
    <LoginLayout>
      <StyledContent>
        <Stack
          sx={{
            width: '100%',
            minHeight: '300px',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <SubmitPasswordForm />
        </Stack>
      </StyledContent>
    </LoginLayout>
  )
}
