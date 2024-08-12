import { IconButton, IconButtonProps, useTheme } from '@mui/material'

import { Iconify } from '@/components/iconify'
import { useSettingsContext } from '@/components/settings'
import { useResponsive } from '@/hooks/useResponsive'

import { NAV_SIZES } from '../../../theme/consts'

export default function NavToggleButton({
  sx,
  ...other
}: IconButtonProps): React.ReactElement | null {
  const theme = useTheme()
  const { themeLayout, onToggleLayout } = useSettingsContext()
  const isRTL = theme.direction === 'rtl'
  const isDesktop = useResponsive('up', 'md')

  if (!isDesktop) {
    return null
  }

  return (
    <IconButton
      size='small'
      onClick={onToggleLayout}
      sx={{
        p: 0.5,
        top: 32,
        position: 'fixed',

        left: isRTL ? `calc(100% - ${NAV_SIZES.W_DASHBOARD + 12}px)` : NAV_SIZES.W_DASHBOARD - 12,
        bgcolor: 'background.default',
        zIndex: (theme) => theme.zIndex.appBar + 1,
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
        '&:hover': {
          bgcolor: 'background.default',
        },
        ...sx,
      }}
      {...other}
    >
      <Iconify
        width={16}
        icon={themeLayout === 'vertical' ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'}
        sx={{
          ...(isRTL && { transform: 'rotate(180deg)' }),
        }}
      />
    </IconButton>
  )
}
