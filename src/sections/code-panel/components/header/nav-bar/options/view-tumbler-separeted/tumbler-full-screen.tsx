import { type FC } from 'react'

import { IconButton } from '@mui/material'
import { Box } from '@mui/system'
import { IoExpandOutline } from '@react-icons/all-files/io5/IoExpandOutline'
import { LiaCompressArrowsAltSolid } from '@react-icons/all-files/lia/LiaCompressArrowsAltSolid'

import { useFullScreen } from '@root/src/sections/code-panel/lib/FullScreenContext'

const TumblerFullScreen: FC = () => {
  const handle = useFullScreen()

  return (
    <Box
      display='flex'
      alignItems='center'
      bgcolor='rgba(251, 221, 51, 0.6)'
      borderRadius='50px'
      padding='0 12px'
      height='24px'
    >
      <IconButton
        disableRipple
        sx={{ color: '#637381' }}
        onClick={handle.active ? handle.exit : handle.enter}
      >
        {handle.active ? <LiaCompressArrowsAltSolid size={21} /> : <IoExpandOutline size={21} />}
      </IconButton>
    </Box>
  )
}

export default TumblerFullScreen
