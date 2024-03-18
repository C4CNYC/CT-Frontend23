import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import CloseIcon from '@mui/icons-material/Close'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Rating,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFTextField, useSnackbar } from '@/components'
import { APIError } from '@/redux/interfaces/custom-error.interface'
import { useTranslate } from '@/utils/translateHelper'

interface Props {
  children: React.ReactElement[] | React.ReactElement
}

interface FormValuesProps {
  email: string
}

export default function FeedbackDialog({ children }: Props): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false)
  const [generalFeed, setGeneralFeed] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState<number>()
  const translate = useTranslate()

  const { query } = useRouter()

  const { lessonId } = query

  const { enqueueSnackbar } = useSnackbar()

  const FeedbackSchema = Yup.object().shape({
    feedback: Yup.string(),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FeedbackSchema),
  })

  const openDialog = () => {
    setOpen(true)
  }
  const closeDialog = () => {
    setOpen(false)
    setGeneralFeed(false)
  }

  const openGeneralFeedback = () => {
    setGeneralFeed(true)
  }

  const closeGeneralFeedback = () => {
    setGeneralFeed(false)
  }

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    setLoading(true)
    try {
      enqueueSnackbar(translate('messages_thanks'))
      methods.reset((formValues) => ({
        ...formValues,
        feedback: '',
      }))
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
        onClick={() => {
          openDialog()
        }}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={closeDialog}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <DialogTitle
            variant='h5'
            sx={{ pb: 1, pt: 2, pl: 4 }}
          >
            {translate('RATE THIS SLIDE')}
          </DialogTitle>

          <IconButton
            onClick={closeDialog}
            sx={{ mr: '14px', mt: '5px' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ px: 4, pb: 4, textAlign: 'center' }}>
            <Typography
              variant='body2'
              sx={{ mb: 2 }}
            >
              Give us a rating for the slide. Tell us if you like it or not.
            </Typography>
            <Rating
              defaultValue={rating ?? 0}
              onChange={(e, value) => {
                enqueueSnackbar(translate('messages_thanks'))
                setRating(value ?? 0)
              }}
            />

            <Divider sx={{ my: 2 }}>OR</Divider>
            <Box sx={{ textAlign: 'center' }}>
              {generalFeed ? (
                <FormProvider
                  methods={methods}
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      item
                      xs={12}
                      md={12}
                    >
                      <Box
                        rowGap={3}
                        display='grid'
                      >
                        <RHFTextField
                          rows={5}
                          multiline
                          name='Feedback'
                          label=''
                          placeholder={translate('feedback_tel_your_feedback')}
                          required
                        />
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 2,
                          mt: 2,
                        }}
                      >
                        <Button onClick={closeGeneralFeedback}>{translate('actions_close')}</Button>
                        <LoadingButton
                          type='submit'
                          variant='contained'
                          loading={loading}
                        >
                          {translate('actions_send')}
                        </LoadingButton>
                      </Box>
                    </Grid>
                  </Grid>
                </FormProvider>
              ) : (
                <>
                  <Button
                    variant='soft'
                    color='info'
                    sx={{ width: '100%', mb: 2 }}
                    onClick={openGeneralFeedback}
                  >
                    General Feedback
                  </Button>
                  <Typography>General thoughts? Let us know.</Typography>
                </>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
