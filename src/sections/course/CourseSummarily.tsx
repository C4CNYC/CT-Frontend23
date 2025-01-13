import { Box, Stack, Typography } from '@mui/material'
import { AiOutlineClockCircle } from '@react-icons/all-files/ai/AiOutlineClockCircle'
import { MdCelebration } from '@react-icons/all-files/md/MdCelebration'

import { useTranslate } from '@/utils/translateHelper'
import { convertMinsToString } from '@root/src/utils/convertMinsToString'

interface ICourseSummarilyProps {
  durationInMinutes: number
  level: string
  lessonsCount: number
}

export default function CourseSummarily({
  durationInMinutes,
  level,
  lessonsCount,
}: ICourseSummarilyProps): React.ReactElement {
  const translate = useTranslate()

  return (
    <Stack
      sx={{
        flexDirection: { xs: 'column', sm: 'row' },
        py: 2,
        gap: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AiOutlineClockCircle
          size='15px'
          style={{ marginBottom: '3px' }}
        />
        <Typography variant='body1'>
          {convertMinsToString(durationInMinutes, translate('hours'), translate('minutes'))}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AiOutlineClockCircle
          size='15px'
          style={{ marginBottom: '3px' }}
        />
        <Typography
          variant='body1'
          sx={{ textTransform: 'capitalize' }}
        >
          {translate('grade')} {level}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <MdCelebration
          size='18px'
          style={{ marginBottom: '4px' }}
        />
        <Typography variant='body1'>
          {lessonsCount} {`Training${lessonsCount !== 1 ? 's' : ''}`}
        </Typography>
      </Box>
    </Stack>
  )
}
