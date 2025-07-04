import { type FC } from 'react'

import { Box, Typography } from '@mui/material'
import { ListItem } from '@mui/material'
import { IoMdCheckmarkCircleOutline } from '@react-icons/all-files/io/IoMdCheckmarkCircleOutline'
import { SlClose } from '@react-icons/all-files/sl/SlClose'

import { type IValidationMap } from '@/utils/validationMaping'
import { useTranslate } from '@root/src/utils/translateHelper'

import { CheckerIcon } from '../CheckersIcon'

import { LIST_ITEM_SX } from './constants'

interface CheckersMenuProps {
  checkers: IValidationMap[]
}

const CheckersMenu: FC<CheckersMenuProps> = ({ checkers }) => {
  const translate = useTranslate()
  return (
    <Box sx={BOX_SX}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        <ListItem
          sx={LIST_ITEM_SX}
          key={i}
        >
          {item.valid ? (
            <IoMdCheckmarkCircleOutline
              color='#75CF6D'
              style={{ minWidth: 20 }}
            />
          ) : (
            <SlClose
              color='#F44336'
              style={{ minWidth: 16 }}
            />
          )}
          <Typography fontSize={12}>{item.text}</Typography>
        </ListItem>
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
