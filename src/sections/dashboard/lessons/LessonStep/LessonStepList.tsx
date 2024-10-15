import { useEffect, useRef, useState } from 'react'

import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd'
import { LoadingButton } from '@mui/lab'
import { Box, Button, ListItemIcon, MenuItem, Stack, Typography } from '@mui/material'
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown'
import { FiSettings } from '@react-icons/all-files/fi/FiSettings'
import { ImPlus } from '@react-icons/all-files/im/ImPlus'
import * as _ from 'lodash-es'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'

import { ILessonContent } from '@/redux/services/interfaces/courseUnits.interface'
import {
  useCreateLessonContentMutation,
  useGetLessonContentQuery,
  useRemoveLessonContentMutation,
  useUpdateLessonContentMutation,
} from '@/redux/services/manager/lesson-content-manager'
import { useGetLessonQuery } from '@/redux/services/manager/lessons-manager'
import { getBoard, persistCard } from '@/redux/slices/lesson-steps'
import { RootState, useDispatch } from '@/redux/store'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { getOrder } from '@/utils/getTaskOrder'
import { useTranslate } from '@/utils/translateHelper'
import { Iconify } from '@root/src/components'
import CustomPopover, { usePopover } from '@root/src/components/custom-popover'

import CreateLessonDialog from '../CreateLessonDialog/CreateLessonDialog'

// import CloneSlideDialogs from './CreateSlide/CloneSlideDialogs'
// import { DialogTypes } from './CreateSlide/CreateSlideTypes'
import LessonListItem from './LesonListItem'
// import CloneExistingSlide from './Modals/CloneExistingSlideMenu'
import SkeletonList from './Modals/SkeletonList'
import SlideTemplateDialog from './slide-templates'

type cloneExistingSlideDialogTypes =
  | ''
  | 'Empty Slide'
  | 'HTML Template'
  | 'Normal Template'
  | 'With AI'
interface Props {
  lessonId: string
}

