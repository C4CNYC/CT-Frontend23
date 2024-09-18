import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider } from '@/components'
import { useGenerateLessonMutation } from '@root/src/redux/services/manager/lessons-manager'
import { useSelector } from '@root/src/redux/store'
import { PATH_AUTH } from '@root/src/routes/paths'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

import { AIPersonaInfo } from './AIPersonaInfo'
import { GRADES, LESSON_DURARION, LEVELS, PERSONA, TONE, TYPE_PROJECT } from './constants'
import { GeneralInfo } from './GeneralInfo'
import LessonPrompt from './LessonPrompt'

export interface FormAIGenerateProps {
  level: string
  grade: string
  lessonDuration: string
  lessonPrompt: string
  lessonLanguage: string
  honeypotField: string
  track: string
  persona: string
  tone: string
  projectType: string
}

interface AIGenerateStepperProps {
  isModal: boolean
}

export default function AIGenerateStepper({ isModal }: AIGenerateStepperProps): React.ReactElement {
  const { push } = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const profile = useSelector((state) => state.global.user)
  const [generateLesson, { isLoading: generateLessonLoading }] = useGenerateLessonMutation()

  const defaultValues = {
    level: LEVELS[0].value,
    grades: GRADES[1].value,
    lessonDuration: LESSON_DURARION[2].value,
    lessonPrompt: '',
    lessonLanguage: '',
    honeypotField: '',
    track: '',
    persona: PERSONA[0].value,
    tone: TONE[1].value,
    projectType: TYPE_PROJECT[1].value,
  }

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

  const methods = useForm<FormAIGenerateProps>({
    resolver: yupResolver(generateAICourseSchema),
    mode: 'all',
    defaultValues: defaultValues,
  })

  const onSubmit = async (data: FormAIGenerateProps) => {
    const newLesson = await generateLesson(data)
    if ('data' in newLesson && newLesson.data) {
      if (profile) {
        push(
          `${STUDENT_PATH_DASHBOARD.myLessons}?${new URLSearchParams({ lessonId: newLesson.data?.id })}`,
          undefined,
          {
            shallow: true,
          }
        )
      } else {
        push({
          pathname: STUDENT_PATH_DASHBOARD.codePanel.root,
          query: { ai: 'true', lessonId: newLesson.data?.id },
        })
      }
    }
  }

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
              isModal={isModal}
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
