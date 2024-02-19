import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'

import { useAuthContext } from '@/auth/useAuthContext'

export default function ChatNavAccount() {
  const { user } = useAuthContext()

  return (
    <>
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
          src={user?.avatar}
          alt={user?.first_name ?? 'avatar'}
          sx={{ cursor: 'pointer', width: 48, height: 48 }}
        />
      </Badge>
    </>
  )
}
