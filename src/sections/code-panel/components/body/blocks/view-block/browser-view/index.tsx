import { type FC, useEffect, useState } from 'react'

import SkeletonViewBlock from '../skeleton-view-box'

export interface CodeDocument {
  htmlBody?: string[]
  cssBody?: string[]
  jsBody?: string[]
}

interface BrowserViewProps {
  document: CodeDocument | null
  isOpenHeader?: boolean
  iframeKey?: number
  stepBgColor?:string
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

const BrowserView: FC<BrowserViewProps> = ({ document, isOpenHeader, iframeKey, 
  stepBgColor }) => {
  const [docSrc, setDocSrc] = useState('')

  useEffect(() => {
    if (document == null) {
      return
    }

    const fontPath = '/fonts/index.css'
    const fontCssLink = `<link rel="stylesheet" href="${fontPath}">`
    const { htmlBody = [], cssBody = [], jsBody = [] } = document

    setDocSrc(`
      <html style="height: 100%">
        <head>
          ${fontCssLink}
          ${getBody(cssBody, TagNames.Style)}
        </head>
        <body style="height: 100%; margin: 0;" id="pageLesson">
        <div class="lesson-page " style=${stepBgColor?'background-color:'+stepBgColor :''}>
          ${(document as any).length ? document : htmlBody.join('\n')}
        </div>
          ${getBody(jsBody, TagNames.Script)}
        </body>
      </html>
    `)
  }, [document])

  return document ? (
    <iframe
      key={iframeKey}
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
  background: '#fff',
}

export default BrowserView
