import { useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Box, Button, Card, Dialog, DialogContent, Grid, Typography } from '@mui/material'

import { useSnackbar } from '@/components'
import { APIError } from '@/redux/interfaces/custom-error.interface'
import { useTranslate } from '@/utils/translateHelper'

interface IExitTribeDialogProps {
  children: React.ReactElement
}

export default function ExitTribeDialog({ children }: IExitTribeDialogProps): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  const translate = useTranslate()

  const { enqueueSnackbar } = useSnackbar()

  const openDialog = () => {
    setOpen(true)
  }
  const closeDialog = () => {
    setOpen(false)
  }

  const onSubmit = async (): Promise<void> => {
    setLoading(true)
    try {
      // add user adding logic
      enqueueSnackbar(translate('tribes_you_left_tribe'))
    } catch (error: any) {
      const typedError = error as APIError
      enqueueSnackbar(typedError.data.message, {
        variant: 'error',
      })
    }
    setLoading(false)
    closeDialog()
  }
  return (
    <>
      <Box
        onClick={(event) => {
          event.stopPropagation()
          event.preventDefault()
          openDialog()
        }}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={closeDialog}
        PaperProps={{ sx: { width: '350px' } }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Typography
            variant='h5'
            sx={{ pb: 1, pt: 2, px: 2, textAlign: 'center' }}
          >
            {translate('tribes_want_leave')}
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              md={12}
            >
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Button
                    color='error'
                    onClick={(event) => {
                      event.stopPropagation()
                      event.preventDefault()
                      closeDialog()
                    }}
                  >
                    {translate('actions_cancel')}
                  </Button>
                  <LoadingButton
                    type='submit'
                    variant='contained'
                    loading={loading}
                    onClick={(event) => {
                      event.stopPropagation()
                      event.preventDefault()
                      onSubmit()
                    }}
                  >
                    {translate('actions_leave')}
                  </LoadingButton>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}
