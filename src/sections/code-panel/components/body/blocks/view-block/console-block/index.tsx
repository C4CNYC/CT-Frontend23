import { useState } from 'react'

import { Box, Collapse, IconButton, Stack, Tooltip, Typography } from '@mui/material'

import { Iconify } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

import { CONSOLE_CONT_SX, CONSOLE_HEADER_SX } from './constants'

const ConsoleBlock = () => {
  const translate = useTranslate()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box sx={CONSOLE_CONT_SX}>
      <Stack sx={CONSOLE_HEADER_SX}>
        <Iconify
          icon='mdi:console-line'
          color='#C4C4C4'
          width={24}
        />
        <Typography sx={{ color: '#C4C4C4' }}>{translate('console_title')}</Typography>
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
              <Typography pb={1}>{translate('console_tooltip_subtitle_2')}</Typography>
              <Typography>{translate('console_tooltip_subtitle_3')}</Typography>
            </>
          }
        >
          <Iconify
            icon='lucide:info'
            color='#0198ED'
          />
        </Tooltip>
        <IconButton
          sx={{ ml: 'auto' }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Iconify icon={!isOpen ? 'tabler:chevron-up' : 'tabler:chevron-down'} />
        </IconButton>
      </Stack>
      <Collapse in={isOpen}>
        <Box sx={{ width: '100%', height: '200px', background: '#333' }}>
          {/* place for console info */}
        </Box>
      </Collapse>
    </Box>
  )
}

export default ConsoleBlock
