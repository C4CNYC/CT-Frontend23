import { ReactElement, useEffect, useMemo, useState } from 'react'

import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import type ConfettiType from 'react-confetti/dist/types/Confetti'
import { useDispatch } from 'react-redux'
import { animals, colors, uniqueNamesGenerator } from 'unique-names-generator'

import type { ILesson } from '@/redux/interfaces/content.interface'
import {
  setCourseId,
  setLessonId,
  setSlideIndex,
  setUnitId,
} from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import CodePanelBody from '@/sections/code-panel/components/body'
import SkeletonCodePanel, { CPTopBarSkeleton } from '@/sections/code-panel/components/skeleton'
import { resetLessonEvent } from '@/sections/code-panel/lib/events'
import { getNextLessonId } from '@/sections/code-panel/lib/utils/navigation'
import type { BaseResponseInterface } from '@/utils'
import generateId from '@/utils/generate-id'
import { useTranslate } from '@/utils/translateHelper'
import GuestGuard from '@root/src/auth/GuestGuard'
import {
  useGetPublicCourseContentQuery,
  useGetPublicLessonContentQuery,
  useGetPublicLessonQuery,
} from '@root/src/redux/services/public-student'
import { FullScreenProvider } from '@root/src/sections/code-panel/lib/FullScreenContext'
import { LessonManagerProvider } from '@root/src/sections/code-panel/lib/LessonManagerContext'

