import { type FC, useEffect } from 'react'

import { Box, Button, List, Popover, Typography, useTheme } from '@mui/material'

import useIsDesktop from '@/hooks/useIsDesktop'
import { useSelector } from '@/redux/store'

import {
  BOX_STYLES,
  BUTTON_STYLES,
  POPOVER_HORIZONTAL,
  POPOVER_VERTICAL,
  TYP_COLOR,
} from './constants'

interface TipsPopoverProps {
  openPoper: boolean
  anchorEl: HTMLElement | null
  setOpenPoper: (open: boolean) => void
  tips: string[]
}

const TipsPopover: FC<TipsPopoverProps> = ({ openPoper, anchorEl, setOpenPoper, tips }) => {
  const theme = useTheme()
  const isDesktop = useIsDesktop()
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)

  useEffect(() => {
    if (!isDesktop && activeTab !== 1) {
      setOpenPoper(false)
    }
  }, [isDesktop, activeTab])

  return (
    <Popover
      id='popper'
      open={openPoper}
      anchorEl={anchorEl}
      slotProps={{
        paper: {
          style: { width: '250px' },
        },
      }}
      onClose={() => {
        setOpenPoper(false)
      }}
      anchorOrigin={{
        vertical: POPOVER_VERTICAL,
        horizontal: POPOVER_HORIZONTAL,
      }}
    >
      <Box sx={BOX_STYLES}>
        <List>
          {tips.map((t, i) => (
            <Typography
              key={t}
              variant='body1'
              sx={TYP_COLOR}
            >
              {i + 1}. {t}
            </Typography>
          ))}
        </List>

        <Button
          onClick={() => {
            setOpenPoper(false)
          }}
          sx={BUTTON_STYLES}
        >
          OK
        </Button>
      </Box>
    </Popover>
  )
}

export default TipsPopover
