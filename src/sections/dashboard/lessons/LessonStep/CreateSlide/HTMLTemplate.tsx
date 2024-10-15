import React from 'react'

import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import Box from '@mui/system/Box'
import Stack from '@mui/system/Stack'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Image } from '@/components/image/Image'
import { Iconify } from '@root/src/components'
import { useSnackbar } from '@root/src/components/snackbar'
import { LessonContentType } from '@root/src/redux/enums/lesson-content-type.enum'
import { ILessonContent } from '@root/src/redux/services/interfaces/courseUnits.interface'
import {
  useCreateLessonContentMutation,
  useGetLessonContentQuery,
} from '@root/src/redux/services/manager/lesson-content-manager'
import { fDateTime } from '@root/src/utils/formatTime'
import { useTranslate } from '@root/src/utils/translateHelper'

type Props = {
  open: boolean
  onClose: () => void
  lessonId: string
  lessonName: string
}

export function HTMLTemplate({ open, onClose, lessonId, lessonName }: Props) {
  const { data: lessonContentTemplates, isLoading } = useGetLessonContentQuery({
    lessonId: '9e2a2fa4-a9f0-4c18-beae-f439ce09d9bd',
  })
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const translate = useTranslate()
  const [createLessonContent] = useCreateLessonContentMutation()

  const selectThisTemplate =
    (template: ILessonContent) => async (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()

      let { id: stepId } = await createLessonContent({
        lessonId,
        draft: false,
        active: true,
        title: template.title,
        body: template.body,
        type: LessonContentType.Code,
      }).unwrap()
      router.push(
        `${router.pathname}?${new URLSearchParams({
          ...router.query,
          stepId,
        })}`,
        undefined,
        { shallow: true }
      )
      enqueueSnackbar('Slide created successfully', { variant: 'success' })
      onClose()
    }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='lg'
    >
      <DialogTitle>{translate('slide_add')}</DialogTitle>
      <DialogContent>
        <Stack
          spacing={2}
          direction='row'
        >
          <List>
            {lessonContentTemplates?.length
              ? lessonContentTemplates
                  .filter((content) => content.active)
                  .map((content) => (
                    <ListItem
                      key={content.id}
                      value={content.id}
                    >
                      {content.title}
                    </ListItem>
                  ))
              : null}
          </List>

          <Box
            gap={3}
            display='grid'
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            sx={{}}
          >
            {lessonContentTemplates &&
              lessonContentTemplates
                .filter((content) => content.active)
                .map((content) => (
                  <Card key={content.id}>
                    <Box
                      gap={0.5}
                      display='flex'
                      sx={{ p: 1 }}
                    >
                      <Box
                        flexGrow={1}
                        sx={{ position: 'relative' }}
                      >
                        <Image
                          alt={content.cover}
                          src={content.cover}
                          sx={{ width: 1, height: 164, borderRadius: 1 }}
                        />
                      </Box>
                    </Box>
                    <ListItemText
                      sx={{ p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5) }}
                      primary={`Posted date: ${fDateTime(content.createdAt)}`}
                      secondary={
                        <Link
                          onClick={selectThisTemplate(content)}
                          color='inherit'
                          href={''}
                        >
                          {content.title}
                        </Link>
                      }
                      primaryTypographyProps={{ typography: 'caption', color: 'text.disabled' }}
                      secondaryTypographyProps={{
                        mt: 1,
                        noWrap: true,
                        component: 'span',
                        color: 'text.primary',
                        typography: 'subtitle1',
                      }}
                    />

                    <Stack
                      spacing={1.5}
                      sx={{ position: 'relative', p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5) }}
                    >
                      <IconButton sx={{ position: 'absolute', bottom: 20, right: 8 }}>
                        <Iconify icon='eva:more-vertical-fill' />
                      </IconButton>

                      {[
                        {
                          icon: (
                            <Iconify
                              icon='mingcute:location-fill'
                              sx={{ color: 'error.main' }}
                            />
                          ),
                          label: content.complexity,
                        },
                        {
                          icon: (
                            <Iconify
                              icon='solar:users-group-rounded-bold'
                              sx={{ color: 'primary.main' }}
                            />
                          ),
                          label: `${content.type} Booked`,
                        },
                      ].map((item) => (
                        <Stack
                          key={item.label}
                          spacing={1}
                          direction='row'
                          alignItems='center'
                          sx={{ typography: 'body2' }}
                        >
                          {item.icon}
                          {item.label}
                        </Stack>
                      ))}
                    </Stack>
                  </Card>
                ))}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
