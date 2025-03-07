import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { useAuthContext } from '@/auth/useAuthContext'
import { Role } from '@/redux/services/enums/role.enum'
import { useTranslate } from '@/utils/translateHelper'
import { FormProvider } from '@root/src/components'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

import EmailStep from './email-step'
import PasswordStep from './password-step'

interface FormValuesProps {
  email: string
  firstName: string
  lastName: string
  password: string
}

const CreateRegisterSchema = (translate: (key: string) => string) =>
  Yup.object().shape({
    email: Yup.string()
      .required(translate('required_email'))
      .email(translate('must_be_valid_email')),
    firstName: Yup.string().required(translate('enter_name')),
    lastName: Yup.string().required(translate('enter_surname')),
    password: Yup.string().min(8, translate('required_password_length')),
  })

interface IJoinTribeRegisterProps {
  handleChangeAuthorization: () => void
  classId: string
}

export default function JoinTribeRegister({
  handleChangeAuthorization,
  classId,
}: IJoinTribeRegisterProps): React.ReactElement {
  const translate = useTranslate()
  const { push, query } = useRouter()
  const { register } = useAuthContext()
  const { enqueueSnackbar } = useSnackbar()

  const [currentStep, setCurrentStep] = useState(0)

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateRegisterSchema(translate)),
    mode: 'all',
  })

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: Role.Student,
      })
      push(
        `${STUDENT_PATH_DASHBOARD.class.id(classId)}?` +
          `${new URLSearchParams({ joinCode: query.id as string })}`
      )
      enqueueSnackbar(translate('register_successfully'))
    } catch (error: any) {
      methods.setError('root', {
        ...error,
        message: error.message,
      })
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  return (
    <Stack
      alignItems='center'
      position='relative'
    >
      <Typography variant='h4'>{translate('home_join_tribe')}</Typography>
      <Typography variant='body1'>{translate('tribes_sign_up_to_join')}</Typography>
      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {currentStep === 0 && (
          <EmailStep
            nextStep={() => setCurrentStep(currentStep + 1)}
            isValid={!methods.formState.errors.email && methods.formState.dirtyFields.email}
          />
        )}
        {currentStep === 1 && (
          <PasswordStep
            prevStep={() => setCurrentStep(currentStep - 1)}
            isSubmiting={methods.formState.isSubmitting}
          />
        )}
      </FormProvider>
      <Button
        onClick={handleChangeAuthorization}
        sx={{
          mt: 4,
          color: 'inherit',
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          p: 0,
          '&:hover': {
            background: 'none',
          },
        }}
      >
        <Typography variant='body1'>{translate('login_been_here')}</Typography>|
        <Typography variant='subtitle1'>{translate('login')}</Typography>
      </Button>
    </Stack>
  )
}
