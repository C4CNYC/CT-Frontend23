import React, { FC } from 'react'

import { Box } from '@mui/system'

interface ResizeDividerProps {
  props: any
  isBrowserHidden: boolean
}

const ResizeDivider: FC<ResizeDividerProps> = ({ isBrowserHidden, props }) => {
  return isBrowserHidden ? (
    <Box
      {...props}
      sx={{ width: '8px' }}
    />
  ) : (
    <Box
      {...props}
      sx={{
        boxShadow: 'none',
        background: 'none',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '8px',
        '&:hover': {
          background: '#fff!important',
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: '#A6A6A6',
          boxShadow: 'none',
          maxHeight: '150px',
          borderRadius: '24px',
          width: '6px!important',
          '&:after': {
            display: 'none!important',
          },
        }}
      />
    </Box>
  )
}

export default ResizeDivider
