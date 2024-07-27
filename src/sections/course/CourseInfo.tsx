import { useMemo, useState } from 'react'

import { Button, Stack, Typography, useTheme } from '@mui/material'
import { SlArrowDown } from '@react-icons/all-files/sl/SlArrowDown'
import { SlArrowUp } from '@react-icons/all-files/sl/SlArrowUp'

import { Image } from '@/components'
import { useTranslate } from '@/utils/translateHelper'

import { COURSE_INFO_IMAGE_SX, getCourseInfoWrapperSx, getSeeMoreBtnSx } from './constants'
import CourseSummarily from './CourseSummarily.1'

interface ICourseInfoProps {
  cover?: string
  name: string
  description: string
  lessonsCount: number
  duration: string
  level: string
}

const MAX_DESCRIPTION_LENGTH = 250

export default function CourseInfo({
  cover,
  name,
  description,
  duration,
  lessonsCount,
  level,
}: ICourseInfoProps): React.ReactElement {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const translate = useTranslate()

  const containerStyles = useMemo(() => getCourseInfoWrapperSx(theme), [theme])
  const seeMoreBtnStyles = useMemo(() => getSeeMoreBtnSx(theme), [theme])

  return (
    <Stack sx={containerStyles}>
      <Stack maxWidth='680px'>
        <Typography
          variant='h3'
          pb={2}
        >
          {name}
        </Typography>
        <Typography
          variant='subtitle1'
          sx={{ pb: !open ? 1 : 1 }}
        >
          {description.length > MAX_DESCRIPTION_LENGTH && !open
            ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}... `
            : description}
        </Typography>
        <Button
          sx={seeMoreBtnStyles}
          onClick={() => {
            setOpen(!open)
          }}
        >
          {open ? translate('actions_show_less') : translate('actions_see_more')}
          {open ? (
            <SlArrowUp style={{ marginLeft: '10px' }} />
          ) : (
            <SlArrowDown style={{ marginLeft: '10px' }} />
          )}
        </Button>
        <CourseSummarily
          duration={duration}
          lessonsCount={lessonsCount}
          level={level}
        />
      </Stack>
      <Image
        alt='course cover'
        src={cover ?? '/assets/courses/courseImg.png'}
        sx={COURSE_INFO_IMAGE_SX}
      />
    </Stack>
  )
}
