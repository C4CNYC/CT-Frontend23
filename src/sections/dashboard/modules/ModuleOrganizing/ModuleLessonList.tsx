import { useEffect, useMemo } from 'react'
import { useState } from 'react'

import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import { FiSettings } from '@react-icons/all-files/fi/FiSettings'
import { ImPlus } from '@react-icons/all-files/im/ImPlus'
import { useSnackbar } from 'notistack'

import { ILesson } from '@/redux/services/interfaces/courseUnits.interface'
import {
  useRemoveLessonFromModuleMutation,
  useUpdateModuleLessonMutation,
} from '@/redux/services/manager/modules-manager'
import { useTranslate } from '@/utils/translateHelper'
import { useGetLessonsQuery } from 'src/redux/services/manager/lessons-manager'
import { useGetModuleWithLessonsQuery } from 'src/redux/services/manager/modules-student'

import SkeletonList from '../../lessons/LessonStep/Modals/SkeletonList'
import CreateModuleDialog from '../CreateModuleDialog'

import { LESSON_LIST_BLOCK_SX, getAddLessonBtnSx, getModuleBtnSx } from './constants'
import ModuleLessonItem from './ModuleLessonItem'

function parseSort(sort?: number) {
  return sort ?? 0
}

function getSort(result: DropResult, lessons: ILesson[]): number {
  const { destination, draggableId } = result

  // case: move to start
  if (destination?.index === 0) {
    return parseSort(lessons[0].sort) / 2
  }

  // case: move to end
  if (destination?.index && destination?.index >= lessons.length - 1) {
    const lastId = lessons.length - 1
    return parseSort(lessons[lastId].sort) + 1
  }

  // case: when you move lesson to after next.
  if (lessons[Number(destination?.index) - 1].id === draggableId) {
    const prevId = Number(destination?.index)
    const nextId = Number(destination?.index) + 1

    return lessons[nextId]?.sort
      ? (parseSort(lessons[nextId].sort) + parseSort(lessons[prevId].sort)) / 2
      : parseSort(lessons[prevId].sort) + 1
  }

  // case: all other cases
  const nextId = Number(destination?.index)
  const prevId = Number(destination?.index) - 1

  return lessons[nextId]?.sort
    ? (parseSort(lessons[nextId].sort) + parseSort(lessons[prevId].sort)) / 2
    : parseSort(lessons[prevId].sort) + 1
}

function moveItemInArray<T>(array: T[], from: number, to: number, on: number = 1): T[] {
  // eslint-disable-next-line no-return-assign,no-sequences
  return (array = array.slice()), array.splice(to, 0, ...array.splice(from, on)), array
}

interface Props {
  moduleId: string
}

export default function ModuleLessonList({ moduleId }: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()
  const theme = useTheme()

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

  const testData = [
    {
      active: true,
      auto_graded: true,
      core: true,
      createdAt: '2023-08-15T06:40:36.105Z',
      description: 'Build Kaboom js games',
      duration: { hours: 2, minutes: 1 },
      head: '<script></script>\n',
      id: '1',
      independent: false,
      lessonToUnits: [],
      name: '1',
      sort: 1,
      type: 'practical',
    },
    {
      active: true,
      auto_graded: true,
      core: true,
      createdAt: '2023-08-15T06:40:36.105Z',
      description: 'Build Kaboom js games',
      duration: { hours: 2, minutes: 1 },
      head: '<script></script>\n',
      id: '2',
      independent: false,
      lessonToUnits: [],
      name: '2',
      sort: 1,
      type: 'practical',
    },
    {
      active: true,
      auto_graded: true,
      core: true,
      createdAt: '2023-08-15T06:40:36.105Z',
      description: 'Build Kaboom js games',
      duration: { hours: 2, minutes: 1 },
      head: '<script></script>\n',
      id: '3',
      independent: false,
      lessonToUnits: [],
      name: '3',
      sort: 1,
      type: 'practical',
    },
  ]

  const reorder = (list: any, startIndex: any, endIndex: any): ILesson[] => {
    const result = Array.from(list)
    // console.log('result', result)

    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result as ILesson[]
  }

  const onDragEnd = (result: DropResult): void => {
    // console.log(result)
    if (!result.destination) {
      return
    }

    const items = reorder(lessons, result.source.index, result.destination.index)

    setLessons(items)

    // if (!moduleId) return
    // const { destination, source, draggableId } = result
    // if (!destination) return
    // if (destination.droppableId === source.droppableId && destination.index === source.index) {
    //   return
    // }
    // setLessons(moveItemInArray(lessons, source.index, destination.index))
    // updateModuleLesson({
    //   id: moduleId,
    //   lesson_id: draggableId,
    //   sort: getSort(result, lessons),
    // })
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
    <Box sx={LESSON_LIST_BLOCK_SX}>
      <Stack sx={{ gap: 2 }}>
        <Typography
          variant='subtitle1'
          sx={{ pl: 1, fontWeight: 500, fontSize: '1.1rem' }}
        >
          {module?.name}
        </Typography>

        <CreateModuleDialog
          isEdit
          id={module?.id}
          defaultValues={{
            name: module?.name ?? '-',
            description: module?.description ?? '-',
            active: module?.active as boolean,
            tips: '',
            duration: module?.duration ? getDurationString(module.duration) : '',
            teacher_slides: module?.teacher_slides ?? '-',
            teacher_forum: module?.teacher_forum ?? '-',
            lesson_plans: module?.lesson_plans ?? '-',
            initial_likes: module?.initial_likes ?? 5,
            initial_stars: module?.initial_stars ?? 10,
            initial_enrolled: module?.initial_enrolled ?? 15,
          }}
          moduleTips={module?.tips}
        >
          <Button
            variant='outlined'
            sx={moduleBtnSx}
          >
            <FiSettings size='20px' />
            {translate('modules_settings').toUpperCase()}
          </Button>
        </CreateModuleDialog>

        <LoadingButton
          loading={isLoadingModule}
          variant='outlined'
          fullWidth
          sx={addLessonBtnSx}
          //   onClick={() => createNewContent()}
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
  )
}
