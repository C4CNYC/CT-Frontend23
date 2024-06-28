import { Badge } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { formatDistanceToNowStrict } from 'date-fns'

import { IUser } from '@root/src/redux/interfaces/auth.interface'

// ----------------------------------------------------------------------

interface IChatNavItem {
  collapse: boolean
  friend: IUser
  selectChat: (id: string) => void
  selected: string
}

export default function ChatNavItem({ collapse, friend, selectChat, selected }: IChatNavItem) {
  const renderSingle = (
    <Badge
      variant='dot'
      color={friend.active ? 'primary' : 'default'}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      sx={{
        '& .MuiBadge-badge': {
          right: 6,
          bottom: 5,
        },
      }}
    >
      <Avatar
        src={friend.avatar}
        sx={{ width: 48, height: 48 }}
      />
    </Badge>
  )

  return (
    <ListItemButton
      disableGutters
      onClick={() => selectChat(friend.id)}
      sx={{
        py: 1.5,
        px: 2.5,
        ...(selected === friend.id && {
          bgcolor: 'action.selected',
        }),
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
        {renderSingle}
      </Badge>

      {!collapse && (
        <>
          <ListItemText
            sx={{ ml: 2 }}
            primary={friend.first_name}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2',
            }}
            secondary={'sent message'}
            secondaryTypographyProps={{
              noWrap: true,
              component: 'span',
              variant: 'body2',
              color: 'text.secondary',
            }}
          />

          <Stack
            alignItems='flex-end'
            sx={{ ml: 2, height: 44 }}
          >
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
              {formatDistanceToNowStrict(new Date(2024, 1, 14), {
                addSuffix: false,
              })}
            </Typography>

            {/* {!!conversation.unreadCount && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: 'info.main',
                  borderRadius: '50%',
                }}
              />
            )} */}
          </Stack>
        </>
      )}
    </ListItemButton>
  )
}
