import { Box, Typography } from '@mui/material'
import { HiLockClosed } from '@react-icons/all-files/hi2/HiLockClosed'

import { useTranslate } from '@root/src/utils/translateHelper'

import { getLockedBtnSx, LOCKED_BTN_SX } from './constants'

const LockedStartButton = () => {
  const translate = useTranslate()
  return (
    <Box sx={getLockedBtnSx()}>
      <Typography variant='h5'>{translate('actions_start')}</Typography>
      <Box sx={LOCKED_BTN_SX}>
        <HiLockClosed
          size={30}
          style={{ color: '#C4CDD5' }}
        />
      </Box>
    </Box>
  )
}
export default LockedStartButton
