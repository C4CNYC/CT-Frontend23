import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { useAuthContext } from '@/auth/useAuthContext'
import { FormProvider, useSnackbar } from '@/components'
import { useTranslate } from '@/utils/translateHelper'
import { PATH_AUTH } from '@root/src/routes/paths'

import { AIPersonaInfo } from './AIPersonaInfo'
import { GeneralInfo } from './GeneralInfo'
import LessonPrompt from './LessonPrompt'

interface FormValuesProps {
  email: string
  firstName: string
  lastName: string
  password: string
}

export default function AIGenerateStepper(): React.ReactElement {
  const { push } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [activeStep, setActiveStep] = useState(0)
  const { register } = useAuthContext()
  const translate = useTranslate()

  const generateAICourseSchema = Yup.object().shape({
    level: Yup.string(),
    grade: Yup.string(),
    lessonDuration: Yup.string(),
    lessonPrompt: Yup.string(),
    lessonLanguage: Yup.string(),
    honeypotField: Yup.string(),
    track: Yup.string(),
    persona: Yup.string(),
    tone: Yup.string(),
    type: Yup.string(),
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
    resolver: yupResolver(generateAICourseSchema),
    mode: 'all',
  })

  const onSubmit = async (data: FormValuesProps) => {}

  return (
    <Stack
      sx={{
        width: '100%',
        minHeight: '460px',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Stack
        sx={{
          minHeight: '460px',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {activeStep === 0 && (
            <GeneralInfo
              nextStep={nextStep}
              resetRoad={() => {
                push(PATH_AUTH.onBoardingTeacher.root)
              }}
            />
          )}
          {activeStep === 1 && (
            <LessonPrompt
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {activeStep === 2 && (
            <AIPersonaInfo
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
        </FormProvider>
      </Stack>
    </Stack>
  )
}
