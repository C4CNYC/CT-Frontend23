import { type FC, useMemo } from 'react'

import { useSettingsContext } from '@/components/settings'
import { CodeDocument } from '@/types/code-document'

import SkeletonViewBlock from '../skeleton-view-box'

interface BrowserViewProps {
  document?: CodeDocument
  isOpenHeader?: boolean
}

enum TagNames {
  Style = 'style',
  Script = 'script',
}

const getBody = (bodyList: string[], tagName: TagNames): string =>
  bodyList.reduce(
    (res: string, body: string) => `
    ${res}

    <${tagName}>
      ${body}
    </${tagName}>
  `,
    ''
  )

const BrowserView: FC<BrowserViewProps> = ({ document, isOpenHeader }) => {
  const { themeMode } = useSettingsContext()

  const docSrc = useMemo(() => {
    if (document) {
      const { htmlBody = [], cssBody = [], jsBody = [] } = document

      return `
      <html style="height: 100%">
        <head>
          ${getBody(cssBody, TagNames.Style)}
        </head>
        <body style="height: 100%; margin: 0; color: ${themeMode === 'dark' ? 'white' : 'black'}">
          ${htmlBody.join('\n')}
          ${getBody(jsBody, TagNames.Script)}
        </body>
      </html>
    `
    }
  }, [document, themeMode])

  return docSrc ? (
    <iframe
      srcDoc={docSrc}
      style={IFRAME_STYLE}
    />
  ) : (
    <SkeletonViewBlock isOpenHeader={isOpenHeader} />
  )
}

const IFRAME_STYLE = {
  border: 0,
  width: '100%',
  height: '100%',
}

export default BrowserView
