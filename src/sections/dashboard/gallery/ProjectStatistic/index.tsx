import { Box, Stack, Typography } from '@mui/material'
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart'
import { BiCommentDetail } from '@react-icons/all-files/bi/BiCommentDetail'
import { BiGitBranch } from '@react-icons/all-files/bi/BiGitBranch'
import { MdOutlineVisibility } from '@react-icons/all-files/md/MdOutlineVisibility'

export default function ProjectStatistic(): React.ReactElement {
  return (
    <>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 3,
          alignSelf: {
            xs: 'flex-start',
            sm: 'center',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#364954', gap: 0.5 }}>
          <MdOutlineVisibility size='20px' />
          <Typography variant='body2'>2k</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#364954', gap: 0.5 }}>
          <AiOutlineHeart size='20px' />
          <Typography variant='body2'>214</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#364954', gap: 0.5 }}>
          <BiCommentDetail size='20px' />
          <Typography variant='body2'>16</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#364954', gap: 0.5 }}>
          <BiGitBranch size='20px' />
          <Typography variant='body2'>5</Typography>
        </Box>
      </Stack>
    </>
  )
}
