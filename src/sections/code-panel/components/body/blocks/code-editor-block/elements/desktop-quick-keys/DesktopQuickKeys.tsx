import { useState } from 'react'

import { Box } from '@mui/material'
import { MdUndo } from '@react-icons/all-files/md/MdUndo'
import { AnimatePresence, m } from 'framer-motion'
import { useDetectClickOutside } from 'react-detect-click-outside'

import PrimaryButtons from './PrimaryButtons'
import SecondaryButtons from './SecondaryButtons'

export default function DesktopQuickKeys() {
  const [open, setOpen] = useState<boolean>(false)
  const [isOpenButtons, setIsOpenButtons] = useState<boolean>(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeButtons = () => {
    setIsOpenButtons(!isOpenButtons)
  }

  // implement closing when detect click outside the buttons box
  const ref = useDetectClickOutside({ onTriggered: handleClose })

  return (
    <>
      <Box
        // ref={ref}
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
            {!isOpenButtons ? (
              <PrimaryButtons
                handleChangeButtons={handleChangeButtons}
                handleClose={handleClose}
              />
            ) : (
              <SecondaryButtons handleChangeButtons={handleChangeButtons} />
            )}
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
