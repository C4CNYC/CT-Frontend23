import { LoadingButton } from '@mui/lab'
import { Divider, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight'
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import { useAuthContext } from '@/auth/useAuthContext'
import { RHFTextField } from '@/components'
import { Role } from '@/redux/services/enums/role.enum'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useTenants } from '@root/src/hooks/useTenants'

interface IEmailStepProps {
  nextStep: () => void
  isValid?: boolean
  classId: string
}

export default function EmailStep({
  nextStep,
  isValid,
  classId,
}: IEmailStepProps): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar()
  const { registerWithGoogle } = useAuthContext()
  const tenant = useTenants()
  const { push, query } = useRouter()

  const onRegisterWithGoogle = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        await registerWithGoogle(code, Role.Student)
        push(
          `${STUDENT_PATH_DASHBOARD.class.id(classId)}?` +
            `${new URLSearchParams({ joinCode: query.id as string })}`
        )
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    },
    flow: 'auth-code',
    ux_mode: 'popup',
  })

  return (
    <>
      <Stack
        justifyContent='center'
        width='280px'
        pt={2.3}
      >
        <RHFTextField
          name='email'
          label='Email'
          sx={(theme) => ({
            '& .MuiInputBase-root': {
              height: '52px',
              background: theme.palette.grey[200],
            },
            '& fieldset': { border: 'none' },
            '& input:-webkit-autofill': {
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color': '#000',
              transition: 'background-color 5000s ease-in-out 0s',
              boxShadow: `inset 0 0 .1px .1px ${theme.palette.grey[200]}`,
            },
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  onClick={() => {
                    if (nextStep && isValid) {
                      nextStep()
                    }
                  }}
                >
                  <FaArrowRight color={isValid ? '#43D4DD' : ''} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {tenant?.meta?.is_enabled_google_auth ? (
          <>
            <Divider
              sx={{ my: 1 }}
              flexItem
            >
              <Typography
                sx={(theme) => ({ color: theme.palette.grey[500], mx: 1 })}
                variant='body1'
              >
                OR
              </Typography>
            </Divider>

            <LoadingButton
              onClick={() => {
                onRegisterWithGoogle()
              }}
              loading={false}
              sx={(theme) => ({
                color: theme.palette.grey[600],
                textTransform: 'none',
                py: 1.5,
                mb: 1,
                gap: 2,
                background: theme.palette.grey[200],
                fontWeight: 400,
                fontSize: '1.3em',
                '&:hover': {
                  color: theme.palette.grey[900],
                },
              })}
            >
              <FcGoogle size='50px' />
              Sign up with Google
            </LoadingButton>
          </>
        ) : null}
      </Stack>
    </>
  )
}
