import { Box, Stack, Typography } from '@mui/material'
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart'
import { BiCommentDetail } from '@react-icons/all-files/bi/BiCommentDetail'
import { BiGitBranch } from '@react-icons/all-files/bi/BiGitBranch'
import { MdOutlineVisibility } from '@react-icons/all-files/md/MdOutlineVisibility'

export default function ProjectStatistic(): React.ReactElement {
  return (
    <>
      <Stack
        direction='row'
        spacing={3}
        sx={{
          alignSelf: {
            xs: 'flex-start',
            sm: 'center',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#364954' }}>
          <MdOutlineVisibility size='20px' />
          <Typography
            sx={{ ml: 0.5 }}
            variant='body2'
          >
            2k
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#364954' }}>
          <AiOutlineHeart size='20px' />
          <Typography
            sx={{ ml: 0.5 }}
            variant='body2'
          >
            214
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#364954' }}>
          <BiCommentDetail size='20px' />
          <Typography
            sx={{ ml: 0.5 }}
            variant='body2'
          >
            16
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#364954' }}>
          <BiGitBranch size='20px' />
          <Typography
            sx={{ ml: 0.5 }}
            variant='body2'
          >
            5
          </Typography>
        </Box>
      </Stack>
    </>
  )
}
