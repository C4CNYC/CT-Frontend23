import { IconButton, IconButtonProps } from '@mui/material'

import { Iconify } from '@/components/iconify'
import { useSettingsContext } from '@/components/settings'
import { useResponsive } from '@/hooks/useResponsive'

import { NAV_SIZES } from '../../../theme/consts'

export default function NavToggleButton({
  sx,
  ...other
}: IconButtonProps): React.ReactElement | null {
  const { themeLayout, themeDirection, onToggleLayout } = useSettingsContext()
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

        left: NAV_SIZES.W_DASHBOARD - 12,
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
        icon={
          themeDirection === 'ltr'
            ? themeLayout === 'vertical'
              ? 'eva:arrow-ios-back-fill'
              : 'eva:arrow-ios-forward-fill'
            : themeLayout === 'vertical'
              ? 'eva:arrow-ios-forward-fill'
              : 'eva:arrow-ios-back-fill'
        }
      />
    </IconButton>
  )
}
