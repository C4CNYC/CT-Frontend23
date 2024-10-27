import { useState } from 'react'

import { Chip, menuItemClasses, Popover, Typography } from '@mui/material'

import { getPosition } from '@root/src/components/menu-popover/getPosition'
import { StyledArrow } from '@root/src/components/menu-popover/styles'

interface IQuizItemProps {
  name: string
  description: string
}

export default function QuizItem({ name, description }: IQuizItemProps): React.ReactElement {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const { style } = getPosition('bottom-center')

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <Popover
        id='mouse-over-popover'
        disableScrollLock
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        slotProps={{
          paper: {
            sx: {
              width: 'auto',
              overflow: 'inherit',
              backgroundImage: `url(/assets/core/red-blur.png), url(/assets/core/cyan-blur.png)`,
              backgroundRepeat: 'no-repeat, no-repeat',
              backgroundSize: `200px, 200px `,
              backgroundPosition: 'left bottom, top right',
              ...style,
              [`& .${menuItemClasses.root}`]: {
                '& svg': {
                  mr: 2,
                  flexShrink: 0,
                },
              },
            },
          },
        }}
      >
        <StyledArrow arrow={'bottom-center'} />
        <Typography
          variant='body2'
          sx={{ p: 2, maxWidth: '220px', color: 'GrayText' }}
        >
          {description}
        </Typography>
      </Popover>
      <Chip
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        label={name}
        sx={{
          color: '#C4C4C4',
          background: 'transparent',
          fontWeight: 400,
          border: '1px solid #C4C4C4',
          '&:hover': {
            color: '#fff',
            border: '1px solid #C4C4C4',
            cursor: 'pointer',
          },
          '& .MuiChip-label': {
            fontSize: '1.0rem',
          },
        }}
      />
    </>
  )
}
