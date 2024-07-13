import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'

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
} from '@/redux/slices/code-panel-global'
import { type RootState, useSelector } from '@/redux/store'
import CodePanelBody from '@/sections/code-panel/components/body'
import SkeletonCodePanel, { CPTopBarSkeleton } from '@/sections/code-panel/components/skeleton'
import { getNextLessonId } from '@/sections/code-panel/lib/utils/navigation'
import type { BaseResponseInterface } from '@/utils'
import generateId from '@/utils/generate-id'
import { useTranslate } from '@/utils/translateHelper'
import { StreamRoomDetailsResponse } from '@root/src/layouts/dashboard/nav/LestCodeBtn'
import { setRoom } from '@root/src/redux/slices/code-editor-controller'

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
const LessonsManager = dynamic(
  async () => await import('@/sections/code-panel/components/lesson-manager')
)

const DEFAULT_LANGUAGE = 'html'
const ACCEPTABLE_COLLAB_DOWN_TIME = 5000

export default function CodePanelPage(): ReactElement | null {
  const socketHealthInterval = useRef<NodeJS.Timeout>()
  const translate = useTranslate()
  const router = useRouter()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const roomId = useSelector((state: RootState) => state.codeEditorController.room?.roomId)
  const socket = useSelector((state: any) => state.codePanelGlobal.socket)
  const { user, isInitialized: authIsInitialized } = useAuthContext()
  const lastCourseId = useSelector((state: RootState) => state.codePanelGlobal.courseId)
  const lastUnitId = useSelector((state: RootState) => state.codePanelGlobal.unitId)
  const lastLessonId = useSelector((state: RootState) => state.codePanelGlobal.lessonId)
  const isRealtimeCodeEnabled = useSelector((state) => state.codePanelGlobal.isRealtimeCodeEnabled)
  const [showTour, setShowTour] = useState(false)
  const [render, setRender] = useState(true)
  const isShowTour = useSelector((state) => state.tour.isStarted)

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
  } = useGetLessonContentStudentQuery({ id: lastLessonId as string }, { skip: !lastLessonId })

  const [completeLesson] = useCompleteLessonMutation()

  const isLoadingComplete = useMemo(
    () => !!lesson && !isLoadingLessonContent && !isLoadingLesson && !render,
    [lesson, isLoadingLessonContent, isLoadingLesson, render]
  )

  const onConfettiComplete = (confetti?: ConfettiType) => {
    setShowConfetti(false)
    confetti?.reset()
  }

  const saveLessonCodeHistory = useCallback(
    async (lesson_id: string, course_id: string, unit_id: string) => {
      try {
        fetch(`${process.env.NEXT_PUBLIC_CODE_STREAM_API}/stream_room/${router.query.id}/history`, {
          method: 'POST',
          body: JSON.stringify({
            unit_id,
            course_id,
            lesson_id,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    },
    [router.query.id]
  )

  const onChooseLesson = (lessonId: string, unitId: string) => {
    if (lastLessonId === lessonId) return

    fetch(
      `${process.env.NEXT_PUBLIC_CODE_STREAM_API}/stream-activity/lesson-history?stream_room_id=${
        roomId || router.query.id
      }&course_id=${lastCourseId}&unit_id=${unitId}&lesson_id=${lessonId}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(
          setStudentPosition({
            lessonId,
            slideIndex: data.slide_index,
            courseId: lastCourseId,
            unitId,
          })
        )
      })

    saveLessonCodeHistory(lessonId, lastCourseId!, unitId)

    try {
      socket?.emit(
        'stream-activity:set-stream-activity-by-room-id',
        roomId || router.query.id,
        JSON.stringify({
          unit_id: unitId,
          slide_index: 0,
          course_id: lastCourseId,
          lesson_id: lessonId,
          code: '',
        })
      )
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
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
          roomId || router.query.id,
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

        saveLessonCodeHistory(lastLessonId!, lastCourseId!, lastUnitId!)
      } else {
        enqueueSnackbar(translate('messages_course_complete'))
      }
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  useEffect(() => {
    if (!router.query.id && !roomId) return
    fetch(
      `${process.env.NEXT_PUBLIC_CODE_STREAM_API}/stream_room/${roomId || router.query.id}/details`,
      {
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .then((data: StreamRoomDetailsResponse) => {
        dispatch(
          setStudentPosition({
            lessonId: data.lesson_id,
            slideIndex: data.slide_index,
            courseId: data.course_id,
            unitId: data.unit_id,
          })
        )
      })
  }, [roomId, router.query.id])

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('HAS_SEEN_TOUR')
    if (!hasSeenTour) setShowTour(true)
    setTimeout(() => setRender(false))
  }, [isShowTour, showTour])

  useEffect(() => {
    if (socket && router.query.id) {
      dispatch(setRoom({ roomId: roomId || (router.query.id as string) }))

      return () => {
        socket.off('stream-activity:stream-activity-updated')
      }
    }
  }, [socket, roomId, router.query.id])

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

      socketHealthInterval.current = setInterval(() => {
        if (socket?.connected) return
        socket?.disconnect()
        socket?.connect()
      }, ACCEPTABLE_COLLAB_DOWN_TIME)
    } else {
      dispatch(setSocket(undefined))
    }

    return () => {
      clearInterval(socketHealthInterval.current as NodeJS.Timeout)
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
            lessonManagerComponent={
              <LessonsManager
                onChooseLesson={onChooseLesson}
                lesson={lesson as (ILesson & BaseResponseInterface) | undefined}
                data={courseContent}
                isLoading={isLoadingCourseContent}
              />
            }
            language={DEFAULT_LANGUAGE}
          />
          <CodePanelBody
            isFetchingLessonContent={isFetchingLessonContent}
            lesson={lesson as (ILesson & BaseResponseInterface) | undefined}
            lessonContents={lessonContent ?? []}
            user={user}
            language={DEFAULT_LANGUAGE}
            onSubmitChallenge={onSubmitChallenge}
            onSubmitLesson={onSubmitLesson}
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
