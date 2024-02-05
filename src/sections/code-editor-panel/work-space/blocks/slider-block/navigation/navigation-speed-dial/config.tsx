import { type ReactNode } from 'react'

import { Badge } from '@mui/material'
import { BiFullscreen } from '@react-icons/all-files/bi/BiFullscreen'
import { BiMedal } from '@react-icons/all-files/bi/BiMedal'
import { MdOutlineNoteAlt } from '@react-icons/all-files/md/MdOutlineNoteAlt'
import { TbMessageCircle } from '@react-icons/all-files/tb/TbMessageCircle'

import { voidFunction } from '@/utils'

interface Action {
  icon: ReactNode
  name: string
  action: () => void
}

export const getActions = (onToggleChat: () => void): Action[] => [
  {
    icon: (
      <BiMedal
        color='#FBDD3F'
        size='20px'
      />
    ),
    name: 'Info',
    action: voidFunction,
  },
  {
    icon: (
      <MdOutlineNoteAlt
        color='#FBDD3F'
        size='20px'
      />
    ),
    name: 'Notes',
    action: voidFunction,
  },
  {
    icon: (
      <Badge
        sx={{ '& .MuiBadge-badge': { top: '-5px' } }}
        color='secondary'
        variant='dot'
      >
        <TbMessageCircle
          color='#FBDD3F'
          size='20px'
        />
      </Badge>
    ),
    name: 'Messeges',
    action: onToggleChat,
  },
  {
    icon: (
      <BiFullscreen
        color='#FBDD3F'
        size='20px'
      />
    ),
    name: 'Full screen',
    action: voidFunction,
  },
]
