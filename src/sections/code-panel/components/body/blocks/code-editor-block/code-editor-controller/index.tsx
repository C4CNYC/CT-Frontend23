import { type FC, memo, useState, useEffect } from 'react'

import { Socket } from 'socket.io-client'

import { AuthUserType } from '@/auth/types'
import { useSelector } from '@/redux/store'
import CodeEditorCollab from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab'
import { waitConnectSocket } from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/utils/socket'
import { voidFunction } from '@/utils'

interface CodeEditorControllerProps {
  onChangeStreamingDocInfo?: (value: Record<string, string>) => void
  user?: AuthUserType
  preloadedCode?: string
}

const CodeEditorController: FC<CodeEditorControllerProps> = ({
  onChangeStreamingDocInfo = voidFunction,
  user,
  preloadedCode,
}) => {
  const [randomRoom] = useState(`${Math.random()}${Date.now()}`)

  const socket = useSelector((state) => state.codePanelGlobal.socket)
  const room = useSelector((state) => state.codeEditorController.room)

  useEffect(() => {
    const runAsyncEffect = async (socket: Socket) => {
      const isConnected = await waitConnectSocket(socket)

      if (!isConnected) {
        void runAsyncEffect(socket)
      }
    }

    if (socket && !socket.connected) {
      void runAsyncEffect(socket)
    }
  }, [socket])

  return (
    <CodeEditorCollab
      roomId={room?.roomId ?? randomRoom}
      cursorText={room?.cursorText}
      preloadedCode={preloadedCode}
      onChangeStreamingDocInfo={onChangeStreamingDocInfo}
      code={room?.code}
      mode={room?.mode}
      socket={socket}
      user={user}
    />
  )
}

export default memo(CodeEditorController)
