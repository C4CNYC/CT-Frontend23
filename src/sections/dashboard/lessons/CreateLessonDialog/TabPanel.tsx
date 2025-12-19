import React from 'react'

import { Box } from '@mui/material'

export interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export function TabPanel(props: TabPanelProps): React.ReactElement {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            pt: { xs: 2, sm: 3 },
            height: 'auto',
            minHeight: '400px',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  )
}
