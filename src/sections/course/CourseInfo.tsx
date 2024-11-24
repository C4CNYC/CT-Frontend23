import { useMemo, useRef, useState } from 'react'

import { Button, Collapse, Stack, Typography, useTheme } from '@mui/material'
import { SlArrowDown } from '@react-icons/all-files/sl/SlArrowDown'
import { SlArrowUp } from '@react-icons/all-files/sl/SlArrowUp'

import { Image } from '@/components'
import { useTranslate } from '@/utils/translateHelper'

import { COURSE_INFO_IMAGE_SX, getCourseInfoWrapperSx, getSeeMoreBtnSx } from './constants'
import CourseSummarily from './CourseSummarily'

interface ICourseInfoProps {
  cover?: string
  name: string
  description: string
  lessonsCount: number
  duration: string
  level: string
}

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
  const descRef = useRef<HTMLElement | null>(null)

  const ellipsisHandler = () => {
    if (descRef.current) {
      return descRef.current.offsetWidth < descRef.current.scrollWidth
    }
    return false
  }

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
          ref={descRef}
          noWrap
          textOverflow='ellipsis'
        >
          {description}
        </Typography>
        {ellipsisHandler() ? (
          <>
            <Collapse in={open}>{description}</Collapse>
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
          </>
        ) : null}

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
