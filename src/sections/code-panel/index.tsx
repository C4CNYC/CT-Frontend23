import { ReactElement, useEffect, useMemo, useState } from 'react'

import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import type ConfettiType from 'react-confetti/dist/types/Confetti'
import { useDispatch } from 'react-redux'

import { useAuthContext } from '@/auth/useAuthContext'
import {
  useGetCourseContentQuery,
  useGetCoursePublicContentQuery,
} from '@/redux/services/manager/challenges-student'
import {
  useGetContentCheckersQuery,
  useGetLessonContentStudentQuery,
  useGetLessonStudentWithoutContentsQuery,
} from '@/redux/services/manager/lesson-student'
import { useCompleteLessonMutation } from '@/redux/services/manager/progress-student'
import { setIsActivateCompeated } from '@/redux/slices/checkers-animation'
import {
  setCourseId,
  setLessonId,
  setSlideIndex,
  setUnitId,
} from '@/redux/slices/code-panel-global'
import { type RootState, useSelector } from '@/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import SkeletonCodePanel, { CPTopBarSkeleton } from '@/sections/code-panel/components/skeleton'
import { getNextLessonId } from '@/sections/code-panel/lib/utils/navigation'
import { type BaseResponseInterface } from '@/utils'
import { useTranslate } from '@/utils/translateHelper'
import { LessonType } from '@root/src/redux/services/enums/lesson-type.enum'
import { ILesson } from '@root/src/redux/services/interfaces/lesson.interface'
import { useGetLessonsQuery } from '@root/src/redux/services/manager/lessons-manager'
import { useLessonFilesCarryOverMutation } from '@root/src/redux/services/manager/workspace-student'
import { useGetPublicModuleContentQuery } from '@root/src/redux/services/public-student'
import { progressGuestSetValidation } from '@root/src/utils/progressLocalStorage'

import AIGeneratorTour from '../intro-tours/ai-generator-intro'

import SignUpDialog from './components/sign-up-dialog'
import { CodePanelContextProvider } from './lib/CodePanelContextProvider'
import { FullScreenProvider } from './lib/FullScreenContext'
import { LessonManagerProvider } from './lib/LessonManagerContext'

const CodePanelBody = dynamic(async () => await import('@/sections/code-panel/components/body'), {
  ssr: false,
})

const CodePanelTour = dynamic(
  async () => await import('@/sections/intro-tours/code-panel-intro/index'),
  {
    ssr: false,
  }
)

const CodePanelHeader = dynamic(
  async () => await import('@/sections/code-panel/components/header'),
  {
    loading: () => <CPTopBarSkeleton />,
  }
)

const Confetti = dynamic(async () => await import('react-confetti'), { ssr: false })

const DEFAULT_LANGUAGE = 'html'

