import { type FC } from 'react'

import { Box, Typography } from '@mui/material'

import { type IValidationMap } from '@root/src/utils/CheckValidationTests'
import { useTranslate } from '@root/src/utils/translateHelper'

import { CheckerIcon } from '../CheckersIcon'

import CheckerItem from './checkers-item'

interface CheckersMenuProps {
  checkers: IValidationMap[]
}

const CheckersMenu: FC<CheckersMenuProps> = ({ checkers }) => {
  const translate = useTranslate()
  return (
    <Box sx={BOX_SX}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <CheckerIcon
          width={14}
          height={15}
          color='#fff'
        />
        <Typography sx={{ fontSize: '600', ml: 1, mr: 'auto' }}>
          {translate('code_tests_title')}
        </Typography>
      </Box>

      {checkers.map((item, i) => (
        <CheckerItem
          key={i}
          item={item}
        />
      ))}
    </Box>
  )
}

const BOX_SX = {
  minHeight: 130,
  color: '#fff',
  width: 320,
  p: '8px 16px',
}

export default CheckersMenu
