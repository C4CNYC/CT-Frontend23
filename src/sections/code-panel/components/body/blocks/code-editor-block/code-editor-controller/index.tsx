import { type FC, memo, useState, useEffect } from 'react'

import { Socket } from 'socket.io-client'

import { AuthUserType } from '@/auth/types'
import { useSocket } from '@/hooks/useSocket'
import { useSelector } from '@/redux/store'
import CodeEditorCollab from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab'
import { waitConnectSocket } from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/utils/socket'
import { voidFunction } from '@/utils'

interface CodeEditorControllerProps {
  onChange?: (value: Record<string, string>) => void
  user?: AuthUserType
}

const CodeEditorController: FC<CodeEditorControllerProps> = ({ onChange = voidFunction, user }) => {
  // const { user } = useAuthContext()

  const [isConnected, setIsConnected] = useState(false)
  const room = useSelector((state) => state.codeEditorController.room)

  // const socket = useMemo(() => createSocket(user?.id || generateId(20)), [user]);
  const socket = useSocket()

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
    <CodeEditorCollab
      roomId={room.roomId}
      cursorText={room.cursorText}
      preloadedCode={room.preloadedCode}
      onChange={onChange}
      code={room.code}
      mode={room.mode}
      socket={socket}
      user={user}
    />
  )
}

export default memo(CodeEditorController)
