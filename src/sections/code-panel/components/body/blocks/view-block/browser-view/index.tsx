import { type FC, useContext, useEffect, useState } from 'react'

import { IIntegration } from '@/redux/services/interfaces/integration.interface'
import { CodePanelContext } from '@root/src/sections/code-panel/lib/CodePanelContext'

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
  reloadIframe?: () => void
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
  reloadIframe,
}) => {
  const [docSrc, setDocSrc] = useState('')
  const { reloadIframeKey } = useContext(CodePanelContext)

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

export default BrowserView
