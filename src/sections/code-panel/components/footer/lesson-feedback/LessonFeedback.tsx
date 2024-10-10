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
import {
  useSendGeneralFeedbackMutation,
  useSendSlideFeedbackMutation,
  useSendTrainingFeedbackMutation,
} from '@/redux/services/feedback'
import { useSelector } from '@/redux/store'
import { useTranslate } from '@/utils/translateHelper'
import { useAuthContext } from '@root/src/auth/useAuthContext'

interface Props {
  lessonName?: string
  children: React.ReactElement[] | React.ReactElement
  sidebar?: boolean
}

interface FormValuesProps {
  email: string
  Feedback: string
}

const feedbackTypes = {
  slide: 'slide',
  general: 'general',
  training: 'training',
}

export default function LessonFeedback({
  children,
  lessonName,
  sidebar,
}: Props): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false)
  const [generalFeed, setGeneralFeed] = useState<boolean>(!!sidebar)
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState<number>(0)
  const [feedbackType, setFeedbackType] = useState<string>(
    sidebar ? feedbackTypes.general : feedbackTypes.slide
  )
  const { user } = useAuthContext()
  const translate = useTranslate()
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const codePanelState = useSelector((state) => state.codePanelGlobal)
  const { query } = useRouter()
  const { lessonId, unitId, courseId } = query

  const code = codePanelState.code

  const { enqueueSnackbar } = useSnackbar()

  const [sendGeneralFeedback] = useSendGeneralFeedbackMutation()

  const [sendTrainingFeedback] = useSendTrainingFeedbackMutation()

  const [sendSlideFeedback] = useSendSlideFeedbackMutation()

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
    if (!sidebar) {
      setGeneralFeed(false)
      setFeedbackType(feedbackTypes.slide)
    }
  }

  const openGeneralFeedback = () => {
    setRating(0)
    setFeedbackType(feedbackTypes.general)
    setGeneralFeed(true)
    methods.reset((formValues) => ({
      ...formValues,
      Feedback: '',
    }))
  }

  const closeGeneralFeedback = () => {
    if (sidebar) return
    setGeneralFeed(false)
    setFeedbackType(feedbackTypes.slide)
    setRating(0)
  }

  const openTrainingFeedback = () => {
    setRating(0)
    setFeedbackType(feedbackTypes.training)
    setGeneralFeed(true)
    methods.reset((formValues) => ({
      ...formValues,
      Feedback: '',
    }))
  }

  const openSlideFeedback = () => {
    if (!generalFeed) {
      methods.reset((formValues) => ({
        ...formValues,
        Feedback: '',
      }))
    }
    setGeneralFeed(true)
  }

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    const feedbackSuccess = () => {
      setRating(0)
      setFeedbackType(feedbackTypes.slide)
      methods.reset((formValues) => ({
        ...formValues,
        Feedback: '',
      }))
    }

    const feedbackError = (error: any) => {
      const typedError = error as APIError
      enqueueSnackbar(typedError.data.message, {
        variant: 'error',
      })
      openDialog()
    }

    if (feedbackType === feedbackTypes.general) {
      sendGeneralFeedback({
        general_message: data.Feedback,
        rating: rating || null,
        userId: user?.id,
        code: code,
        username: user?.username,
        email: user?.email,
        role: user?.role,
        lessonName: lessonName,
        url: window.location.href,
      })
        .unwrap()
        .then(feedbackSuccess)
        .catch(feedbackError)
    } else if (feedbackType === feedbackTypes.training) {
      sendTrainingFeedback({
        general_message: data.Feedback,
        slideId: `${slideIndex + 1}`,
        lessonId: lessonId,
        lessonName: lessonName,
        unitId: unitId,
        courseId: courseId,
        rating: rating || null,
        userId: user?.id,
        code: code,
        username: user?.username,
        email: user?.email,
        role: user?.role,
        url: window.location.href,
      })
        .unwrap()
        .then(feedbackSuccess)
        .catch(feedbackError)
    } else if (feedbackType === feedbackTypes.slide) {
      sendSlideFeedback({
        general_message: data.Feedback,
        slideId: `${slideIndex + 1}`,
        lessonId: lessonId,
        lessonName: lessonName,
        unitId: unitId,
        courseId: courseId,
        rating: rating || null,
        userId: user?.id,
        code: code,
        username: user?.username,
        email: user?.email,
        role: user?.role,
        url: window.location.href,
      })
        .unwrap()
        .then(feedbackSuccess)
        .catch(feedbackError)
    }
    enqueueSnackbar(translate('messages_thanks'))
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
        sx={{
          zIndex: 12000,
        }}
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
            {feedbackType === feedbackTypes.general
              ? translate('RATE THIS SITE')
              : feedbackType === feedbackTypes.training
                ? translate('RATE THIS TRAINING')
                : translate('RATE THIS SLIDE')}
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
              Give us a rating
              {feedbackType === feedbackTypes.general
                ? ` in general`
                : feedbackType === feedbackTypes.training
                  ? ` for the training`
                  : ` for the slide`}
              . Tell us if you like it or not.
            </Typography>
            <Rating
              value={rating}
              onChange={(e, value) => {
                if (value) {
                  setRating(value)
                }
                if (!sidebar) openSlideFeedback()
              }}
            />

            <Divider sx={{ my: 2 }}>{generalFeed ? '' : 'OR'}</Divider>
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
                        {sidebar ? (
                          <></>
                        ) : (
                          <Button onClick={closeGeneralFeedback}>
                            {translate('actions_close')}
                          </Button>
                        )}
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
                    sx={{ width: '100%', mb: 1 }}
                    onClick={openTrainingFeedback}
                  >
                    Rate the Training
                  </Button>
                  <Typography>Tell us how you liked the training.</Typography>
                  <Button
                    variant='soft'
                    color='info'
                    sx={{ width: '100%', mt: 2, mb: 1 }}
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
