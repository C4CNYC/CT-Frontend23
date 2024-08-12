import React, { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { BsCodeSlash } from '@react-icons/all-files/bs/BsCodeSlash'
import { CgScreen } from '@react-icons/all-files/cg/CgScreen'
import { MdOutlinePermMedia } from '@react-icons/all-files/md/MdOutlinePermMedia'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import { LessonContentType } from '@/redux/services/enums/lesson-content-type.enum'
import {
  useGetLessonContentByIdQuery,
  useUpdateLessonContentMutation,
} from '@/redux/services/manager/lesson-content-manager'
import { useGetLessonIntegrationsQuery } from '@/redux/services/manager/lessons-manager'
import { useTranslate } from '@/utils/translateHelper'
import { SettingsBtn } from '@root/src/components/remirror-editor/controls-btn'

import Preferences from '../Modals/Preferences'

import { LessonContentContext } from './LessonContent.context'
import SkeletonContentCode from './SkeletonContentCode'
import SkeletonContentMulti from './SkeletonContentMulti'
import StepCode from './StepCode'
import StepMultimedia from './StepMultimedia'

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

const DEFAULT_COLOR = '#F6F9FC'

export default function StepContentEditor(): React.ReactElement {
  const { lessonId, stepId } = useRouter().query
  const { enqueueSnackbar } = useSnackbar()
  const [locked, setLocked] = useState(false)
  const [open, setOpen] = useState<boolean>(false)
  const [bgColor, setBgColor] = useState<string>(DEFAULT_COLOR)
  const translate = useTranslate()
  const [updateContent] = useUpdateLessonContentMutation()
  const { data: integrations, isLoading: isIntegrationLoading } = useGetLessonIntegrationsQuery(
    { id: lessonId as string },
    { skip: !lessonId || !stepId }
  )
  const { data, isFetching, isLoading } = useGetLessonContentByIdQuery(
    { lessonId: lessonId as string, id: stepId as string },
    { skip: !lessonId || !stepId }
  )

  const [bodyType, setBodyType] = useState<LessonContentType>(
    (localStorage.getItem('bodyType') as LessonContentType) || LessonContentType.Editable
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
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('bodyType') && data?.type) {
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
    <LessonContentContext.Provider
      value={{
        locked,
        lockedHandler: setLocked,
      }}
    >
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
          Any content in the current editor can be deleted if you switch now
        </DialogTitle>
        <DialogTitle
          textAlign='center'
          typography='h6'
        >
          Are you sure you want to switch?
        </DialogTitle>
        <DialogActions sx={{ gap: 2, justifyContent: 'center' }}>
          <Button
            onClick={() => setOpen(false)}
            variant='outlined'
            color='error'
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false)
              setBodyType(
                bodyType === LessonContentType.Editable
                  ? LessonContentType.Code
                  : LessonContentType.Editable
              )
            }}
            variant='outlined'
            color='success'
          >
            Yes. I understand
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
                if (newValue === LessonContentType.Code || newValue === LessonContentType.Editable)
                  setOpen(true)
                else setBodyType(newValue)
              }}
              aria-label='select slide type'
            >
              <ToggleButton
                value={LessonContentType.Editable}
                aria-label='Standard'
                sx={{ gap: 1 }}
              >
                <MdOutlinePermMedia size='20px' /> {translate('slide_standard')}
              </ToggleButton>
              <Divider
                orientation='vertical'
                flexItem
              />
              <ToggleButton
                value={LessonContentType.Code}
                aria-label='HTML'
                sx={{ gap: 1 }}
              >
                <BsCodeSlash size='20px' /> HTML
              </ToggleButton>
            </StyledToggleButtonGroup>
            <Preferences
              defaultValues={{ ...data! }}
              contentId={data?.id as string}
              lessonId={lessonId as string}
              defaultTab={0}
            >
              <SettingsBtn />
            </Preferences>
          </div>
          <div
            style={{
              gap: 16,
              display: 'flex',
              alignItems: 'center',
              opacity: 0.5,
            }}
          >
            <CgScreen size='30px' />
            {translate('preview')}
          </div>
        </Box>
        <Box
          sx={{
            position: 'relative',
            height: 'calc(100vh - 80px)',
            overflow: 'scroll',
          }}
        >
          {bodyType === LessonContentType.Code ? (
            <StepCode
              content={data?.body || ''}
              integrations={integrations ?? []}
              onSubmit={onSubmit}
              data={data!}
              lessonId={lessonId as string}
            />
          ) : (
            <StepMultimedia
              content={data?.type === LessonContentType.Editable ? data?.body : ''}
              onSubmit={onSubmit}
              data={data!}
              lessonId={lessonId as string}
              bgColor={bgColor}
              setBgColor={setBgColor}
            />
          )}
        </Box>
      </Box>
    </LessonContentContext.Provider>
  )
}
