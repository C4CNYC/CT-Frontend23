import { useEffect, useRef, useState } from 'react'

import { Box, Collapse, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown'
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp'
import { IoTrashOutline } from '@react-icons/all-files/io5/IoTrashOutline'
import { LuInfo } from '@react-icons/all-files/lu/LuInfo'
import { TbPrompt } from '@react-icons/all-files/tb/TbPrompt'

import { isJson } from '@root/src/utils'
import { useTranslate } from '@root/src/utils/translateHelper'

import { COLLAPSE_BOX_SX, CONSOLE_CONT_SX, CONSOLE_HEADER_SX } from './constants'
const ConsoleBlock = () => {
  const translate = useTranslate()
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const ConsoleBoxRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let eventListener = function (event: { data: any }) {
      if (event.data && event.data.type === 'ConsoleLog') {
        if (ConsoleBoxRef.current === null) return
        if (!isOpen) setIsOpen(true)
        let message = isJson(event?.data?.message)
          ? Object.values(JSON.parse(event?.data?.message))
          : event?.data?.message
        ConsoleBoxRef.current.innerHTML += message + '<br/>'
        ConsoleBoxRef.current.scrollTop = ConsoleBoxRef.current.scrollHeight
      }
    }
    window.addEventListener('message', eventListener)
    return () => window.removeEventListener('message', eventListener)
  }, [])

  return (
    <Box
      sx={{
        ...CONSOLE_CONT_SX,
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.common.white
            : theme.palette.background.paper,
      }}
    >
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
                p: 2,
              },
            },
          }}
          placement='top'
          title={
            <>
              <Typography>{translate('console_tooltip_title')}</Typography>
              <Typography>{translate('console_tooltip_subtitle_1')}</Typography>
            </>
          }
        >
          <IconButton disableRipple>
            <LuInfo color='#0198ED' />
          </IconButton>
        </Tooltip>
        {isOpen ? (
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: {
                  p: 2,
                },
              },
            }}
            placement='top'
            title={
              <>
                <Typography variant='h6'>{translate('console_clear_button_title')}</Typography>
                <Typography>{translate('console_clear_button_subtitle')}</Typography>
              </>
            }
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation()
                if (ConsoleBoxRef.current === null) return
                ConsoleBoxRef.current.innerHTML = ''
              }}
            >
              <IoTrashOutline color='#EE467A' />
            </IconButton>
          </Tooltip>
        ) : null}
        <IconButton sx={{ ml: 'auto' }}>
          {!isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </IconButton>
      </Stack>
      <Collapse in={isOpen}>
        <Box
          sx={COLLAPSE_BOX_SX}
          ref={ConsoleBoxRef}
        >
          {translate('console_welcome')}
          <br />
        </Box>
      </Collapse>
    </Box>
  )
}

export default ConsoleBlock
