import { useCallback, type FC } from 'react'

import { Avatar, Box, Stack, Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import PersonIcon from '@/assets/icons/PersonIcon'
import useIsDesktop from '@/hooks/useIsDesktop'
import { setRoom } from '@/redux/slices/code-editor-controller'
import { toggleRealtimeCodeHidden } from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'

import { EditorMode } from '../../body/blocks/code-editor-block/code-editor-collab/hook/constants'

import CustomSwitch from './custom-switch'
import FocusOverlay from './FocusOverlay'
import {
  AVATAR_STYLES,
  GROUP_TITLE_STYLES,
  STACK_GROUP_STYLES,
  STACK_STYLES,
  TRIBE_NAME_STYLES,
} from './styles'

const MAX_TRIBE_NAME_LENGTH = 20

const GroupHeader: FC = () => {
  const { query } = useRouter()
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()

  const user = useSelector((state) => state.global.user)
  const tribe = useSelector((state) => state.codePanel.class)
  const socket = useSelector((state) => state.codePanelGlobal.socket)
  const room = useSelector((state) => state.codeEditorController.room)
  const isRealtimeCodeHidden = useSelector((state) => state.codePanelGlobal.isRealtimeCodeHidden)

  const resetRoom = useCallback(() => {
    if (socket) {
      socket?.emit('leaveRoom', room?.roomId)
    }
    return dispatch(
      setRoom({
        roomId: `${user?.student_profile?.id ?? ''}_${query?.lessonId as string}`,
        mode: EditorMode.Owner,
      })
    )
  }, [dispatch, user, query?.lessonId])

  const onChange = () => {
    dispatch(toggleRealtimeCodeHidden(!isRealtimeCodeHidden))
  }

  const isFocusMode = room == null || room.mode === EditorMode.Owner || room.mode == null

  const groupTitle =
    tribe && tribe.name.length > MAX_TRIBE_NAME_LENGTH ? (
      <Typography variant='subtitle2'>{tribe.name}</Typography>
    ) : (
      ''
    )

  if (!isDesktop) {
    return null
  }

  return (
    <Stack
      sx={STACK_STYLES}
      direction='row'
    >
      {isFocusMode ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt='avatar'
            src={tribe?.avatar ?? ''}
            sx={AVATAR_STYLES}
          >
            🤖
          </Avatar>

          <Stack sx={STACK_GROUP_STYLES}>
            <Typography
              variant='caption'
              sx={GROUP_TITLE_STYLES}
            >
              GROUP
            </Typography>

            <Tooltip title={groupTitle}>
              <Typography
                variant='subtitle2'
                sx={TRIBE_NAME_STYLES}
              >
                {tribe?.name}
              </Typography>
            </Tooltip>
          </Stack>

          <PersonIcon
            display='flex'
            justifyContent='center'
            alignItems='center'
          />
        </Box>
      ) : (
        <FocusOverlay
          title={room?.cursorText ?? ''}
          resetRoom={resetRoom}
          avatar={room?.avatar}
        />
      )}

      {user?.role !== 'student' && (
        <CustomSwitch
          isActive={!isRealtimeCodeHidden}
          onChange={onChange}
        />
      )}
    </Stack>
  )
}

export default GroupHeader
