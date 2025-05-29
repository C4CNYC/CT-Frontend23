import { type FC } from 'react'

import { IconButton, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { IoExpandOutline } from '@react-icons/all-files/io5/IoExpandOutline'
import { LiaCompressArrowsAltSolid } from '@react-icons/all-files/lia/LiaCompressArrowsAltSolid'
import { TbColumns1 } from '@react-icons/all-files/tb/TbColumns1'
import { TbColumns3 } from '@react-icons/all-files/tb/TbColumns3'

import { useFullScreen } from '@root/src/sections/code-panel/lib/FullScreenContext'
interface ViewToomblerProps {
  isColumnHidden: boolean
  onChangeColumnVisability: (value: boolean) => void
}

const ViewTumbler: FC<ViewToomblerProps> = ({ isColumnHidden, onChangeColumnVisability }) => {
  const handle = useFullScreen()

  return (
    <Box
      display='flex'
      alignItems='center'
      bgcolor='rgba(251, 221, 51, 0.6)'
      borderRadius='50px'
      padding='0 12px'
      height='30px'
    >
      <Tooltip
        title={
          <>
            <Typography variant='subtitle2'>Focus Mode:</Typography>
            <Typography
              variant='inherit'
              width={170}
            >
              More space for the code editor. Compress the slides & browser.
            </Typography>
          </>
        }
      >
        <IconButton
          disableRipple
          sx={{ color: '#637381' }}
          onClick={() => {
            onChangeColumnVisability(!isColumnHidden)
          }}
        >
          {isColumnHidden ? <TbColumns3 size={22} /> : <TbColumns1 size={22} />}
        </IconButton>
      </Tooltip>

      <IconButton
        disableRipple
        sx={{ color: '#637381' }}
        onClick={handle.active ? handle.exit : handle.enter}
      >
        {handle.active ? <LiaCompressArrowsAltSolid size={22} /> : <IoExpandOutline size={22} />}
      </IconButton>
    </Box>
  )
}

export default ViewTumbler
