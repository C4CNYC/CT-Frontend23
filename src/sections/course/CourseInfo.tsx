import { useMemo, useRef, useState } from 'react'

import { Button, Collapse, Stack, Typography, useTheme } from '@mui/material'
import { SlArrowDown } from '@react-icons/all-files/sl/SlArrowDown'
import { SlArrowUp } from '@react-icons/all-files/sl/SlArrowUp'

import { Image } from '@/components'
import { ICourse } from '@/types'
import { useTranslate } from '@/utils/translateHelper'
import { convertDurationToMins } from '@root/src/utils/convertDurationToMins'

import { COURSE_INFO_IMAGE_SX, getCourseInfoWrapperSx, getSeeMoreBtnSx } from './constants'
import CourseSummarily from './CourseSummarily'

interface ICourseInfoProps {
  course: ICourse
}

export default function CourseInfo({ course }: ICourseInfoProps): React.ReactElement {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const translate = useTranslate()
  const descRef = useRef<HTMLElement | null>(null)
  const { cover, name, description, level } = course
  const durationInMins = course?.units
    ?.filter((unit) => unit.active)
    .map((unit) => convertDurationToMins(unit.duration))
    .reduce((acc, unitDuration) => acc + unitDuration, 0)

  const lessonsCount =
    course?.units?.reduce((total, unit) => {
      return total + unit?.lessons?.length
    }, 0) ?? 0

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
      <Typography
        variant='h3'
        sx={{
          pb: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </Typography>

      <Typography
        variant='subtitle1'
        sx={{
          pb: !open ? 1 : 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        ref={descRef}
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
        lessonsCount={lessonsCount}
        level={level}
        grade='6th-10th Grade'
        durationInMinutes={durationInMins || 60}
      />
      <Image
        alt='course cover'
        src={cover ?? '/assets/courses/courseImg.png'}
        sx={COURSE_INFO_IMAGE_SX}
      />
    </Stack>
  )
}
