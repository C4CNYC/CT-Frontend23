import { type FC } from 'react'

import { Box, Typography } from '@mui/material'
import { CgClose } from '@react-icons/all-files/cg/CgClose'

import { type IValidationMap } from '@/utils/validationMaping'

import CheckersItemButton from '../checkers-item-button'
import { CheckerIcon } from '../CheckersIcon'

interface CheckersMenuProps {
  checkers: IValidationMap[]
  onClose: () => void
}

const CheckersMenu: FC<CheckersMenuProps> = ({ checkers, onClose }) => {
  return (
    <Box sx={BOX_SX}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CheckerIcon
          width={14}
          height={15}
          color='#fff'
        />
        <Typography sx={{ fontSize: '600', ml: 1, mr: 'auto' }}>Code Tests</Typography>
        <CgClose
          onClick={onClose}
          cursor='pointer'
        />
      </Box>

      {checkers.map((item, i) => (
        <CheckersItemButton
          key={i}
          active={!item.valid}
          name={item.text}
        />
      ))}
    </Box>
  )
}

const BOX_SX = {
  color: '#fff',
  width: 220,
  p: '8px 16px',
}

export default CheckersMenu
