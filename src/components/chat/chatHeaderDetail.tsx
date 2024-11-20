import { Avatar, Badge, ListItemText, Stack } from '@mui/material'
// import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical'

// ----------------------------------------------------------------------

interface IChatHeader {
  name?: string
  avatar?: string
  status?: boolean
}

export default function ChatHeaderDetail({ name, avatar, status }: IChatHeader) {
  const renderSingle = (
    <Stack
      flexGrow={1}
      direction='row'
      alignItems='center'
      spacing={2}
    >
      <Badge
        variant='dot'
        color={status ? 'primary' : 'default'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          '& .MuiBadge-badge': {
            right: 4,
            bottom: 4,
          },
        }}
      >
        <Avatar
          src={avatar}
          alt={name}
        />
      </Badge>

      <ListItemText
        primary={name}
        secondaryTypographyProps={{
          component: 'span',
          ...(status && {
            textTransform: 'capitalize',
          }),
        }}
      />
    </Stack>
  )

  return (
    <>
      {renderSingle}

      <Stack flexGrow={1} />

      {/* <IconButton>
        <BsThreeDotsVertical />
      </IconButton> */}
    </>
  )
}
