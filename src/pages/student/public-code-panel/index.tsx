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
import { animals, colors, uniqueNamesGenerator } from 'unique-names-generator'

import type { ILesson } from '@/redux/interfaces/content.interface'
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
import type { BaseResponseInterface } from '@/utils'
import generateId from '@/utils/generate-id'
import { useTranslate } from '@/utils/translateHelper'
import GuestGuard from '@root/src/auth/GuestGuard'
import {
  useGetPublicCourseContentQuery,
  useGetPublicLessonContentQuery,
  useGetPublicLessonQuery,
} from '@root/src/redux/services/public-student'

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
  lessonId: string
}

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
  const translate = useTranslate()
  const { query, push, replace } = useRouter()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const [user, setUser] = useState<ILocalUser>()

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

  // const lastCourseId = useSelector((state: RootState) => state.codePanelGlobal.courseId)
  // const lastUnitId = useSelector((state: RootState) => state.codePanelGlobal.unitId)
  // const lastLessonId = useSelector((state: RootState) => state.codePanelGlobal.lessonId)
  const usersStatus = useSelector((state: RootState) => state.codePanelGlobal.usersStatus)
  const _setUsersStatus = (cb: (value: ILessonUserStatus[]) => ILessonUserStatus[]) => {
    dispatch(setUsersStatus(cb(usersStatus)))
  }

  const handle = useFullScreenHandle()

  const [showConfetti, setShowConfetti] = useState(false)

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

  // const [completeLesson] = useCompleteLessonMutation()

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

    // dispatch(setLessonId(lessonId as string))
    dispatch(setUnitId(unitId as string))
    dispatch(setCourseId(courseId as string))
  }, [courseContent, query.courseId, query.unitId, query.lessonId])

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

  const lessonIdFromRoute = query.lessonId
  const socket = useSelector((state) => state.codePanelGlobal.socket)
  const isRealtimeCodeEnabled = useSelector((state) => state.codePanelGlobal.isRealtimeCodeEnabled)
  const [showTour, setShowTour] = useState(false)
  const [render, setRender] = useState(true)
  const isLoadingComplete =
    !!lesson && !isLoadingCourseContent && !isLoading && query.courseId !== null && !render
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

    if (isRealtimeCodeEnabled && true) {
      socket = io(process.env.NEXT_PUBLIC_CODE_STREAM_API_HOST ?? '', {
        path: process.env.NEXT_PUBLIC_CODE_STREAM_API_PATH ?? undefined,
        auth: { userId: generateId(20) },
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
        // socket.on(
        //   'changeStatusInLesson',
        //   (data: { lesson: string; user: string; status: string }) => {
        //     const { status, user, lesson } = data
        //     _setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
        //       ..._usersStatus.filter((_status) => _status.id !== user),
        //       { id: user, status, lessonId: lesson },
        //     ])
        //   }
        // )

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
      // socket?.off('changeStatusInLesson')
      socket?.off('lessonMembers')

      socket?.disconnect()
      dispatch(setSocket(undefined))
    }
  }, [isRealtimeCodeEnabled, lessonIdFromRoute])

  if (!isLoadingComplete && render) {
    return <SkeletonCodePanel />
  }

  return (
    <GuestGuard>
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
          />
          <CodePanelBody
            isFetchingLessonContent={isLoading}
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
    </GuestGuard>
  )
}
