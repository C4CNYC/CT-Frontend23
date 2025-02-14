import { Stack, Typography } from '@mui/material'
import { AiOutlineClockCircle } from '@react-icons/all-files/ai/AiOutlineClockCircle'
import { LuSchool } from '@react-icons/all-files/lu/LuSchool'
import { MdCelebration } from '@react-icons/all-files/md/MdCelebration'
import { SiLevelsdotfyi } from '@react-icons/all-files/si/SiLevelsdotfyi'

import { useTranslate } from '@/utils/translateHelper'
import { convertDurationToHours } from '@root/src/utils/convertDurationToHours'

interface ICourseSummarilyProps {
  level: string
  lessonsCount: number
  grade: string
  durationInMinutes: number
}

export default function CourseSummarily({
  level,
  lessonsCount,
  grade,
  durationInMinutes,
}: ICourseSummarilyProps): React.ReactElement {
  const translate = useTranslate()
  return (
    <Stack
      sx={{
        flexDirection: { xs: 'column', sm: 'row' },
        py: 2,
        gap: 3,
        flexWrap: 'wrap',
      }}
    >
      <Typography
        variant='body2'
        sx={{ textTransform: 'capitalize', display: 'flex', alignItems: 'baseline', gap: 1 }}
      >
        <SiLevelsdotfyi size='17px' />
        {level}
      </Typography>
      <Typography
        variant='body2'
        sx={{ textTransform: 'capitalize', display: 'flex', alignItems: 'baseline', gap: 1 }}
      >
        <LuSchool size='18px' />

        {grade}
      </Typography>
      <Typography
        variant='body2'
        sx={{ textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <AiOutlineClockCircle size='16px' />
        {convertDurationToHours(durationInMinutes, translate('hours'))}
      </Typography>
      <Typography
        variant='body2'
        sx={{ textTransform: 'capitalize', display: 'flex', alignItems: 'baseline', gap: 1 }}
      >
        <MdCelebration size='18px' />
        {lessonsCount} {`Training${lessonsCount !== 1 ? 's' : ''}`}
      </Typography>
    </Stack>
  )
}
