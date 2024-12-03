import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  Link,
} from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, Iconify, RHFTextField, useSnackbar } from '@root/src/components'
import { useCopyToClipboard } from '@root/src/hooks'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'
import { useTranslate } from '@root/src/utils/translateHelper'

interface LessonSchareModalProps {
  children?: React.ReactElement
}

interface FormShareModalProps {
  title: string
}

const LessonSchareModal = ({ children }: LessonSchareModalProps) => {
  const { query, push } = useRouter()
  const [open, setOpenDialog] = useState<boolean>(false)
  const { copy } = useCopyToClipboard()
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()
  const generateAICourseSchema = Yup.object().shape({
    title: Yup.string(),
  })
  const [socialText, setSocialText] = useState(translate('share_modal_share_text'))

  const methods = useForm<FormShareModalProps>({
    resolver: yupResolver(generateAICourseSchema),
    mode: 'all',
    defaultValues: { title: socialText },
  })

  const onCopy = () => {
    copy(`
      ${window.location.origin}${STUDENT_PATH_DASHBOARD.codePanel.root}?lessonId=${query.lessonId}
    `)
    enqueueSnackbar(translate('messages_copied'))
  }

  const onSubmit = () => {}

  const onChangeSocialText = (e: any) => {
    setSocialText(e.target.value)
  }

  return (
    <>
      <Box
        onClick={() => {
          setOpenDialog(true)
        }}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpenDialog(false)
        }}
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          },
        }}
        PaperProps={{
          sx: {
            position: 'relative',
          },
        }}
      >
        <DialogTitle sx={{ py: 1 }}>
          <Typography variant='h5'>{translate('share_modal_title')}</Typography>
          <Typography variant='body1'>{translate('share_modal_subtitle')}</Typography>
          <IconButton
            onClick={() => setOpenDialog(false)}
            sx={{ position: 'absolute', top: '5px', right: '5px' }}
          >
            <Iconify
              icon='ion:close'
              width='20px'
            />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Button
            onClick={onCopy}
            fullWidth
            sx={{
              background: '#76DC37',
              color: '#fff',
              '&:hover': {
                background: '#76DC3788',
              },
            }}
          >
            {translate('share_modal_copy_link')}
          </Button>
          <Divider sx={{ my: 2 }}>{translate('share_modal_or')}</Divider>
          <Typography
            sx={{ ml: 1 }}
            variant='body1'
            gutterBottom
          >
            {translate('share_modal_assign_class')}
          </Typography>
          <Button
            onClick={() => push(STUDENT_PATH_DASHBOARD.class.root)}
            fullWidth
            sx={CREATE_QUEST_BTN_SX}
          >
            <Iconify
              icon='tabler:mountain'
              color='#5D6C75'
            />
            {translate('share_modal_create_quest')}
          </Button>
          <Divider sx={{ my: 2 }}>{translate('share_modal_or')}</Divider>
          <Typography
            sx={{ ml: 1 }}
            variant='body1'
            gutterBottom
          >
            {translate('share_modal_share_social')}
          </Typography>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <RHFTextField
              name='title'
              multiline
              rows={2}
              onChange={onChangeSocialText}
              value={socialText}
            />
          </FormProvider>
          <Stack
            direction='row'
            py={2}
            gap={1}
          >
            <Link
              target='_blank'
              href={`https://twitter.com/intent/tweet?text=${socialText}%20@codetriber%20%23AIForEducation`}
            >
              <Button sx={SHARE_BTN_SX}>
                <Iconify icon='ri:twitter-x-line' />
              </Button>
            </Link>
            {/* <Link href=''>
              <Button sx={SHARE_BTN_SX}>
                <Iconify icon='basil:facebook-outline' />
              </Button>
            </Link>
            <Link href=''>
              <Button sx={SHARE_BTN_SX}>
                <Iconify icon='basil:linkedin-outline' />
              </Button>
            </Link> */}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LessonSchareModal

const SHARE_BTN_SX = {
  background: '#0198ED1A',
  color: '#364954',
  '&:hover': { background: '#0198ED33' },
}
const CREATE_QUEST_BTN_SX = {
  background: '#EE467A33',
  color: '#5D6C75',
  gap: 1,
  '&:hover': {
    background: '#EE467A55',
  },
}
