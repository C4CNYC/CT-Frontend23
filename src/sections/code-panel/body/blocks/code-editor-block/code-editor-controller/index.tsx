import { type FC, memo, useState, useEffect } from 'react'

import { Socket } from 'socket.io-client'

import { AuthUserType } from '@/auth/types'
import { useSelector } from '@/redux/store'
import { waitConnectSocket } from '@/sections/code-panel/lib/socket'
import { voidFunction } from '@/utils/voidFunction'
import CodeEditor from 'src/sections/code-panel/code-editor'

interface CodeEditorControllerProps {
  onChangeStreamingDocInfo?: (value: Record<string, string>) => void
  user?: AuthUserType
  isFetching?: boolean
}

const CodeEditorController: FC<CodeEditorControllerProps> = ({
  onChangeStreamingDocInfo = voidFunction,
  user,
  isFetching = false,
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
    <CodeEditor
      roomId={room.roomId}
      cursorText={room.cursorText}
      preloadedCode={room.preloadedCode}
      onChangeStreamingDocInfo={onChangeStreamingDocInfo}
      code={room.code}
      mode={room.mode}
      socket={socket}
      user={user}
      isFetching={isFetching}
    />
  )
}

export default memo(CodeEditorController)
