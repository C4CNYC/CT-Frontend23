import { useEffect, useRef, useState } from 'react'

import { Box, Collapse, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown'
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp'
import { TbPrompt } from '@react-icons/all-files/tb/TbPrompt'

import { Iconify } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

import { COLLAPSE_BOX_SX, CONSOLE_CONT_SX, CONSOLE_HEADER_SX } from './constants'
const ConsoleBlock = () => {
  const translate = useTranslate()
  const [isOpen, setIsOpen] = useState(false)
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
        <TbPrompt
          color='#C4C4C4'
          size={26}
        />
        <Typography sx={{ color: '#C4C4C4', mr: 1 }}>{translate('console_title')}</Typography>
        <Tooltip
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
          <Iconify
            icon='lucide:info'
            color='#0198ED'
          />
        </Tooltip>
        <IconButton sx={{ ml: 'auto' }}>
          {!isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
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
