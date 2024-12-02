import { Box, Card, Dialog, DialogContent, DialogTitle, IconButton, Stack } from '@mui/material'
import { useRouter } from 'next/router'

import { Iconify } from '@root/src/components'
import { useBoolean } from '@root/src/hooks/useBoolean'
import { ILesson, ILessonContent } from '@root/src/redux/services/interfaces/courseUnits.interface'
import { useGetLessonsByIdsQuery } from '@root/src/redux/services/manager/lessons-manager'
import { useGetPropertiesQuery } from '@root/src/redux/services/manager/properties-manager'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

interface ILessonWC extends ILesson {
  contents?: ILessonContent[]
  updatedAt: string
}

interface Props {
  children: React.ReactElement[] | React.ReactElement
}

export function SandBoxDialog({ children }: Props): React.ReactElement {
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

  const createFromTemplate = (lesson_id: string) => () => {
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
          maxWidth='md'
          onClose={dialogopenClose}
        >
          <DialogTitle sx={{ pb: 2 }}>Select a Language </DialogTitle>
          <DialogContent sx={{ p: 2 }}>
            <Box
              gap={3}
              display='flex'
              sx={{
                flexDirection: 'column',
                padding: '1rem',
                borderRadius: '1rem',
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
                        flexBasis={1}
                        sx={{ position: 'relative' }}
                      >
                        {lesson?.contents && lesson?.contents?.length ? (
                          <img
                            alt='Symbol of this lesson'
                            src={lesson.contents.find((c) => Boolean(c.cover))?.cover || ''}
                            style={{
                              width: '96px',
                              height: '96px',
                              borderRadius: 1,
                              objectFit: 'contain',
                            }}
                          />
                        ) : null}
                      </Box>

                      <div
                        style={{
                          flexBasis: 1,
                          flexGrow: 3,
                        }}
                      >
                        <h3>{lesson.name}</h3>
                        {lesson.description}
                      </div>
                      <Stack
                        spacing={1.5}
                        sx={{ position: 'relative', p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5) }}
                      >
                        <IconButton sx={{ position: 'absolute', bottom: 20, right: 8 }}>
                          <Iconify icon='eva:arrow-ios-forward-fill' />
                        </IconButton>
                      </Stack>
                    </Box>
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