export default function CodePanelLayout(): ReactElement | null {
  const router = useRouter()
  const dispatch = useDispatch()
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()
  const { isAuthenticated } = useAuthContext()

  const [render, setRender] = useState(true)
  const [showTour, setShowTour] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const isShowTour = useSelector((state) => state.tour.isStarted)
  const profile = useSelector((state) => state.global.user)
  const lastUnitId = useSelector((state: RootState) => state.codePanelGlobal.unitId)
  const lastCourseId = useSelector((state: RootState) => state.codePanelGlobal.courseId)
  const lastLessonId = useSelector((state: RootState) => state.codePanelGlobal.lessonId)

  const [completeLesson] = useCompleteLessonMutation()
  const [carryOverFiles] = useLessonFilesCarryOverMutation()

  const lessonIdFromRoute = Array.isArray(router.query.lessonId)
    ? router.query.lessonId.join()
    : router.query.lessonId || ''

  const { data: courseAuthContent, isLoading: isLoadingAuthCourseContent } =
    useGetCourseContentQuery(
      { id: router.query.courseId as string },
      { skip: !router.query.courseId || !isAuthenticated }
    )

  const { data: unitContent, isLoading: isLoadingUnitContent } = useGetPublicModuleContentQuery(
    { id: router.query.unitId as string },
    { skip: !!router.query.courseId || !isAuthenticated || !router.query.unitId }
  )

  const { data: coursePublicContent, isLoading: isLoadingPublicCourse } =
    useGetCoursePublicContentQuery(
      { id: router.query.courseId as string },
      { skip: !router.query.courseId || isAuthenticated }
    )

  const courseContent = courseAuthContent || coursePublicContent || unitContent
  const isLoadingCourseContent =
    isLoadingAuthCourseContent || isLoadingPublicCourse || isLoadingUnitContent

  const { data: lesson, isLoading: isLoadingLesson } = useGetLessonStudentWithoutContentsQuery(
    { id: router.query.lessonId as string },
    { skip: !router.query.lessonId }
  )

  const {
    data: lessonContent,
    isLoading: isLoadingLessonContent,
    isFetching: isFetchingLessonContent,
    fulfilledTimeStamp: fulfilledTimeStamp,
    isError: isErrorLessonContent,
  } = useGetLessonContentStudentQuery(
    { id: router.query.lessonId as string },
    { skip: !router.query.lessonId }
  )

  let { data: lessonsRelatedWithSlug } = useGetLessonsQuery(
    {
      slug: lessonIdFromRoute,
    },
    { skip: !lessonIdFromRoute && !isErrorLessonContent }
  )
  useEffect(() => {
    if (
      !lessonsRelatedWithSlug ||
      !lessonsRelatedWithSlug?.data ||
      !lessonsRelatedWithSlug?.data.length
    )
      return
    let l = lessonsRelatedWithSlug.data[0]
    router.push(STUDENT_PATH_DASHBOARD.codePanel.root + `?&lessonId=${l.id}`)
  }, [lessonsRelatedWithSlug])

  useGetContentCheckersQuery(undefined, {
    skip: !fulfilledTimeStamp || !profile,
  })

  const onConfettiComplete = (confetti?: ConfettiType) => {
    setShowConfetti(false)
    confetti?.reset()
  }

  useEffect(() => {
    if (!courseContent) return

    const courseId = router.query.courseId
    const unitId =
      router.query.unitId ??
      (router.query.courseId === lastCourseId && lastUnitId
        ? lastUnitId
        : courseContent.units[0].id)

    if (
      !courseContent.units ||
      !courseContent.units.length ||
      !courseContent.units[0].lessons ||
      !courseContent.units[0].lessons.length
    ) {
      void router.replace(STUDENT_PATH_DASHBOARD.class.root)
      return
    }

    const lessonId =
      router.query.lessonId ??
      (unitId === lastUnitId && lastLessonId
        ? lastLessonId
        : courseContent.units[0].lessons[0].id ?? false)

    if (!courseId && !unitId && !lessonId) {
      void router.replace(STUDENT_PATH_DASHBOARD.page404)
      return
    }

    if (!router.query.unitId || !router.query.lessonId) {
      void router.replace(
        STUDENT_PATH_DASHBOARD.codePanel.workSpace({
          courseId: courseId as string,
          unitId: unitId as string,
          lessonId: lessonId as string,
        })
      )
      return
    }

    dispatch(setLessonId(lessonId as string))
    dispatch(setUnitId(unitId as string))
    dispatch(setCourseId(courseId as string))

    return () => {
      dispatch(setLessonId(''))
      dispatch(setUnitId(''))
      dispatch(setCourseId(''))
    }
  }, [courseContent, router.query.courseId, router.query.unitId, router.query.lessonId])

  const onSubmitChallenge = async (lessonContentId: string, code?: string): Promise<void> => {
    dispatch(setIsActivateCompeated(false))

    if (!profile) {
      progressGuestSetValidation({
        lessonId: lesson?.id || '',
        courseId: router.query.courseId as string,
        moduleId: router.query.unitId as string,
        slideId: lessonContentId,
      })
      return
    }
    try {
      await completeLesson({
        id: router.query.courseId as string,
        module_id: router.query.unitId as string,
        lesson_content_id: lessonContentId,
        code,
      }).unwrap()
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'Lesson_Completed',
        event_category: `Course ${router.query.courseId} > Unit (Module) ${router.query.unitId} > Training (Lesson) ${router.query.lessonId}`,
        event_label: lessonContentId,
      })
    }
  }

  const onSubmitLesson = async (): Promise<void> => {
    setShowConfetti(true)
    try {
      enqueueSnackbar(translate('messages_lesson_complete'))
      if (!courseContent) return
      const nextLessonInfo = getNextLessonId(
        courseContent.units,
        router.query.lessonId as string,
        router.query.unitId as string
      )

      if (nextLessonInfo) {
        const pathStr = nextLessonInfo.path.split('/')
        if (
          nextLessonInfo.type === LessonType.PRACTICAL &&
          !nextLessonInfo.isIndependent &&
          lesson
        ) {
          await carryOverFiles({
            lessonId: nextLessonInfo.lessonId as string,
            prevLessonId: lesson.id as string,
          })
        }
        router
          .push(
            STUDENT_PATH_DASHBOARD.codePanel.workSpace({
              courseId: courseContent.id,
              unitId: pathStr[0],
              lessonId: pathStr[1],
            })
          )
          .then(() => {
            dispatch(setUnitId(pathStr[0]))
            dispatch(setLessonId(pathStr[1]))
            dispatch(setSlideIndex(0))
          })
      } else {
        enqueueSnackbar(translate('messages_course_complete'))
      }
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  const isLoadingComplete = useMemo(() => {
    return (
      !!lesson &&
      !isLoadingLessonContent &&
      !isFetchingLessonContent &&
      !isLoadingLesson &&
      router.query.courseId !== null &&
      !render
    )
  }, [lesson, isLoadingLesson, router, render, profile])

  useEffect(() => {
    let timerIdForTour: string | number | NodeJS.Timeout | undefined
    let timerIdForRender: string | number | NodeJS.Timeout | undefined

    const hasSeenTour = localStorage.getItem('HAS_SEEN_TOUR')
    if (!hasSeenTour) {
      timerIdForTour = setTimeout(() => {
        setShowTour(true)
      }, 3000)
    }
    timerIdForRender = setTimeout(() => setRender(false))

    return () => {
      clearTimeout(timerIdForRender)
      clearTimeout(timerIdForTour)
    }
  }, [isShowTour, showTour])

  if (!isLoadingComplete && render) {
    return <SkeletonCodePanel />
  }

  return (
    <CodePanelContextProvider
      lessonId={lessonIdFromRoute}
      studentCode=''
    >
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        />
        <title> CodePanel: CodeTribe </title>
      </Head>

      <FullScreenProvider>
        <LessonManagerProvider
          data={courseContent}
          isLoading={isLoadingCourseContent}
          lesson={lesson as (ILesson & BaseResponseInterface) | undefined}
          lessonContent={lessonContent}
        >
          {router.query.ai ? (
            <AIGeneratorTour withModals />
          ) : showTour || isShowTour ? (
            <CodePanelTour />
          ) : null}
          <Box
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? 'white' : theme.palette.background.neutral,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <CodePanelHeader language={DEFAULT_LANGUAGE} />
            <CodePanelBody
              lesson={lesson as (ILesson & BaseResponseInterface) | undefined}
              isLoadingLessonContent={isLoadingLessonContent || isFetchingLessonContent}
              lessonContents={lessonContent ?? []}
              language={DEFAULT_LANGUAGE}
              onSubmitChallenge={onSubmitChallenge}
              onSubmitLesson={onSubmitLesson}
            />
          </Box>
        </LessonManagerProvider>
      </FullScreenProvider>

      {!profile && <SignUpDialog />}

      {showConfetti && (
        <Confetti
          numberOfPieces={500}
          recycle={false}
          gravity={0.25}
          onConfettiComplete={onConfettiComplete}
        />
      )}
    </CodePanelContextProvider>
  )
}
