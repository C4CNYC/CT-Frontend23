import { type FC, memo, useCallback } from 'react'

import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'

import { AuthUserType } from '@/auth/types'
import { setDocument } from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import CodeEditor from '@/sections/code-panel/code-editor'
import LoadingCodeEditor from '@/sections/code-panel/code-editor/loading-code-editor'
import { CodeDocument } from '@/types/code-document'

interface CodeEditorControllerProps {
  user?: AuthUserType
  isFetchingLessonContent?: boolean
}

let previousLength: number | undefined = undefined
let checkValueTimeout: any | undefined = undefined

const CodeEditorController: FC<CodeEditorControllerProps> = ({
  user,
  isFetchingLessonContent = false,
}) => {
  const dispatch = useDispatch()

  // const [isConnected, setIsConnected] = useState(false)
  const room = useSelector((state) => state.codeEditorController.room)
  const socket = useSelector((state) => state.codePanelGlobal.socket)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)

  const onChangeStreamingDocInfo = useCallback(
    (doc: CodeDocument) => {
      try {
        if (checkValueTimeout) {
          // Clear the previous timeout if the value changes
          clearTimeout(checkValueTimeout)
        }

        previousLength = doc?.htmlBody?.length // Store the current value
        if (lessonId && user) {
          socket?.emit('changeStatusInLesson', {
            lesson: lessonId,
            user: user?.id,
            status: 'active',
          })
        }

        // Set up the check for 30 seconds later
        checkValueTimeout = setTimeout(() => {
          if (doc?.htmlBody?.length === previousLength) {
            socket?.emit('changeStatusInLesson', {
              lesson: lessonId,
              user: user?.id,
              status: 'idle',
            })
          }
        }, 30000) // 30 seconds

        dispatch(setDocument(doc))
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log('Error: ', error)
      }
    },
    [user, lessonId, socket]
  )

  // useEffect(() => {
  //   const runAsyncEffect = async (socket: Socket) => {
  //     const isConnected = await waitForSocketConnection(socket)
  //
  //     if (isConnected) {
  //       setIsConnected(isConnected)
  //     } else {
  //       void runAsyncEffect(socket)
  //     }
  //   }
  //
  //   if (socket) {
  //     if (socket.connected) {
  //       setIsConnected(true)
  //     } else {
  //       void runAsyncEffect(socket)
  //     }
  //   } else {
  //     setIsConnected(false)
  //   }
  // }, [socket])

  // if (!room || !isConnected) {

  return (
    <Box
      width='100%'
      height='100%'
      position='relative'
    >
      {!room || !socket || isFetchingLessonContent ? (
        <LoadingCodeEditor />
      ) : (
        <CodeEditor
          roomId={room.roomId}
          cursorText={room.cursorText}
          preloadedCode={room.preloadedCode}
          onChangeStreamingDocInfo={onChangeStreamingDocInfo}
          code={room.code}
          mode={room.mode}
          socket={socket}
          user={user}
          isLoading={isFetchingLessonContent}
        />
      )}
    </Box>
  )
}

export default memo(CodeEditorController)
