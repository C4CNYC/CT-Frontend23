import React, { useEffect, useRef, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Typography,
  useTheme,
} from '@mui/material'
import { Stack } from '@mui/system'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'

import { FormProvider, MotionContainer, varZoom } from '@root/src/components'
import { useSendGeneralFeedbackMutation } from '@root/src/redux/services/feedback'
import { useSelector } from '@root/src/redux/store'
import { useTranslate } from '@root/src/utils/translateHelper'

import { animateCustomBg, CreateFeedbackSchema, FormValuesProps, Props } from './constants'
import FeedbackFields from './FeedbackFields'

function NextLessonDialog({ open, onClose, onSubmitLesson, lessonName }: Props) {
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const user = useSelector((state) => state.global.user)
  const code = useSelector((state) => state.codePanelGlobal.code)

  const [rating, setRating] = useState<number | null>(null)

  const [sendGeneralFeedback] = useSendGeneralFeedbackMutation()

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateFeedbackSchema),
    mode: 'all',
  })

  const onSubmit = async (data: FormValuesProps) => {
    const general_message =
      'Feedback message: ' +
      (data.feedbackMsg ?? '-') +
      'What I like: ' +
      (data.feedbackSelectPositive ?? '-') +
      'Problem: ' +
      (data.feedbackSelectNegative ?? '-')
    try {
      if (rating) {
        sendGeneralFeedback({
          general_message,
          rating: rating,
          userId: user?.id,
          code,
          username: user?.username,
          email: user?.email,
          role: user?.role,
          lessonName,
          url: window.location.href,
        }).unwrap()
      }
      onSubmitLesson()
      enqueueSnackbar(translate('next_lesson_snackbar_text'))
      onClose()
      setRating(null)
      methods.reset({
        feedbackMsg: '',
        feedbackSelectNegative: undefined,
        feedbackSelectPositive: undefined,
      })
    } catch (error: any) {
      enqueueSnackbar(error ?? 'Error', { variant: 'error' })
    }
  }

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    if (open) {
      timerRef.current = setTimeout(() => {
        onSubmitLesson()
        onClose()
        enqueueSnackbar(translate('next_lesson_snackbar_text'))
      }, 6000)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [open])

  useEffect(() => {
    if (rating && timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }, [rating])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'xs'}
      fullWidth
    >
      <DialogTitle
        variant='h4'
        textAlign={'center'}
        sx={{
          pb: 1,
        }}
      >
        {translate('next_lesson_modal_title')}
      </DialogTitle>
      <DialogContent>
        <Stack
          alignItems={'center'}
          gap={1}
          pb={2}
        >
          <Typography variant='subtitle1'>{translate('next_lesson_modal_subtitle_1')}</Typography>
          <Typography variant='subtitle1'>{translate('next_lesson_modal_subtitle_2')}</Typography>
          <MotionContainer
            action
            animate={Boolean(rating)}
            variants={varZoom().out}
            sx={{ pt: 2, height: Boolean(rating) ? 0 : 'auto' }}
          >
            <Rating
              onChange={(e, rating) => {
                setRating(rating ?? 0)
              }}
              defaultValue={0}
              value={rating}
            />
          </MotionContainer>

          <Box
            sx={{
              height: !Boolean(rating) ? 0 : 'auto',
            }}
          >
            <MotionContainer
              action
              animate={Boolean(rating)}
              variants={varZoom().in}
            >
              <FormProvider methods={methods}>
                <FeedbackFields />
              </FormProvider>
            </MotionContainer>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-around' }}>
        <Button onClick={onClose}>{translate('next_lesson_modal_btn_1')}</Button>
        <MotionContainer
          action
          animate={open}
          variants={animateCustomBg()}
          sx={{ borderRadius: '8px' }}
        >
          <Button
            sx={{ color: theme.palette.common.white }}
            onClick={methods.handleSubmit(onSubmit)}
          >
            {translate('next_lesson_modal_btn_2')}
          </Button>
        </MotionContainer>
      </DialogActions>
    </Dialog>
  )
}

export default NextLessonDialog
