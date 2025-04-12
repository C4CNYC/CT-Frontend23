import React from 'react'

import { Box, Typography } from '@mui/material'

export function SliderBlockAiLessonComing() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        gap: 2,
      }}
    >
      <Typography
        variant='h3'
        color='primary'
      >
        {' '}
        Hang tight!{' '}
      </Typography>
      <Typography
        variant='h4'
        color='secondary'
      >
        Your personalized lesson is on its way!
      </Typography>
      <Typography
        variant='body1'
        color='textSecondary'
      >
        🌟 Something <span style={{ color: '#FF5733' }}>amazing</span> is being crafted just for
        you. <br />
        🎉 Get ready to <span style={{ color: '#33C1FF' }}>dive in</span>!
      </Typography>
    </Box>
  )
}
