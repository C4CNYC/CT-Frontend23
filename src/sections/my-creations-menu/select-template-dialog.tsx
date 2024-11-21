import {
  Box,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  ListItemText,
  Stack,
} from '@mui/material'
import { useRouter } from 'next/router'

import { Image } from '@/components/image/Image'
import { Iconify, useSnackbar } from '@root/src/components'
import { useBoolean } from '@root/src/hooks/useBoolean'
import { ILesson, ILessonContent } from '@root/src/redux/services/interfaces/courseUnits.interface'
import {
  useCloneLessonMutation,
  useGetLessonsByIdsQuery,
} from '@root/src/redux/services/manager/lessons-manager'
import { useGetPropertiesQuery } from '@root/src/redux/services/manager/properties-manager'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'
import { fDateTime } from '@root/src/utils'
import { useTranslate } from '@root/src/utils/translateHelper'

interface ILessonWC extends ILesson {
  contents?: ILessonContent[]
  updatedAt: string
}

interface Props {
  children: React.ReactElement[] | React.ReactElement
}

export function SelectTemplateDialog({ children }: Props): React.ReactElement {
  const [cloneLesson] = useCloneLessonMutation()
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()
  const router = useRouter()
  const [dialogopen, dialogopenOpen, dialogopenClose] = useBoolean(false)
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

  return (
    <>
      <Box onClick={dialogopenOpen}>{children}</Box>
      {dialogopen ? (
        <Dialog
          open={dialogopen}
          fullWidth
          maxWidth='md'
          onClose={dialogopenClose}
        >
          <DialogTitle sx={{ pb: 2 }}>{translate('lessons_create_lesson')}</DialogTitle>
          <DialogContent sx={{ p: 2 }}>
            <Box
              gap={3}
              display='grid'
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              }}
            >
              {aiTemplates?.map((l) => {
                let lesson = l as ILessonWC
                return (
                  <Card
                    key={lesson.id}
                    onClick={createFromTemplate(lesson.id)}
                  >
                    <Box
                      gap={0.5}
                      display='flex'
                      sx={{ p: 1 }}
                    >
                      <Box
                        flexGrow={1}
                        sx={{ position: 'relative' }}
                      >
                        {lesson?.contents && lesson?.contents?.length ? (
                          <Image
                            alt={lesson.contents[0].cover}
                            src={lesson.contents[0].cover}
                            sx={{ width: 1, height: 164, borderRadius: 1 }}
                          />
                        ) : null}
                      </Box>
                    </Box>

                    <ListItemText
                      sx={{ p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5) }}
                      primary={`Published at: ${fDateTime(lesson.updatedAt)}`}
                      secondary={<Link color='inherit'>{lesson.name}</Link>}
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
                          label: lesson.contents?.length + ' slides',
                        },
                        // {
                        //   icon: (
                        //     <Iconify
                        //       icon='solar:users-group-rounded-bold'
                        //       sx={{ color: 'primary.main' }}
                        //     />
                        //   ),
                        //   label: `${lesson.}`,
                        // },
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
                )
              })}
            </Box>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  )
}
