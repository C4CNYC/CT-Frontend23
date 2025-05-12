import { Avatar } from '@mui/material'

import { RootState, useSelector } from '@root/src/redux/store'

const UserAvatar = () => {
  const user = useSelector((state: RootState) => state.global.user)

  const avatarUrl = Boolean(new URL(user?.avatar || '')) ? user?.avatar : undefined
  if (!avatarUrl) return <>{user?.username}</>
  return (
    <Avatar
      src={user?.avatar}
      alt={user?.username}
      sx={{
        position: 'absolute',
        zIndex: 10,
        top: '-23px',
        left: '11px',
        width: '46px',
        height: '46px',
        background: 'white',
        border: '3px solid #FBDD3F',
      }}
    >
      {user?.avatar}
      {user?.username}
    </Avatar>
  )
}
export default UserAvatar
