import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { CircularProgress, Container, InputAdornment, Stack, Typography, Link } from '@mui/material'
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, Image, RHFTextField, useSettingsContext, useSnackbar } from '@/components'
import { StudentDashboardLayout } from '@/layouts/dashboard'
import { useJoinClassMutation } from '@/redux/services/manager/classes-student'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useTranslate } from '@/utils/translateHelper'

JoinClass.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)

const CreateClassSchema = Yup.object().shape({
  code: Yup.string().required('code is required'),
})

interface FormValueProps {
  code: string
}

export default function JoinClass(): React.ReactElement {
  const { push } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()

  const { themeStretch } = useSettingsContext()
  const [joinClass, { isLoading }] = useJoinClassMutation()

  const methods = useForm<FormValueProps>({
    resolver: yupResolver(CreateClassSchema),
  })

  const onSubmit = async ({ code }: FormValueProps) => {
    try {
      const { status, tribe } = await joinClass({ share_token: code }).unwrap()
      if (status === 'joined') {
        push(STUDENT_PATH_DASHBOARD.class.id(tribe.id))
      }
    } catch (error: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            flexWrap: { xs: 'wrap', sm: 'wrap' },
            gap: 7,
            justifyContent: 'center',
          }}
        >
          <Stack sx={{ pt: 4 }}>
            <Typography variant='h2'>{translate('tribes_join_a_tribe')}</Typography>
            <Typography
              variant='body1'
              sx={{ maxWidth: '350px', mt: 3 }}
            >
              {translate('tribes_have_you_been_invited')}
            </Typography>
            <RHFTextField
              required
              name='code'
              placeholder='1 2 a s d 5'
              inputProps={{
                style: {
                  fontSize: '32px',
                  letterSpacing: '10px',
                },
              }}
              sx={(theme) => ({
                mt: 7,
                maxWidth: '350px',
                '& .MuiInputBase-root': {
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
                    <LoadingButton
                      loadingIndicator={
                        <CircularProgress
                          color='inherit'
                          thickness={6}
                          size={26}
                        />
                      }
                      disabled={!methods.formState.isValid}
                      type='submit'
                      sx={{ color: '#43D4DD', p: 2, minWidth: 0 }}
                      loading={isLoading}
                    >
                      <FaArrowRight size={30} />
                    </LoadingButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              variant='body1'
              sx={{ maxWidth: '350px', mt: 3 }}
            >
              Hey, if you have no Tribe or Class, you can just start coding in the Catalog.{' '}
              <Link
                component={NextLink}
                href={STUDENT_PATH_DASHBOARD.courses.root}
                underline='none'
              >
                “Click here”
              </Link>{' '}
              to see the courses available
            </Typography>
          </Stack>
          <Stack>
            <Image
              sx={{ maxWidth: '350px', width: '100%', height: '100%' }}
              src='/assets/join-class/join-tiger.svg'
              alt='join-tiger'
            />
          </Stack>
        </Stack>
      </FormProvider>
    </Container>
  )
}
