import { useState } from 'react'

import { Draggable } from '@hello-pangea/dnd'
import { LoadingButton } from '@mui/lab'
import { Box, Card, Divider, IconButton, MenuItem, Stack, Typography } from '@mui/material'
import { CgMoreVerticalAlt } from '@react-icons/all-files/cg/CgMoreVerticalAlt'
import { FaRegCopy } from '@react-icons/all-files/fa6/FaRegCopy'
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2'
import { GoPencil } from '@react-icons/all-files/go/GoPencil'
import { RxDragHandleDots2 } from '@react-icons/all-files/rx/RxDragHandleDots2'
import { useRouter } from 'next/router'

import { ILesson } from '@/redux/services/interfaces/courseUnits.interface'
import {
  useDeleteLessonMutation,
  useCloneLessonMutation,
} from '@/redux/services/manager/lessons-manager'
import CreateLessonDialog from '@/sections/dashboard/lessons/CreateLessonDialog/CreateLessonDialog'
import { useTranslate } from '@/utils/translateHelper'
import { ConfirmDialog } from '@root/src/components/confirm-dialog/ConfirmDialog'
import { Label } from '@root/src/components/label/Label'
import { MenuPopover } from '@root/src/components/menu-popover/MenuPopover'
import { useSnackbar } from '@root/src/components/snackbar'
import { TextMaxLine } from '@root/src/components/text-max-line/TextMaxLine'

interface Props {
  lesson: ILesson
  index?: number
  refetch?: () => void
  lock?: boolean | undefined
}

export default function LessonCard({
  lesson,
  index,
  refetch,
  lock,
}: Props): React.ReactElement | null {
  const router = useRouter()
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const [openConfirm, setOpenConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

  const [deleteLesson] = useDeleteLessonMutation()
  const [cloneLesson] = useCloneLessonMutation()

  const onDelete = async (): Promise<void> => {
    setLoading(true)
    if (lesson.id) {
      try {
        await deleteLesson({ id: lesson.id }).unwrap()
        if (refetch) refetch()
        enqueueSnackbar(translate('lessons_deleted_msg'))
      } catch (e: any) {
        enqueueSnackbar(e.data.message, {
          variant: 'error',
        })
      }
      setLoading(false)
    }
  }

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true)
  }

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false)
  }

  const handleOpenPopover = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    setOpenPopover(event.currentTarget)
    event.stopPropagation()
    event.preventDefault()
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  const openContentCreationTool = (): void => {
    router.push(`${router.pathname}?${new URLSearchParams({ lessonId: lesson.id })}`, undefined, {
      shallow: true,
    })
  }
  const handleClone = (lesson_id: string): void => {
    cloneLesson({ lesson_id }).then((data) => {
      if ('error' in data) {
        enqueueSnackbar(translate('messages_error'))
        return
      }
      enqueueSnackbar(translate('lesson_cloned_msg'))
      router.push(
        `${router.pathname}?${new URLSearchParams({ lessonId: data.data.id })}`,
        undefined,
        {
          shallow: true,
        }
      )
    })

    return
  }

  return (
    <>
      <Draggable
        draggableId={lesson.id}
        index={index ?? 0}
      >
        {(provided) => (
          <Card
            {...provided.draggableProps}
            ref={provided.innerRef}
            onClick={openContentCreationTool}
            component='a'
            href='#'
            sx={{
              textDecoration: 'none',
              p: 2.5,
              width: 1,
              boxShadow: 0,
              bgcolor: (theme) => theme.palette.background.paper,
              maxWidth: 'auto',
              border: (theme) => `solid 1px ${theme.palette.divider}`,
              '&:hover': {
                border: (theme) => `solid 1px ${theme.palette.text.secondary}`,
              },
            }}
          >
            <Stack
              direction='row'
              alignItems='center'
              sx={{
                top: 8,
                right: 8,
                position: 'absolute',
              }}
            >
              <IconButton
                sx={{ mr: '5px' }}
                {...provided.dragHandleProps}
              >
                <RxDragHandleDots2 size='24px' />
              </IconButton>
              <IconButton
                color={openPopover ? 'inherit' : 'default'}
                onClick={handleOpenPopover}
              >
                <CgMoreVerticalAlt />
              </IconButton>
            </Stack>
            <Label
              variant='soft'
              color={lesson.active ? 'success' : 'error'}
              sx={{
                textTransform: 'uppercase',
                mr: 'auto',
                position: 'absolute',
                top: 10,
                left: 10,
              }}
            >
              {lesson.active ? translate('active') : translate('not_active')}
            </Label>
            {lock || lesson.id.endsWith('000000000000') ? (
              <Label
                variant='soft'
                color={'error'}
                sx={{
                  textTransform: 'uppercase',
                  mr: 'auto',
                  position: 'absolute',
                  top: 10,
                  left: 80,
                }}
              >
                Special
              </Label>
            ) : (
              ''
            )}
            <Box
              component='img'
              src='/assets/icons/files/ic_file.svg'
              sx={{
                width: 40,
                height: 40,
                mt: 4,
              }}
            />

            <TextMaxLine
              variant='h6'
              sx={{
                mt: 1,
                mb: 0.5,
              }}
            >
              {lesson.name}
            </TextMaxLine>

            <Stack
              direction='row'
              alignItems='center'
              spacing={0.75}
              sx={{
                typography: 'caption',
                color: 'text.disabled',
              }}
            >
              <Typography
                variant='caption'
                noWrap
              >
                {lesson.description}
              </Typography>
              <Box
                sx={{
                  width: 2,
                  height: 2,
                  borderRadius: '50%',
                  bgcolor: 'currentColor',
                }}
              />
            </Stack>
          </Card>
        )}
      </Draggable>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow='right-top'
        sx={{ width: 160 }}
      >
        <CreateLessonDialog
          isEdit
          id={lesson.id}
          defaultValues={{
            name: lesson.name,
            description: lesson.description,
            active: lesson.active,
            head: lesson?.head || '',
            independent: lesson.independent,
            type: lesson.type,
            duration: lesson.duration,
            slug: lesson.slug,
          }}
          refetch={refetch}
        >
          <MenuItem>
            <GoPencil />
            {translate('actions_edit')}
          </MenuItem>
        </CreateLessonDialog>

        <MenuItem
          onClick={() => {
            handleClone(lesson.id)
          }}
        >
          <FaRegCopy />
          {translate('actions_clone')}
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />
        {lock || lesson.id.endsWith('000000000000') ? (
          <></>
        ) : (
          <MenuItem
            onClick={() => {
              handleOpenConfirm()
              handleClosePopover()
            }}
            sx={{
              color: 'error.main',
            }}
          >
            <FiTrash2 />
            {translate('actions_delete')}
          </MenuItem>
        )}
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate('actions_delete')}
        content={translate('messages_delete_question')}
        action={
          <LoadingButton
            variant='contained'
            color='error'
            onClick={onDelete}
            loading={loading}
          >
            {translate('actions_delete')}
          </LoadingButton>
        }
      />
    </>
  )
}
