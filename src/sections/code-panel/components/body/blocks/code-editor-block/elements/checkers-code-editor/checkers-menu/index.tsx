import { type FC } from 'react'

import { Box, Typography } from '@mui/material'

import { type IValidationMap } from '@/utils/validationMaping'

import CheckersItemButton from '../checkers-item-button'
import { CheckerIcon } from '../CheckersIcon'

interface CheckersMenuProps {
  checkers: IValidationMap[]
}

const CheckersMenu: FC<CheckersMenuProps> = ({ checkers }) => {
  return (
    <Box sx={BOX_SX}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CheckerIcon
          width={14}
          height={15}
          color='#fff'
        />
        <Typography sx={{ fontSize: '600', ml: 1, mr: 'auto' }}>Code Tests</Typography>
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
  minHeight: 130,
  color: '#fff',
  width: 220,
  p: '8px 16px',
}

export default CheckersMenu
