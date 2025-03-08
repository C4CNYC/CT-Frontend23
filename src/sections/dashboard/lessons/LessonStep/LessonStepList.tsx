import { useContext, useEffect, useState } from 'react'

import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd'
import { LoadingButton } from '@mui/lab'
import { Box, Button, ListItemIcon, MenuItem, Stack, Typography } from '@mui/material'
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown'
import { FiSettings } from '@react-icons/all-files/fi/FiSettings'
import { ImPlus } from '@react-icons/all-files/im/ImPlus'
import * as _ from 'lodash-es'
import Head from 'next/head'
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
import { ConfirmDialog } from '@root/src/components/confirm-dialog/ConfirmDialog'
import CustomPopover, { usePopover } from '@root/src/components/custom-popover'
import { Iconify } from '@root/src/components/iconify/Iconify'
import { useBoolean } from '@root/src/hooks/useBoolean'
import { useCounter } from '@root/src/hooks/useCounter'
import { LessonContentType } from '@root/src/redux/enums/lesson-content-type.enum'
import { LoaderStepDialog } from '@root/src/sections/on-boarding-register/teacher/ai-generete-stepper/LoaderStepDialog'

import CreateLessonDialog from '../CreateLessonDialog/CreateLessonDialog'

import { HTMLTemplate } from './CreateSlide/HTMLTemplate'
import { WithAIDialog } from './CreateSlide/WithAIDialog'
import LessonListItem from './LesonListItem'
import { LessonListItemLoading } from './LessonListItemLoading'
import { LessonContentContext } from './LessonStepContent/LessonContent.context'
import SkeletonList from './Modals/SkeletonList'
import SlideTemplateDialog from './slide-templates'
interface Props {
  lessonId: string
}

