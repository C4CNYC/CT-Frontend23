import { Box, Stack, Typography } from '@mui/material'
import { AiOutlineClockCircle } from '@react-icons/all-files/ai/AiOutlineClockCircle'
import { LuSchool } from '@react-icons/all-files/lu/LuSchool'
import { MdCelebration } from '@react-icons/all-files/md/MdCelebration'
import { SiLevelsdotfyi } from '@react-icons/all-files/si/SiLevelsdotfyi'

import { useTranslate } from '@/utils/translateHelper'
import { convertMinsToString } from '@root/src/utils/convertMinsToString'

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
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
        <SiLevelsdotfyi size='17px' />
        <Typography
          variant='body1'
          sx={{ textTransform: 'capitalize' }}
        >
          {level}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
        <LuSchool size='18px' />
        <Typography
          variant='body1'
          sx={{ textTransform: 'capitalize' }}
        >
          {translate('grade')} {grade}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
        <AiOutlineClockCircle size='17px' />
        <Typography
          variant='body1'
          sx={{ textTransform: 'capitalize' }}
        >
          {convertMinsToString(durationInMinutes, translate('hours'), translate('minutes'))}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
        <MdCelebration size='18px' />
        <Typography variant='body1'>
          {lessonsCount} {`Training${lessonsCount !== 1 ? 's' : ''}`}
        </Typography>
      </Box>
    </Stack>
  )
}
