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
        minWidth: '4px',
        width: '4px!important',
        '&:hover': {
          background: '#fff!important',
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: '#A6A6A6',
          opacity: 0,
          transition: 'opacity 0.3s',
          boxShadow: 'none',
          maxHeight: '150px',
          borderRadius: '24px',
          width: '3px!important',
          '&:after': {
            display: 'none!important',
          },
          '&:hover': {
            opacity: 1,
          },
        }}
      />
    </Box>
  )
}

export default ResizeDivider
