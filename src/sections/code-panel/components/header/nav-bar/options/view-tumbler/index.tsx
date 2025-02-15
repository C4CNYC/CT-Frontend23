import { type FC } from 'react'

import { IconButton, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { Iconify } from '@/components/iconify'
import { useFullScreen } from '@root/src/sections/code-panel/lib/FullScreenContext'

interface ViewToomblerProps {
  isColumnHidden: boolean
  onChangeColumnVisability: (value: boolean) => void
}

const ViewTumbler: FC<ViewToomblerProps> = ({ isColumnHidden, onChangeColumnVisability }) => {
  const handle = useFullScreen()
  const columnIcon = isColumnHidden ? 'tabler:columns-3' : 'tabler:columns-1'
  const screenViewIcon = handle.active ? 'la:compress-arrows-alt' : 'mdi:arrow-expand-all'

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
          <Iconify icon={columnIcon} />
        </IconButton>
      </Tooltip>

      <IconButton onClick={handle.active ? handle.exit : handle.enter}>
        <Iconify icon={screenViewIcon} />
      </IconButton>
    </Box>
  )
}

export default ViewTumbler
