import React from 'react'

import { Avatar, Box, Paper, Skeleton, Stack } from '@mui/material'

export default function ChatSkeleton() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        p: '16px',
        minHeight: '100%',
      }}
    >
      {/* Left message */}
      <Stack
        direction='row'
        spacing={1}
        alignItems='flex-start'
      >
        <Avatar>
          <Skeleton
            variant='circular'
            width={32}
            height={32}
            animation='wave'
          />
        </Avatar>
        <Box>
          <Paper
            sx={{
              px: 2,
              py: 1.5,
              borderRadius: 3,
              backgroundColor: 'rgba(129, 140, 248, 0.25)', // purple bubble
            }}
          >
            <Skeleton
              variant='text'
              width={200}
              animation='wave'
            />
            <Skeleton
              variant='text'
              width={140}
              animation='wave'
            />
          </Paper>
        </Box>
      </Stack>

      {/* Right message */}
      <Stack
        direction='row'
        spacing={1}
        justifyContent='flex-end'
        alignItems='flex-start'
      >
        <Box textAlign='right'>
          <Paper
            sx={{
              px: 2,
              py: 1.5,
              borderRadius: 3,
              backgroundColor: 'rgba(16, 185, 129, 0.4)', // green bubble
            }}
          >
            <Skeleton
              variant='text'
              width={220}
              animation='wave'
            />
            <Skeleton
              variant='text'
              width={180}
              animation='wave'
            />
          </Paper>
        </Box>
        <Avatar>
          <Skeleton
            variant='circular'
            width={32}
            height={32}
            animation='wave'
          />
        </Avatar>
      </Stack>
    </Box>
  )
}
