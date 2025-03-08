import { useState } from 'react'

import { Box, Button, Dialog, DialogActions, DialogContent, SxProps } from '@mui/material'
import { BiShowAlt } from '@react-icons/all-files/bi/BiShowAlt'

import { useTranslate } from '@/utils/translateHelper'
import { Image } from '@root/src/components/image/Image'

import { LIGHT_BOX_ICON_BTN } from './constants'

interface IImageLightBoxProps {
  children: React.ReactElement
  image: string
  sx?: SxProps
  onClick?: (e: React.SyntheticEvent) => void
}

export default function ImageLightBox({
  children,
  image,
  sx,
  onClick,
}: IImageLightBoxProps): React.ReactElement {
  const [open, setOpen] = useState(false)
  const translate = useTranslate()

  const handleOpenDialog = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(true)
  }
  const handleCloseDialog = (e: React.MouseEvent): void => {
    setOpen(false)
    onClick?.(e)
  }

  return (
    <>
      <Box
        onClick={(e) => {
          onClick?.(e)
          handleOpenDialog(e)
        }}
        sx={{
          position: 'relative',
          zIndex: 1,
          '&:hover': {
            '> div': { opacity: 1 },
            cursor: 'pointer',
          },
          ...sx,
        }}
      >
        {children}
        <Box sx={LIGHT_BOX_ICON_BTN}>
          <BiShowAlt size={40} />
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogContent sx={{ pt: 3 }}>
          <Image
            src={image}
            alt={translate('modules_module_image')}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant='soft'
            color='error'
            sx={{ alignSelf: 'flex-end' }}
            onClick={handleCloseDialog}
          >
            {translate('actions_close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
