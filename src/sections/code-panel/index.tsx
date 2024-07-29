import { ReactElement, useEffect, useState } from 'react'

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
  useGetPublicLessonQuery,
  useGetPublicLessonContentQuery,
  useGetPublicCourseContentQuery,
} from '@/redux/services/public-student'
import {
  setCourseId,
  setLessonId,
  setSlideIndex,
  setSocket,
  setUnitId,
  setUsersStatus,
  setPrevLessonCode,
} from '@/redux/slices/code-panel-global'
import { type RootState, useSelector } from '@/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import CodePanelBody from '@/sections/code-panel/components/body'
import SkeletonCodePanel, { CPTopBarSkeleton } from '@/sections/code-panel/components/skeleton'
import { resetLessonEvent } from '@/sections/code-panel/lib/events'
import { getNextLessonId } from '@/sections/code-panel/lib/utils/navigation'
import { ILessonUserStatus } from '@/types'
import { type BaseResponseInterface } from '@/utils'
import generateId from '@/utils/generate-id'
import { useTranslate } from '@/utils/translateHelper'

const CodePanelChat = dynamic(async () => await import('../../components/chat/chat'), {
  ssr: false,
})

const CodePanelSignUpDialog = dynamic(
  async () => await import('@/sections/code-panel/components/sign-up-dialog'),
  {
    ssr: false,
  }
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

export default function CodePanelLayout(): ReactElement | null {
  const translate = useTranslate()
  const router = useRouter()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { user, isInitialized: authIsInitialized } = useAuthContext()
  const lastCourseId = useSelector((state: RootState) => state.codePanelGlobal.courseId)
  const lastUnitId = useSelector((state: RootState) => state.codePanelGlobal.unitId)
  const lastLessonId = useSelector((state: RootState) => state.codePanelGlobal.lessonId)
  const usersStatus = useSelector((state: RootState) => state.codePanelGlobal.usersStatus)
  const profile = useSelector((state) => state.global.user)
  const codeState = useSelector((state) => state.codePanelGlobal.code)
  const _setUsersStatus = (cb: (value: ILessonUserStatus[]) => ILessonUserStatus[]) => {
    dispatch(setUsersStatus(cb(usersStatus)))
  }

  const handle = useFullScreenHandle()

  const [showConfetti, setShowConfetti] = useState(false)

  const { data: studentCourseContent, isLoading: isLoadingStudentCourseContent } =
    useGetCourseContentQuery(
      { id: router.query.courseId as string },
      { skip: !router.query.courseId || !profile }
    )

  const { data: publicCourseContent, isLoading: isLoadingPublicCourseContent } =
    useGetPublicCourseContentQuery(
      { id: router.query.courseId as string },
      { skip: !router.query.courseId || !!profile }
    )

  const courseContent = profile ? studentCourseContent : publicCourseContent
  const isLoadingCourseContent = profile
    ? isLoadingStudentCourseContent
    : isLoadingPublicCourseContent

  const { data: studentLesson, isLoading: isLoadingStudentLesson } = useGetLessonStudentQuery(
    { id: router.query.lessonId as string },
    { skip: !router.query.lessonId || !profile }
  )

  const { data: publicLesson, isLoading: isPublicLessonLoading } = useGetPublicLessonQuery(
    { id: router.query.courseId as string, lesson_id: router.query.lessonId as string },
    { skip: !router.query.lessonId || !router.query.courseId || !!profile }
  )

  const lesson = studentLesson ?? publicLesson
  const isLoadingLesson = isLoadingStudentLesson ?? isPublicLessonLoading

  const {
    data: lessonStudentContent,
    isLoading: isLoadingLessonStudentContent,
    isFetching: isFetchingLessonStudentContent,
    fulfilledTimeStamp: fulfilledStudentTimeStamp,
  } = useGetLessonContentStudentQuery(
    { id: router.query.lessonId as string },
    { skip: !router.query.lessonId || !profile }
  )

  const {
    data: publicLessonContent,
    isLoading: isPublicLessonContentLoading,
    isFetching: isPublicFetchingLessonContent,
    fulfilledTimeStamp: fulfilledPublicTimeStamp,
  } = useGetPublicLessonContentQuery(
    { id: router.query.courseId as string, lesson_id: router.query.lessonId as string },
    { skip: !!profile || !router.query.courseId || !router.query.lessonId }
  )

  const lessonContent = profile
    ? lessonStudentContent
    : publicLessonContent?.length
      ? Array.from(publicLessonContent).sort((a, b) => {
          return a.meta.order > b.meta.order ? 1 : -1
        })
      : []

  const isLoadingLessonContent = profile
    ? isLoadingLessonStudentContent
    : isPublicLessonContentLoading
  const isFetchingLessonContent = profile
    ? isFetchingLessonStudentContent
    : isPublicFetchingLessonContent
  const fulfilledTimeStamp = profile ? fulfilledStudentTimeStamp : fulfilledPublicTimeStamp

  const { data: checkers } = useGetContentCheckersQuery(undefined, {
    skip: !fulfilledTimeStamp || !profile,
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
    if (router.query.lessonId === lessonId) return

    window.dispatchEvent(resetLessonEvent)
    onOpenLesson(lessonId, unitId)
  }

  useEffect(() => {
    if (!courseContent) return

    const courseId = router.query.courseId
    const unitId =
      router.query.unitId ??
      (router.query.courseId === lastCourseId && lastUnitId
        ? lastUnitId
        : courseContent.units[0].id)
    const lessonId =
      router.query.lessonId ??
      (unitId === lastUnitId && lastLessonId ? lastLessonId : courseContent.units[0].lessons[0].id)

    if (!courseId || !unitId || !lessonId) {
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
  }, [courseContent, router.query.courseId, router.query.unitId, router.query.lessonId])

  const onSubmitChallenge = async (lessonContentId: string, code?: string): Promise<void> => {
    if (!profile) {
      return
    }
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
    if (window.gtag) {
      window.gtag('event', 'Lesson_Completed', {
        event_category: `Course ${router.query.courseId} > Unit (Module) ${router.query.unit_id} > Training (Lesson) ${router.query.lessonId}`,
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
      dispatch(setPrevLessonCode(codeState))

      if (nextLessonInfo) {
        const pathStr = nextLessonInfo.path.split('/')
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

  const lessonIdFromRoute = router.query.lessonId
  const socket = useSelector((state) => state.codePanelGlobal.socket)
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
    if (lessonIdFromRoute && socket) {
      socket.emit(
        'joinLesson',
        JSON.stringify({ lesson: lessonIdFromRoute, user: user?.student_profile?.id })
      )

      return () => {
        socket?.emit(
          'leaveLesson',
          JSON.stringify({ lesson: lessonIdFromRoute, user: user?.student_profile?.id })
        )
      }
    }
  }, [lessonIdFromRoute, socket])

  useEffect(() => {
    let socket: Socket | undefined

    if (isRealtimeCodeEnabled && authIsInitialized) {
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

        socket.on('joinLesson', (data: { lesson: string; user: string }) => {
          const { user, lesson } = data
          _setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
            ..._usersStatus.filter((_status) => _status.id !== user),
            { id: user, status: 'idle', lessonId: lesson },
          ])
        })
        socket.on(
          'changeStatusInLesson',
          (data: { lesson: string; user: string; status: string }) => {
            const { status, user, lesson } = data
            _setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
              ..._usersStatus.filter((_status) => _status.id !== user),
              { id: user, status, lessonId: lesson },
            ])
          }
        )

        socket.on('lessonMembers', (data: { participants: LessonUserResponseType[] }) => {
          const { participants } = data
          _setUsersStatus((_usersStatus: ILessonUserStatus[]) => [..._usersStatus, ...participants])
        })
        socket.on('leaveLesson', (data: { lesson: string; user: string }) => {
          const { user, lesson } = data
          _setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
            ..._usersStatus.filter((_status) => _status.id !== user),
            { id: user, status: 'inactive', lessonId: lesson },
          ])
        })

        // socket.onAnyOutgoing((e) => {
        //   // eslint-disable-next-line no-console
        //   console.log('out:', e)
        // })
        //
        // socket.onAny((e) => {
        //   // eslint-disable-next-line no-console
        //   console.log('in:', e)
        // })

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
  }, [isRealtimeCodeEnabled, authIsInitialized, user, lessonIdFromRoute])

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
            language={DEFAULT_LANGUAGE}
            lessonManagerComponent={
              <LessonsManager
                onChooseLesson={onChooseLesson}
                lesson={lesson as (ILesson & BaseResponseInterface) | undefined}
                data={courseContent}
                isLoading={isLoadingCourseContent}
              />
            }
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
