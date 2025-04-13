import React from 'react'

import { Box, Typography, Stack } from '@mui/material'

export function SliderBlockAiLessonComing() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 3,
        px: 4,
      }}
    >
      <Typography
        variant='h3'
        color='primary'
        gutterBottom
      >
        Start Building Your Lesson!
      </Typography>
      <Typography
        variant='h6'
        color='textSecondary'
        gutterBottom
      >
        Welcome to your new coding lesson. Use the chat on the right to interact with Mumu, your AI
        instructor, and create an engaging coding lesson.
      </Typography>
      <Typography
        variant='body1'
        color='textPrimary'
        paragraph
      >
        Ready to start? Let's build your lesson together!
      </Typography>

      <Stack
        spacing={2}
        alignItems='flex-start'
        sx={{ width: '100%', maxWidth: 600 }}
      >
        <Typography
          variant='h5'
          color='primary'
        >
          How to Use This Workspace
        </Typography>
        <Typography
          variant='body1'
          color='textSecondary'
        >
          This workspace allows you to create interactive coding lessons with slides, code examples,
          quizzes, and challenges.
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
        >
          <strong>Tip:</strong> Each lesson can have different types of slides - introduction,
          concepts, code examples, quizzes, and coding challenges.
        </Typography>

        <Typography
          variant='h5'
          color='primary'
        >
          What You Can Create
        </Typography>
        <Typography
          variant='body1'
          color='textSecondary'
        >
          <ul>
            <li>Interactive lessons with multiple slides</li>
            <li>Code examples that students can run</li>
            <li>Quizzes to test understanding</li>
            <li>Coding challenges with automatic validation</li>
          </ul>
        </Typography>
      </Stack>
    </Box>
  )
}
