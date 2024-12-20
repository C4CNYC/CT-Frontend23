import React, { useEffect } from 'react'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { useTheme } from '@mui/material/styles'
import rtlPlugin from 'stylis-plugin-rtl'

interface Props {
  children: React.ReactNode
}

export default function ThemeRtlLayout({ children }: Props): React.ReactElement | null {
  const theme = useTheme()

  useEffect(() => {
    document.dir = theme.direction
  }, [theme.direction])

  const cacheRtl = createCache({
    key: 'rtl',
    prepend: true,
    stylisPlugins: [rtlPlugin],
  })

  if (theme.direction === 'rtl') {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>
  }

  return <>{children}</>
}
