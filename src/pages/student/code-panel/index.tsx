import { ReactElement, useEffect, useMemo, useState } from 'react'

import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { useDispatch } from 'react-redux'
import { Socket } from 'socket.io-client'

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
  setUsersStatus as setGlobalUsersStatus,
} from '@/redux/slices/code-panel-global'
import { type RootState, useSelector } from '@/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import CodePanelBody from '@/sections/code-panel/body'
import Confetti from '@/sections/code-panel/confetti'
import { resetLessonEvent } from '@/sections/code-panel/lib/events'
import { getNextLessonId } from '@/sections/code-panel/lib/utils/navigation'
import { createSocket } from '@/sections/code-panel/lib/utils/socket'
import SkeletonCodePanel, { CPTopBarSkeleton } from '@/sections/code-panel/skeleton'
import { ILessonUserStatus } from '@/types'
import generateId from '@/utils/generate-id'
import { useTranslate } from '@/utils/translateHelper'

const CodePanelChat = dynamic(async () => await import('../../../components/chat/chat'), {
  ssr: false,
})

const CodePanelSignUpDialog = dynamic(
  async () => await import('@/sections/code-panel/sign-up-dialog'),
  {
    ssr: false,
  }
)

const CodePanelTour = dynamic(async () => await import('@/sections/code-panel/tour'), {
  ssr: false,
})

const CodePanelHeader = dynamic(async () => await import('@/sections/code-panel/header'), {
  loading: () => <CPTopBarSkeleton />,
})

const CodePanelFooter = dynamic(async () => await import('@/sections/code-panel/footer'))

const LessonsManager = dynamic(async () => await import('@/sections/code-panel/lesson-manager'))

interface LessonUserResponseType {
  id: string
  status: string
  lessonId: string
}

