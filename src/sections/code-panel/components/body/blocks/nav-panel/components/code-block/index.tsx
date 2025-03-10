import { type FC, useMemo, useState } from 'react'

import { type DraggableAttributes } from '@dnd-kit/core'
import { type SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { Box, Stack, Avatar, Typography, IconButton, CircularProgress } from '@mui/material'
import { CgClose } from '@react-icons/all-files/cg/CgClose'
import { useDispatch } from 'react-redux'
// import { Socket } from 'socket.io-client'

import OpenCodeIcon from '@/assets/icons/OpenCodeIcon'
import { type IFriend } from '@/redux/interfaces/friends.interface'
import { setRoom } from '@/redux/slices/code-editor-controller'
import CodeEditorCollab from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab'
import { RoomStatus } from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/components/status-label'
import { type BaseResponseInterface } from '@/utils'
import { EditorMode } from '@root/src/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/constants'

import { getRandomIndex } from '../../hook/utils'

import { BOX_COLORS, HEADER_COLORS } from './constants'
import styles from './styles'

interface CodeBlockProps {
  lessonId?: string
  cursorName?: string
  onClose: () => void
  portalSocket: any
  onMoveToPortal: () => void
  attributes?: DraggableAttributes
  listeners?: SyntheticListenerMap
  owner: IFriend & BaseResponseInterface
}

const CodeBlock: FC<CodeBlockProps> = ({
  owner,
  onClose,
  lessonId,
  listeners,
  attributes,
  cursorName,
  portalSocket,
  onMoveToPortal,
}) => {
  const dispatch = useDispatch()
  const [isStudentReady, setIsStudentReady] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [editorStatus, setEditorStatus] = useState(RoomStatus.Inactive)

  // const rootSocket = useSelector((state) => state.codePanelGlobal.socket)

  const { boxSx, headerSx } = useMemo(() => {
    const boxColor = BOX_COLORS[getRandomIndex(BOX_COLORS.length)] ?? BOX_COLORS[0]
    const headerColor = HEADER_COLORS[getRandomIndex(HEADER_COLORS.length)] ?? HEADER_COLORS[0]

    return {
      boxSx: styles.getBoxSx(boxColor),
      headerSx: styles.getHeaderSx(headerColor),
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

  // useEffect(() => {
  //   const runAsyncEffect = async (socket: Socket) => {
  //     const isConnected = await waitConnectSocket(socket)

  //     if (isConnected) {
  //       socket.emit('joinRoom', `student_${owner.id}`)
  //       if (!socket.hasListeners(SocketEventsStudentMode.OnlineStudentReady)) {
  //         socket.on(SocketEventsStudentMode.OnlineStudentReady, () => {
  //           setIsStudentReady(true)
  //         })
  //       }
  //       setIsConnected(isConnected)
  //     } else {
  //       void runAsyncEffect(socket)
  //     }
  //   }

  //   if (portalSocket) {
  //     if (portalSocket.connected) {
  //       portalSocket.emit('joinRoom', `student_${owner.id}`)
  //       if (!portalSocket.hasListeners(SocketEventsStudentMode.OnlineStudentReady)) {
  //         portalSocket.on(SocketEventsStudentMode.OnlineStudentReady, () => {
  //           setIsStudentReady(true)
  //         })
  //       }
  //       setIsConnected(true)
  //     } else {
  //       void runAsyncEffect(portalSocket)
  //     }
  //   } else {
  //     setIsConnected(false)
  //   }
  // }, [portalSocket])

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
            portalSocket={portalSocket}
            roomId={`${owner.id as string}_${lessonId as string}`}
            mode={EditorMode.Watcher}
            withFileManager={false}
            cursorText={cursorName}
            onRoomStatusChanged={setEditorStatus}
          />
        ) : (
          <Box>User Offline</Box>
        ))}
    </Box>
  )
}

export default CodeBlock
