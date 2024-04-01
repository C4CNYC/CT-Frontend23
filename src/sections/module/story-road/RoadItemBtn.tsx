import { useMemo } from 'react'

import { Button, Stack, Typography } from '@mui/material'
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight'

import { getButtonSx, getMobileButtonSx } from './constants'

interface IRoadItemBtn {
  redirectToCodePanel: () => void
  lastActive: boolean
  compleated: boolean
  locked: boolean
  isMobile?: boolean
}

const RoadItemBtn = ({
  redirectToCodePanel,
  lastActive,
  compleated,
  locked,
  isMobile,
}: IRoadItemBtn) => {
  const buttonSx = useMemo(
    () => (isMobile ? getMobileButtonSx(lastActive) : getButtonSx(lastActive)),
    [lastActive, isMobile]
  )

  const getBtnText = () => {
    if (compleated) return 'Review'
    if (lastActive)
      return (
        <Stack
          direction='row'
          alignItems='center'
          gap={0.5}
        >
          <Stack>
            <Typography
              variant='body1'
              fontWeight={700}
            >
              Explore
            </Typography>
            <Typography
              variant='body1'
              fontWeight={700}
            >
              Now
            </Typography>
          </Stack>
          <FaArrowRight size={18} />
        </Stack>
      )
    if (locked) return 'Open'
    return 'Continue'
  }
  return (
    <Button
      variant='contained'
      onClick={redirectToCodePanel}
      disableRipple
      sx={buttonSx}
    >
      {getBtnText()}
    </Button>
  )
}

export default RoadItemBtn
