import { FC } from 'react'

import { Avatar, Box, Stack, Tooltip, Typography } from '@mui/material'
import { CgClose } from '@react-icons/all-files/cg/CgClose'
import { MdFilterCenterFocus } from '@react-icons/all-files/md/MdFilterCenterFocus'

import { useSelector } from '@/redux/store'

import { GROUP_TITLE_STYLES, TRIBE_NAME_STYLES } from './styles'

const FocusOverlay: FC = () => {
  const tribe = useSelector((state) => state.codePanel.class)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#0198ED',
        borderRadius: '35px',
        px: 1,
        gap: 1,
      }}
    >
      <Avatar
        alt='avatar'
        src={tribe?.avatar ?? ''}
        sx={{ border: '2px solid #FBDD3F', background: '#0198ED', width: '30px', height: '30px' }}
      >
        🤖
      </Avatar>

      <MdFilterCenterFocus
        size={25}
        color='#fff'
      />

      <Stack sx={{ pr: 4, width: '196px' }}>
        <Typography
          variant='caption'
          sx={{ ...GROUP_TITLE_STYLES, color: '#fff', textTransform: 'uppercase', fontSize: 10 }}
        >
          Focus mode
        </Typography>

        <Tooltip title={'groupTitle'}>
          <Typography
            variant='subtitle2'
            sx={{ ...TRIBE_NAME_STYLES, color: '#fff' }}
          >
            {tribe?.name}
          </Typography>
        </Tooltip>
      </Stack>

      <CgClose
        size={25}
        color='#fff'
      />
    </Box>
  )
}

export default FocusOverlay
