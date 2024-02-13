import { formatDistanceToNowStrict } from 'date-fns'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { PiArrowBendUpLeftLight } from '@react-icons/all-files/pi/PiArrowBendUpLeftLight'
import { FaRegSmile } from '@react-icons/all-files/fa/FaRegSmile'
import { HiTrash } from '@react-icons/all-files/hi2/HiTrash'
// import { useMockedUser } from 'src/hooks/use-mocked-user'

import { useGetMessage } from './hooks'

// ----------------------------------------------------------------------

export default function ChatMessageItem({ isMe }: { isMe: boolean }) {
  //   const { user } = useMockedUser()

  //   const { me, senderDetails, hasImage } = useGetMessage({
  //     message,
  //     participants,
  //     currentUserId: `${user?.id}`,
  //   })

  //   const { firstName, avatarUrl } = senderDetails

  //   const { body, createdAt } = message

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
      {!isMe && `firstName`} &nbsp;
      {formatDistanceToNowStrict(new Date(), {
        addSuffix: true,
      })}
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
        // ...(hasImage && {
        //   p: 0,
        //   bgcolor: 'transparent',
        // }),
      }}
    >
      {/* {hasImage ? (
        <Box
          component='img'
          alt='attachment'
          src={body}
          onClick={() => onOpenLightbox(body)}
          sx={{
            minHeight: 220,
            borderRadius: 1.5,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.9,
            },
          }}
        />
      ) : ( */}
      {'message body'}
      {/* )} */}
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
        <PiArrowBendUpLeftLight />
      </IconButton>
      <IconButton size='small'>
        <FaRegSmile />
      </IconButton>
      <IconButton size='small'>
        <HiTrash />
      </IconButton>
    </Stack>
  )

  return (
    <Stack direction='row' justifyContent={isMe ? 'flex-end' : 'unset'} sx={{ mb: 5 }}>
      {!isMe && (
        <Avatar
          alt={'firstName'}
          src={
            'https://devnest.s3.amazonaws.com/tenant_f072bcf3-5957-4f04-97da-f8e4c4c53439/students/1d549244-d686-40f9-8e23-15f6efcb1a08/avatar_1704981148061_.png'
          }
          sx={{ width: 32, height: 32, mr: 2 }}
        />
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
