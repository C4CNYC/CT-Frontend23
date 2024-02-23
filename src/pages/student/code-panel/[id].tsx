import { ReactElement, useEffect, useState } from 'react'

import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FullScreen } from 'react-full-screen'
import { Socket, io } from 'socket.io-client'

import { useAuthContext } from '@/auth/useAuthContext'
import { LessonUserContext } from '@/context/lesson-context'
import { SocketContext } from '@/context/socket-context'
import { useSelector } from '@/redux/store'
import CodePanelBody from '@/sections/code-panel/components/body'
import SkeletonCodePanel, { CPTopBarSkeleton } from '@/sections/code-panel/components/skeleton'
import { useCodePanel } from '@/sections/code-panel/lib/hooks/useCodePanel'
import { ILessonUserStatus } from '@/types'
import generateId from '@/utils/generate-id'

const CodePanelChat = dynamic(async () => await import('../../../components/chat/chat'))

const CodePanelSignUpDialog = dynamic(
  async () => await import('@/sections/code-panel/components/sign-up-dialog'),
  {
    ssr: false,
  }
)

// const CodePanelBody = dynamic(async () => await import('@/sections/code-panel/components/body'), {
//   ssr: false,
// })

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

// const ChatPopup = dynamic(
//   async () => await import('@/sections/code-editor-panel/top-bar/nav-bar/options/chat-popup')
// )

const CodePanelFooter = dynamic(async () => await import('@/sections/code-panel/components/footer'))

const LessonsManager = dynamic(
  async () => await import('@/sections/code-panel/components/lesson-manager')
)

interface LessonUserResponseType {
  id: string
  status: string
}

export default function CodePanelPage(): ReactElement | null {
  const {
    handle,
    isLoadingComplete,
    showConfetti,
    onConfettiComplete,
    workSpaceProps,
    bottomBarProps,
    lessonManagerProps,
  } = useCodePanel()

  const theme = useTheme()
  const { user } = useAuthContext()
  const [usersStatus, setUsersStatus] = useState<ILessonUserStatus[]>([])

  const router = useRouter()
  const lessonId = router.query.lessonId
  const [socket, setSocket] = useState<Socket>()
  const isRealtimeCodeEnabled = useSelector((state) => state.codePanelGlobal.isRealtimeCodeEnabled)
  const [showTour, setShowTour] = useState(false)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('HAS_SEEN_TOUR')
    if (!hasSeenTour) setShowTour(true)
  }, [])

  useEffect(() => {
    let socket: Socket | undefined

    if (isRealtimeCodeEnabled) {
      socket = io(process.env.NEXT_PUBLIC_CODE_STREAM_API_HOST ?? '', {
        path: process.env.NEXT_PUBLIC_CODE_STREAM_API_PATH ?? undefined,
        auth: user ? { userId: user?.id || generateId(20) } : {},
      })
      socket.on('connect_error', (error) => {
        // eslint-disable-next-line no-console
        console.error('Connection error', error)
      })

      socket.on('connect', () => {
        // eslint-disable-next-line no-console
        console.log('Connected to socket server', lessonId)

        setSocket(socket)

        if (lessonId) {
          // eslint-disable-next-line no-console
          console.log('joinNewLesson', JSON.stringify({ lesson: lessonId, userId: user?.id }))

          socket?.emit('joinLesson', JSON.stringify({ lesson: lessonId }))
        }
      })
    } else {
      setSocket(undefined)
    }

    return () => {
      socket?.off('joinLesson')
      socket?.off('leaveLesson')
      // unsubscribeSocket(socket);
      socket?.disconnect()
    }
  }, [isRealtimeCodeEnabled])

  useEffect(() => {
    if (router.query.lessonId && socket) {
      socket.emit(
        'joinLesson',
        JSON.stringify({ lesson: router.query.lessonId, user: user?.student_profile?.id })
      )

      socket.on('joinLesson_', (data: { lesson: string; user: string }) => {
        const { user } = data
        setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
          ..._usersStatus.filter((_status) => _status.id !== user),
          { id: user, status: 'idle' },
        ])
      })
      socket.on('changeStatusInLesson_', (data: { user: string; status: string }) => {
        const { status, user } = data
        setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
          ..._usersStatus.filter((_status) => _status.id !== user),
          { id: user, status },
        ])
      })

      socket.on('lessonMembers', (data: { participants: LessonUserResponseType[] }) => {
        const { participants } = data
        setUsersStatus((_usersStatus: ILessonUserStatus[]) => [..._usersStatus, ...participants])
      })
      socket.on('leaveLesson_', (data: { lesson: string; user: string }) => {
        const { user } = data
        setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
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
          JSON.stringify({ lesson: router.query.lessonId, user: user?.student_profile?.id })
        )
      }
    }
  }, [router.query.lessonId, socket])

  if (!isLoadingComplete) {
    return <SkeletonCodePanel />
  }

  return (
    <SocketContext.Provider value={socket}>
      <LessonUserContext.Provider value={usersStatus}>
        <Box>
          <Head>
            <title> CodePanel: CodeTribe </title>
          </Head>

          <FullScreen handle={handle}>
            {showTour && <CodePanelTour />}

            {!workSpaceProps.user && <CodePanelSignUpDialog />}

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
                onHanldeFullScreen={handle.active ? handle.exit : handle.enter}
                isFullScreenView={handle.active}
              />

              <CodePanelBody {...workSpaceProps} />

              <CodePanelFooter
                {...bottomBarProps}
                lessonManagerComponent={<LessonsManager {...lessonManagerProps} />}
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
        </Box>
      </LessonUserContext.Provider>
    </SocketContext.Provider>
  )
}
