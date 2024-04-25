import { type FC, memo, useState, useEffect } from 'react'

import { Socket } from 'socket.io-client'

import { AuthUserType } from '@/auth/types'
import type { ILesson } from '@/redux/interfaces/content.interface'
import { useSelector } from '@/redux/store'
import CodeEditorCollab from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab'
import LoadingCodeEditor from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/components/loading-code-editor'
import { waitConnectSocket } from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/utils/socket'
import { BaseResponseInterface, voidFunction } from '@/utils'

interface CodeEditorControllerProps {
  onChangeStreamingDocInfo?: (value: Record<string, string>) => void
  user?: AuthUserType
  isFetching?: boolean
  preloadedCode?: string
  lesson?: ILesson & BaseResponseInterface
}

const CodeEditorController: FC<CodeEditorControllerProps> = ({
  onChangeStreamingDocInfo = voidFunction,
  user,
  isFetching = false,
  preloadedCode,
  lesson,
}) => {
  // const { user } = useAuthContext()

  const [isConnected, setIsConnected] = useState(false)
  const room = useSelector((state) => state.codeEditorController.room)

  // const socket = useMemo(() => createSocket(user?.id || generateId(20)), [user]);
  const socket = useSelector((state) => state.codePanelGlobal.socket)

  useEffect(() => {
    const runAsyncEffect = async (socket: Socket) => {
      const isConnected = await waitConnectSocket(socket)

      if (isConnected) {
        setIsConnected(isConnected)
      } else {
        void runAsyncEffect(socket)
      }
    }

    if (socket) {
      if (socket.connected) {
        setIsConnected(true)
      } else {
        void runAsyncEffect(socket)
      }
    } else {
      setIsConnected(false)
    }
  }, [socket])

  if (room == null /* || !isConnected */) {
    // if (room == null  || !isConnected ) {
    return null
  }

  return (
    <>
      {!isFetching ? (
        <CodeEditorCollab
          roomId={room.roomId}
          cursorText={room.cursorText}
          preloadedCode={preloadedCode}
          onChangeStreamingDocInfo={onChangeStreamingDocInfo}
          code={room.code}
          mode={room.mode}
          socket={socket}
          user={user}
          isFetching={isFetching}
          lesson={lesson}
        />
      ) : (
        <LoadingCodeEditor />
      )}
    </>
  )
}

export default memo(CodeEditorController)
