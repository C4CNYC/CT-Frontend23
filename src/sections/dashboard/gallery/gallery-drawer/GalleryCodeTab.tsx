import React from 'react'

import { html } from '@codemirror/lang-html'
import CodeMirror from '@uiw/react-codemirror'

import { useGalleryDrawerContext } from '../context/gallery-drawer-context'

export default function GalleryCodeTab(): React.ReactElement {
  const { code, setCode } = useGalleryDrawerContext()
  return (
    <CodeMirror
      value={code}
      style={{ height: '100%' }}
      height='100%'
      extensions={[html()]}
      onChange={(value) => {
        setCode(value)
      }}
    />
  )
}
