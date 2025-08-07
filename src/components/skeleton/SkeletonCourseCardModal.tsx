import React from 'react'

import { Card, Skeleton, Stack, Box, CardProps } from '@mui/material'

export const SkeletonCourseCardModal: React.FC<CardProps> = (props) => {
  return (
    <Card
      {...props}
      elevation={1}
      sx={{
        borderRadius: 3,
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 80,
        ...props.sx,
      }}
    >
      <Stack spacing={1}>
        <Skeleton
          variant='text'
          width={200}
          height={24}
        />
        <Skeleton
          variant='rounded'
          width={60}
          height={26}
        />
      </Stack>

      <Box>
        <Skeleton
          variant='rounded'
          width={33}
          height={20}
        />
      </Box>
    </Card>
  )
}
