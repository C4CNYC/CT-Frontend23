import { Box, Typography } from '@mui/material'
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar'
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart'
import { TbFileCertificate } from '@react-icons/all-files/tb/TbFileCertificate'

import { convertNumber } from '@/utils'

interface ICourseStatistics {
  likesCount: number
  starsCount: number
  enrolledCount: number
}

export default function CourseStatistics({
  likesCount,
  starsCount,
  enrolledCount,
}: ICourseStatistics): React.ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '20px',
        py: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1,
        }}
      >
        <TbFileCertificate
          size='30px'
          color='#43D4DD'
        />
        <Typography variant='body1'>{convertNumber(enrolledCount)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
        <AiOutlineHeart
          size='30px'
          color='#EE467A'
        />
        <Typography variant='body1'>{convertNumber(likesCount)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
        <AiFillStar
          size='30px'
          color='#FBDD3F'
        />
        <Typography variant='body1'>{convertNumber(starsCount)}</Typography>
      </Box>
    </Box>
  )
}
