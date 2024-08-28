import { Box, Divider } from '@mui/material'
import { FaAngleLeft } from '@react-icons/all-files/fa6/FaAngleLeft'
import { FaKeyboard } from '@react-icons/all-files/fa6/FaKeyboard'
import { FaRegClipboard } from '@react-icons/all-files/fa6/FaRegClipboard'
import { MdOutlineContentCopy } from '@react-icons/all-files/md/MdOutlineContentCopy'
import { MdRedo } from '@react-icons/all-files/md/MdRedo'
import { MdUndo } from '@react-icons/all-files/md/MdUndo'
import { TbSelectAll } from '@react-icons/all-files/tb/TbSelectAll'

import {
  UndoInitiate,
  RedoInitiate,
  copyPasteInitiate,
} from '@root/src/sections/code-panel/lib/events'

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
        onClick={UndoInitiate}
      >
        <MdUndo size={20} />
      </QuickButton>
      <QuickButton
        tooltipTitle='Redo'
        tooltipSubtitle='Shortcut: Ctrl + Y'
        sx={{ minWidth: 50 }}
        onClick={RedoInitiate}
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
        onClick={copyPasteInitiate('select')}
      >
        <TbSelectAll size={20} />
      </QuickButton>
      <QuickButton
        tooltipTitle='Copy'
        tooltipSubtitle='Shortcut: Ctrl + C'
        onClick={copyPasteInitiate('copy')}
      >
        <MdOutlineContentCopy size={20} />
      </QuickButton>
      <QuickButton
        tooltipTitle='Paste'
        tooltipSubtitle='Shortcut: Ctrl + V'
        onClick={copyPasteInitiate('paste')}
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
        <FaKeyboard size={20} />
      </QuickButton>

      <QuickButton
        tooltipTitle='Close'
        onClick={handleClose}
      >
        <FaAngleLeft size={26} />
      </QuickButton>
    </Box>
  )
}
