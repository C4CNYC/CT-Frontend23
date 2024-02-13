import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
// import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

// import { useRouter } from 'src/routes/hooks'

// import { useResponsive } from 'src/hooks/use-responsive'
// import { useMockedUser } from 'src/hooks/use-mocked-user'

// import { clickConversation } from 'src/api/chat'

import { useGetNavItem } from './hooks'
import { useResponsive } from '@/hooks'
import { useRouter } from 'next/router'
import { Badge } from '@mui/material'

// ----------------------------------------------------------------------

export default function ChatNavItem({ collapse }: { collapse: boolean }) {
  //   const { user } = useMockedUser()

  const mdUp = useResponsive('up', 'md')

  const router = useRouter()

  //   const { group, displayName, displayText, participants, lastActivity, hasOnlineInGroup } =
  //     useGetNavItem({
  //       conversation,
  //       currentUserId: `${user?.id}`,
  //     })

  //   const singleParticipant = participants[0]

  //   const { name, avatarUrl, status } = singleParticipant

  //   const handleClickConversation = useCallback(async () => {
  //     try {
  //       if (!mdUp) {
  //         onCloseMobile()
  //       }

  //         await clickConversation(conversation.id)

  //         router.push(`${paths.dashboard.chat}?id=${conversation.id}`)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }, [conversation.id, mdUp, onCloseMobile, router])

  const renderGroup = (
    <Badge
      variant='dot'
      color='primary'
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      sx={{
        '& .MuiBadge-badge': {
          right: 6,
          bottom: 6,
        },
      }}
    >
      <AvatarGroup variant='circular' sx={{ width: 48, height: 48 }}>
        {Array(5, 5, 5, 5, 5).map((participant) => (
          <Avatar
            //   key={participant.id}
            //   alt={participant.name}
            src='https://devnest.s3.amazonaws.com/tenant_f072bcf3-5957-4f04-97da-f8e4c4c53439/students/1d549244-d686-40f9-8e23-15f6efcb1a08/avatar_1704981148061_.png'
          />
        ))}
      </AvatarGroup>
    </Badge>
  )

  const renderSingle = (
    <Badge
      variant='dot'
      color='primary'
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      sx={{
        '& .MuiBadge-badge': {
          right: 6,
          bottom: 6,
        },
      }}
    >
      <Avatar
        src='https://devnest.s3.amazonaws.com/tenant_f072bcf3-5957-4f04-97da-f8e4c4c53439/students/1d549244-d686-40f9-8e23-15f6efcb1a08/avatar_1704981148061_.png'
        sx={{ width: 48, height: 48 }}
      />
    </Badge>
  )

  return (
    <ListItemButton
      disableGutters
      //   onClick={handleClickConversation}
      sx={{
        py: 1.5,
        px: 2.5,
        // ...(selected && {
        //   bgcolor: 'action.selected',
        // }),
      }}
    >
      <Badge
        color='error'
        overlap='circular'
        badgeContent={0}
        sx={{
          '& .MuiBadge-badge': {
            right: 4,
            bottom: 4,
          },
        }}
      >
        {renderGroup && renderSingle}
      </Badge>

      {!collapse && (
        <>
          <ListItemText
            sx={{ ml: 2 }}
            primary={'chat'}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2',
            }}
            secondary={'secondery'}
            secondaryTypographyProps={{
              noWrap: true,
              component: 'span',
              variant: 'body2',
              color: 'text.secondary',
            }}
          />

          <Stack alignItems='flex-end' sx={{ ml: 2, height: 44 }}>
            <Typography
              noWrap
              variant='body2'
              component='span'
              sx={{
                mb: 1.5,
                fontSize: 12,
                color: 'text.disabled',
              }}
            >
              {formatDistanceToNowStrict(new Date(), {
                addSuffix: false,
              })}
            </Typography>

            {/* {!!conversation.unreadCount && ( */}
            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: 'info.main',
                borderRadius: '50%',
              }}
            />
            {/* )} */}
          </Stack>
        </>
      )}
    </ListItemButton>
  )
}
