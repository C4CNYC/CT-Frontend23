import { type FC } from 'react'

import { ListItem, Typography } from '@mui/material'
import { IoMdCheckmarkCircleOutline } from '@react-icons/all-files/io/IoMdCheckmarkCircleOutline'
import { SlClose } from '@react-icons/all-files/sl/SlClose'

import { LIST_ITEM_SX } from './constants'

interface CheckersItemButtonProps {
  active: boolean
  name: string
}

const CheckersItemButton: FC<CheckersItemButtonProps> = ({ active, name }) => {
  return (
    <ListItem sx={LIST_ITEM_SX}>
      {active ? (
        <SlClose
          color='#F44336'
          style={{ minWidth: 16 }}
        />
      ) : (
        <IoMdCheckmarkCircleOutline
          color='#75CF6D'
          style={{ minWidth: 20 }}
        />
      )}
      <Typography fontSize={12}>{name}</Typography>
    </ListItem>
  )
}

export default CheckersItemButton
