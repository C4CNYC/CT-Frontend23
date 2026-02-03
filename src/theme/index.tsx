import { useMemo } from 'react'

import { CssBaseline } from '@mui/material'
import {
  Components,
  ThemeProvider as MUIThemeProvider,
  ThemeOptions,
  createTheme,
} from '@mui/material/styles'

import { useSettingsContext } from '@/components/settings'

import { customShadows } from './customShadows'
import { GlobalStyles } from './globalStyles'
import { ComponentsOverrides } from './overrides'
import { palette } from './palette'
import { shadows } from './shadows'
import { typography } from './typography'

interface Props {
  children: React.ReactNode
}

export function ThemeProvider({ children }: Props): React.ReactElement | null {
  const { themeMode, themeDirection } = useSettingsContext()

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: palette(themeMode),
      typography,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: shadows(themeMode),
      customShadows: customShadows(themeMode),
    }),
    [themeDirection, themeMode]
  )

  const theme = useMemo(() => {
    const t = createTheme(themeOptions)
    t.components = ComponentsOverrides(t) as Components
    return t
  }, [themeOptions])

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MUIThemeProvider>
  )
}
