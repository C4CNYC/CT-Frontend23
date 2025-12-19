import React from 'react'

import { Modal, Box, Typography, Button, Stack } from '@mui/material'

interface ModalAskToSaveProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  handleSaveEdited: () => void
}

export const ModalAskToSave = ({ isOpen, setIsOpen, handleSaveEdited }: ModalAskToSaveProps) => {
  const handleClose = () => {
    setIsOpen(false)
  }

  const onSubmit = (data: { url: string }) => {
    handleClose()
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 2,
          width: 400,
          maxWidth: '90%',
        }}
      >
        <Typography
          variant='h6'
          component='h2'
          mb={2}
        >
          You have unsaved changes. Do you want to save them?
        </Typography>

        <Stack
          direction='row'
          spacing={2}
          mt={3}
          justifyContent='flex-end'
        >
          <Button
            variant='contained'
            color='primary'
            type='submit'
            onClick={handleSaveEdited}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}
