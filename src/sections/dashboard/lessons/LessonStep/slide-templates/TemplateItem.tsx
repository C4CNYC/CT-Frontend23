import { useState } from 'react'

import { Box, Button, Card, Stack, Typography, useTheme } from '@mui/material'
import { m } from 'framer-motion'

import { MotionContainer } from '@root/src/components/animate/MotionContainer'
import { varFade } from '@root/src/components/animate/variants/fade'
import { Image } from '@root/src/components/image/Image'

import { ANIMATION_CONT_SX, BACKDROP_CONT_SX, TYPO_BACKDROP_SX } from './constants'

const TemplateItem = () => {
  const theme = useTheme()
  const [openInfo, setOpenInfo] = useState(false)
  return (
    <Card
      sx={{
        overflow: 'hidden',
        position: 'relative',
        boxShadow: theme.customShadows.primary,
      }}
      onMouseEnter={() => setOpenInfo(true)}
      onMouseLeave={() => setOpenInfo(false)}
    >
      <Image
        src={'/assets/illustrations/illustration_dashboard.png'}
        height={400}
        alt=''
      />
      <Stack p={2}>
        <Typography
          variant='h6'
          textOverflow='ellipsis'
          noWrap
        >
          Template name
        </Typography>
        <Typography
          variant='body1'
          textOverflow='ellipsis'
          noWrap
        >
          Template desciption Template desciption
        </Typography>
      </Stack>
      <Box
        component={MotionContainer}
        sx={ANIMATION_CONT_SX}
      >
        <m.div
          variants={varFade().inUp}
          initial='initial'
          animate={openInfo ? 'animate' : 'exit'}
          style={{ flex: 1, minHeight: '100%' }}
        >
          <Stack sx={BACKDROP_CONT_SX}>
            <Typography
              variant='body1'
              sx={TYPO_BACKDROP_SX}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa facere fugiat atque
              consequuntur nisi cupiditate voluptates quis corrupti explicabo tenetur ex labore
              dolorum deserunt, sint officia optio veritatis rerum? Ducimus?
            </Typography>
            <Stack
              direction='row'
              justifyContent='space-around'
              gap={{ xs: 1, md: 2 }}
            >
              <Button variant='contained'>Use template</Button>
              <Button
                variant='soft'
                sx={{ background: '#fff', '&:hover': { background: '#fff' } }}
              >
                Preview
              </Button>
            </Stack>
          </Stack>
        </m.div>
      </Box>
    </Card>
  )
}

export default TemplateItem
