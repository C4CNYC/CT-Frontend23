import { type MouseEventHandler, type FC } from 'react'

import { Box, IconButton } from '@mui/material'
import { IoClose } from '@react-icons/all-files/io5/IoClose'
import { IoMenu } from '@react-icons/all-files/io5/IoMenu'

import { useSelector } from '@root/src/redux/store'

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
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)
  if (activeTab === 1) return null
  return (
    <Box sx={BOX_SX}>
      <IconButton onClick={open ? handleClosePopover : handleOpenPopover}>
        {open ? (
          <IoClose
            size={22}
            color={'#43D4DD'}
          />
        ) : (
          <IoMenu
            size={22}
            color={'#43D4DD'}
          />
        )}
      </IconButton>
    </Box>
  )
}

const BOX_SX = {
  position: 'fixed',
  top: '20px',
  right: '20px',
  zIndex: 1000,
  width: '26px',
  height: '26px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(21, 82, 117, 0.8)',
  borderRadius: '50%',
}

export default MobileHamburger