const CodePanelChat = dynamic(async () => await import('../../../components/chat/CodePanelChat'), {
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

const CodePanelFooter = dynamic(async () => await import('@/sections/code-panel/components/footer'))

interface ILocalUser {
  id: string
  first_name: string
  student_profile: {
    id: string
    first_name: string
  }
}

const RANDOM_NAME = uniqueNamesGenerator({
  dictionaries: [colors, animals],
  separator: ' ',
  length: 2,
  style: 'capital',
})

const DEFAULT_LANGUAGE = 'html'

export default function CodePanelPage(): ReactElement | null {
  const dispatch = useDispatch()
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()
  const { query, push, replace } = useRouter()

  const [render, setRender] = useState(true)
  const [user, setUser] = useState<ILocalUser>()
  const [showTour, setShowTour] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const isShowTour = useSelector((state) => state.tour.isStarted)

  const { data: courseContent, isLoading: isLoadingCourseContent } = useGetPublicCourseContentQuery(
    { id: query.courseId as string },
    { skip: !query.courseId }
  )

  const { data, isLoading } = useGetPublicLessonContentQuery({
    id: query.courseId as string,
    lesson_id: query.lessonId as string,
  })

  const { data: lesson } = useGetPublicLessonQuery({
    id: query.courseId as string,
    lesson_id: query.lessonId as string,
  })

  const isLoadingComplete = useMemo(
    () => !!lesson && !isLoadingCourseContent && !isLoading && query.courseId !== null && render,
    [lesson, isLoadingCourseContent, isLoading, query.courseId, render]
  )

  const onConfettiComplete = (confetti?: ConfettiType) => {
    setShowConfetti(false)
    confetti?.reset()
  }

  const onOpenLesson = (lessonId: string, unitId: string): void => {
    if (!query.courseId) return
    void push(
      STUDENT_PATH_DASHBOARD.publicCodePanel.workSpace({
        courseId: query.courseId as string,
        unitId,
        lessonId,
      })
    )
  }

  const onChooseLesson = (lessonId: string, unitId: string) => {
    if (query.lessonId === lessonId) return

    window.dispatchEvent(resetLessonEvent)
    onOpenLesson(lessonId, unitId)
  }

  const onSubmitChallenge = async (lessonContentId: string, code?: string): Promise<void> => {
    // try {
    //   await completeLesson({
    //     id: query.courseId as string,
    //     module_id: query.unit_id as string,
    //     lesson_content_id: lessonContentId,
    //     code,
    //   }).unwrap()
    // } catch (e: any) {
    //   enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    // }
  }

  const onSubmitLesson = async (): Promise<void> => {
    setShowConfetti(true)
    try {
      enqueueSnackbar(translate('messages_lesson_complete'))
      if (!courseContent) return
      const nextLessonInfo = getNextLessonId(
        courseContent.units,
        query.lessonId as string,
        query.unitId as string
      )

      if (nextLessonInfo) {
        const pathStr = nextLessonInfo.path.split('/')
        push(
          STUDENT_PATH_DASHBOARD.codePanel.workSpace({
            courseId: courseContent.id,
            unitId: pathStr[0],
            lessonId: pathStr[1],
          })
        ).then(() => {
          dispatch(setSlideIndex(0))
          setTimeout(() => {
            dispatch(setUnitId(pathStr[0]))
            dispatch(setLessonId(pathStr[1]))
          }, 100)
        })
      } else {
        enqueueSnackbar(translate('messages_course_complete'))
      }
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  useEffect(() => {
    if (!courseContent) return

    const courseId = query.courseId
    const unitId = query.unitId ?? courseContent.units[0].id
    const lessonId = query.lessonId ?? courseContent.units[0].lessons[0].id

    setUnitId(courseContent.units[0].id)
    setLessonId(courseContent.units[0].lessons[0].id)

    if (!courseId || !unitId || !lessonId) {
      void replace(STUDENT_PATH_DASHBOARD.page404)
      return
    }

    if (!query.unitId || !query.lessonId) {
      void replace(
        STUDENT_PATH_DASHBOARD.publicCodePanel.workSpace({
          courseId: courseId as string,
          unitId: unitId as string,
          lessonId: lessonId as string,
        })
      )
      return
    }

    dispatch(setUnitId(unitId as string))
    dispatch(setCourseId(courseId as string))
  }, [courseContent, query.courseId, query.unitId, query.lessonId])

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('HAS_SEEN_TOUR')
    if (!hasSeenTour) setShowTour(true)
    setTimeout(() => setRender(false))
  }, [isShowTour, showTour])

  useEffect(() => {
    const user = localStorage.getItem('user')

    if (user) {
      setUser(JSON.parse(user))
    } else {
      const newUser = {
        id: generateId(20),
        first_name: RANDOM_NAME,
        student_profile: {
          id: generateId(20),
          first_name: RANDOM_NAME,
        },
      }
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
    }
  }, [])

  if (!isLoadingComplete) {
    return <SkeletonCodePanel />
  }

  return (
    <GuestGuard>
      <Head>
        <title> CodePanel: CodeTribe </title>
      </Head>

      <FullScreenProvider>
        <LessonManagerProvider
          data={courseContent}
          isLoading={isLoadingCourseContent}
          lesson={lesson as (ILesson & BaseResponseInterface) | undefined}
        >
          {showTour || isShowTour ? <CodePanelTour /> : null}
          <Box
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? 'white' : theme.palette.background.neutral,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <CodePanelHeader
              chatComponent={<CodePanelChat />}
              language={DEFAULT_LANGUAGE}
            />
            <CodePanelBody
              isLoadingLessonContent={isLoading}
              lesson={lesson as (ILesson & BaseResponseInterface) | undefined}
              lessonContents={data ?? []}
              user={user?.student_profile as ILocalUser}
              language={DEFAULT_LANGUAGE}
              onSubmitChallenge={onSubmitChallenge}
              onSubmitLesson={onSubmitLesson}
            />
            <CodePanelFooter
              language={DEFAULT_LANGUAGE}
              sliderSteps={data?.length ?? 0}
            />
          </Box>
        </LessonManagerProvider>
      </FullScreenProvider>

      {showConfetti && (
        <Confetti
          numberOfPieces={500}
          recycle={false}
          gravity={0.25}
          onConfettiComplete={onConfettiComplete}
        />
      )}
    </GuestGuard>
  )
}
