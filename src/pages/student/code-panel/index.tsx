import { ReactElement, useEffect, useMemo, useState } from 'react'

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
import { useGetCourseContentQuery } from '@/redux/services/manager/challenges-student'
import {
  useGetLessonContentStudentQuery,
  useGetLessonStudentQuery,
} from '@/redux/services/manager/lesson-student'
import { useGetModuleWithLessonsQuery } from '@/redux/services/manager/modules-student'
import { useCompleteLessonMutation } from '@/redux/services/manager/progress-student'
import {
  setCourseId,
  setLessonId,
  setSlideIndex,
  setSocket,
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
import generateId from '@/utils/generate-id'
import { useTranslate } from '@/utils/translateHelper'

const CodePanelChat = dynamic(async () => await import('../../../components/chat/chat'), {
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
}

const DEFAULT_LANGUAGE = 'html'

export default function CodePanelPage(): ReactElement | null {
  const translate = useTranslate()
  const router = useRouter()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { user, isInitialized: authIsInitialized } = useAuthContext()
  const lastUnitId = useSelector((state: RootState) => state.codePanelGlobal.unitId)
  const lastLessonId = useSelector((state: RootState) => state.codePanelGlobal.lessonId)
  const usersStatus = useSelector((state: RootState) => state.codePanelGlobal.usersStatus)
  const _setUsersStatus = (cb: (value: ILessonUserStatus[]) => ILessonUserStatus[]) => {
    dispatch(setUsersStatus(cb(usersStatus)))
  }

  const handle = useFullScreenHandle()

  const [showConfetti, setShowConfetti] = useState(false)

  const { data: courseContent, isLoading: isLoadingCourseContent } = useGetCourseContentQuery(
    { id: router.query.courseId as string },
    { skip: !router.query.courseId }
  )

  const { data: courseUnit } = useGetModuleWithLessonsQuery(
    { id: router.query.unitId as string },
    { skip: !router.query.unitId }
  )

  const { data: lesson, isLoading: isLoadingLesson } = useGetLessonStudentQuery(
    { id: router.query.lessonId as string },
    { skip: !router.query.lessonId }
  )

  const {
    data: lessonContent,
    isLoading: isLoadingLessonContent,
    isFetching: isFetchingLessonContent,
  } = useGetLessonContentStudentQuery(
    { id: router.query.lessonId as string },
    { skip: !router.query.lessonId }
  )

  // const [lastVisitedData, setLastVisitedData] = useState<LastVisitedState>({
  //   unitId: null,
  //   lessonId: null,
  // })

  const [completeLesson] = useCompleteLessonMutation()
  // const [updateLastVisitedDataTrigger] = useUpdateStudentLastVisitedDataMutation()

  const lastLessonCode = useMemo(
    () =>
      courseUnit?.lessons
        .slice(
          0,
          courseUnit?.lessons.findIndex((lesson) => lesson.id === router.query.lessonId) + 1
        )
        .reverse()
        ?.find((lesson) =>
          lesson.contents?.find((content) =>
            content.progress?.find((progress) => progress.progress_meta?.body.length > 0)
          )
        )
        ?.contents.find((content) =>
          content.progress?.find((progress) => progress.progress_meta?.body.length > 0)
        )
        ?.progress?.find((progress) => progress.progress_meta?.body.length > 0)?.progress_meta.body,
    [courseUnit, router.query.lessonId]
  )

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

  // const updateLastVisitedData = async () => {
  //   if (isValidLastVisitedData(lastVisitedData)) {
  //     await updateLastVisitedDataTrigger(lastVisitedData).unwrap()
  //   }
  // }

  const onChooseLesson = (lessonId: string, unitId: string) => {
    if (router.query.lessonId === lessonId) return

    window.dispatchEvent(resetLessonEvent)
    onOpenLesson(lessonId, unitId)
  }

  useEffect(() => {
    if (!courseContent) return

    const courseId = router.query.courseId
    const unitId = router.query.unitId ?? lastUnitId ?? courseContent.units[0].id
    const lessonId = router.query.lessonId ?? lastLessonId ?? courseContent.units[0].lessons[0].id

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
      const nextLessonInfo = getNextLessonId(
        courseContent.units,
        router.query.lessonId as string,
        router.query.unitId as string
      )

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

  // useEffect(() => {
  //   setLastVisitedData({
  //     unitId,
  //     lessonId,
  //   })
  // }, [unitId, lessonId])
  //
  // useEffect(() => {
  //   return () => {
  //     updateLastVisitedData()
  //   }
  // }, [lastVisitedData])

  const isLoadingComplete =
    !!lesson &&
    !isLoadingLessonContent &&
    !isLoadingCourseContent &&
    !isLoadingLesson &&
    router.query.courseId !== null

  const lessonId = router.query.lessonId
  const socket = useSelector((state) => state.codePanelGlobal.socket)
  const isRealtimeCodeEnabled = useSelector((state) => state.codePanelGlobal.isRealtimeCodeEnabled)
  const [showTour, setShowTour] = useState(false)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('HAS_SEEN_TOUR')
    if (!hasSeenTour) setShowTour(true)
  }, [])

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
        console.log('Connected to socket server', lessonId)

        dispatch(setSocket(socket))
      })
    } else {
      dispatch(setSocket(undefined))
    }

    return () => {
      socket?.off('joinLesson')
      socket?.off('leaveLesson')
      // unsubscribeSocket(socket);
      socket?.disconnect()
    }
  }, [isRealtimeCodeEnabled, authIsInitialized, user])

  useEffect(() => {
    if (lessonId && socket) {
      socket.emit(
        'joinLesson',
        JSON.stringify({ lesson: lessonId, user: user?.student_profile?.id })
      )

      socket.on('joinLesson_', (data: { lesson: string; user: string }) => {
        const { user } = data
        _setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
          ..._usersStatus.filter((_status) => _status.id !== user),
          { id: user, status: 'idle' },
        ])
      })
      socket.on('changeStatusInLesson_', (data: { user: string; status: string }) => {
        const { status, user } = data
        _setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
          ..._usersStatus.filter((_status) => _status.id !== user),
          { id: user, status },
        ])
      })

      socket.on('lessonMembers', (data: { participants: LessonUserResponseType[] }) => {
        const { participants } = data
        _setUsersStatus((_usersStatus: ILessonUserStatus[]) => [..._usersStatus, ...participants])
      })
      socket.on('leaveLesson_', (data: { lesson: string; user: string }) => {
        const { user } = data
        _setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
          ..._usersStatus.filter((_status) => _status.id !== user),
          { id: user, status: 'inactive' },
        ])
      })

      socket.onAnyOutgoing((e) => {
        // eslint-disable-next-line no-console
        console.log('out:', e)
      })

      socket.onAny((e) => {
        // eslint-disable-next-line no-console
        console.log('in:', e)
      })
      return () => {
        socket?.off('joinLesson_')
        socket?.off('changeStatusInLesson_')
        socket?.off('lessonMembers')
        // socket.off('leaveLesson_')
        socket?.emit(
          'leaveLesson',
          JSON.stringify({ lesson: lessonId, user: user?.student_profile?.id })
        )
      }
    }
  }, [lessonId, socket])

  if (!isLoadingComplete) {
    return <SkeletonCodePanel />
  }

  return (
    <>
      <Head>
        <title> CodePanel: CodeTribe </title>
      </Head>

      <FullScreen handle={handle}>
        {showTour && <CodePanelTour />}
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
            lesson={lesson}
            lessonContents={lessonContent ?? []}
            user={user?.student_profile}
            language={DEFAULT_LANGUAGE}
            onSubmitChallenge={onSubmitChallenge}
            onSubmitLesson={onSubmitLesson}
            lastLessonCode={lastLessonCode}
          />
          <CodePanelFooter
            language={DEFAULT_LANGUAGE}
            sliderSteps={lessonContent?.length ?? 0}
            lessonManagerComponent={
              <LessonsManager
                onChooseLesson={onChooseLesson}
                lesson={lesson}
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
