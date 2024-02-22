import { type FC, useMemo, useState, useEffect } from 'react'

import { type DraggableAttributes } from '@dnd-kit/core'
import { type SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import CloseIcon from '@mui/icons-material/Close'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { Box, Stack, Avatar, Typography } from '@mui/material'
import { useRouter } from 'next/router'
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
import { EditorMode } from '@/sections/code-panel/components/body/blocks/code-editor-block/constants'
import { voidFunction, type BaseResponseInterface } from '@/utils'

import { getRandomIndex } from '../../hook/utils'

import { BOX_COLORS, HEADER_COLORS } from './constants'
import styles from './styles'

let previousValue: string | null = null
let checkValueTimeout: any | null = null
interface CodeBlockProps {
  onClose: () => void
  attributes?: DraggableAttributes
  listeners?: SyntheticListenerMap
  data: IFriend & BaseResponseInterface
  cursorName?: string
  lessonId?: string
  onChangeUserStatus?: (status: string) => void
}

const CodeBlock: FC<CodeBlockProps> = ({
  onClose,
  attributes,
  listeners,
  data,
  cursorName,
  lessonId,
  onChangeUserStatus = voidFunction,
}) => {
  const dispatch = useDispatch()
  const [isConnected, setIsConnected] = useState(false)
  const [editorStatus, setEditorStatus] = useState(RoomStatus.Inactive)
  const route = useRouter()
  // const socket = useSocket();

  const { boxSx, headerSx, socket } = useMemo(() => {
    const boxColor = BOX_COLORS[getRandomIndex(BOX_COLORS.length)] ?? BOX_COLORS[0]
    const headerColor = HEADER_COLORS[getRandomIndex(HEADER_COLORS.length)] ?? HEADER_COLORS[0]

    return {
      boxSx: styles.getBoxSx(boxColor),
      headerSx: styles.getHeaderSx(headerColor),
      socket: createSocket(),
    }
  }, [])

  const isOpenCodeDisabled = RoomStatus.Inactive === editorStatus

  const onOpenCode = () => {
    if (isOpenCodeDisabled) {
      return
    }

    dispatch(
      setRoom({
        // roomId: data.id,
        roomId: `${data.id as string}_${lessonId as string}`,
        cursorText: data.first_name,
        mode: EditorMode.SubOwner,
      })
    )
  }

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

  const onChangeCode = (value: string) => {
    if (checkValueTimeout) {
      // Clear the previous timeout if the value changes
      clearTimeout(checkValueTimeout)
    }

    previousValue = value // Store the current value
    onChangeUserStatus('active')

    // Set up the check for 30 seconds later
    checkValueTimeout = setTimeout(() => {
      if (value === previousValue) {
        // eslint-disable-next-line no-console
        console.log(`Value after 30 seconds: ${value} (unchanged)`)
        onChangeUserStatus('idle')
      } else {
        // eslint-disable-next-line no-console
        console.log('Value has changed')
      }
    }, 30000) // 30 seconds
  }

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
            src={data.avatar}
          />

          <Typography sx={styles.TYP_NAME_SX}>
            {data.first_name} {data.last_name}
          </Typography>
        </Stack>

        <Stack
          alignItems='center'
          direction='row'
          height='100%'
        >
          <OpenCodeIcon
            onClick={onOpenCode}
            sx={{
              ...styles.OPEN_CODE_ICON,
              ...(isOpenCodeDisabled ? styles.OPEN_CODE_DISABLED : null),
            }}
          />

          <CloseIcon
            sx={styles.CLOSE_ICON_SX}
            onClick={onClose}
          />
        </Stack>
      </Stack>

      {isConnected && (
        <CodeEditorCollab
          // roomId={data.id}
          roomId={`${data.id as string}_${lessonId as string}`}
          mode={EditorMode.Watcher}
          withFileManager={false}
          cursorText={cursorName}
          onRoomStatusChanged={setEditorStatus}
          socket={socket}
          onChangeCode={onChangeCode}
        />
      )}
    </Box>
  )
}

export default CodeBlock
