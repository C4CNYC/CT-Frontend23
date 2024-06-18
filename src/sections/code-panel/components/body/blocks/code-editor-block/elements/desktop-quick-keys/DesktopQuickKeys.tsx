import { useState } from 'react'

import { Box } from '@mui/material'
import { BiCodeAlt } from '@react-icons/all-files/bi/BiCodeAlt'
import { AnimatePresence, m } from 'framer-motion'
import { useDetectClickOutside } from 'react-detect-click-outside'

const actions = [
  { icon: <BiCodeAlt color='white' />, name: 'Copy' },
  { icon: <BiCodeAlt />, name: 'Save' },
  { icon: <BiCodeAlt />, name: 'Print' },
  { icon: <BiCodeAlt />, name: 'Share' },
]

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
        sx={{ position: 'absolute', zIndex: 300, bottom: 0, left: 0 }}
      >
        <AnimatePresence>
          <m.div
            // onMouseEnter={handleOpen}
            // onMouseOut={handleClose}
            initial='visible'
            animate={open ? 'open' : 'closed'}
            variants={{
              open: {
                opacity: 1,
                width: 200,
              },
              closed: {
                opacity: 0.7,
                width: 50,
                transition: { delay: 0.3 },
              },
            }}
            style={{ display: 'flex', background: '#b06b6b', borderTopRightRadius: 8 }}
          >
            <Box
              onClick={handleOpen}
              sx={{
                width: 50,
                height: 30,
                // bgcolor: '#b06b6b85',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopRightRadius: 8,
              }}
            >
              <BiCodeAlt />
            </Box>
          </m.div>
        </AnimatePresence>
      </Box>
      <Box sx={{ position: 'absolute', zIndex: 300, bottom: 40, left: 0 }}>
        <AnimatePresence>
          <m.div
            initial={false}
            animate={open ? 'closed' : 'open'}
            variants={{
              open: {
                width: 'auto',
                opacity: 1,
              },
              closed: {
                width: 0,
              },
            }}
            style={{
              background: '#b06b6b',
              overflow: 'hidden',
              borderTopRightRadius: 8,
            }}
          >
            <Box
              onMouseOut={handleClose}
              sx={{ width: 200, height: 30 }}
            ></Box>
          </m.div>
        </AnimatePresence>
      </Box>

      {/* speed dial */}
      {/* <Box sx={{ position: 'absolute', zIndex: 300, bottom: 0, left: 0 }}>
        <SpeedDial
          ariaLabel='SpeedDial basic example'
          icon={<BiCodeAlt />}
          direction='right'
          sx={{
            height: 20,

            '& .MuiSpeedDial-actions': {
              height: 36,
              ml: -6,
              borderTopRightRadius: 16,
              overflow: 'hidden',
            },
            '& .MuiSpeedDial-root': {
              height: 20,
            },
          }}
          FabProps={{
            sx: {
              borderRadius: 0,
              maxHeight: 20,
              maxWidth: 60,
              borderTopRightRadius: 16,
              bgcolor: '#a3606082',
              '&:hover': {
                background: '#a36060',
                borderRadius: 0,
              },
            },
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              sx={{
                m: 0,
                borderRadius: 0,
                width: 60,
                height: 36,
                bgcolor: '#a36060',
              }}
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box> */}
    </>
  )
}
