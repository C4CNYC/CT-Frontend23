import { useState } from 'react'

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

import { Iconify } from '@root/src/components'
import { useBoolean } from '@root/src/hooks/useBoolean'
import { ILesson, ILessonContent } from '@root/src/redux/services/interfaces/courseUnits.interface'
import { useGetLessonsByIdsQuery } from '@root/src/redux/services/manager/lessons-manager'
import { useGetPropertiesQuery } from '@root/src/redux/services/manager/properties-manager'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

import { LANG_ITEMS_CONT_SX } from '../my-creations-menu/constants'

import { SelectLanguageItem } from './select-language-item'

interface ILessonWC extends ILesson {
  contents?: ILessonContent[]
  updatedAt: string
}

interface Props {
  children: React.ReactElement[] | React.ReactElement
}

export function SandBoxDialog({ children }: Props): React.ReactElement {
  const [selectedLang, setSelectedLang] = useState<string | null>(null)

  const router = useRouter()

  const [dialogopen, dialogopenOpen, dialogopenClose] = useBoolean(false)

  const { data: properties } = useGetPropertiesQuery(
    {
      entityType: 'lesson',
      propertyName: 'SandBoxTemplate',
    },
    { skip: !dialogopen }
  )

  const { data: aiTemplates } = useGetLessonsByIdsQuery(
    properties?.data.map((item) => item.entityId) ?? []
  )

  const openSandboxWithTemplate = (lesson_id: string) => () => {
    router.push(`${STUDENT_PATH_DASHBOARD.codePanel.sandbox}&lessonId=${lesson_id}`, undefined, {
      shallow: true,
    })
    dialogopenClose()
  }

  return (
    <>
      <Box onClick={dialogopenOpen}>{children}</Box>
      {dialogopen ? (
        <Dialog
          open={dialogopen}
          fullWidth
          maxWidth='sm'
          onClose={dialogopenClose}
        >
          <DialogTitle sx={{ color: '#616161' }}>
            <Typography variant='h4'>Select a Language</Typography>

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
            <Typography variant='body1'>It may load with a template</Typography>
          </DialogTitle>
          <DialogContent sx={{ p: 2 }}>
            <Stack sx={LANG_ITEMS_CONT_SX}>
              <Typography variant='h6'>Favorites:</Typography>
              {aiTemplates?.map((el) => {
                let lesson = el as ILessonWC
                return (
                  <SelectLanguageItem
                    isSelected={lesson.id === selectedLang}
                    onSelectLang={(lang) => setSelectedLang(lang)}
                    imageSrc={lesson.contents?.find((c) => Boolean(c.cover))?.cover || ''}
                    langName={lesson.name}
                    description={el.description}
                    key={el.description}
                  />
                )
              })}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={!selectedLang}
              title={selectedLang ? '' : 'Select template to continue'}
              variant='contained'
              sx={{ mr: 2, fontSize: '1.5rem' }}
              onClick={openSandboxWithTemplate(selectedLang || '')}
            >
              {' '}
              GO
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
