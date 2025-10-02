import React, { useState } from 'react'

import { Box, Typography, Card, CardContent, Container } from '@mui/material'

import { LessonContentType } from '@root/src/redux/services/enums/lesson-content-type.enum'

export default function LessonBuilderSlide() {
  const [selectedType, setSelectedType] = useState<LessonContentType>(LessonContentType.Md)

  const handleClick = (type: LessonContentType) => {
    setSelectedType(type)
  }

  const formats = [
    {
      id: 'markdown',
      title: 'MARKDOWN',
      description: 'Simple, no-nonsense way form of content.',
      type: LessonContentType.Md,
    },
    {
      id: 'richtext',
      title: 'RICH-TEXT FORMAT',
      description: 'Simple format for text and images.',
      type: LessonContentType.TinyMce,
    },
    {
      id: 'html',
      title: 'HTML',
      subtitle: '( Full HTML Editor )',
      description:
        'Make highly interactive lessons with buttons, quizzes and activities. Use templates or generate with AI.',
      type: LessonContentType.Code,
    },
  ]

  return (
    <Container
      maxWidth='md'
      sx={{ backgroundColor: '#e8e6e1', minHeight: '100%' }}
    >
      <Box sx={{ padding: '50px 0 200px' }}>
        <Typography
          variant='h3'
          component='h1'
          sx={{
            fontWeight: 800,
            mb: 2,
            textAlign: 'center',
          }}
        >
          BUILD YOUR LESSON
        </Typography>

        <Typography
          variant='h6'
          sx={{
            mb: 5,
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          The lesson instructions are empty select your format below.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {formats.map((format) => (
            <Card
              key={format.id}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  border: '2px solid #1976d2',
                },
              }}
              onClick={() => handleClick(format.type)}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant='h5'
                      component='h2'
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      {format.title}
                      {format.subtitle && (
                        <Typography
                          component='span'
                          sx={{
                            fontWeight: 400,
                            ml: 1,
                            fontSize: '0.9em',
                          }}
                        >
                          {format.subtitle}
                        </Typography>
                      )}
                    </Typography>

                    <Typography
                      variant='body1'
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                      }}
                    >
                      {format.description}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  )
}
