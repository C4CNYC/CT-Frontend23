import { useEffect, useRef, useState } from 'react'

import { Box, Collapse, IconButton, Stack, Tooltip, Typography } from '@mui/material'

import { Iconify } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

import { COLLAPSE_BOX_SX, CONSOLE_CONT_SX, CONSOLE_HEADER_SX } from './constants'

const ConsoleBlock = () => {
  const translate = useTranslate()

  const [isOpen, setIsOpen] = useState(false)
  const [openTooltip, setOpenTooltip] = useState(false)

  const ConsoleBoxRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let eventListener = function (event: { data: any }) {
      if (event.data && event.data.type === 'ConsoleLog') {
        if (ConsoleBoxRef.current === null) return
        if (!isOpen) setIsOpen(true)
        ConsoleBoxRef.current.innerHTML += event?.data?.message + '<br/>'
        ConsoleBoxRef.current.scrollTop = ConsoleBoxRef.current.scrollHeight
      }
    }
    window.addEventListener('message', eventListener)
    return () => window.removeEventListener('message', eventListener)
  }, [])

  return (
    <Box sx={CONSOLE_CONT_SX}>
      <Stack
        sx={CONSOLE_HEADER_SX}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Iconify
          icon='mdi:console-line'
          color='#C4C4C4'
          width={24}
        />
        <Typography sx={{ color: '#C4C4C4' }}>{translate('console_title')}</Typography>
        <Tooltip
          open={openTooltip}
          componentsProps={{
            tooltip: {
              sx: {
                p: 3,
                minWidth: '320px',
              },
            },
          }}
          title={
            <>
              <Typography variant='h6'>{translate('console_tooltip_title')}</Typography>
              <Typography pb={1}>{translate('console_tooltip_subtitle_1')}</Typography>
              <Typography>{translate('console_tooltip_subtitle_2')}</Typography>
            </>
          }
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              setOpenTooltip(!openTooltip)
            }}
            onMouseEnter={() => setOpenTooltip(true)}
            onMouseLeave={() => setOpenTooltip(false)}
          >
            <Iconify
              icon='lucide:info'
              color='#0198ED'
            />
          </IconButton>
        </Tooltip>
        <IconButton sx={{ ml: 'auto' }}>
          <Iconify icon={!isOpen ? 'tabler:chevron-up' : 'tabler:chevron-down'} />
        </IconButton>
      </Stack>
      <Collapse in={isOpen}>
        <Box
          sx={COLLAPSE_BOX_SX}
          ref={ConsoleBoxRef}
        >
          {/* place for console info */}
        </Box>
      </Collapse>
    </Box>
  )
}

export default ConsoleBlock
