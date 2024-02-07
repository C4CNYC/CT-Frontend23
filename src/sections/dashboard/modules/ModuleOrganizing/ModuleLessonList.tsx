import { useCallback, useEffect } from 'react'

import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd'
import { FiSettings } from '@react-icons/all-files/fi/FiSettings'
import { ImPlus } from '@react-icons/all-files/im/ImPlus'
import * as _ from 'lodash-es'
import { useSnackbar } from 'notistack'

import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack, Typography } from '@mui/material'

import { useGetLessonsQuery } from 'src/redux/services/manager/lessons-manager'
import { useGetModuleWithLessonsQuery } from 'src/redux/services/manager/modules-student'

import ModuleLessonItem from './ModuleLessonItem'
import { useTranslate } from '@/utils/translateHelper'
import { useState } from 'react'
import { ILesson } from '@/redux/services/interfaces/courseUnits.interface'
import { useUpdateModuleLessonMutation } from '@/redux/services/manager/modules-manager'
import SkeletonList from '../../lessons/LessonStep/Modals/SkeletonList'
import CreateModuleDialog from '../CreateModuleDialog'
import { IModule } from '@/redux/interfaces/content.interface'

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

  const [lessons, setLessons] = useState<ILesson[]>([])
  const [module1, setModule] = useState<IModule>()

  console.log('module', module1)

  const { data, isLoading, isFetching } = useGetLessonsQuery({ module_id: moduleId })

  const { data: module, isLoading: isLoadingModule } = useGetModuleWithLessonsQuery(
    { id: moduleId },
    { skip: !moduleId }
  )

  const [updateModuleLesson] = useUpdateModuleLessonMutation()

  const getDurationString = (obj: Record<string, number>) => {
    let str = ''
    for (const [key, value] of Object.entries(obj)) {
      str += `${value} ${key} `
    }
    return str
  }

  const onDragEnd = useCallback(
    (result: DropResult): void => {
      if (!moduleId) return

      const { destination, source, draggableId } = result

      if (!destination) return

      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return
      }

      setLessons(moveItemInArray(lessons, source.index, destination.index))

      updateModuleLesson({
        id: moduleId,
        lesson_id: draggableId,
        sort: getSort(result, lessons),
      })
    },
    [lessons]
  )

  useEffect(() => {
    // if (!module) return
    setLessons(data?.data ?? [])
    setModule(module)
  }, [module, data])

  const onRemove = async (id: string): Promise<void> => {
    //   try {
    //     await removeLessonContent({
    //       lessonId,
    //       id,
    //     }).unwrap();
    //     enqueueSnackbar(translate("step_removed"));
    //   } catch (e: any) {
    //     enqueueSnackbar(translate("step_cant_removed"), {
    //       variant: "error",
    //     });
    //   }
  }

  if (isLoading) return <SkeletonList />

  return (
    <Box sx={{ p: 2 }}>
      <Stack sx={{ gap: 2 }}>
        <Typography variant='subtitle1' sx={{ pl: 1, fontWeight: 500, fontSize: '1.1rem' }}>
          {module?.name}
        </Typography>

        <CreateModuleDialog
          isEdit
          id={module?.id}
          defaultValues={{
            name: module?.name,
            description: module?.description as string,
            active: module?.active as boolean,
            tips: '',
            duration: module?.duration ? getDurationString(module.duration) : '',
            teacher_slides: module?.teacher_slides as string,
            teacher_forum: module?.teacher_forum as string,
            lesson_plans: module?.lesson_plans as string,
            initial_likes: module?.initial_likes as number,
            initial_stars: module?.initial_stars as number,
            initial_enrolled: module?.initial_enrolled as number,
          }}
          moduleTips={module?.tips}
        >
          <Button
            variant='outlined'
            sx={{
              width: '100%',
              justifyContent: 'flex-start',
              p: 1.5,
              fontWeight: 500,
              fontSize: '1rem',
              whiteSpace: 'nowrap',
              gap: 1,
            }}
          >
            <FiSettings size='20px' />
            Module Settings
          </Button>
        </CreateModuleDialog>

        <LoadingButton
          loading={isLoadingModule}
          variant='outlined'
          fullWidth
          sx={{
            mb: 1,
            p: 2,
            gap: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          //   onClick={() => createNewContent()}
          disabled={isLoadingModule}
        >
          <ImPlus size='22px' />
          <Typography variant='subtitle1'>Add Lesson</Typography>
        </LoadingButton>
      </Stack>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='contents'>
          {(provided) => (
            <Stack
              {...provided.droppableProps}
              ref={provided.innerRef}
              direction='column'
              spacing={1}
              sx={{ py: 1 }}
            >
              {lessons.map((lesson, index) => (
                <ModuleLessonItem
                  onRemove={onRemove}
                  title={lesson.name}
                  key={index}
                  step={lesson.id}
                  index={index}
                  description={lesson.description}
                />
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
      <Stack direction='column' spacing={3} sx={{ p: 2 }}></Stack>
    </Box>
  )
}

function updateModuleLesson(arg0: { id: any; lesson_id: string; sort: any }) {
  throw new Error('Function not implemented.')
}
