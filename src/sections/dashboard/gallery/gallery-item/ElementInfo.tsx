import { Stack, Tooltip, Typography } from '@mui/material'

import { RootState, useSelector } from '@root/src/redux/store'

import { TEXT_SX } from '../constants'
import { useGalleryContext } from '../context/gallery-context'
import UserAvatar from '../UserAvatar'

export default function ElementInfo(): React.ReactElement {
  const { title, description } = useGalleryContext()
  const userName = useSelector((state: RootState) => state.global.user?.username)
  return (
    <>
      <Stack
        direction='row'
        sx={{ position: 'relative' }}
      >
        <UserAvatar />
        <Typography
          variant='body2'
          sx={{ ml: '67px' }}
        >
          {userName}
        </Typography>
      </Stack>
      <Tooltip
        title={
          title.length > 38 ? (
            <Typography
              variant='subtitle1'
              sx={{ p: 1 }}
            >
              {title}
            </Typography>
          ) : (
            ''
          )
        }
      >
        <Typography
          variant='subtitle1'
          sx={TEXT_SX}
          mt={0.5}
        >
          {title}
        </Typography>
      </Tooltip>
      <Tooltip
        title={
          description.length > 55 ? (
            <Typography
              variant='body2'
              sx={{ p: 1 }}
            >
              {description}
            </Typography>
          ) : (
            ''
          )
        }
      >
        <Typography
          variant='body2'
          sx={TEXT_SX}
        >
          {description}
        </Typography>
      </Tooltip>
    </>
  )
}
