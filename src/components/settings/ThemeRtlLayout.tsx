import React, { useEffect } from 'react'

import { useTheme } from '@mui/material/styles'

// import { prefixer } from 'stylis'
// import rtlPlugin from 'stylis-plugin-rtl'
// import { CacheProvider } from '@emotion/react'
// import createCache from '@emotion/cache'

interface Props {
  children: React.ReactNode
}

export default function ThemeRtlLayout({ children }: Props): React.ReactElement | null {
  const theme = useTheme()

  useEffect(() => {
    document.dir = theme.direction
  }, [theme.direction])
  // comented temporaly because cause an error and
  // point of this is not clearly seen ...
  // const cacheRtl = createCache({
  //   key: 'rtl',
  //   stylisPlugins: [prefixer, rtlPlugin],
  // })

  // if (theme.direction === 'rtl') {
  //   return <CacheProvider value={cacheRtl}>{children}</CacheProvider>
  // }

  return <>{children}</>
}
