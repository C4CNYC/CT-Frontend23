import { type FC, useEffect, useMemo, useState } from 'react'

import { IIntegration } from '@/redux/services/interfaces/integration.interface'

import SkeletonViewBlock from '../skeleton-view-box'

export interface CodeDocument {
  htmlBody?: string
  cssBody?: string
  jsBody?: string
}

interface BrowserViewProps {
  document: CodeDocument | null
  integrations: IIntegration[]
  isOpenHeader?: boolean
  iframeKey?: number
  stepBgColor?: string
  reloadIframe?: () => void
}

enum TagNames {
  Style = 'style',
  Script = 'script',
}

const getBody = (body: string, tagName: TagNames): string =>
  `
    <${tagName}>
      ${body}
    </${tagName}>
  `

const BrowserView: FC<BrowserViewProps> = ({
  document,
  isOpenHeader,
  iframeKey,
  stepBgColor,
  integrations,
  reloadIframe,
}) => {
  const [docSrc, setDocSrc] = useState('')
  const [iframeProcess, setIframeProcess] = useState(false)

  const IFRAME_STYLE = {
    border: 0,
    width: '100%',
    height: iframeKey ? 'calc(100% - 32px)' : '100%',
    background: '#fff',
  }

  useEffect(() => {
    if (document == null) {
      return
    }

    setIframeProcess(true)

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
          ${getBody(cssBody as string, TagNames.Style)}
          ${integrationsScripts}
        </head>
        <body style="height: 100%; margin: 0;" id="pageLesson">
        <div class="lesson-page " style=${stepBgColor ? 'background-color:' + stepBgColor : ''}>
          ${(document as any).length ? document : htmlBody}
        </div>
        </body>
      </html>
    `)

    setTimeout(() => {
      setIframeProcess(false)
    }, 100)
  }, [document, integrations, iframeKey])
  const IFrame = useMemo(
    () =>
      !iframeProcess ? (
        <iframe
          srcDoc={docSrc}
          style={IFRAME_STYLE}
        />
      ) : null,
    [docSrc, iframeProcess]
  )

  return document ? IFrame : <SkeletonViewBlock isOpenHeader={isOpenHeader} />
}

export default BrowserView
