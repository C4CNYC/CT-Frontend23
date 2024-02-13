import { Avatar, AvatarGroup, Badge, IconButton, ListItemText, Stack } from '@mui/material'
import { CiChat1 } from '@react-icons/all-files/ci/CiChat1'
import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical'
// import { fToNow } from 'src/utils/format-time'

// ----------------------------------------------------------------------

export default function ChatHeaderDetail({}) {
  //   const group = participants.length > 1

  //   const singleParticipant = participants[0]

  const renderGroup = (
    <AvatarGroup
      max={3}
      //   sx={{
      //     [`& .${avatarGroupClasses.avatar}`]: {
      //       width: 32,
      //       height: 32,
      //     },
      //   }}
    >
      {Array(3, 3).map((participant, i) => (
        <Avatar
          key={i}
          alt={'name'}
          src={'https://i.pinimg.com/736x/b9/c4/7e/b9c47ef70bff06613d397abfce02c6e7.jpg'}
        />
      ))}
    </AvatarGroup>
  )

  const renderSingle = (
    <Stack flexGrow={1} direction='row' alignItems='center' spacing={2}>
      <Badge
        variant='dot'
        color='primary'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          '& .MuiBadge-badge': {
            right: 4,
            bottom: 4,
          },
        }}
      >
        <Avatar
          src={'https://i.pinimg.com/736x/b9/c4/7e/b9c47ef70bff06613d397abfce02c6e7.jpg'}
          alt={'name'}
        />
      </Badge>

      <ListItemText
        primary={'Name'}
        secondary={'online'}
        secondaryTypographyProps={{
          component: 'span',
          textTransform: 'capitalize',
          //   ...(singleParticipant.status !== 'offline' && {
          //     textTransform: 'capitalize',
          //   }),
        }}
      />
    </Stack>
  )

  return (
    <>
      {/* {group ? renderGroup : renderSingle} */}
      {renderSingle}

      <Stack flexGrow={1} />

      {/* <IconButton>
        <CiChat1 />
      </IconButton>
      <IconButton>
        <CiChat1 />
      </IconButton> */}
      <IconButton>
        <BsThreeDotsVertical />
      </IconButton>
    </>
  )
}
