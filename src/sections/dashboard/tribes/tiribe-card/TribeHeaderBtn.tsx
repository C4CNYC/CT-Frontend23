import { useState } from 'react'

import { Box, Button, IconButton } from '@mui/material'
import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical'
import { CiExport } from '@react-icons/all-files/ci/CiExport'
import { ImExit } from '@react-icons/all-files/im/ImExit'

import { useTranslate } from '@/utils/translateHelper'
import { MenuPopover } from '@root/src/components'

import ExitTribeDialog from '../exitTribeDialog'

export default function TribeHeaderBtn(): React.ReactElement {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

  const translate = useTranslate()

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    event.preventDefault()
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    event.preventDefault()
    setOpenPopover(null)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'flex-end',
        pt: 1,
      }}
    >
      <IconButton
        sx={{
          color: '#454F5B',
          '&:hover': { background: 'transparent', color: '#02D3D7' },
        }}
      >
        <CiExport size='20px' />
      </IconButton>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          color: '#454F5B',

          '&:hover': { background: 'transparent', color: '#02D3D7' },
        }}
      >
        <BsThreeDotsVertical size='20px' />
      </IconButton>
      <MenuPopover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openPopover}
        onClose={handleClosePopover}
      >
        <ExitTribeDialog>
          <Button sx={{ gap: 1 }}>
            {translate('tribes_leave_tribe')}
            <ImExit size='20px' />
          </Button>
        </ExitTribeDialog>
      </MenuPopover>
    </Box>
  )
}
