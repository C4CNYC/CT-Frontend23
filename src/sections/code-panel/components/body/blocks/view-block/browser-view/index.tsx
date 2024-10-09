import { type FC, useEffect, useState } from 'react'

import { IIntegration } from '@/redux/services/interfaces/integration.interface'

import SkeletonViewBlock from '../skeleton-view-box'

export interface CodeDocument {
  htmlBody?: string[]
  cssBody?: string[]
  jsBody?: string[]
}

interface BrowserViewProps {
  document: CodeDocument | null
  integrations: IIntegration[]
  isOpenHeader?: boolean
  iframeKey?: number
  stepBgColor?: string
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

const BrowserView: FC<BrowserViewProps> = ({
  document,
  isOpenHeader,
  iframeKey,
  stepBgColor,
  integrations,
}) => {
  const [docSrc, setDocSrc] = useState('')

  useEffect(() => {
    if (document == null) {
      return
    }

    const fontPath = '/fonts/index.css'
    const fontCssLink = `<link rel="stylesheet" href="${fontPath}">`
    const { htmlBody = [], cssBody = [], jsBody = [] } = document
    let integrationsScripts = integrations
      .map((integration) => integration.scripts)
      .filter(Boolean)
      .join('\n')

    setDocSrc(`
      <html style="height: 100%">
        <head>
          ${fontCssLink}
          ${getBody(cssBody, TagNames.Style)}
          ${integrationsScripts}
        </head>
        <body style="height: 100%; margin: 0;" id="pageLesson">
        <div class="lesson-page " style=${stepBgColor ? 'background-color:' + stepBgColor : ''}>
          ${(document as any).length ? document : htmlBody.join('\n')}
        </div>
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
