import React, { useContext, useEffect, useState } from 'react'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Link,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { BsAspectRatio } from '@react-icons/all-files/bs/BsAspectRatio'
import { BsClipboard } from '@react-icons/all-files/bs/BsClipboard'
import { BsCodeSlash } from '@react-icons/all-files/bs/BsCodeSlash'
import { CgScreen } from '@react-icons/all-files/cg/CgScreen'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import {
  useGetLessonContentByIdQuery,
  useUpdateLessonContentMutation,
} from '@/redux/services/manager/lesson-content-manager'
import { useGetLessonIntegrationsQuery } from '@/redux/services/manager/lessons-manager'
import { useTranslate } from '@/utils/translateHelper'
import { Iconify, Label } from '@root/src/components'
import { SettingsBtn } from '@root/src/components/remirror-editor/controls-btn'
import { LessonContentType } from '@root/src/redux/enums/lesson-content-type.enum'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

import LessonSchareModal from '../Modals/LessonShareModal'
import Preferences from '../Modals/Preferences'

import { EditorSelector } from './EditorSelector'
import { LessonContentContext } from './LessonContent.context'
import SkeletonContentCode from './SkeletonContentCode'
import SkeletonContentMulti from './SkeletonContentMulti'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButton-root': {
    paddingBottom: 2,
    paddingTop: 2,
    '&.Mui-selected': {
      backgroundColor: theme.palette.background.default,
      color: '#4396e6',
      '&:hover': {
        backgroundColor: theme.palette.background.default,
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))

const DEFAULT_COLOR = '' // '#F6F9FC'

export default function StepContentEditor(): React.ReactElement {
  const { locked } = useContext(LessonContentContext)
  const { lessonId, stepId } = useRouter().query
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState<boolean>(false)
  const [proposal, setProposal] = useState<string>('')
  const [bgColor, setBgColor] = useState<string>(DEFAULT_COLOR)
  const translate = useTranslate()
  const [updateContent] = useUpdateLessonContentMutation()
  const { data: integrations, isLoading: isIntegrationLoading } = useGetLessonIntegrationsQuery(
    { id: lessonId as string },
    { skip: !lessonId || !stepId }
  )
  const {
    data,
    isFetching,
    isLoading,
    refetch: refetchLessonContent,
  } = useGetLessonContentByIdQuery(
    { lessonId: lessonId as string, id: stepId as string },
    { skip: !lessonId || !stepId }
  )

  const [bodyType, setBodyType] = useState<LessonContentType>(
    (localStorage.getItem('bodyType') as LessonContentType) || LessonContentType.Code
  )

  useEffect(() => {
    localStorage.setItem('bodyType', bodyType)
  }, [bodyType])

  const onSubmit = async (body: string): Promise<void> => {
    try {
      await updateContent({
        lessonId: lessonId as string,
        id: stepId as string,
        type: bodyType,
        bg_color: bgColor,
        body,
      }).unwrap()
      enqueueSnackbar(translate('slide_content_updated'))
      refetchLessonContent()
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  useEffect(() => {
    if (data?.type) {
      setBodyType(data.type)
    }
    setBgColor(data?.bg_color ?? DEFAULT_COLOR)
  }, [data])

  if (isFetching || isLoading || isIntegrationLoading) {
    return bodyType === LessonContentType.Editable ? (
      <SkeletonContentMulti />
    ) : (
      <SkeletonContentCode />
    )
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <DialogTitle
          textAlign='center'
          typography='h5'
          color='error'
        >
          {translate('slide_switch_tab_dialog_title')}
        </DialogTitle>
        <DialogTitle
          textAlign='center'
          typography='h6'
        >
          {translate('slide_switch_tab_dialog_subtitle')}
        </DialogTitle>
        <DialogActions sx={{ gap: 2, justifyContent: 'center' }}>
          <Button
            onClick={() => {
              setOpen(false)
              setProposal(bodyType)
            }}
            variant='outlined'
            color='error'
          >
            {translate('actions_cancel')}
          </Button>
          <Button
            onClick={() => {
              setOpen(false)
              setBodyType(proposal as LessonContentType)
            }}
            variant='outlined'
            color='success'
          >
            {translate('slide_switch_tab_dialog_confirm')}
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={(theme) => ({
          position: 'relative',
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.default,
        })}
      >
        <Box
          sx={(theme) => ({
            position: 'relative',
            height: '48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: theme.palette.background.default,
            px: '15px',
          })}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 144,
            }}
          >
            <StyledToggleButtonGroup
              size='small'
              exclusive
              value={bodyType}
              onChange={(_, newValue) => {
                if (bodyType === newValue) return
                setProposal(newValue)
                setOpen(true)
              }}
              aria-label='select slide type'
            >
              <Divider
                orientation='vertical'
                flexItem
              />
              <ToggleButton
                value={LessonContentType.TinyMce}
                aria-label='TinyMce'
                sx={{ gap: 1 }}
              >
                <BsAspectRatio size='20px' /> {translate('slide_switch_tabs_standard')}
              </ToggleButton>
              <ToggleButton
                value={LessonContentType.Code}
                aria-label='HTML'
                sx={{ gap: 1 }}
              >
                <BsCodeSlash size='20px' /> {translate('slide_switch_tabs_html')}
              </ToggleButton>
              <ToggleButton
                value={LessonContentType.Editable}
                aria-label='Remirror'
                sx={{ gap: 1 }}
              >
                <BsClipboard size='20px' /> {translate('slide_switch_tabs_remirror')}
              </ToggleButton>
            </StyledToggleButtonGroup>
            {locked ? <Label color='info'>{translate('slide_content_changed_barge')}</Label> : null}
            <Preferences
              defaultValues={{ ...data! }}
              contentId={data?.id as string}
              lessonId={lessonId as string}
              defaultTab={0}
            >
              <SettingsBtn />
            </Preferences>
          </div>
          <Stack
            direction='row'
            gap={2}
          >
            <LessonSchareModal>
              <Button sx={{ gap: 1, color: '#68767F' }}>
                <Iconify icon='ph:share-fat' />
                {translate('lesson_share_button')}
              </Button>
            </LessonSchareModal>
            <div
              style={{
                gap: 16,
                display: 'flex',
                alignItems: 'center',
                opacity: 0.5,
              }}
            >
              <CgScreen size='30px' />
              <Link
                href={STUDENT_PATH_DASHBOARD.codePanel.root + '?lessonId=' + lessonId}
                target='_blank'
              >
                {translate('preview')}
              </Link>
            </div>
          </Stack>
        </Box>

        <EditorSelector
          bodyType={bodyType}
          content={data?.body || ''}
          integrations={integrations ?? []}
          onSubmit={onSubmit}
          data={data!}
          lessonId={lessonId as string}
          bgColor={bgColor}
          setBgColor={setBgColor}
        />
      </Box>
    </>
  )
}
