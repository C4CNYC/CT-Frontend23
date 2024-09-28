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
}

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
    if (data.email || data.name) {
      return
    }
    // const newLesson =
    // data.projectType === 'simple'
    // ? await generateLesson({
    // lessonPrompt: '', //@ deleted by john from design
    // lessonDuration: data.RlessonDurationR,
    // proficiencyLevel: data.RlevelR,
    // lessonType: data.RtypeLessonR,
    // programmingLanguage: data.RprogrammingLanguageR,
    // track: data.RtrackR,
    // persona: data.RpersonaR,
    // })
    // : await generateMultiLesson(data)
    // if ('data' in newLesson && newLesson.data) {
    // setLessonId(newLesson.data?.id)
    setActiveStep(4)
    // }
  }

  const redirectAfterCompleate = () => {
    if (profile) {
      push(
        `${STUDENT_PATH_DASHBOARD.myLessons}?${new URLSearchParams({ lessonId: lessonId ?? '' })}`,
        undefined,
        {
          shallow: true,
        }
      )
    } else {
      push({
        pathname: STUDENT_PATH_DASHBOARD.codePanel.root,
        query: { ai: 'true', lessonId: lessonId ?? '' },
      })
    }
  }

  const onSubmitAddons = (addons: IAddons) => {
    // console.log(addons)
    redirectAfterCompleate()
  }

  return (
    <Stack position='relative'>
      {generateLessonLoading ? (
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
