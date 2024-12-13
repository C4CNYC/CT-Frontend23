import { type FC, useEffect, useState } from 'react'

import { Box, Button, Popper, Typography } from '@mui/material'

import useIsDesktop from '@/hooks/useIsDesktop'
import { useSelector } from '@/redux/store'

import { BOX_STYLES, BUTTON_STYLES, TYP_COLOR } from './constants'

interface TipsPopoverProps {
  openPoper: boolean
  anchorEl: HTMLElement | null
  setOpenPoper: (open: boolean) => void
  tips: string
}

const TipsPopover: FC<TipsPopoverProps> = ({ openPoper, anchorEl, setOpenPoper, tips }) => {
  const isDesktop = useIsDesktop()
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isDesktop && activeTab !== 1) {
      setOpenPoper(false)
    }
  }, [isDesktop, activeTab, setOpenPoper])

  return (
    <Popper
      id='popper'
      open={openPoper}
      anchorEl={anchorEl}
      sx={{
        transition: 'opacity 0.3s ease-in-out',
        opacity: isHovered ? 1 : 0.6,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      placement='left-start'
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
      ]}
    >
      <Box sx={BOX_STYLES}>
        <Typography
          variant='body1'
          sx={{ ...TYP_COLOR, maxWidth: '20rem' }}
        >
          {tips}
        </Typography>

        <Button
          onClick={() => {
            setOpenPoper(false)
          }}
          sx={BUTTON_STYLES}
        >
          OK
        </Button>
      </Box>
    </Popper>
  )
}

export default TipsPopover
