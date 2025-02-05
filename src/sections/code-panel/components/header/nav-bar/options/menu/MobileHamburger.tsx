import { type MouseEventHandler, type FC } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, IconButton } from '@mui/material'

export interface MobileHamburgerProps {
  open: boolean | null
  handleOpenPopover: MouseEventHandler<HTMLButtonElement>
  handleClosePopover: () => void
}

const MobileHamburger: FC<MobileHamburgerProps> = ({
  open,
  handleOpenPopover,
  handleClosePopover,
}) => {
  return (
    <Box sx={BOX_SX}>
      {!open ? (
        <IconButton onClick={handleOpenPopover}>
          <MenuIcon sx={MENU_ITEM_STYLES} />
        </IconButton>
      ) : (
        <IconButton onClick={handleClosePopover}>
          <CloseIcon sx={MENU_ITEM_STYLES} />
        </IconButton>
      )}
    </Box>
  )
}

const BOX_SX = () => ({
  width: '24px',
  height: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const MENU_ITEM_STYLES = {
  color: '#333',
}

export default MobileHamburger
