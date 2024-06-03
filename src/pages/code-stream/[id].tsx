import { ReactElement, useEffect, useLayoutEffect, useState } from 'react'

import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import type ConfettiType from 'react-confetti/dist/types/Confetti'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { useDispatch } from 'react-redux'
import { Socket, io } from 'socket.io-client'

import { useAuthContext } from '@/auth/useAuthContext'
import type { ILesson } from '@/redux/interfaces/content.interface'
import { useGetCourseContentQuery } from '@/redux/services/manager/challenges-student'
import {
  useGetContentCheckersQuery,
  useGetLessonContentStudentQuery,
  useGetLessonStudentQuery,
} from '@/redux/services/manager/lesson-student'
import { useCompleteLessonMutation } from '@/redux/services/manager/progress-student'
import {
  setLessonId,
  setSlideIndex,
  setSocket,
  setStudentPosition,
  setUnitId,
  setUsersStatus,
} from '@/redux/slices/code-panel-global'
import { type RootState, useSelector } from '@/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import CodePanelBody from '@/sections/code-panel/components/body'
import SkeletonCodePanel, { CPTopBarSkeleton } from '@/sections/code-panel/components/skeleton'
import { resetLessonEvent } from '@/sections/code-panel/lib/events'
import { getNextLessonId } from '@/sections/code-panel/lib/utils/navigation'
import { ILessonUserStatus } from '@/types'
import type { BaseResponseInterface } from '@/utils'
import generateId from '@/utils/generate-id'
import { useTranslate } from '@/utils/translateHelper'

const CodePanelChat = dynamic(async () => await import('../../components/chat/chat'), {
  ssr: false,
})
const CodePanelSignUpDialog = dynamic(
  async () => await import('@/sections/code-panel/components/sign-up-dialog'),
  { ssr: false }
)
const CodePanelTour = dynamic(async () => await import('@/sections/code-panel/components/tour'), {
  ssr: false,
})
const CodePanelHeader = dynamic(
  async () => await import('@/sections/code-panel/components/header'),
  {
    loading: () => <CPTopBarSkeleton />,
  }
)
const Confetti = dynamic(async () => await import('react-confetti'), { ssr: false })
const CodePanelFooter = dynamic(async () => await import('@/sections/code-panel/components/footer'))
const LessonsManager = dynamic(
  async () => await import('@/sections/code-panel/components/lesson-manager')
)

interface LessonUserResponseType {
  id: string
  status: string
  lessonId: string
}

const DEFAULT_LANGUAGE = 'html'

