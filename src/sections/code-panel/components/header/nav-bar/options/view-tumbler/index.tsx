import { type FC } from 'react'

import { IconButton, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { IoExpandOutline } from '@react-icons/all-files/io5/IoExpandOutline'
import { LiaCompressArrowsAltSolid } from '@react-icons/all-files/lia/LiaCompressArrowsAltSolid'
import { TbColumns1 } from '@react-icons/all-files/tb/TbColumns1'
import { TbColumns3 } from '@react-icons/all-files/tb/TbColumns3'
interface ViewToomblerProps {
  isFullScreenView: boolean
  isColumnHidden: boolean
  onChangeColumnVisability: (value: boolean) => void
  onHandleFullScreen: () => void
}

const ViewTumbler: FC<ViewToomblerProps> = ({
  isFullScreenView,
  isColumnHidden,
  onChangeColumnVisability,
  onHandleFullScreen,
}) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      bgcolor='#FBDD3F'
      borderRadius='50px'
      padding='0 12px'
      height='41px'
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
          onClick={() => {
            onChangeColumnVisability(!isColumnHidden)
          }}
        >
          {isColumnHidden ? <TbColumns3 /> : <TbColumns1 />}
        </IconButton>
      </Tooltip>

      <IconButton onClick={onHandleFullScreen}>
        {isFullScreenView ? <LiaCompressArrowsAltSolid /> : <IoExpandOutline />}
      </IconButton>
    </Box>
  )
}

export default ViewTumbler
