import { ReactElement, useEffect, useMemo, useState } from "react"

import { Box } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { type Theme } from "@mui/system"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useRouter } from "next/router"
import { FullScreen } from "react-full-screen"
import { Socket, io } from "socket.io-client"

import SkeletonCodePanel, { CPTopBarSkeleton } from "@sections/code-editor-panel/skeleton"
import { useCodePanel } from "src/lib/hooks/useCodePanel"
import { ILessonUserStatus } from "src/types"

import { useAuthContext } from "../../../auth/useAuthContext"
import { LessonUserContext } from "../../../context/lesson-context"
import { SocketContext } from "../../../context/socket-context"
import generateId from "../../../lib/utils/generate-id"
import { useSelector } from "../../../redux/store"

import SignUpDialog from "./sign-up-dialog"

interface LessonUserResponseType {
  id: string
  status: string
}

const WorkSpace = dynamic(async () => await import("@sections/code-editor-panel/work-space"), { ssr: false })

const Tour = dynamic(async () => await import("@sections/code-editor-panel/code-panel-tour"), { ssr: false })

const TopPanel = dynamic(async () => await import("@sections/code-editor-panel/top-bar"), {
  loading: () => <CPTopBarSkeleton />,
})

const Confetti = dynamic(async () => await import("react-confetti"), { ssr: false })

const ChatPopup = dynamic(async () => await import("@sections/code-editor-panel/top-bar/nav-bar/options/chat-popup"))

const BottomBar = dynamic(async () => await import("@sections/code-editor-panel/bottom-bar"))

const LessonsManager = dynamic(async () => await import("@sections/code-editor-panel/bottom-bar/lesson-manager"))

const CONFETTI_GRAVITY = 0.25
const MAX_NUMBER_OF_PIECES = 500
const MIN_NUMBER_OF_PIECES = 0
const getBoxProps = (theme: Theme) => ({
  bgcolor: theme.palette.mode === "light" ? "white" : theme.palette.background.neutral,
  position: "relative",
  overflow: "hidden",
})

export default function CodePanelPage(): ReactElement | null {
  const {
    handle,
    isLoadingComplete,
    confetti,
    onConfettiComplete,
    workSpaceProps,
    bottomBarProps,
    isDesktop,
    lessonManagerProps,
  } = useCodePanel()

  const theme = useTheme()
  const boxProps = useMemo(() => getBoxProps(theme), [theme])
  const { user } = useAuthContext()
  const [usersStatus, setUsersStatus] = useState<ILessonUserStatus[]>([])

  const router = useRouter()
  const lessonId = router.query.lessonId
  const [socket, setSocket] = useState<Socket>()
  const isRealtimeCodeEnabled = useSelector((state) => state.codePanelGlobal.isRealtimeCodeEnabled)

  useEffect(() => {
    let socket: Socket | undefined

    if (isRealtimeCodeEnabled) {
      socket = io(process.env.NEXT_PUBLIC_CODE_STREAM_API_HOST ?? "", {
        path: process.env.NEXT_PUBLIC_CODE_STREAM_API_PATH ?? undefined,
        auth: user ? { userId: user?.id || generateId(20) } : {},
      })
      socket.on("connect_error", (error) => {
        // eslint-disable-next-line no-console
        console.error("Connection error", error)
      })

      socket.on("connect", () => {
        // eslint-disable-next-line no-console
        console.log("Connected to socket server", lessonId)

        setSocket(socket)

        if (lessonId) {
          // eslint-disable-next-line no-console
          console.log("joinNewLesson", JSON.stringify({ lesson: lessonId, userId: user?.id }))

          socket?.emit("joinLesson", JSON.stringify({ lesson: lessonId }))
        }
      })
    } else {
      setSocket(undefined)
    }

    return () => {
      socket?.off("joinLesson")
      socket?.off("leaveLesson")
      // unsubscribeSocket(socket);
      socket?.disconnect()
    }
  }, [isRealtimeCodeEnabled])

  useEffect(() => {
    if (router.query.lessonId && socket) {
      socket.emit("joinLesson", JSON.stringify({ lesson: router.query.lessonId, user: user?.student_profile?.id }))

      socket.on("joinLesson_", (data: { lesson: string; user: string }) => {
        const { user } = data
        setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
          ..._usersStatus.filter((_status) => _status.id !== user),
          { id: user, status: "idle" },
        ])
      })
      socket.on("changeStatusInLesson_", (data: { user: string; status: string }) => {
        const { status, user } = data
        setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
          ..._usersStatus.filter((_status) => _status.id !== user),
          { id: user, status },
        ])
      })

      socket.on("lessonMembers", (data: { participants: LessonUserResponseType[] }) => {
        const { participants } = data
        setUsersStatus((_usersStatus: ILessonUserStatus[]) => [..._usersStatus, ...participants])
      })
      socket.on("leaveLesson_", (data: { lesson: string; user: string }) => {
        const { user } = data
        setUsersStatus((_usersStatus: ILessonUserStatus[]) => [
          ..._usersStatus.filter((_status) => _status.id !== user),
          { id: user, status: "inactive" },
        ])
      })

      socket.onAnyOutgoing((e) => {
        // eslint-disable-next-line no-console
        console.log("out:", e)
      })

      socket.onAny((e) => {
        // eslint-disable-next-line no-console
        console.log("in:", e)
      })
      return () => {
        socket?.off("joinLesson_")
        socket?.off("changeStatusInLesson_")
        socket?.off("lessonMembers")
        // socket.off('leaveLesson_')
        socket?.emit("leaveLesson", JSON.stringify({ lesson: router.query.lessonId, user: user?.student_profile?.id }))
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
            <Tour />

            <SignUpDialog isSigned={!!workSpaceProps.user} />

            <Box sx={boxProps}>
              <TopPanel
                chatComponent={null}
                onHanldeFullScreen={handle.active ? handle.exit : handle.enter}
                isFullScreenView={handle.active}
              />

              <WorkSpace {...workSpaceProps} />

              <BottomBar {...bottomBarProps} lessonManagerComponent={<LessonsManager {...lessonManagerProps} />} />
            </Box>

            {!isDesktop ? <ChatPopup chatComponent={null} /> : null}
          </FullScreen>

          <Confetti
            numberOfPieces={confetti ? MAX_NUMBER_OF_PIECES : MIN_NUMBER_OF_PIECES}
            recycle={false}
            gravity={CONFETTI_GRAVITY}
            onConfettiComplete={onConfettiComplete}
          />
        </Box>
      </LessonUserContext.Provider>
    </SocketContext.Provider>
  )
}
