import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { useAuthContext } from '@/auth/useAuthContext'
import { Role } from '@/redux/services/enums/role.enum'
import { useTranslate } from '@/utils/translateHelper'
import { FormProvider, useSnackbar } from '@root/src/components'
import { PATH_AUTH } from '@root/src/routes/paths'
import { generateRandomEmoji } from '@root/src/utils'

import { RegisterStudentTeacher, SingLink } from '../../links'
import SingUp from '../SingUp'

import AddSchool from './AddSchool'
import AddTeacher from './AddTeacher'
import StepperProgress from './StepperProgress'

interface FormValuesProps {
  email: string
  firstName: string
  lastName: string
  password: string
}

export default function LaunchCourseStepper() {
  const { push } = useRouter()

  const translate = useTranslate()

  const { enqueueSnackbar } = useSnackbar()
  const { register } = useAuthContext()

  const [activeStep, setActiveStep] = useState(0)

  const CreateEmailSchema = Yup.object().shape({
    email: Yup.string()
      .required(translate('required_email'))
      .email(translate('must_be_valid_email')),
    firstName: Yup.string().required(translate('enter_name')),
    lastName: Yup.string().required(translate('enter_surname')),
    password: Yup.string().min(8, translate('required_password_length')),
  })

  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }
  const prevStep = () => {
    setActiveStep(activeStep - 1)
  }
  const goToStep = (step: number) => {
    setActiveStep(step)
  }

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateEmailSchema),
    mode: 'all',
  })

  const onSubmit = async (data: FormValuesProps) => {
    const randomEmoji = generateRandomEmoji(true)
    try {
      await register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: Role.Manager,
        emojiAvatar: randomEmoji,
      })
    } catch (error: any) {
      methods.setError('root', {
        ...error,
        message: error.message,
      })
      enqueueSnackbar(error ?? 'Error', { variant: 'error' })
    }
  }

  return (
    <Stack
      sx={{
        minHeight: '460px',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
      }}
    >
      {activeStep === 0 || activeStep === 1 ? <RegisterStudentTeacher isTeacher /> : null}

      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {activeStep === 0 && (
          <SingUp
            goToStep={goToStep}
            nextStep={nextStep}
            resetRoad={() => push(PATH_AUTH.onBoardingTeacher.root)}
            isValid={!methods.formState.errors.email && methods.formState.dirtyFields.email}
            isTeacher={true}
          />
        )}
        {(activeStep === 1 || activeStep === 2) && (
          <StepperProgress
            prevStep={prevStep}
            activeStep={activeStep}
          />
        )}
        {activeStep === 1 && (
          <AddTeacher
            nextStep={nextStep}
            isSubmitting={methods.formState.isSubmitting}
            isSubmitSuccessful={methods.formState.isSubmitSuccessful}
          />
        )}
      </FormProvider>

      {activeStep === 2 && <AddSchool />}
      <SingLink />
    </Stack>
  )
}
