import { useState } from 'react'

import { Box, Divider } from '@mui/material'
import { FaRegClipboard } from '@react-icons/all-files/fa6/FaRegClipboard'
import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline'
import { MdOutlineContentCopy } from '@react-icons/all-files/md/MdOutlineContentCopy'
import { MdRedo } from '@react-icons/all-files/md/MdRedo'
import { MdUndo } from '@react-icons/all-files/md/MdUndo'
import { RiBracesFill } from '@react-icons/all-files/ri/RiBracesFill'
import { TbSelectAll } from '@react-icons/all-files/tb/TbSelectAll'
import { AnimatePresence, m } from 'framer-motion'
import { useDetectClickOutside } from 'react-detect-click-outside'

import QuickButton from './QuickButton'

export default function DesktopQuickKeys() {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const ref = useDetectClickOutside({ onTriggered: handleClose })

  return (
    <>
      <Box
        ref={ref}
        onClick={handleOpen}
        sx={{ position: 'absolute', zIndex: 300, bottom: 0, left: 0 }}
      >
        <AnimatePresence>
          <m.div
            initial='visible'
            animate={open ? 'open' : 'closed'}
            variants={{
              open: {
                opacity: 0,
                transition: { delay: 0.3 },
              },
              closed: {
                opacity: 0.6,
                transition: { delay: 0.3 },
              },
            }}
            style={{ display: 'flex', background: '#b36060', borderTopRightRadius: 8 }}
          >
            <Box sx={OPEN_BTN_SX}>
              <MdUndo
                color='#fff'
                size={20}
              />
            </Box>
          </m.div>
        </AnimatePresence>
      </Box>
      <Box sx={{ position: 'absolute', zIndex: 300, bottom: 0, left: 0 }}>
        <AnimatePresence>
          <m.div
            initial={false}
            animate={open ? 'open' : 'closed'}
            variants={{
              open: {
                width: 'auto',
                opacity: 1,
              },
              closed: {
                width: 0,
                opacity: 1,
              },
            }}
            style={{
              background: '#b36060',
              overflow: 'hidden',
              borderTopRightRadius: 8,
            }}
          >
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

              <QuickButton tooltipTitle='Brackets'>
                <RiBracesFill size={20} />
              </QuickButton>
              <QuickButton
                tooltipTitle='Close'
                onClick={handleClose}
              >
                <IoCloseOutline size={26} />
              </QuickButton>
            </Box>
          </m.div>
        </AnimatePresence>
      </Box>
    </>
  )
}

const OPEN_BTN_SX = {
  width: 50,
  height: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopRightRadius: 8,
  cursor: 'pointer',
}
