import { Box, Divider } from '@mui/material'
import { FaRegClipboard } from '@react-icons/all-files/fa6/FaRegClipboard'
import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline'
import { MdOutlineContentCopy } from '@react-icons/all-files/md/MdOutlineContentCopy'
import { MdRedo } from '@react-icons/all-files/md/MdRedo'
import { MdUndo } from '@react-icons/all-files/md/MdUndo'
import { RiBracesFill } from '@react-icons/all-files/ri/RiBracesFill'
import { TbSelectAll } from '@react-icons/all-files/tb/TbSelectAll'

import QuickButton from './QuickButton'

export default function PrimaryButtons({
  handleClose,
  handleChangeButtons,
}: {
  handleClose: VoidFunction
  handleChangeButtons: VoidFunction
}) {
  return (
    <Box sx={{ height: 30, display: 'flex' }}>
      <QuickButton
        tooltipTitle='Undo'
        tooltipSubtitle='Shortcut: Ctrl + Z'
        sx={{ minWidth: 50 }}
      >
        <MdUndo size={20} />
      </QuickButton>
      <QuickButton
        tooltipTitle='Redo'
        tooltipSubtitle='Shortcut: Ctrl + Y'
        sx={{ minWidth: 50 }}
      >
        <MdRedo size={20} />
      </QuickButton>
      <Divider
        orientation='vertical'
        variant='middle'
        sx={{ bgcolor: '#d6d6d6', height: 'auto', my: '4px' }}
      />
      <QuickButton
        tooltipTitle='Select All'
        tooltipSubtitle='Shortcut: Ctrl + A'
      >
        <TbSelectAll size={20} />
      </QuickButton>
      <QuickButton
        tooltipTitle='Copy'
        tooltipSubtitle='Shortcut: Ctrl + C'
      >
        <MdOutlineContentCopy size={20} />
      </QuickButton>
      <QuickButton
        tooltipTitle='Paste'
        tooltipSubtitle='Shortcut: Ctrl + V'
      >
        <FaRegClipboard size={20} />
      </QuickButton>

      <Divider
        orientation='vertical'
        variant='middle'
        sx={{ bgcolor: '#d6d6d6', height: 'auto', my: '4px' }}
      />

      <QuickButton
        tooltipTitle='Symbols'
        onClick={handleChangeButtons}
      >
        <RiBracesFill size={20} />
      </QuickButton>

      <QuickButton
        tooltipTitle='Close'
        onClick={handleClose}
      >
        <IoCloseOutline size={26} />
      </QuickButton>
    </Box>
  )
}
