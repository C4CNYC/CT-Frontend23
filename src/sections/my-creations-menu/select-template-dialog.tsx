import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'

import { Iconify } from '@root/src/components/iconify/Iconify'
import { useSnackbar } from '@root/src/components/snackbar'
import { useBoolean } from '@root/src/hooks/useBoolean'
import { ILesson, ILessonContent } from '@root/src/redux/services/interfaces/courseUnits.interface'
import {
  useCloneLessonMutation,
  useGetLessonsByIdsQuery,
} from '@root/src/redux/services/manager/lessons-manager'
import { useGetPropertiesQuery } from '@root/src/redux/services/manager/properties-manager'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'
import { useTranslate } from '@root/src/utils/translateHelper'

import { SelectLanguageItem } from '../menu-items-components/select-language-item'

import { LANG_ITEMS_CONT_SX } from './constants'

interface ILessonWC extends ILesson {
  contents?: ILessonContent[]
  updatedAt: string
}

interface Props {
  children?: React.ReactElement[] | React.ReactElement
  isForceOpen?: boolean
}

export function SelectTemplateDialog({ children, isForceOpen }: Props): React.ReactElement {
  const router = useRouter()
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const [selectedTemplate, selectedTemplateSet] = useState<string | null>(null)
  const [dialogopen, dialogopenOpen, dialogopenClose] = useBoolean(isForceOpen ? true : false)

  const [cloneLesson] = useCloneLessonMutation()

  const { data: properties } = useGetPropertiesQuery(
    {
      entityType: 'lesson',
      propertyName: 'LessonTemplate',
    },
    { skip: !dialogopen }
  )

  const { data: aiTemplates } = useGetLessonsByIdsQuery(
    properties?.data.map((item) => item.entityId) ?? []
  )

  const createFromTemplate = (lesson_id: string) => () => {
    cloneLesson({ lesson_id }).then((data) => {
      if ('error' in data) {
        enqueueSnackbar(translate('messages_error'))
        return
      }
      enqueueSnackbar(translate('lesson_cloned_msg'))
      router.push(
        `${STUDENT_PATH_DASHBOARD.myLessons}?${new URLSearchParams({ lessonId: data.data.id })}`,
        undefined,
        {
          shallow: true,
        }
      )
      dialogopenClose()
    })

    return
  }

  useEffect(() => {
    if (isForceOpen) dialogopenOpen()
  }, [isForceOpen])

  return (
    <>
      {children ? <Box onClick={dialogopenOpen}>{children}</Box> : null}
      {dialogopen ? (
        <Dialog
          open={dialogopen}
          fullWidth
          maxWidth='sm'
          onClose={dialogopenClose}
        >
          <DialogTitle sx={{ color: '#616161' }}>
            <Typography variant='h4'>{translate('lessons_create_lesson')}</Typography>

            <IconButton
              onClick={dialogopenClose}
              sx={{ position: 'absolute', right: '5px', top: '5px' }}
            >
              <Iconify
                icon='flowbite:close-outline'
                width={20}
                height={20}
              />
            </IconButton>
            <Typography variant='body1'>{translate('lessons_create_lesson_desc')}</Typography>
          </DialogTitle>
          <DialogContent sx={{ p: 2 }}>
            <Stack sx={LANG_ITEMS_CONT_SX}>
              <Typography variant='h6'>{translate('lesson_create_favorite_input')}</Typography>
              {aiTemplates?.map((l) => {
                let lesson = l as ILessonWC
                return (
                  <SelectLanguageItem
                    isSelected={lesson.id === selectedTemplate}
                    onSelectLang={() => selectedTemplateSet(lesson.id)}
                    imageSrc={lesson.contents?.find((c) => Boolean(c.cover))?.cover || ''}
                    langName={lesson.name}
                    description={lesson.description}
                    key={lesson.id}
                  />
                )
              })}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={!selectedTemplate}
              title={selectedTemplate ? '' : 'Select template to continue'}
              variant='contained'
              sx={{ mr: 2, fontSize: '1.5rem' }}
              onClick={createFromTemplate(selectedTemplate || '')}
            >
              {translate('lesson_create_favorite_btn')}
              <Iconify
                icon='fa6-solid:chevron-right'
                width={25}
              />
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  )
}
