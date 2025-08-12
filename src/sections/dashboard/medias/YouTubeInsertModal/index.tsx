import React, { ReactElement, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Modal, Box, Typography, TextField, Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

interface YouTubeInsertModalProps {
  insertVideo: (url: string) => void
  children: ReactElement
}

// ✅ Yup-схема валідації для YouTube URL
const schema = yup.object({
  url: yup
    .string()
    .required('URL is required')
    .matches(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/, 'Invalid YouTube URL'),
})

export const YouTubeInsertModal = ({ insertVideo, children }: YouTubeInsertModalProps) => {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ url: string }>({
    resolver: yupResolver(schema),
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    reset()
  }

  const onSubmit = (data: { url: string }) => {
    insertVideo(data.url.trim())
    handleClose()
  }

  return (
    <>
      {React.cloneElement(children, {
        onClick: handleOpen,
      })}

      <Modal
        open={open}
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
            Insert YouTube Video
          </Typography>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              fullWidth
              label='YouTube URL'
              variant='outlined'
              {...register('url')}
              error={!!errors.url}
              helperText={errors.url?.message}
            />

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
              >
                Insert
              </Button>
              <Button
                variant='outlined'
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  )
}
