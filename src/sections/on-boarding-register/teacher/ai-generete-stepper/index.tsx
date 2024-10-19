import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider } from '@/components'
import {
  useGenerateLessonMutation,
  useGenerateLessonMultiMutation,
  useCreateLessonUsingOpenAIAssistantMutation,
  useCreateLessonUsingOpenAIAssistantBetaMutation,
} from '@root/src/redux/services/manager/lessons-manager'
import { useSelector } from '@root/src/redux/store'
import { PATH_AUTH } from '@root/src/routes/paths'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

import AddAddons from './AddAddons'
import { AIPersonaInfo } from './AIPersonaInfo'
import {
  AIGenerateStepperProps,
  FormAIGenerateProps,
  GRADES,
  IAddons,
  LESSON_DURARION,
  LEVELS,
  PERSONA,
  PROGRAMMING_LANGUAGE,
  TONE,
  TYPE_LESSON,
  TYPE_PROJECT,
} from './constants'
import { GeneralInfo } from './GeneralInfo'
import LessonPrompt from './LessonPrompt'
import LoaderStep from './LoaderStep'
import SimpleAiGenerate from './SimpleAiGenerate'

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
  RpromptR: '',
}
const SpamBotPreventerToNormal = (d: FormAIGenerateProps) => ({
  level: d.RlevelR,
  grades: d.RgradesR,
  lessonDuration: d.RlessonDurationR,
  lessonLanguage: d.RlessonLanguageR,
  track: d.RtrackR,
  programmingLanguage: d.RprogrammingLanguageR,
  persona: d.RpersonaR,
  tone: d.RtoneR,
  typeLesson: d.RtypeLessonR,
  language: d.RlanguageR,
  lessonPrompt: '',
})

export default function AIGenerateStepper({
  isModal,
  closeModal,
}: AIGenerateStepperProps): React.ReactElement {
  const { push } = useRouter()

  const [activeStep, setActiveStep] = useState(0)
  const [lessonId, setLessonId] = useState<null | string>(null)

  const profile = useSelector((state) => state.global.user)

  const [generateLesson, { isLoading: generateLessonLoading }] = useGenerateLessonMutation()
  const [generateMultiLesson, { isLoading: generateMultiLessonLoading }] =
    useGenerateLessonMultiMutation()
  const [createLessonUsingOpenAIAssistant, { isLoading: createLessonUsingOpenAIAssistantLoading }] =
    useCreateLessonUsingOpenAIAssistantMutation()
  const [
    createLessonUsingOpenAIAssistantBeta,
    { isLoading: createLessonUsingOpenAIAssistantBetaLoading },
  ] = useCreateLessonUsingOpenAIAssistantBetaMutation()

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
    RpromptR: Yup.string(),
  })

  const methods = useForm<FormAIGenerateProps>({
    resolver: yupResolver(generateAICourseSchema),
    mode: 'all',
    defaultValues: defaultValues,
  })

  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }
  const prevStep = () => {
    setActiveStep(activeStep - 1)
  }

  const resetRoad = () => {
    push(PATH_AUTH.onBoardingTeacher.root)
  }

  const onSubmit = async (data: FormAIGenerateProps) => {
    const lessonData = {
      lessonPrompt: data.RpromptR,
      lessonDuration: data.RlessonDurationR,
      proficiencyLevel: data.RlevelR,
      lessonType: data.RtypeLessonR,
      programmingLanguage: data.RprogrammingLanguageR,
      track: data.RtrackR,
      persona: data.RpersonaR,
    }

    let newLesson
    switch (data.RtypeLessonR as (typeof TYPE_PROJECT)[number]['value']) {
      case 'simple':
        newLesson = await generateLesson(lessonData)
        break
      default:
      case 'multi':
      case 'full':
      case 'exercises':
        newLesson = await generateMultiLesson(lessonData)
        break
      case 'project':
        newLesson = await createLessonUsingOpenAIAssistant({
          ...lessonData,
          proficiencyLevel: data.RgradesR,
          programmingLanguage: data.RlessonLanguageR,
        })
        break
      case 'beta':
        newLesson = await createLessonUsingOpenAIAssistantBeta({
          ...lessonData,
          proficiencyLevel: data.RgradesR,
          programmingLanguage: data.RlessonLanguageR,
        })
        break
    }

    if ('data' in newLesson && newLesson.data) {
      if (closeModal) closeModal()
      redirectAfterCompleate(newLesson.data.id)
    }
  }

  const redirectAfterCompleate = (newLessonId: string) => {
    if (profile) {
      push(
        `${STUDENT_PATH_DASHBOARD.myLessons}?${new URLSearchParams({ lessonId: newLessonId ?? '' })}`,
        undefined,
        {
          shallow: true,
        }
      )
    } else {
      push({
        pathname: STUDENT_PATH_DASHBOARD.codePanel.root,
        query: { ai: 'true', lessonId: newLessonId ?? '' },
      })
    }
  }
  const onSubmitAddons = (addons: IAddons) => {
    redirectAfterCompleate(lessonId ?? '')
  }

  return (
    <Stack position='relative'>
      {generateLessonLoading ||
      generateMultiLessonLoading ||
      createLessonUsingOpenAIAssistantLoading ? (
        <LoaderStep isLoading={generateLessonLoading} />
      ) : (
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {activeStep === 0 && (
            <SimpleAiGenerate
              isModal={isModal}
              nextStep={nextStep}
              resetRoad={resetRoad}
              closeModal={closeModal}
              updateForm={methods.setValue as any}
              redirectAfterComplete={redirectAfterCompleate}
            />
          )}
          {activeStep === 1 && (
            <GeneralInfo
              isModal={isModal}
              nextStep={nextStep}
              prevStep={prevStep}
              closeModal={closeModal}
            />
          )}
          {activeStep === 2 && (
            <LessonPrompt
              nextStep={nextStep}
              prevStep={prevStep}
              closeModal={closeModal}
            />
          )}
          {activeStep === 3 && (
            <AIPersonaInfo
              prevStep={prevStep}
              closeModal={closeModal}
            />
          )}
        </FormProvider>
      )}
      {activeStep === 4 && (
        <AddAddons
          closeModal={closeModal}
          onSubmitAddons={onSubmitAddons}
          resetRoad={resetRoad}
        />
      )}
    </Stack>
  )
}
