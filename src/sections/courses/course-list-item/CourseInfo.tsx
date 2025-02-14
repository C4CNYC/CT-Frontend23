import { Box, Stack, Typography } from '@mui/material'
import { AiOutlineClockCircle } from '@react-icons/all-files/ai/AiOutlineClockCircle'
import { MdCelebration } from '@react-icons/all-files/md/MdCelebration'

import { ICourse } from '@/types'
import { useTranslate } from '@/utils/translateHelper'
import { convertDurationToMins } from '@root/src/utils/convertDurationToMins'
import { convertMinsToString } from '@root/src/utils/convertMinsToString'
import { detectZeroAmount } from '@root/src/utils/detectZeroAmount'

interface Props {
  course: ICourse
}

export default function CourseInfo({ course }: Props): React.ReactElement {
  const { price, total_lessons: totalLessons, level } = course
  const translate = useTranslate()
  const courseContent = course
  let minutes =
    [...(courseContent?.units ? courseContent?.units : []), ...(course.units ? course.units : [])]
      .filter((unit) => unit.active)
      .map((unit) => convertDurationToMins(unit.duration))
      .reduce((acc, unitDuration) => acc + unitDuration, 0) || 30
  const priceIsZero = detectZeroAmount(price)
  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: priceIsZero ? '400px' : '450px',
        flexWrap: 'wrap',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AiOutlineClockCircle size='15px' />
        <Typography
          variant='body2'
          sx={{ color: 'inherit' }}
        >
          {convertMinsToString(minutes, translate('hours'), translate('minutes'))}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AiOutlineClockCircle size='15px' />
        <Typography
          variant='body2'
          sx={{ textTransform: 'capitalize', color: 'inherit' }}
        >
          {level}
        </Typography>
      </Box>
      {priceIsZero ? null : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MdCelebration size='18px' />
          <Typography
            variant='body2'
            sx={{ color: 'inherit' }}
          >
            {price}
          </Typography>
        </Box>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <MdCelebration size='18px' />
        <Typography
          variant='body2'
          sx={{ color: 'inherit' }}
        >
          {totalLessons}{' '}
          {totalLessons && totalLessons > 1 ? translate('lessons') : translate('lesson')}
        </Typography>
      </Box>
    </Stack>
  )
}
