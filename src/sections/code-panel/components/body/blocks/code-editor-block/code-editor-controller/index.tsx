import { type FC, memo, useEffect, useState } from 'react'

import { AuthUserType } from '@/auth/types'
import { useSelector } from '@/redux/store'
import CodeEditorCollab from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab'
import { voidFunction } from '@/utils'
import { useAuthContext } from '@root/src/auth/useAuthContext'
import { Role } from '@root/src/redux/services/enums/role.enum'
import { SocketEventsStudentMode } from '@root/src/sections/code-panel/lib/events/mode'

import CodeEditorOffline from '../code-editor-offline'

interface CodeEditorControllerProps {
  onChangeStreamingDocInfo?: (value: Record<string, string>) => void
  user?: AuthUserType
  preloadedCode?: string
}

enum EditorConnectionMode {
  Offline = 'offline',
  Collab = 'collab',
}

const CodeEditorController: FC<CodeEditorControllerProps> = ({
  preloadedCode,
  onChangeStreamingDocInfo = voidFunction,
}) => {
  const { user } = useAuthContext()

  const [randomRoom] = useState(`${Math.random()}${Date.now()}`)
  const [connectionMode, setConnectionMode] = useState<EditorConnectionMode>(
    EditorConnectionMode.Offline
  )

  const room = useSelector((state) => state.codeEditorController.room)
  const rootSocket = useSelector((state) => state.codePanelGlobal.socket)

  useEffect(() => {
    if (rootSocket) {
      rootSocket.on('connect', () => {
        rootSocket.emit(SocketEventsStudentMode.JoinCollabModFeature, {
          roomId: `user_${user?.id}`,
        })
        rootSocket.on(SocketEventsStudentMode.StartOnlineMode, () => {
          setConnectionMode(EditorConnectionMode.Collab)
          setTimeout(() => {
            rootSocket.emit(SocketEventsStudentMode.OnlineStudentReady, {
              roomId: `user_${user?.id}`,
            })
          }, 100)
        })

        if (user?.role === Role.Student) {
          rootSocket?.on(SocketEventsStudentMode.StopOnlineMode, async () => {
            setConnectionMode(EditorConnectionMode.Offline)
          })
        }
      })
    }
  }, [rootSocket, user, room?.mode, setConnectionMode])

  switch (connectionMode) {
    case EditorConnectionMode.Offline:
      return (
        <CodeEditorOffline
          roomId={room?.roomId ?? randomRoom}
          preloadedCode={preloadedCode || room?.code}
          mode={room?.mode}
          user={user}
        />
      )
    case EditorConnectionMode.Collab:
      return (
        <CodeEditorCollab
          roomId={room?.roomId ?? randomRoom}
          cursorText={room?.cursorText}
          preloadedCode={preloadedCode}
          onChangeStreamingDocInfo={onChangeStreamingDocInfo}
          code={room?.code}
          mode={room?.mode}
          user={user}
        />
      )
  }
}

export default memo(CodeEditorController)