export default function LessonStepList({ lessonId }: Props): React.ReactElement {
  const router = useRouter()
  const translate = useTranslate()
  const dispatch = useDispatch()
  const popover = usePopover()
  const { enqueueSnackbar } = useSnackbar()
  const { locked, lockedHandler } = useContext(LessonContentContext)

  const [changeSlideDialogOpen, changeSlideDialogOpenSet] = useState<VoidFunction>()
  const [LoaderStepDialogState, LoaderStepDialogStateTrue, LoaderStepDialogStateFalse] =
    useBoolean()
  const [contentCount, contentCountSet] = useState(0)
  const [lessonLoadedAfterContent, lessonLoadedAfterContentSet] = useState(false)
  const [contentPullCount, contentPullCountDec, contentPullCountInc] = useCounter(5)
  const [refetchTimer, refetchTimerSet] = useState(0)

  const { board } = useSelector((state: RootState) => state.lessonSteps)

  const [updateLessonContent] = useUpdateLessonContentMutation()
  const [createLessonContent, { isLoading: createLessonLoading }] = useCreateLessonContentMutation()
  const [withAIDialogOpen, setWithAIDialogOpen] = useState(false)
  const [dialogHtmlTemplate, setDialogHtmlTemplate] = useState(false)
  const [removeLessonContent] = useRemoveLessonContentMutation()
  const {
    data: lesson,
    isLoading: isLessonLoading,
    refetch: lessonRefetch,
  } = useGetLessonQuery({ id: lessonId }, { skip: !lessonId })
  const {
    data,
    isLoading,
    refetch: lessonContentsRefetch,
    isUninitialized: lessonContentsUninitialized,
  } = useGetLessonContentQuery({ lessonId }, { skip: !lessonId })

  let newlyCreated = lesson
    ? (new Date().getTime() - new Date(lesson.createdAt).getTime()) / 1000 / 60 < 3
    : false

  const lessonContentsRefetchTimer = () => {
    if (newlyCreated || contentPullCount > 0) {
      contentPullCountDec()
      lessonContentsRefetch()
    } else {
      if (refetchTimer > 0) {
        clearInterval(refetchTimer)
        refetchTimerSet(0)
        LoaderStepDialogStateFalse()
      }
      return
    }
  }

  useEffect(() => {
    if (!newlyCreated) return
    let interval = setInterval(lessonContentsRefetchTimer, 10000)
    // @ts-ignore how to sync nodejs&browser
    refetchTimerSet(interval)
    return () => clearInterval(interval)
  }, [newlyCreated])

  useEffect(() => {
    let dataLength = data?.length || 0
    if (dataLength != contentCount) {
      contentCountSet(dataLength)
      contentPullCountInc()
    }
    if (!newlyCreated) {
      LoaderStepDialogStateFalse()
      return
    }
    if (newlyCreated && dataLength > 0) {
      if (!lessonLoadedAfterContent) {
        lessonLoadedAfterContentSet(true)
        lessonRefetch()
      }
      LoaderStepDialogStateFalse()
    }
  }, [data, lesson])

  useEffect(() => {
    if (!lesson) return
    if (newlyCreated && lesson.name === 'Ai Lesson') LoaderStepDialogStateTrue()
  }, [lesson])

  useEffect(() => {
    if (!lesson) return
    if (!data) return

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
  const activeSlideId = cardIds?.find((s) => s == router.query.stepId)

  const createEmptySlide = async (): Promise<void> => {
    let NewLessonType = 'code'
    if (activeSlideId) NewLessonType = board?.cards[activeSlideId].type
    try {
      const { id: stepId } = await createLessonContent({
        lessonId,
        draft: false,
        active: true,
        title: translate('slide'),
        type: NewLessonType as LessonContentType,
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

  const onChangeSlide = (stepId: string) => () => {
    const changeSlide = () => {
      router.push(
        `${router.pathname}?${new URLSearchParams({
          ...router.query,
          stepId,
        })}`,
        undefined,
        { shallow: true }
      )
      lockedHandler(false)
      changeSlideDialogOpenSet(undefined)
    }
    if (locked) {
      changeSlideDialogOpenSet(() => changeSlide)
    } else {
      changeSlide()
    }
  }
  if (isLoading || isLessonLoading) return <SkeletonList />

  return (
    <>
      <Head>
        <title>{lesson?.name} | CodeTribe</title>
      </Head>
      <Box
        sx={{ p: 2 }}
        className='lessonCreationStep1 lessonCreationStep2'
      >
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
              slug: lesson?.slug,
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
              {translate('lesson_setup_settings')}
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
                    onChangeSlide={onChangeSlide}
                    lessonId={lessonId}
                    key={el}
                    step={board.cards[el]}
                    index={i}
                  />
                ))}
                {newlyCreated && contentPullCount > 0 ? <LessonListItemLoading /> : null}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
        {changeSlideDialogOpen ? (
          <ConfirmDialog
            open={true}
            onClose={() => changeSlideDialogOpenSet(undefined)}
            title={translate('slide_confirm_discarding_changes')}
            action={
              <Button
                variant='contained'
                color='error'
                onClick={() => changeSlideDialogOpen()}
              >
                {translate('slide_switch')}
              </Button>
            }
          />
        ) : null}
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
            setDialogHtmlTemplate(true)
          }}
        >
          {translate('slide_add_html')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setWithAIDialogOpen(true)
          }}
        >
          {translate('slide_add_prompt_ai')}
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
      <WithAIDialog
        open={withAIDialogOpen}
        onClose={() => {
          setWithAIDialogOpen(false)
          popover.onClose()
        }}
        lessonId={lessonId}
        lessonName={lesson?.name || ''}
      />
      {dialogHtmlTemplate ? (
        <HTMLTemplate
          open={true}
          onClose={() => {
            setDialogHtmlTemplate(false)
            popover.onClose()
          }}
          lessonId={lessonId}
          lessonName={lesson?.name || ''}
        />
      ) : null}
      <LoaderStepDialog
        open={LoaderStepDialogState}
        close={LoaderStepDialogStateFalse}
      />
    </>
  )
}
