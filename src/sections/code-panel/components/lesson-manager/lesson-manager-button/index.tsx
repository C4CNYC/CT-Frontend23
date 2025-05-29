import { type FC, useMemo } from 'react'

import { Button, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import { FiFileText } from '@react-icons/all-files/fi/FiFileText'

import { type ILesson } from '@/redux/interfaces/content.interface'
import { type BaseResponseInterface } from '@/utils'
import { useTranslate } from '@/utils/translateHelper'

import { GetTypSx, getButtonSx } from './constants'

interface LessonManagerButtonProps {
  onOpen: () => void
  lesson?: ILesson & BaseResponseInterface
  iconColor?: string
}

const LessonManagerButton: FC<LessonManagerButtonProps> = ({
  onOpen,
  lesson,
  iconColor = '#637381',
}) => {
  const theme = useTheme()
  const buttonSx = useMemo(() => getButtonSx(theme), [theme])
  const typSx = useMemo(() => GetTypSx(theme), [theme])
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
          <FiFileText
            size={20}
            style={{ color: iconColor ?? 'inherit' }}
          />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={lesson?.name && lesson?.name.length > 24 ? `Lesson: ${lesson?.name}` : ''}
        placement='top'
      >
        <Button
          disableRipple
          disableFocusRipple
          sx={buttonSx}
        >
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
