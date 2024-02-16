// hooks
import { Box, BoxProps } from '@mui/material'

import { useSettingsContext } from '@/components/settings'
import { useResponsive } from '@/hooks/useResponsive'

import { HEADER_SIZES, NAV_SIZES } from '../../theme/consts'

const SPACING = 8

export default function Main({ children, sx, ...other }: BoxProps): React.ReactElement {
  const { themeLayout } = useSettingsContext()

  const isNavHorizontal = themeLayout === 'horizontal'

  const isNavMini = themeLayout === 'mini'

  const isDesktop = useResponsive('up', 'md')

  if (isNavHorizontal) {
    return (
      <Box
        component='main'
        sx={{
          pt: `${HEADER_SIZES.H_MOBILE + SPACING}px`,
          pb: `${HEADER_SIZES.H_MOBILE + SPACING}px`,
          ...(isDesktop && {
            px: 2,
            pt: `${HEADER_SIZES.H_DASHBOARD_DESKTOP + 80}px`,
            pb: `${HEADER_SIZES.H_DASHBOARD_DESKTOP + SPACING}px`,
          }),
        }}
      >
        {children}
      </Box>
    )
  }

  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        py: `${HEADER_SIZES.H_MOBILE + SPACING}px`,
        ...(isDesktop && {
          px: 2,
          py: `${HEADER_SIZES.H_DASHBOARD_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV_SIZES.W_DASHBOARD}px)`,
          ...(isNavMini && {
            width: `calc(100% - ${NAV_SIZES.W_DASHBOARD_MINI}px)`,
          }),
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  )
}
