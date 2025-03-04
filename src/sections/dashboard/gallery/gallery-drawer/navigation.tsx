import React from 'react'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Box, IconButton, alpha } from '@mui/material'

import { useGalleryDrawerContext } from '../context/gallery-drawer-context'

export function ArrowLeft(): React.ReactElement {
  const { handlePrevProject, isDisabledPrev } = useGalleryDrawerContext()
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '45%',
        left: '0',
        width: '40px',
        height: '40px',
        borderTopRightRadius: '16px',
        borderBottomRightRadius: '16px',
        background: alpha('#43D4DD', 0.3),
      }}
    >
      <IconButton
        onClick={handlePrevProject}
        disabled={isDisabledPrev}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
    </Box>
  )
}

export function ArrowRight(): React.ReactElement {
  const { handleNextProject, isDisabledNext } = useGalleryDrawerContext()
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '45%',
        right: '0',
        width: '40px',
        height: '40px',
        borderTopLeftRadius: '16px',
        borderBottomLeftRadius: '16px',
        background: alpha('#43D4DD', 0.3),
      }}
    >
      <IconButton
        onClick={handleNextProject}
        disabled={isDisabledNext}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  )
}
