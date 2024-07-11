import { type FC, useMemo, useState, useEffect } from 'react'

import { type DraggableAttributes } from '@dnd-kit/core'
import { type SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { Box, Stack, Avatar, Typography, IconButton } from '@mui/material'
import { CgClose } from '@react-icons/all-files/cg/CgClose'
import { useDispatch } from 'react-redux'
import { Socket } from 'socket.io-client'

import OpenCodeIcon from '@/assets/icons/OpenCodeIcon'
import { setRoom } from '@/redux/slices/code-editor-controller'
import CodeEditorCollab from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab'
import {
  createSocket,
  waitConnectSocket,
} from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/utils/socket'
import { IUser } from '@root/src/redux/services/interfaces/user.interface'
import { useSelector } from '@root/src/redux/store'
import { EditorMode } from '@root/src/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/constants'
import { type File } from '@root/src/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/requests'

import { UserStatus } from '../../../../consts'
import { useFileManager } from '../../../code-editor-block/code-editor-collab/hook/file-manager'
import { getRandomIndex } from '../../hook/utils'

import { BOX_COLORS, HEADER_COLORS } from './constants'
import styles from './styles'

interface CodeBlockProps {
  onClose: () => void
  attributes?: DraggableAttributes
  listeners?: SyntheticListenerMap
  owner: IUser & { status: UserStatus }
  cursorName?: string
}

const CodeBlock: FC<CodeBlockProps> = ({ onClose, attributes, listeners, owner, cursorName }) => {
  const dispatch = useDispatch()
  const [roomId, setRoomId] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const lastCourseId = useSelector((state) => state.codePanelGlobal.courseId)

  const { boxSx, headerSx, socket } = useMemo(() => {
    const boxColor = BOX_COLORS[getRandomIndex(BOX_COLORS.length)] ?? BOX_COLORS[0]
    const headerColor = HEADER_COLORS[getRandomIndex(HEADER_COLORS.length)] ?? HEADER_COLORS[0]

    return {
      boxSx: styles.getBoxSx(boxColor),
      headerSx: styles.getHeaderSx(headerColor),
      socket: createSocket(),
    }
  }, [])

  const { activeFile, _setActiveFile } = useFileManager({
    socket,
    roomId: roomId!,
    mode: EditorMode.Owner,
  })

  const onOpenCode = () => {
    if (!roomId) {
      return
    }

    dispatch(
      setRoom({
        roomId,
        avatar: owner.avatar,
        ownerId: owner.id as string,
        cursorText: owner.first_name,
        mode: EditorMode.SubOwner,
      })
    )
  }

  useEffect(() => {
    if (!lastCourseId) return
    fetch(`${process.env.NEXT_PUBLIC_CODE_STREAM_API}/stream_room/details?owner_id=${owner.id}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((room) => {
        _setActiveFile(room.active_file)
        setRoomId(room._id)
      })
  }, [lastCourseId])

  useEffect(() => {
    const runAsyncEffect = async (socket: Socket) => {
      const isConnected = await waitConnectSocket(socket)

      if (isConnected) {
        setIsConnected(isConnected)

        socket.on('stream-room:stream-activity-file-updated', (data) => {
          const { file } = JSON.parse(data) as { file: File }

          if (!file || file._id === activeFile?._id) {
            return
          }

          _setActiveFile(file)
        })
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

    return () => {
      if (socket) {
        socket.disconnect()
        socket.close()
      }
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
          >
            {owner.avatar}
          </Avatar>

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

      {isConnected && roomId && (
        <CodeEditorCollab
          roomId={roomId}
          mode={EditorMode.Watcher}
          withFileManager={false}
          socket={socket}
          activeFile={activeFile}
        />
      )}
    </Box>
  )
}

export default CodeBlock
