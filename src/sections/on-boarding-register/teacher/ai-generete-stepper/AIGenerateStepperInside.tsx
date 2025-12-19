import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, useSnackbar } from '@/components'
import { LessonMachineLang } from '@root/src/redux/services/enums/lesson-language.enum'
import { useN8nRequest } from '@root/src/redux/services/manager/ai-services'
import {
  useCreateLessonMutation,
  useCreateLessonUsingN8nMutation,
} from '@root/src/redux/services/manager/lessons-manager'
import { useSelector } from '@root/src/redux/store'
import { PATH_AUTH } from '@root/src/routes/paths'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'
import { AiGenerate } from '@root/src/utils/ai-generate'
import { getTodayDate } from '@root/src/utils/formatTime'

import AddAddons from './AddAddons'
import { useAiGenerateStepper } from './AiGenerateStepperContext'
import { AIPersonaInfo } from './AIPersonaInfo'
import {
  AIGenerateStepperInsideProps,
  FormAIGenerateProps,
  GRADES,
  LESSON_DURARION,
  LEVELS,
  PERSONA,
  TONE,
} from './constants'
import { GeneralInfo } from './GeneralInfo'
import LessonPrompt from './LessonPrompt'
import SimpleAiGenerate from './SimpleAiGenerate'

// @names according to avoid bots spam
const defaultValues = {
  RlevelR: LEVELS[1].value,
  RgradesR: GRADES[2].value,
  RlessonDurationR: LESSON_DURARION[2].value,
  RlessonLanguageR: 'English',
  RcustomLanguageR: '',
  RtrackR: '',
  RprogrammingLanguageR: '',
  RpersonaR: PERSONA[0].value,
  RtoneR: TONE[0].value,
  RtypeLessonR: '',
  name: null,
  email: null,
  state: null,
  RpromptR: '',
  RcustomPersonaR: '',
  RcustomToneR: '',
  RcontextR: '',
}

export default function AIGenerateStepperInside({
  passedValues,
}: AIGenerateStepperInsideProps): React.ReactElement {
  const { push } = useRouter()
  const ask = useN8nRequest()
  const [lessonId, _] = useState<null | string>(null)
  const { enqueueSnackbar } = useSnackbar()

  const profile = useSelector((state) => state.global.user)
  const { activeStep, aiLessons, isModal, closeModal } = useAiGenerateStepper()

  const [createLesson] = useCreateLessonMutation()
  const [createAILesson] = AiGenerate()
  const [createLessonUsingN8n] = useCreateLessonUsingN8nMutation()

  const generateAICourseSchema = Yup.object().shape({
    RlevelR: Yup.string(),
    RgradeR: Yup.string(),
    RlessonDurationR: Yup.string(),
    RlessonLanguageR: Yup.string(),
    RcustomLanguageR: Yup.string(),
    RprogrammingLanguageR: Yup.string(),
    RtrackR: Yup.string(),
    RpersonaR: Yup.string(),
    RtoneR: Yup.string(),
    RtypeLessonR: Yup.string(),
    RlanguageR: Yup.string(),
    RpromptR: Yup.string(),
    RcustomPersonaR: Yup.string(),
    RcustomToneR: Yup.string(),
    RcontextR: Yup.string(),
  })

  const methods = useForm<FormAIGenerateProps>({
    resolver: yupResolver(generateAICourseSchema),
    mode: 'all',
    defaultValues: { ...defaultValues, ...passedValues },
  })

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
      persona: data.RcustomPersonaR || data.RpersonaR,
      grade: data.RgradesR,
      language: data.RcustomLanguageR || data.RlessonLanguageR,
      tone: data.RcustomToneR || data.RtoneR,
      context: data.RcontextR,
      newLessonId: '',
    }
    if (!profile) {
      localStorage.setItem('AiGenerateLessonData', JSON.stringify(lessonData))
      push(PATH_AUTH.onBoardingTeacher.launchCourse)
    } else {
      let tempLessonName = 'Ai Lesson ' + getTodayDate()
      createLesson({
        name: tempLessonName,
        description: '',
        duration: '20',
        active: true,
        meta: {
          type: 'ai',
          humanLang: lessonData.language,
          machineLang: lessonData.programmingLanguage as keyof typeof LessonMachineLang,
          createMultipleFiles: 0,
          lock: 0,
        },
      })
        .unwrap()
        .then((payload) => {
          ask(
            {
              lessonId: payload.id,
              chat: `${lessonData.lessonPrompt} 
            ${lessonData.context ? `Context: ${lessonData.context}` : ''}`,
              isMe: 1,
            },
            'chatHistoryAdd'
          ).then(() => {
            ask(
              {
                lessonId: payload.id,
                chat: ` I'm preparing your lesson \n Page will update when slides arrive  `,
                isMe: 0,
              },
              'chatHistoryAdd'
            )
          })
          lessonData.newLessonId = payload.id
          let redirectAfter = STUDENT_PATH_DASHBOARD.codePanel.root //default was STUDENT_PATH_DASHBOARD.myLessons but we want code panel
          if (lessonData.lessonType.includes('code-panel')) {
            lessonData.lessonType = lessonData.lessonType.replace('code-panel', '')
            redirectAfter = STUDENT_PATH_DASHBOARD.codePanel.root
          }

          if (lessonData.lessonType.includes('n8n')) {
            lessonData.lessonType = lessonData.lessonType.replace('n8n', '')
            redirectAfter = STUDENT_PATH_DASHBOARD.codePanel.root
            createLessonUsingN8n(lessonData)
          } else {
            createAILesson(lessonData) // no need to wait, we have lessonid
          }
          localStorage.removeItem('AiGenerateLessonData')
          enqueueSnackbar('Lesson created successfully', { variant: 'success' })
          let lessonId = payload.id ?? ''
          setTimeout(() => {
            if (isModal) closeModal()
          }, 300)
          setTimeout(() => push(`${redirectAfter}?lessonId=${lessonId}&ai=true`), 700)
        })
        .catch((err) => {
          enqueueSnackbar(err.data.message, { variant: 'error' })
        })
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
  const onSubmitAddons = () => {
    redirectAfterCompleate(lessonId ?? '')
  }

  useEffect(() => {
    if (!aiLessons || aiLessons.length < 1) return
    if (!methods.getValues('RtypeLessonR')) {
      let exerciseAiTemplate = aiLessons.find((t) => 'generator' in (t?.meta || {}))
      methods.setValue(
        'RtypeLessonR',
        exerciseAiTemplate ? exerciseAiTemplate.id + 'n8n' : aiLessons[0].id
      )
    }
  }, [aiLessons])

  return (
    <>
      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {activeStep === 0 && (
          <SimpleAiGenerate
            resetRoad={resetRoad}
            updateForm={methods.setValue as any}
            getFormValue={methods.getValues as any}
          />
        )}
        {activeStep === 1 && (
          <LessonPrompt isCustomLang={Boolean(methods.watch('RcustomLanguageR'))} />
        )}
        {activeStep === 2 && <GeneralInfo isTrackSelected={Boolean(methods.watch('RtrackR'))} />}
        {activeStep === 3 && (
          <AIPersonaInfo
            customPersona={Boolean(methods.watch('RcustomPersonaR'))}
            customTone={Boolean(methods.watch('RcustomToneR'))}
          />
        )}
      </FormProvider>

      {activeStep === 4 && (
        <AddAddons
          onSubmitAddons={onSubmitAddons}
          resetRoad={resetRoad}
        />
      )}
    </>
  )
}
