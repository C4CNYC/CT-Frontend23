import { useEffect, useMemo } from 'react'
import { useState } from 'react'

import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd'
import { LoadingButton } from '@mui/lab'
import { Box, Button, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { FiSettings } from '@react-icons/all-files/fi/FiSettings'
import { ImPlus } from '@react-icons/all-files/im/ImPlus'
import { useSnackbar } from 'notistack'

import { ILesson } from '@/redux/services/interfaces/courseUnits.interface'
import {
  useGetModuleWithLessonsQuery,
  useRemoveLessonFromModuleMutation,
  useUpdateModuleLessonMutation,
} from '@/redux/services/manager/modules-manager'
import CreateLessonDialog from '@/sections/dashboard/lessons/CreateLessonDialog/CreateLessonDialog'
import { useTranslate } from '@/utils/translateHelper'
import CustomPopover, { usePopover } from '@root/src/components/custom-popover'
import { useBoolean } from '@root/src/hooks/use-boolean'
import InsertExisistingLessonModal from '@root/src/sections/dashboard/lessons/InsertExisistingLessonModal'
import { useGetLessonsQuery } from 'src/redux/services/manager/lessons-manager'

import SkeletonList from '../../lessons/LessonStep/Modals/SkeletonList'
import CreateModuleDialog from '../CreateModuleDialog'

import { LESSON_LIST_BLOCK_SX, MENU_ITEM_SX, getAddLessonBtnSx, getModuleBtnSx } from './constants'
import ModuleLessonItem from './ModuleLessonItem'

// Reorder lesson in the array
const reorderLesson = (list: ILesson[], startIndex: number, endIndex: number): ILesson[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result.map((el, i) => ({ ...el, sort: i }))
}

interface Props {
  moduleId: string
}

export default function ModuleLessonList({ moduleId }: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()
  const theme = useTheme()

  const popover = usePopover()
  const {
    value: isOpenInsertExisistingLessonModal,
    onTrue: handleOpenInsertExisistingLessonModal,
    onFalse: handleCloseInsertExisistingLessonModal,
  } = useBoolean(false)

  const moduleBtnSx = useMemo(() => getModuleBtnSx(theme), [theme])
  const addLessonBtnSx = useMemo(() => getAddLessonBtnSx(theme), [theme])

  const [lessons, setLessons] = useState<ILesson[]>([])

  const { data, isLoading } = useGetLessonsQuery({ module_id: moduleId })

  const { data: module, isLoading: isLoadingModule } = useGetModuleWithLessonsQuery(
    { id: moduleId },
    { skip: !moduleId }
  )

  const [updateModuleLesson] = useUpdateModuleLessonMutation()
  const [removeModuleLesson] = useRemoveLessonFromModuleMutation()

  const getDurationString = (obj: Record<string, number>) => {
    let str = ''
    for (const [key, value] of Object.entries(obj)) {
      str += `${value} ${key} `
    }
    return str
  }

  const onDragEnd = ({ source, destination }: DropResult): void => {
    if (!destination || source.index === destination.index) {
      return
    }

    const items = reorderLesson(lessons, source.index, destination.index)

    setLessons(items)

    if (!moduleId) return

    items.forEach((lesson) => {
      updateModuleLesson({
        id: moduleId,
        lesson_id: lesson.id,
        sort: lesson.sort,
      })
    })
  }

  useEffect(() => {
    setLessons(data?.data ?? [])
  }, [module, data])

  const onRemove = async (id: string): Promise<void> => {
    try {
      await removeModuleLesson({
        lesson_id: id,
        id: module?.id as string,
      }).unwrap()
      enqueueSnackbar(translate('messages_lesson_removed'))
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), {
        variant: 'error',
      })
    }
  }

  return (
    <>
      <Box sx={LESSON_LIST_BLOCK_SX}>
        <Stack sx={{ gap: 2 }}>
          <Typography
            variant='subtitle1'
            sx={{ pl: 1, fontWeight: 500, fontSize: '1.1rem' }}
          >
            {module?.name}
          </Typography>

          {module ? (
            <CreateModuleDialog
              isEdit
              id={module.id}
              defaultValues={{
                name: module.name,
                description: module.description as string,
                active: module.active as boolean,
                tips: '',
                duration: module.duration ? getDurationString(module.duration) : '',
                teacher_slides: module.teacher_slides as string,
                teacher_forum: module.teacher_forum as string,
                lesson_plans: module.lesson_plans as string,
                initial_likes: module.initial_likes as number,
                initial_stars: module.initial_stars as number,
                initial_enrolled: module.initial_enrolled as number,
              }}
              moduleTips={module.tips}
            >
              <Button
                variant='outlined'
                sx={moduleBtnSx}
              >
                <FiSettings size='20px' />
                {translate('modules_settings').toUpperCase()}
              </Button>
            </CreateModuleDialog>
          ) : (
            ''
          )}

          <LoadingButton
            loading={isLoadingModule}
            variant='outlined'
            fullWidth
            sx={addLessonBtnSx}
            onClick={popover.onOpen}
            disabled={isLoadingModule}
          >
            <ImPlus size='22px' />
            <Typography variant='subtitle1'>{translate('modules_add_lesson')}</Typography>
          </LoadingButton>
        </Stack>

        {isLoading ? (
          <SkeletonList />
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided) => (
                <Stack
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  direction='column'
                  spacing={1}
                  sx={{ py: 1 }}
                >
                  {lessons.map((lesson: any, index: number) => (
                    <ModuleLessonItem
                      onRemove={onRemove}
                      key={index}
                      lesson={lesson}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Box>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        hiddenArrow
        sx={{
          p: 1,
          border: '1px solid #C4C4C4',
          background: '#F4F1F1',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem
          sx={MENU_ITEM_SX}
          onClick={() => {
            handleOpenInsertExisistingLessonModal()
            popover.onClose()
          }}
        >
          {translate('modules_add_lesson_existing')}
        </MenuItem>
        <CreateLessonDialog>
          <MenuItem sx={MENU_ITEM_SX}>{translate('modules_add_lesson_new_lesson')}</MenuItem>
        </CreateLessonDialog>
        <MenuItem
          onClick={() => {
            popover.onClose()
          }}
          sx={MENU_ITEM_SX}
        >
          {translate('modules_add_lesson_new_quiz')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose()
          }}
          sx={MENU_ITEM_SX}
        >
          {translate('modules_add_lesson_new_exercises')}
        </MenuItem>
      </CustomPopover>
      <InsertExisistingLessonModal
        moduleId={moduleId}
        isOpen={isOpenInsertExisistingLessonModal}
        handleClose={handleCloseInsertExisistingLessonModal}
      ></InsertExisistingLessonModal>
    </>
  )
}
