import { ReactNode } from 'react'

import { Button, SxProps, Tooltip, Typography } from '@mui/material'

interface IQuickButton {
  tooltipTitle?: string
  tooltipSubtitle?: string
  sx?: SxProps
  children?: ReactNode
  onClick?: () => void
}

export default function QuickButton({
  tooltipTitle,
  tooltipSubtitle,
  sx,
  children,
  onClick,
}: IQuickButton) {
  return (
    <Tooltip
      placement='top'
      title={
        <>
          <Typography
            fontSize={12}
            fontWeight={700}
          >
            {tooltipTitle}
          </Typography>
          <Typography fontSize={10}>{tooltipSubtitle}</Typography>
        </>
      }
    >
      <Button
        sx={{
          borderRadius: 0,
          minWidth: 40,
          flexShrink: 0,
          color: '#fff',
          '&:hover': { color: '#FBDD3F', bgcolor: '#fbdc3f26' },
          ...sx,
        }}
        onClick={() => {
          if (onClick) onClick()
        }}
      >
        {children}
      </Button>
    </Tooltip>
  )
}
