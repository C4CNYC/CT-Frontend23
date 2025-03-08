import { useState } from 'react'

import { Draggable } from '@hello-pangea/dnd'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, IconButton, MenuItem, Paper, Stack, Typography } from '@mui/material'
import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical'
import { FaRegCopy } from '@react-icons/all-files/fa6/FaRegCopy'
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2'
import { IoMdCheckmarkCircleOutline } from '@react-icons/all-files/io/IoMdCheckmarkCircleOutline'
import { RxDragHandleDots2 } from '@react-icons/all-files/rx/RxDragHandleDots2'
import { useRouter } from 'next/router'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { LessonContentType } from '@/redux/enums/lesson-content-type.enum'
import { ILessonContent } from '@/redux/services/interfaces/courseUnits.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useTranslate } from '@/utils/translateHelper'
import { MenuPopover } from '@root/src/components/menu-popover'

import { BRIEFING, CHALANGES, CUSTOM, GREEN_DOT_SX, getLessonItemPaperSx } from './constants'
import Preferences from './Modals/Preferences'
import Validation from './Modals/Validation'
interface Props {
  lessonId: string
  step: ILessonContent & BaseResponseInterface
  index: number
  onRemove: (id: string) => void
  onDublicate: (step: ILessonContent & BaseResponseInterface) => void
  onChangeSlide: (stepId: string) => VoidFunction
}

const LessonListCoverImageStyles = {
  '& .hoverShow ': {
    display: 'none',
    position: 'absolute',
    zIndex: 197,
    maxWidth: 240,
  },
  '&:hover .hoverShow ': { display: 'block' },
}

export default function LessonListItem({
  onRemove,
  onDublicate,
  onChangeSlide,
  lessonId,
  step,
  index,
}: Props): React.ReactElement {
  const router = useRouter()
  const translate = useTranslate()

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)
  const [hasValidation, setHasValidation] = useState<boolean>(false)

  const isSlideActive = router.query.stepId === step.id

  const handleOpenPopover = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault()
    event.stopPropagation()
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  const chooseBorderColor = (): string => {
    if (hasValidation) {
      return CHALANGES
    } else if (step.type === LessonContentType.Code || step.body) {
      return CUSTOM
    } else {
      return BRIEFING
    }
  }

  return (
    <Draggable
      draggableId={step.id}
      index={index}
      key={step.id}
    >
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          onClick={onChangeSlide(step.id)}
          elevation={8}
          sx={{ ...getLessonItemPaperSx(chooseBorderColor, isSlideActive) }}
        >
          {isSlideActive && <Box sx={GREEN_DOT_SX}></Box>}

          <IconButton
            sx={{ mr: '5px', p: 0.5 }}
            disableRipple
            {...provided.dragHandleProps}
          >
            <RxDragHandleDots2 size='24px' />
          </IconButton>
          <Stack sx={{ width: 'calc(100% - 50px)' }}>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='flex-start'
            >
              <Box
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                <Typography
                  variant='subtitle1'
                  pt={0.5}
                  noWrap
                >
                  {step.title}
                </Typography>
                <Typography
                  noWrap
                  variant='body2'
                >
                  {step.description}
                </Typography>
              </Box>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  handleOpenPopover(e)
                }}
              >
                <BsThreeDotsVertical size='20px' />
              </IconButton>
            </Stack>

            <Stack
              direction='row'
              alignSelf='flex-end'
              gap={1}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              {step.cover ? (
                <IconButton
                  title='Cover Image'
                  sx={LessonListCoverImageStyles}
                >
                  <LazyLoadImage
                    src={step.cover}
                    alt={step.title}
                    style={{ width: 24, height: 24 }}
                  />
                  <LazyLoadImage
                    className='hoverShow'
                    src={step.cover}
                    alt={step.title}
                    style={{ width: 240 }}
                  />
                </IconButton>
              ) : null}
              <IconButton
                onClick={() => {
                  onDublicate(step)
                }}
                title={translate('actions_duplicate')}
              >
                <FaRegCopy />
              </IconButton>
              <Validation
                stepId={step.id}
                stepTitle={step.title}
                setHasValidation={setHasValidation}
              >
                <IconButton>
                  <IoMdCheckmarkCircleOutline />
                </IconButton>
              </Validation>
              <Preferences
                defaultValues={{ ...step }}
                contentId={step.id}
                lessonId={lessonId}
              >
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Preferences>
            </Stack>
          </Stack>

          <MenuPopover
            open={openPopover}
            onClose={handleClosePopover}
            onClick={(e) => {
              e.stopPropagation()
            }}
            arrow='left-top'
            sx={{ width: 160 }}
          >
            <MenuItem
              sx={{ gap: 1 }}
              onClick={() => {
                onRemove(step.id)
                handleClosePopover()
              }}
            >
              <FiTrash2 />
              {translate('actions_remove')}
            </MenuItem>
          </MenuPopover>
        </Paper>
      )}
    </Draggable>
  )
}
