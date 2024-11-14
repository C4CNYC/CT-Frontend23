import { type FC, useMemo, useState, useEffect } from 'react'

import { type DraggableAttributes } from '@dnd-kit/core'
import { type SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { Box, Stack, Avatar, Typography, IconButton, CircularProgress } from '@mui/material'
import { CgClose } from '@react-icons/all-files/cg/CgClose'
import { useDispatch } from 'react-redux'
import { Socket } from 'socket.io-client'

import OpenCodeIcon from '@/assets/icons/OpenCodeIcon'
import { type IFriend } from '@/redux/interfaces/friends.interface'
import { setRoom } from '@/redux/slices/code-editor-controller'
import CodeEditorCollab from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab'
import { RoomStatus } from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/components/status-label'
import {
  createSocket,
  waitConnectSocket,
} from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/utils/socket'
import { type BaseResponseInterface } from '@/utils'
import { EditorMode } from '@root/src/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/constants'
import { SocketEventsStudentMode } from '@root/src/sections/code-panel/lib/events/mode'

import { getRandomIndex } from '../../hook/utils'

import { BOX_COLORS, HEADER_COLORS } from './constants'
import styles from './styles'

interface CodeBlockProps {
  onClose: () => void
  attributes?: DraggableAttributes
  listeners?: SyntheticListenerMap
  owner: IFriend & BaseResponseInterface
  cursorName?: string
  lessonId?: string
  onMoveToPortal: () => void
}

const CodeBlock: FC<CodeBlockProps> = ({
  onClose,
  attributes,
  listeners,
  owner,
  cursorName,
  lessonId,
  onMoveToPortal,
}) => {
  const dispatch = useDispatch()
  const [isStudentReady, setIsStudentReady] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [editorStatus, setEditorStatus] = useState(RoomStatus.Inactive)

  const { boxSx, headerSx, socket } = useMemo(() => {
    const boxColor = BOX_COLORS[getRandomIndex(BOX_COLORS.length)] ?? BOX_COLORS[0]
    const headerColor = HEADER_COLORS[getRandomIndex(HEADER_COLORS.length)] ?? HEADER_COLORS[0]

    return {
      boxSx: styles.getBoxSx(boxColor),
      headerSx: styles.getHeaderSx(headerColor),
      socket: createSocket(),
    }
  }, [])

  const isActiveUser = owner.active || owner.status !== 'inactive'

  const isOpenCodeDisabled = RoomStatus.Inactive === editorStatus

  const onOpenCode = () => {
    if (isOpenCodeDisabled) {
      return
    }

    dispatch(
      setRoom({
        avatar: owner.avatar,
        roomId: `${owner.id as string}_${lessonId as string}`,
        cursorText: owner.first_name,
        mode: EditorMode.SubOwner,
      })
    )

    onMoveToPortal()
  }

  useEffect(() => {
    const runAsyncEffect = async (socket: Socket) => {
      const isConnected = await waitConnectSocket(socket)

      if (isConnected) {
        socket.emit('joinRoom', `student_${owner.id}`)
        if (!socket.hasListeners(SocketEventsStudentMode.OnlineStudentReady)) {
          socket.on(SocketEventsStudentMode.OnlineStudentReady, () => {
            setIsStudentReady(true)
          })
        }
        setIsConnected(isConnected)
      } else {
        void runAsyncEffect(socket)
      }
    }

    if (socket) {
      if (socket.connected) {
        socket.emit('joinRoom', `student_${owner.id}`)
        if (!socket.hasListeners(SocketEventsStudentMode.OnlineStudentReady)) {
          socket.on(SocketEventsStudentMode.OnlineStudentReady, () => {
            setIsStudentReady(true)
          })
        }
        setIsConnected(true)
      } else {
        void runAsyncEffect(socket)
      }
    } else {
      setIsConnected(false)
    }
  }, [socket])

  return (
    <Box sx={boxSx}>
      <Stack
        direction='row'
        justifyContent='space-between'
        sx={headerSx}
      >
        <Stack
          alignItems='center'
          direction='row'
          height='100%'
        >
          <DragIndicatorIcon
            sx={styles.DRAG_INDICATOR_SX}
            {...attributes}
            {...listeners}
          />

          <Avatar
            sx={styles.AVATAR_SX}
            src={owner.avatar}
          />

          <Typography sx={styles.TYP_NAME_SX}>
            {owner.first_name} {owner.last_name}
          </Typography>
        </Stack>

        <Stack
          alignItems='center'
          direction='row'
          height='100%'
        >
          <OpenCodeIcon
            onClick={onOpenCode}
            width={32}
            height={20}
            sx={{
              ...styles.OPEN_CODE_ICON,
              ...(isOpenCodeDisabled ? styles.OPEN_CODE_DISABLED : null),
            }}
          />

          <IconButton
            onClick={onClose}
            sx={{
              mx: 1,
              p: 0,
            }}
          >
            <CgClose
              size={24}
              color='#fff'
            />
          </IconButton>
        </Stack>
      </Stack>

      {!isStudentReady && <CircularProgress />}

      {isStudentReady &&
        isConnected &&
        (isActiveUser ? (
          <CodeEditorCollab
            roomId={`${owner.id as string}_${lessonId as string}`}
            mode={EditorMode.Watcher}
            withFileManager={false}
            cursorText={cursorName}
            onRoomStatusChanged={setEditorStatus}
            socket={socket}
          />
        ) : (
          <Box>User Offline</Box>
        ))}
    </Box>
  )
}

export default CodeBlock