export default function CodePanelPage(): ReactElement | null {
  const translate = useTranslate()
  const router = useRouter()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { user, isInitialized: authIsInitialized } = useAuthContext()
  const lastCourseId = useSelector((state: RootState) => state.codePanelGlobal.courseId)
  const courseIdFromRoute = router.query.courseId as string
  const lastUnitId = useSelector((state: RootState) => state.codePanelGlobal.unitId)
  const unitIdFromRoute = router.query.unitId as string
  const lastLessonId = useSelector((state: RootState) => state.codePanelGlobal.lessonId)
  const lessonIdFromRoute = router.query.lessonId as string
  const usersStatus = useSelector((state: RootState) => state.codePanelGlobal.usersStatus)
  const setUsersStatus = (cb: (value: ILessonUserStatus[]) => ILessonUserStatus[]) => {
    dispatch(setGlobalUsersStatus(cb(usersStatus)))
  }

  const handle = useFullScreenHandle()

  const [completedLessonId, setCompletedLessonId] = useState<string | undefined>()

  const { data: courseContent, isLoading: isLoadingCourseContent } = useGetCourseContentQuery(
    { id: courseIdFromRoute },
    { skip: !courseIdFromRoute }
  )

  const { data: courseUnit } = useGetModuleWithLessonsQuery(
    { id: unitIdFromRoute },
    { skip: !unitIdFromRoute }
  )

  const { data: lesson, isLoading: isLoadingLesson } = useGetLessonStudentQuery(
    { id: lessonIdFromRoute },
    { skip: !lessonIdFromRoute }
  )

  const {
    data: lessonContent,
    isLoading: isLoadingLessonContent,
    isFetching: isFetchingLessonContent,
  } = useGetLessonContentStudentQuery({ id: lessonIdFromRoute }, { skip: !lessonIdFromRoute })

  // const [lastVisitedData, setLastVisitedData] = useState<LastVisitedState>({
  //   unitId: null,
  //   lessonId: null,
  // })

  const [completeLesson] = useCompleteLessonMutation()
  // const [updateLastVisitedDataTrigger] = useUpdateStudentLastVisitedDataMutation()

  const lastLessonCode = useMemo(
    () =>
      courseUnit?.lessons
        .slice(0, courseUnit?.lessons.findIndex((lesson) => lesson.id === lessonIdFromRoute) + 1)
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
    [courseUnit, lessonIdFromRoute]
  )

  // const updateLastVisitedData = async () => {
  //   if (isValidLastVisitedData(lastVisitedData)) {
  //     await updateLastVisitedDataTrigger(lastVisitedData).unwrap()
  //   }
  // }

  const onLessonSelected = (lessonId: string, unitId: string) => {
    if (lessonIdFromRoute === lessonId) return

    window.dispatchEvent(resetLessonEvent)

    void router.push(
      STUDENT_PATH_DASHBOARD.codePanel.workSpace({
        courseId: courseIdFromRoute,
        unitId,
        lessonId,
      })
    )
  }

  useEffect(() => {
    if (!courseContent) return

    const courseId = courseIdFromRoute
    const unitId =
      unitIdFromRoute ??
      (courseIdFromRoute === lastCourseId && lastUnitId ? lastUnitId : courseContent.units[0].id)
    const lessonId =
      lessonIdFromRoute ??
      (unitId === lastUnitId && lastLessonId ? lastLessonId : courseContent.units[0].lessons[0].id)

    if (!courseId || !unitId || !lessonId) {
      void router.replace(STUDENT_PATH_DASHBOARD.page404)
      return
    }

    if (!unitIdFromRoute || !lessonIdFromRoute) {
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
  }, [courseContent, courseIdFromRoute, unitIdFromRoute, lessonIdFromRoute])

  const onSubmitChallenge = async (lessonContentId: string, code?: string): Promise<void> => {
    try {
      await completeLesson({
        id: courseIdFromRoute,
        module_id: unitIdFromRoute,
        lesson_content_id: lessonContentId,
        code,
      }).unwrap()
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  const onSubmitLesson = async (): Promise<void> => {
    setCompletedLessonId(lessonIdFromRoute)
    enqueueSnackbar(translate('messages_lesson_complete'))
    try {
      if (!courseContent) return
      const nextLessonInfo = getNextLessonId(
        courseContent.units,
        lessonIdFromRoute,
        unitIdFromRoute
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

  const socket = useSelector((state) => state.codePanelGlobal.socket)
  const isRealtimeCodeEnabled = useSelector((state) => state.codePanelGlobal.isRealtimeCodeEnabled)
  const [showTour, setShowTour] = useState(false)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('HAS_SEEN_TOUR')
    if (!hasSeenTour) setShowTour(true)
  }, [])

  useEffect(() => {
    if (lessonIdFromRoute && socket) {
      socket.emit('joinLesson', JSON.stringify({ lesson: lessonIdFromRoute, user: user?.id }))

      return () => {
        socket?.emit('leaveLesson', JSON.stringify({ lesson: lessonIdFromRoute, user: user?.id }))
      }
    }
  }, [lessonIdFromRoute, socket])

  useEffect(() => {
    if (isRealtimeCodeEnabled && authIsInitialized) {
      createSocket({
        userId: user?.id ?? generateId(20),
        onConnect: (s: Socket) => {
          if (!s) return

          s.on('joinLesson', (data: { lesson: string; user: string }) => {
            const { user, lesson } = data
            setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
              ..._usersStatus.filter((_status) => _status.id !== user),
              { id: user, status: 'idle', lessonId: lesson },
            ])
          })
          s.on('changeStatusInLesson', (data: { lesson: string; user: string; status: string }) => {
            const { status, user, lesson } = data
            setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
              ..._usersStatus.filter((_status) => _status.id !== user),
              { id: user, status, lessonId: lesson },
            ])
          })

          s.on('lessonMembers', (data: { participants: LessonUserResponseType[] }) => {
            const { participants } = data
            setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
              ..._usersStatus,
              ...participants,
            ])
          })
          s.on('leaveLesson', (data: { lesson: string; user: string }) => {
            const { user, lesson } = data
            setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
              ..._usersStatus.filter((_status) => _status.id !== user),
              { id: user, status: 'inactive', lessonId: lesson },
            ])
          })

          dispatch(setSocket(s))
        },
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

  const isLoadingComplete =
    !!lesson && !isLoadingLessonContent && !isLoadingCourseContent && !isLoadingLesson

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
          position='relative'
          overflow='hidden'
        >
          <CodePanelHeader
            chatComponent={isRealtimeCodeEnabled ? <CodePanelChat /> : null}
            onHandleFullScreen={handle.active ? handle.exit : handle.enter}
            isFullScreenView={handle.active}
          />
          <CodePanelBody
            isFetchingLessonContent={isFetchingLessonContent}
            lesson={lesson}
            lessonContent={lessonContent ?? []}
            user={user}
            onSubmitChallenge={onSubmitChallenge}
            onSubmitLesson={onSubmitLesson}
            lastLessonCode={lastLessonCode}
          />
          <CodePanelFooter
            sliderSteps={lessonContent?.length ?? 0}
            lessonManagerComponent={
              <LessonsManager
                onLessonSelected={onLessonSelected}
                lesson={lesson}
                data={courseContent}
                isLoading={isLoadingCourseContent}
              />
            }
          />
        </Box>
      </FullScreen>
      <Confetti completedLessonId={completedLessonId} />
    </>
  )
}
