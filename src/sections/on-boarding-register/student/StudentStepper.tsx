import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { useAuthContext } from '@/auth/useAuthContext'
import { FormProvider, useSnackbar } from '@/components'
import { Role } from '@/redux/services/enums/role.enum'
import { generateRandomEmoji } from '@/utils'
import { useTranslate } from '@/utils/translateHelper'

import { RegisterStudenTeacher, SingLink } from '../links'
import SingUp from '../teacher/SingUp'

import StepperInfo from './StepperInfo'
import StepperProgres from './StepperProgress'
import StepperRegister from './StepperRegister'

interface FormValuesProps {
  email: string
  firstName: string
  lastName: string
  password: string
}

export default function StudentStepper(): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar()
  const { register } = useAuthContext()
  const [activeStep, setActiveStep] = useState(0)
  const [hasOneNumber, setHasOneNumber] = useState<boolean>(false)
  const [hasSixDigit, setHasSixDigit] = useState<boolean>(false)
  const translate = useTranslate()

  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }
  const prevStep = () => {
    setActiveStep(activeStep - 1)
  }
  const goToStep = (step: number) => {
    setActiveStep(step)
  }

  const randomEmoji = generateRandomEmoji(true)

  const CreateRegisterSchema = Yup.object().shape({
    email: Yup.string()
      .required(translate('required_email'))
      .email(translate('must_be_valid_email')),
    firstName: Yup.string().required(translate('enter_name')),
    lastName: Yup.string().required(translate('enter_surname')),
    password: Yup.string()
      .required()
      .matches(/^(?=.*\d).{7,}$/),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateRegisterSchema),
    mode: 'all',
  })

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: Role.Student,
        emojiAvatar: randomEmoji,
      })
    } catch (error: any) {
      methods.setError('root', {
        ...error,
        message: error.message,
      })
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  const passwordValue = methods.watch('password')

  useEffect(() => {
    const includeNumbers = /\d/
    if (includeNumbers.test(passwordValue)) {
      setHasOneNumber(true)
    } else {
      setHasOneNumber(false)
    }
    if (passwordValue?.length > 5) {
      setHasSixDigit(true)
    } else {
      setHasSixDigit(false)
    }
  }, [passwordValue])

  return (
    <Stack
      sx={{
        minHeight: '460px',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {activeStep !== 2 && <RegisterStudenTeacher />}
      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {activeStep === 0 && (
          <SingUp
            goToStep={goToStep}
            nextStep={nextStep}
            isValid={!methods.formState.errors.email && methods.formState.dirtyFields.email}
            isTeacher={false}
          />
        )}
        {(activeStep === 1 || activeStep === 2) && (
          <StepperProgres
            activeStep={activeStep}
            prevStep={prevStep}
          />
        )}

        {activeStep === 1 && (
          <StepperRegister
            nextStep={nextStep}
            isSubmiting={methods.formState.isSubmitting}
            isSubmitSuccessful={methods.formState.isSubmitSuccessful}
            hasOneNumber={hasOneNumber}
            hasSixDigit={hasSixDigit}
          />
        )}
      </FormProvider>
      {activeStep === 2 && <StepperInfo />}
      {activeStep !== 2 ? <SingLink /> : null}
    </Stack>
  )
}
