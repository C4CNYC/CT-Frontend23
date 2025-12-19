import { type FC } from 'react'

import { IconButton, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { TbColumns1 } from '@react-icons/all-files/tb/TbColumns1'
import { TbColumns3 } from '@react-icons/all-files/tb/TbColumns3'

interface ViewToomblerProps {
  isColumnHidden: boolean
  onChangeColumnVisability: (value: boolean) => void
}

const TumblerFocusMode: FC<ViewToomblerProps> = ({ isColumnHidden, onChangeColumnVisability }) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      borderRadius='50px'
      padding='2px 0 0 0'
      height='24px'
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
          {isColumnHidden ? <TbColumns3 size={21} /> : <TbColumns1 size={21} />}
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default TumblerFocusMode
