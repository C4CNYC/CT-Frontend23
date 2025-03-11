import { useMemo } from 'react'

import { ThemeProvider, alpha, createTheme, useTheme } from '@mui/material/styles'
import merge from 'lodash-es/merge'

import { useSettingsContext } from './SettingsContext'

interface Props {
  children: React.ReactNode
}

export function ThemeColorPresets({ children }: Props): React.ReactElement | null {
  const outerTheme = useTheme()

  const { presetsColor } = useSettingsContext()

  const themeOptions = useMemo(
    () => ({
      palette: {
        primary: presetsColor,
      },
      customShadows: {
        primary: `0 8px 16px 0 ${alpha(presetsColor.main, 0.24)}`,
      },
    }),
    [presetsColor]
  )

  const theme = createTheme(merge(outerTheme, themeOptions))

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
