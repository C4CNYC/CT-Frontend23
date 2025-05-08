import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import { FaRegSmile } from '@react-icons/all-files/fa/FaRegSmile'
import { HiTrash } from '@react-icons/all-files/hi2/HiTrash'
import { PiArrowBendUpLeftLight } from '@react-icons/all-files/pi/PiArrowBendUpLeftLight'
import { formatDistanceToNowStrict } from 'date-fns'

import { useAuthContext } from '@root/src/auth/useAuthContext'

import { CustomAvatar } from '../custom-avatar/CustomAvatar'

import { IChatMessages } from './chatInterface'

export function ChatMessageItem({ message }: { message: IChatMessages }) {
  const { isMe, chat, ctime } = message

  const { user } = useAuthContext()
  let distanceFromNow = '-'
  try {
    distanceFromNow = formatDistanceToNowStrict(new Date(+ctime), {
      addSuffix: true,
    })
  } catch (error) {
    // console.error('Error in ChatMessageItem', error, ctime)
  }

  const renderInfo = (
    <Typography
      noWrap
      variant='caption'
      sx={{
        mb: 1,
        color: 'text.disabled',
        ...(!isMe && {
          mr: 'auto',
        }),
      }}
    >
      {!isMe && `Baloo`} &nbsp;
      {distanceFromNow}
    </Typography>
  )

  const renderBody = (
    <Stack
      sx={{
        p: 1.5,
        minWidth: 48,
        maxWidth: 320,
        borderRadius: 1,
        typography: 'body2',
        bgcolor: 'background.neutral',
        ...(isMe && {
          color: 'grey.800',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {chat}
    </Stack>
  )
  const renderActions = (
    <Stack
      direction='row'
      className='message-actions'
      sx={{
        pt: 0.5,
        opacity: 0,
        top: '100%',
        left: 0,
        position: 'absolute',
        transition: (theme) =>
          theme.transitions.create(['opacity'], {
            duration: theme.transitions.duration.shorter,
          }),
        ...(isMe && {
          left: 'unset',
          right: 0,
        }),
      }}
    >
      <IconButton size='small'>
        <PiArrowBendUpLeftLight size={14} />
      </IconButton>
      <IconButton size='small'>
        <FaRegSmile size={14} />
      </IconButton>
      <IconButton size='small'>
        <HiTrash size={14} />
      </IconButton>
      {message.options?.map((option, index) => (
        <a
          key={index}
          style={{
            fontSize: 'small',
            border: '1px solid #AAA',
            padding: '2px',
            borderRadius: '5px',
            margin: '2px 4px',
          }}
          onClick={option.onAction}
          title={option.description}
        >
          {option.shortTitle}
        </a>
      ))}
    </Stack>
  )

  return (
    <Stack
      direction='row'
      justifyContent={isMe ? 'flex-end' : 'unset'}
      sx={{ mb: 5 }}
    >
      {isMe ? (
        <CustomAvatar
          src={user?.avatar}
          name={user?.firstName}
        />
      ) : (
        <span style={{ fontSize: '2rem' }}>🐻</span>
      )}

      <Stack alignItems='flex-end'>
        {renderInfo}

        <Stack
          direction='row'
          alignItems='center'
          sx={{
            position: 'relative',
            '&:hover': {
              '& .message-actions': {
                opacity: 1,
              },
            },
          }}
        >
          {renderBody}
          {renderActions}
        </Stack>
      </Stack>
    </Stack>
  )
}

export function ChatMessageItemNew({ message }: { message: IChatMessages }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: message.isMe ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          maxWidth: '85%',
          borderRadius: 2,
          backgroundColor: (theme) =>
            message.isMe ? theme.palette.primary.main : theme.palette.grey[100],
          color: message.isMe ? 'white' : 'inherit',
        }}
      >
        <Typography variant='body1'>{message.chat}</Typography>
        <Typography
          variant='caption'
          color={message.isMe ? 'rgba(255,255,255,0.7)' : 'text.secondary'}
          sx={{ display: 'block', mt: 0.5, textAlign: message.isMe ? 'right' : 'left' }}
        >
          {new Date(message.ctime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
      </Paper>
    </Box>
  )
}
