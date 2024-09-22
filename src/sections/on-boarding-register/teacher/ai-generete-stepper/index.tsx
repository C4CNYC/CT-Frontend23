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
import {
  GRADES,
  LESSON_DURARION,
  LEVELS,
  PERSONA,
  PROGRAMMING_LANGUAGE,
  TONE,
  TYPE_LESSON,
} from './constants'
import { GeneralInfo } from './GeneralInfo'
import LessonPrompt from './LessonPrompt'
import LoaderStep from './LoaderStep'

export interface FormAIGenerateProps {
  RlevelR: string
  RgradesR: string
  RlessonDurationR: string
  RlessonLanguageR: string
  RprogrammingLanguageR: string
  RtrackR: string
  RpersonaR: string
  RtoneR: string
  RtypeLessonR: string
  RlanguageR: string
  name: string | null
  email: string | null
}

interface AIGenerateStepperProps {
  isModal: boolean
  closeModal?: () => void
}

export default function AIGenerateStepper({
  isModal,
  closeModal,
}: AIGenerateStepperProps): React.ReactElement {
  const { push } = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const profile = useSelector((state) => state.global.user)
  const [generateLesson, { isLoading: generateLessonLoading }] = useGenerateLessonMutation()

  //@names according to avoid bots spam

  const defaultValues = {
    RlevelR: LEVELS[0].value,
    RgradesR: GRADES[1].value,
    RlessonDurationR: LESSON_DURARION[2].value,
    RlessonLanguageR: 'English',
    RtrackR: '',
    RprogrammingLanguageR: PROGRAMMING_LANGUAGE[0].value,
    RpersonaR: PERSONA[0].value,
    RtoneR: TONE[1].value,
    RtypeLessonR: TYPE_LESSON[1].value,
    name: null,
    email: null,
  }

  const generateAICourseSchema = Yup.object().shape({
    RlevelR: Yup.string(),
    RgradeR: Yup.string(),
    RlessonDurationR: Yup.string(),
    RlessonLanguageR: Yup.string(),
    RprogrammingLanguageR: Yup.string(),
    RtrackR: Yup.string(),
    RpersonaR: Yup.string(),
    RtoneR: Yup.string(),
    RtypeLessonR: Yup.string(),
    RlanguageR: Yup.string(),
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
    if (data.email || data.name) {
      return
    }
    const newLesson = await generateLesson({
      lessonPrompt: '', //@ deleted by john from design
      lessonDuration: data.RlessonDurationR,
      proficiencyLevel: data.RlevelR,
      lessonType: data.RtypeLessonR,
      programmingLanguage: data.RprogrammingLanguageR,
      track: data.RtrackR,
      persona: data.RpersonaR,
    })
    if ('data' in newLesson && newLesson.data) {
      if (closeModal) closeModal()
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
        position: 'relative',
      }}
    >
      {generateLessonLoading ? (
        <LoaderStep isLoading={generateLessonLoading} />
      ) : (
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
              closeModal={closeModal}
            />
          )}
          {activeStep === 1 && (
            <LessonPrompt
              nextStep={nextStep}
              prevStep={prevStep}
              closeModal={closeModal}
            />
          )}
          {activeStep === 2 && (
            <AIPersonaInfo
              nextStep={nextStep}
              prevStep={prevStep}
              closeModal={closeModal}
            />
          )}
        </FormProvider>
      )}
    </Stack>
  )
}
