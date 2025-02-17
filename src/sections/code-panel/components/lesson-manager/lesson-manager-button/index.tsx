import { type FC, useMemo } from 'react'

import { Button, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material'

import { Iconify } from '@/components/iconify'
import { type ILesson } from '@/redux/interfaces/content.interface'
import { type BaseResponseInterface } from '@/utils'
import { useTranslate } from '@/utils/translateHelper'

import { GetTypSx, getButtonSx, getSubtitleSx } from './constants'

interface LessonManagerButtonProps {
  onOpen: () => void
  lesson?: ILesson & BaseResponseInterface
  iconColor?: string
}

const LessonManagerButton: FC<LessonManagerButtonProps> = ({ onOpen, lesson, iconColor }) => {
  const theme = useTheme()
  const buttonSx = useMemo(() => getButtonSx(theme), [theme])
  const typSx = useMemo(() => GetTypSx(theme), [theme])
  const subTitleSx = useMemo(() => getSubtitleSx(theme), [theme])
  const translate = useTranslate()

  return (
    <Stack
      className='lessonsTour'
      direction='row'
      alignItems='center'
      onClick={onOpen}
    >
      <Tooltip
        title={translate('lesson_list')}
        placement='top'
      >
        <IconButton className='lessonsTourMobile'>
          <Iconify
            icon='iconoir:page'
            color={iconColor ?? 'inherit'}
          />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={lesson?.name && lesson?.name.length > 24 ? lesson?.name : ''}
        placement='top'
      >
        <Button
          disableRipple
          disableFocusRipple
          sx={buttonSx}
        >
          <Typography
            variant='body2'
            sx={subTitleSx}
          >
            lesson
          </Typography>
          <Typography
            variant='body2'
            noWrap
            sx={typSx}
          >
            {lesson?.name}
          </Typography>
        </Button>
      </Tooltip>
    </Stack>
  )
}

export default LessonManagerButton
