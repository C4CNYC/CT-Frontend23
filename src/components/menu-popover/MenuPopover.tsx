import { Popover, PopoverOrigin } from '@mui/material'

import { getPosition } from './getPosition'
import { StyledArrow } from './styles'
import { MenuPopoverProps } from './types'

export function MenuPopover({
  open,
  children,
  arrow = 'top-right',
  disabledArrow,
  sx,
  ...other
}: MenuPopoverProps): React.ReactElement | null {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow)

  return (
    <Popover
      {...other}
      open={Boolean(open)}
      anchorEl={typeof open == 'boolean' ? null : open}
      anchorOrigin={anchorOrigin as PopoverOrigin}
      transformOrigin={transformOrigin as PopoverOrigin}
      PaperProps={{
        sx: {
          p: 1,
          width: 'auto',
          overflow: 'inherit',
          ...style,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '& svg': { mr: 2, width: 20, height: 20, flexShrink: 0 },
          },
          ...sx,
        },
      }}
    >
      {!disabledArrow && <StyledArrow arrow={arrow} />}

      {children}
    </Popover>
  )
}