export default function LessonStepList({ lessonId }: Props): React.ReactElement {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const translate = useTranslate()
  const popover = usePopover()

  const [updateLessonContent] = useUpdateLessonContentMutation()
  const [createLessonContent, { isLoading: createLessonLoading }] = useCreateLessonContentMutation()
  const [cloneExistingSlideMenu, setcloneExistingSlideMenu] = useState(false)
  const [cloneExistingSlideDialogs, setcloneExistingSlideDialogs] =
    useState<cloneExistingSlideDialogTypes>('')
  const [removeLessonContent] = useRemoveLessonContentMutation()
  const { data: lesson, isLoading: isLessonLoading } = useGetLessonQuery(
    { id: lessonId },
    { skip: !lessonId }
  )
  const {
    data,
    isLoading,
    refetch: lessonContentsRefetch,
    isUninitialized: lessonContentsUninitialized,
  } = useGetLessonContentQuery({ lessonId }, { skip: !lessonId })
  const slideAddButtonRef = useRef<HTMLButtonElement>(null)
  const { board } = useSelector((state: RootState) => state.lessonSteps)

  useEffect(() => {
    if (!data || !lesson) return
    dispatch(getBoard(data))
    if (data.length !== 0 && !router.query.stepId) {
      router.push(
        `${router.pathname}?${new URLSearchParams({
          ...router.query,
          stepId: data[0].id,
        })}`,
        undefined,
        { shallow: true }
      )
    }
    let interval: NodeJS.Timeout | undefined
    if ((new Date().getTime() - new Date(lesson.createdAt).getTime()) / 1000 / 60 < 10)
      interval = setInterval(() => {
        if (!lessonContentsUninitialized) {
          //pull lessons for 10 minutes after creation
          lessonContentsRefetch()
        }
      }, 10000)
    return () => clearInterval(interval)
  }, [data, lesson, lessonContentsUninitialized])

  const onDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const start = board.columns.contents
    const finish = board.columns.contents
    const updatedCardIds = [...start.cardIds]

    updatedCardIds.splice(source.index, 1)

    updatedCardIds.splice(destination.index, 0, draggableId)

    const updatedColumn = {
      ...start,
      cardIds: updatedCardIds,
    }

    dispatch(
      persistCard({
        ...board.columns,
        [updatedColumn.id]: updatedColumn,
      })
    )

    updateLessonContent({
      lessonId,
      id: draggableId,
      meta: {
        order: getOrder(result, finish, board.cards, true),
      },
    })
  }

  const cardIds = board?.columns.contents?.cardIds
  const idCardWithMaxOrder = cardIds?.length ? cardIds[cardIds.length - 1] : null
  const newContentOrder = idCardWithMaxOrder
    ? parseFloat(board.cards[idCardWithMaxOrder].meta.order as string) + 1
    : 1

  const createEmptySlide = async (): Promise<void> => {
    try {
      const { id: stepId } = await createLessonContent({
        lessonId,
        draft: false,
        active: true,
        title: translate('slide'),
        meta: { order: newContentOrder },
      }).unwrap()
      enqueueSnackbar(translate('messages_step_created'))
      router.push(
        `${router.pathname}?${new URLSearchParams({
          ...router.query,
          stepId: stepId,
        })}`,
        undefined,
        { shallow: true }
      )
    } catch (e: any) {
      enqueueSnackbar(translate('messages_cant_create_slide'), {
        variant: 'error',
      })
    }
  }

  const onDublicate = async (data: ILessonContent & BaseResponseInterface): Promise<void> => {
    try {
      await createLessonContent({
        lessonId,
        ..._.omit(data, ['id', 'meta', 'createdAt', 'updatedAt', 'cover', 'title']),
        title: translate('step_copy_slide', {
          title: data.title,
        }),
        meta: { order: newContentOrder },
      }).unwrap()
      enqueueSnackbar(
        translate('step_duplicated', {
          title: data.title,
        })
      )
    } catch (e: any) {
      enqueueSnackbar(translate('step_cant_duplicated'), {
        variant: 'error',
      })
    }
  }

  const onRemove = async (id: string): Promise<void> => {
    try {
      await removeLessonContent({
        lessonId,
        id,
      }).unwrap()
      enqueueSnackbar(translate('step_removed'))
    } catch (e: any) {
      enqueueSnackbar(translate('step_cant_removed'), {
        variant: 'error',
      })
    }
  }

  if (isLoading || isLessonLoading) return <SkeletonList />

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Stack sx={{ gap: 2 }}>
          <Typography
            variant='subtitle1'
            sx={{ pl: 1, fontWeight: 500, fontSize: '1.1rem' }}
          >
            {lesson?.name}
          </Typography>

          <CreateLessonDialog
            id={lesson?.id}
            defaultValues={{
              name: lesson?.name as string,
              description: lesson?.description as string,
              active: lesson?.active as boolean,
              head: lesson?.head || '',
              independent: lesson?.independent ?? false,
              type: lesson?.type ?? 'practical',
              duration: lesson?.duration,
            }}
            isEdit
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
              {translate('lesson_settup_settings')}
            </Button>
          </CreateLessonDialog>

          <LoadingButton
            loading={createLessonLoading}
            variant='outlined'
            fullWidth
            sx={{
              mb: 1,
              p: 2,
              gap: 3,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={popover.onOpen}
            disabled={createLessonLoading}
          >
            <ImPlus size='22px' />
            <Typography variant='subtitle1'>{translate('slide_add')}</Typography>
            <FaChevronDown size={25} />
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
                {board.columns.contents?.cardIds.map((el, i) => (
                  <LessonListItem
                    onRemove={onRemove}
                    onDublicate={onDublicate}
                    lessonId={lessonId}
                    key={board.cards[el]?.meta?.order ? +board.cards[el]?.meta?.order + i : i}
                    step={board.cards[el]}
                    index={i}
                  />
                ))}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
        <Stack
          direction='column'
          spacing={3}
          sx={{ p: 2 }}
        ></Stack>
      </Box>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        hiddenArrow
        sx={{
          p: 1,
          border: '1px solid #C4C4C4',
        }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem
          onClick={() => {
            createEmptySlide()
            popover.onClose()
          }}
        >
          {translate('slide_add_blank')}
        </MenuItem>

        <SlideTemplateDialog>
          <MenuItem>{translate('slide_add_normal')}</MenuItem>
        </SlideTemplateDialog>

        <MenuItem
          onClick={() => {
            popover.onClose()
          }}
        >
          {translate('slide_add_html')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose()
          }}
        >
          {translate('slide_add_promt_ai')}
          <ListItemIcon sx={{ pl: 2 }}>
            <Iconify
              icon='mingcute:ai-line'
              color='#FBDD3F'
            />
          </ListItemIcon>
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose()
          }}
        >
          {translate('slide_add_ai_templates')}
          <ListItemIcon sx={{ pl: 3 }}>
            <Iconify
              icon='ion:diamond-outline'
              color='#43D4DD'
            />
          </ListItemIcon>
        </MenuItem>
      </CustomPopover>
    </>

  )
}
