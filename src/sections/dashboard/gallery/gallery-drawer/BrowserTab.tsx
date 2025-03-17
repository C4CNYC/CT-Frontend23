import React from 'react'

import { useGalleryDrawerContext } from '../context/gallery-drawer-context'

export default function BrowserTab(): React.ReactElement {
  const { code } = useGalleryDrawerContext()
  return (
    <iframe
      style={{
        border: 0,
        width: '100%',
        height: '100%',
      }}
      src={'data:text/html,' + encodeURIComponent(code)}
    />
  )
}
