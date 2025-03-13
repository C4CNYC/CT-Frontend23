import React from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'

export function SkeletonCodeEditorBlock() {
  return (
    <>
      <Box
        sx={{
          padding: '5px 10px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Skeleton
          width='32px'
          height='32px'
          variant='rectangular'
          sx={{ borderRadius: 1, marginRight: '15px' }}
        />
        <Skeleton
          width='100px'
          height='32px'
          variant='rectangular'
          sx={{ borderRadius: 1 }}
        />
      </Box>

      <Divider />

      <Box
        sx={{ display: 'flex', alignItems: 'center', padding: '10px', height: 'calc(100% - 42px)' }}
      >
        <Skeleton
          variant='rectangular'
          width='100%'
          height='100%'
          sx={{ borderRadius: 1 }}
        />
      </Box>
    </>
  )
}
