import { useState } from 'react'

import { Box } from '@mui/material'
import { useTheme } from '@mui/system'
import { FaAngleLeft } from '@react-icons/all-files/fa6/FaAngleLeft'
import { FaAngleRight } from '@react-icons/all-files/fa6/FaAngleRight'
import { AnimatePresence, m } from 'framer-motion'

import useIsDesktop from '@root/src/hooks/useIsDesktop'

import PrimaryButtons from './PrimaryButtons'
import SecondaryButtons from './SecondaryButtons'

export default function DesktopQuickKeys() {
  const theme = useTheme()
  const isDesktop = useIsDesktop()

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

  const OPEN_BTN_SX = {
    width: 50,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.direction === 'rtl' ? '8px 0 0 0' : '0 8px 0 0',
    cursor: 'pointer',
  }

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          position: 'absolute',
          zIndex: 300,
          bottom: 0,
          left: 0,
          display: isDesktop ? 'block' : 'none',
        }}
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
            style={{
              display: 'flex',
              background: '#b36060',
              borderRadius: theme.direction === 'rtl' ? '8px 0 0 0' : '0 8px 0 0',
            }}
          >
            <Box
              className='toolbox'
              sx={OPEN_BTN_SX}
            >
              {theme.direction === 'rtl' ? (
                <FaAngleLeft
                  color='#fff'
                  size={20}
                />
              ) : (
                <FaAngleRight
                  color='#fff'
                  size={20}
                />
              )}
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
              borderRadius: theme.direction === 'rtl' ? '8px 0 0 0' : '0 8px 0 0',
            }}
          >
            {!isOpenButtons ? (
              <PrimaryButtons
                handleChangeButtons={handleChangeButtons}
                handleClose={handleClose}
              />
            ) : (
              <SecondaryButtons
                handleChangeButtons={handleChangeButtons}
                handleClose={handleClose}
              />
            )}
          </m.div>
        </AnimatePresence>
      </Box>
    </>
  )
}
