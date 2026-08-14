import React, { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  Typography,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight'
import Link from 'next/link'

import { PATH_PAGE } from '@root/src/routes/paths'
import { useTranslate } from '@root/src/utils/translateHelper'

import { SUBMIT_BTN_SX } from './constants'

interface Prop {
  children?: React.ReactElement
  isOpen?: boolean
  delay?: number
}

const ToPaymentDialog = ({ children, isOpen, delay }: Prop) => {
  const translate = useTranslate()
  const [open, setOpen] = useState(isOpen ?? false)

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  useEffect(() => {
    if (!delay) return
    const timeoutId = setTimeout(() => {
      handleOpen()
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <>
      <Box onClick={handleOpen}>{children}</Box>
      <Dialog
        fullWidth
        open={open}
        maxWidth='xs'
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle textAlign='right'></DialogTitle>
        <DialogContent>
          <Stack
            alignItems='center'
            gap={0.5}
          >
            <Typography
              variant='h5'
              fontWeight={400}
            >
              {translate('to_payment_dialog_text_1')}
            </Typography>
            <Typography
              variant='h3'
              sx={BASIC_TYPO}
              color='#43D4DD'
            >
              <Typography
                variant='h3'
                sx={{ textTransform: 'uppercase' }}
              >
                {translate('to_payment_dialog_text_2_1')}
              </Typography>
              {translate('to_payment_dialog_text_2_2')}
            </Typography>
            <Typography
              variant='h5'
              sx={BASIC_TYPO}
            >
              <Typography
                variant='h5'
                fontWeight={400}
                textTransform={'uppercase'}
              >
                {translate('to_payment_dialog_text_3_1')}
              </Typography>
              {translate('to_payment_dialog_text_3_2')}
            </Typography>
          </Stack>
          <DialogActions>
            <Stack m='0 auto 16px'>
              <Button
                variant='contained'
                LinkComponent={Link}
                href={PATH_PAGE.pricing}
                target='_blank'
                sx={{ ...SUBMIT_BTN_SX, mt: 0, gap: 1 }}
                onClick={handleClose}
              >
                {translate('to_payment_dialog_btn_1')}
                <FaArrowRight />
              </Button>
              <Button
                onClick={handleClose}
                variant='text'
                sx={ADDITIONAL_BTN}
              >
                {translate('to_payment_dialog_btn_2')}
              </Button>
            </Stack>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ToPaymentDialog

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction='up'
      ref={ref}
      {...props}
    />
  )
})

const ADDITIONAL_BTN = {
  color: '#43D4DD',
  mt: 2,
  '&:hover': {
    background: '#43D4DD80',
    color: '#2FAAB3',
    boxShadow: '0px 4px 10px rgba(67, 212, 221, 0.4)',
  },
}

const BASIC_TYPO = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 1,
  fontWeight: '400',
  textTransform: 'capitalize',
}