export default function CodePanelPage(): ReactElement | null {
  const translate = useTranslate()
  const router = useRouter()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const socket = useSelector((state) => state.codePanelGlobal.socket)
  const { user, isInitialized: authIsInitialized } = useAuthContext()
  const lastCourseId = useSelector((state: RootState) => state.codePanelGlobal.courseId)
  const lastUnitId = useSelector((state: RootState) => state.codePanelGlobal.unitId)
  const lastLessonId = useSelector((state: RootState) => state.codePanelGlobal.lessonId)
  const usersStatus = useSelector((state: RootState) => state.codePanelGlobal.usersStatus)
  // const _setUsersStatus = (cb: (value: ILessonUserStatus[]) => ILessonUserStatus[]) => {
  //   dispatch(setUsersStatus(cb(usersStatus)))
  // }

  const handle = useFullScreenHandle()

  const [showConfetti, setShowConfetti] = useState(false)

  const { data: courseContent, isLoading: isLoadingCourseContent } = useGetCourseContentQuery(
    { id: lastCourseId as string },
    { skip: !lastCourseId }
  )

  const { data: lesson, isLoading: isLoadingLesson } = useGetLessonStudentQuery(
    { id: lastLessonId as string },
    { skip: !lastLessonId }
  )

  const {
    data: lessonContent,
    isLoading: isLoadingLessonContent,
    isFetching: isFetchingLessonContent,
    fulfilledTimeStamp,
  } = useGetLessonContentStudentQuery({ id: lastLessonId as string }, { skip: !lastLessonId })

  const { data: checkers } = useGetContentCheckersQuery(undefined, {
    skip: !fulfilledTimeStamp,
  })

  const [completeLesson] = useCompleteLessonMutation()

  const onConfettiComplete = (confetti?: ConfettiType) => {
    setShowConfetti(false)
    confetti?.reset()
  }

  const onOpenLesson = (lessonId: string, unitId: string): void => {
    if (!router.query.courseId) return
    void router.push(
      STUDENT_PATH_DASHBOARD.codePanel.workSpace({
        courseId: router.query.courseId as string,
        unitId,
        lessonId,
      })
    )
  }

  const onChooseLesson = (lessonId: string, unitId: string) => {
    if (lastLessonId === lessonId) return

    dispatch(
      setStudentPosition({
        lessonId,
        slideIndex: 0,
        courseId: lastCourseId,
        unitId,
      })
    )
    socket?.emit(
      'stream-activity:set-stream-activity-by-room-id',
      router.query.id,
      JSON.stringify({
        unit_id: unitId,
        slide_index: 0,
        course_id: lastCourseId,
        lesson_id: lessonId,
        code: '',
      })
    )
    onOpenLesson(lessonId, unitId)
  }

  const onSubmitChallenge = async (lessonContentId: string, code?: string): Promise<void> => {
    try {
      await completeLesson({
        id: router.query.courseId as string,
        module_id: router.query.unit_id as string,
        lesson_content_id: lessonContentId,
        code,
      }).unwrap()
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  const onSubmitLesson = async (): Promise<void> => {
    setShowConfetti(true)
    try {
      enqueueSnackbar(translate('messages_lesson_complete'))
      if (!courseContent) return
      const nextLessonInfo = getNextLessonId(courseContent.units, lastLessonId!, lastUnitId!)

      if (nextLessonInfo) {
        socket?.emit(
          'stream-activity:set-stream-activity-by-room-id',
          router.query.id,
          JSON.stringify({
            unit_id: nextLessonInfo.unitId,
            slide_index: 0,
            course_id: lastCourseId,
            lesson_id: nextLessonInfo.lessonId,
          })
        )

        dispatch(setUnitId(nextLessonInfo.unitId))
        dispatch(setLessonId(nextLessonInfo.lessonId))
        dispatch(setSlideIndex(0))
      } else {
        enqueueSnackbar(translate('messages_course_complete'))
      }
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  const isRealtimeCodeEnabled = useSelector((state) => state.codePanelGlobal.isRealtimeCodeEnabled)
  const [showTour, setShowTour] = useState(false)
  const [render, setRender] = useState(true)
  const isLoadingComplete =
    !!lesson &&
    !isLoadingLessonContent &&
    !isLoadingLesson &&
    router.query.courseId !== null &&
    !render
  const isShowTour = useSelector((state) => state.tour.isStarted)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('HAS_SEEN_TOUR')
    if (!hasSeenTour) setShowTour(true)
    setTimeout(() => setRender(false))
  }, [isShowTour, showTour])

  useEffect(() => {
    if (socket && router.query.id) {
      socket.emit('stream-activity:get-stream-activity-by-room-id', router.query.id)

      socket.once('stream-activity:get-stream-activity-by-room-id-response', (body: string) => {
        const data = JSON.parse(body) as StreamActivity
        if (data) {
          dispatch(
            setStudentPosition({
              lessonId: data.lesson_id,
              slideIndex: data.slide_index,
              courseId: data.course_id,
              unitId: data.unit_id,
            })
          )
        } else {
          router.push(STUDENT_PATH_DASHBOARD.page404)
        }
      })

      socket.on('stream-activity:stream-activity-updated', (body: string) => {
        const data = JSON.parse(body) as StreamActivity
        dispatch(
          setStudentPosition({
            lessonId: data.lesson_id,
            slideIndex: data.slide_index,
            courseId: data.course_id,
            unitId: data.unit_id,
          })
        )
      })

      return () => {
        socket.off('stream-activity:get-stream-activity-by-room-id-response')
        socket.off('stream-activity:stream-activity-updated')
      }
    }
  }, [socket, router.query.id])

  useEffect(() => {
    let socket: Socket | undefined

    if (authIsInitialized) {
      socket = io(process.env.NEXT_PUBLIC_CODE_STREAM_API_HOST ?? '', {
        path: process.env.NEXT_PUBLIC_CODE_STREAM_API_PATH ?? undefined,
        auth: { userId: user?.id ?? generateId(20) },
      })

      socket.on('connect_error', (error) => {
        // eslint-disable-next-line no-console
        console.error('Connection error', error)
      })

      socket.on('connect', () => {
        // eslint-disable-next-line no-console
        console.log('Connected to socket server')

        if (!socket) return

        dispatch(setSocket(socket))
      })
    } else {
      dispatch(setSocket(undefined))
    }

    return () => {
      socket?.off('joinLesson')
      socket?.off('leaveLesson')
      socket?.off('changeStatusInLesson')
      socket?.off('lessonMembers')

      socket?.disconnect()
      dispatch(setSocket(undefined))
    }
  }, [isRealtimeCodeEnabled, authIsInitialized, user])

  if (!isLoadingComplete && render) {
    return <SkeletonCodePanel />
  }

  return (
    <>
      <Head>
        <title> CodePanel: CodeTribe </title>
      </Head>

      <FullScreen handle={handle}>
        {showTour || isShowTour ? <CodePanelTour /> : null}
        {!user && <CodePanelSignUpDialog />}
        <Box
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? 'white' : theme.palette.background.neutral,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <CodePanelHeader
            chatComponent={isRealtimeCodeEnabled ? <CodePanelChat /> : null}
            onHandleFullScreen={handle.active ? handle.exit : handle.enter}
            isFullScreenView={handle.active}
          />
          <CodePanelBody
            isFetchingLessonContent={isFetchingLessonContent}
            lesson={lesson as (ILesson & BaseResponseInterface) | undefined}
            lessonContents={lessonContent ?? []}
            user={user?.student_profile}
            language={DEFAULT_LANGUAGE}
            onSubmitChallenge={onSubmitChallenge}
            onSubmitLesson={onSubmitLesson}
          />
          <CodePanelFooter
            language={DEFAULT_LANGUAGE}
            sliderSteps={lessonContent?.length ?? 0}
            lessonManagerComponent={
              <LessonsManager
                onChooseLesson={onChooseLesson}
                lesson={lesson as (ILesson & BaseResponseInterface) | undefined}
                data={courseContent}
                isLoading={isLoadingCourseContent}
              />
            }
          />
        </Box>
      </FullScreen>

      {showConfetti && (
        <Confetti
          numberOfPieces={500}
          recycle={false}
          gravity={0.25}
          onConfettiComplete={onConfettiComplete}
        />
      )}
    </>
  )
}

export interface StreamActivity {
  unit_id: string
  slide_index: number
  course_id: string
  lesson_id: string
  code?: string
}
